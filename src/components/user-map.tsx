
'use client';

import React, { useEffect, useRef } from 'react';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Style, Circle, Fill, Stroke } from 'ol/style';
import Overlay from 'ol/Overlay';
import { useI18n } from '@/context/i18n';

interface UserMapProps {
  users: {
    name: string;
    status: string;
    lat: number;
    lon: number;
  }[];
}

const UserMap = ({ users }: UserMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<Map | null>(null);
  const { t } = useI18n();

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM({
             url: 'https://{a-c}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png'
          }),
        }),
      ],
      view: new View({
        center: fromLonLat([118.0158, -2.5489]), // Center of Indonesia
        zoom: 5,
      }),
      controls: [],
    });
    
    mapInstance.current = map;

    return () => {
        if (mapInstance.current) {
            mapInstance.current.setTarget(undefined);
            mapInstance.current = null;
        }
    };
  }, []);

  useEffect(() => {
    if (!mapInstance.current || !tooltipRef.current) return;
    
    // Clear previous vector layers
    mapInstance.current.getLayers().forEach(layer => {
        if (layer instanceof VectorLayer) {
            mapInstance.current!.removeLayer(layer);
        }
    });

    const features = users.map(user => {
      const feature = new Feature({
        geometry: new Point(fromLonLat([user.lon, user.lat])),
        name: user.name,
        status: user.status,
      });
      return feature;
    });

    const getStatusVariant = (status: string) => {
        const s = status.toLowerCase().replace(/ /g, '_');
        if (['active', 'paid'].includes(s)) return 'green';
        if (['suspended', 'unpaid', 'pending_verification'].includes(s)) return 'red';
        return 'grey';
    }

    const vectorSource = new VectorSource({
      features: features,
    });
    
    const styleFunction = (feature: Feature) => {
        const status = feature.get('status') || '';
        const color = getStatusVariant(status);
        return new Style({
            image: new Circle({
                radius: 7,
                fill: new Fill({ color: color }),
                stroke: new Stroke({ color: 'white', width: 2 }),
            }),
        });
    }

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: styleFunction,
    });

    const tooltipOverlay = new Overlay({
      element: tooltipRef.current,
      offset: [0, -15],
      positioning: 'bottom-center',
    });

    mapInstance.current.addLayer(vectorLayer);
    mapInstance.current.addOverlay(tooltipOverlay);

    const pointerMoveListener = mapInstance.current.on('pointermove', (evt) => {
        const feature = mapInstance.current!.forEachFeatureAtPixel(evt.pixel, (f) => f);
        const tooltipElement = tooltipRef.current;

        if (feature && tooltipElement) {
            tooltipElement.style.display = 'block';
            tooltipOverlay.setPosition(evt.coordinate);
            tooltipElement.innerHTML = `<strong>${feature.get('name')}</strong><br/>Status: ${feature.get('status')}`;
        } else if (tooltipElement) {
            tooltipElement.style.display = 'none';
        }
    });
    
    // Cleanup on re-render
    return () => {
        if (mapInstance.current) {
             mapInstance.current.getOverlays().clear();
             // The listener itself does not need manual cleanup in modern OpenLayers
        }
    }

  }, [users, t]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
      <div ref={tooltipRef} className="map-tooltip" style={{ display: 'none' }} />
    </div>
  );
};

export default UserMap;
