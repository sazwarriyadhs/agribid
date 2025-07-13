
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

// Coordinates for countries
const countryCoordinates: { [key: string]: [number, number] } = {
  China: [116.4074, 39.9042],
  India: [77.2090, 28.6139],
  Netherlands: [4.8952, 52.3702],
  USA: [-95.7129, 37.0902],
  Germany: [13.4050, 52.5200],
  Japan: [138.2529, 36.2048],
  Vietnam: [108.2772, 16.0544],
  Malaysia: [101.9758, 4.2105],
  Singapore: [103.8198, 1.3521],
};

const demandData = [
  { country: "China", productKey: "palm_oil" },
  { country: "India", productKey: "palm_oil" },
  { country: "Netherlands", productKey: "palm_oil" },
  { country: "USA", productKey: "coffee" },
  { country: "Germany", productKey: "coffee" },
  { country: "Japan", productKey: "shrimp" },
  { country: "Vietnam", productKey: "shrimp" },
  { country: "Malaysia", productKey: "cocoa" },
  { country: "Singapore", productKey: "cocoa" },
];

const InteractiveMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const { t } = useI18n();

  useEffect(() => {
    if (!mapRef.current || !tooltipRef.current) return;

    const features = demandData.map(item => {
      const feature = new Feature({
        geometry: new Point(fromLonLat(countryCoordinates[item.country])),
        country: item.country,
        product: t(item.productKey),
      });
      return feature;
    });

    const vectorSource = new VectorSource({
      features: features,
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        image: new Circle({
          radius: 8,
          fill: new Fill({ color: 'hsl(var(--accent))' }),
          stroke: new Stroke({ color: 'hsl(var(--accent-foreground))', width: 2 }),
        }),
      }),
    });

    const tooltipOverlay = new Overlay({
      element: tooltipRef.current,
      offset: [0, -15],
      positioning: 'bottom-center',
    });

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM({
             url: 'https://{a-c}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png'
          }),
        }),
        vectorLayer,
      ],
      overlays: [tooltipOverlay],
      view: new View({
        center: fromLonLat([118.0157, -2.5489]), // Center of Indonesia
        zoom: 4,
      }),
      controls: [],
    });
    
    map.on('pointermove', (evt) => {
        const feature = map.forEachFeatureAtPixel(evt.pixel, (f) => f);
        const tooltipElement = tooltipRef.current;

        if (feature && tooltipElement) {
            tooltipElement.style.display = 'block';
            tooltipOverlay.setPosition(evt.coordinate);
            tooltipElement.innerHTML = `<strong>${feature.get('country')}</strong><br/>${t('demandKey', 'Demand')}: ${feature.get('product')}`;
        } else if (tooltipElement) {
            tooltipElement.style.display = 'none';
        }
    });


    return () => map.setTarget(undefined);
  }, [t]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
      <div ref={tooltipRef} className="map-tooltip" style={{ display: 'none' }} />
    </div>
  );
};

export default InteractiveMap;
