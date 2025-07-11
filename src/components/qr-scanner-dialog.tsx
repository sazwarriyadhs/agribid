
'use client';

import { useEffect, useRef, useState } from 'react';
import jsQR from 'jsqr';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Alert, AlertTitle, AlertDescription } from './ui/alert';
import { QrCode, VideoOff } from 'lucide-react';

interface QrScannerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onScanSuccess: (data: string) => void;
}

export function QrScannerDialog({ open, onOpenChange, onScanSuccess }: QrScannerDialogProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    let stream: MediaStream | null = null;
    let animationFrameId: number;

    const tick = () => {
      if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA && canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          canvas.height = video.videoHeight;
          canvas.width = video.videoWidth;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: 'dontInvert',
          });

          if (code) {
            onScanSuccess(code.data);
            return; // Stop scanning
          }
        }
      }
      animationFrameId = requestAnimationFrame(tick);
    };

    const getCameraPermission = async () => {
      if (!open) return;

      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        setHasCameraPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        animationFrameId = requestAnimationFrame(tick);
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        setScanError('Could not access the camera. Please check permissions in your browser settings.');
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions to use QR code login.',
        });
      }
    };

    if (open) {
      getCameraPermission();
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [open, onScanSuccess, toast]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Scan QR Code</DialogTitle>
          <DialogDescription>
            Point your camera at the QR code on your membership card to log in.
          </DialogDescription>
        </DialogHeader>
        <div className="relative aspect-square w-full mt-4 bg-secondary rounded-lg overflow-hidden flex items-center justify-center">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            playsInline
            autoPlay
            muted
          />
          <canvas ref={canvasRef} className="hidden" />
          
          {hasCameraPermission === false && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 p-4 text-center">
                <VideoOff className="h-16 w-16 text-destructive mb-4" />
                <Alert variant="destructive">
                    <AlertTitle>Camera Access Required</AlertTitle>
                    <AlertDescription>
                        {scanError}
                    </AlertDescription>
                </Alert>
            </div>
          )}

           {hasCameraPermission === true && (
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[250px] h-[250px] border-4 border-dashed border-primary/50 rounded-lg" />
             </div>
           )}

        </div>
      </DialogContent>
    </Dialog>
  );
}
