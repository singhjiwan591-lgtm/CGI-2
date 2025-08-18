
'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Upload, Scissors, Download, Image as ImageIcon, Users } from 'lucide-react';
import Image from 'next/image';
import { removeBackground } from '@/backend/flows/remove-background-flow';
import { createCanvas, loadImage } from 'canvas';

export default function PassportPhotoMakerPage() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [finalImage, setFinalImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB limit
        toast({
          variant: 'destructive',
          title: 'File Too Large',
          description: 'Please upload an image smaller than 4MB.',
        });
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        setOriginalImage(e.target?.result as string);
        setProcessedImage(null);
        setFinalImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveBackground = async () => {
    if (!originalImage) return;

    setIsLoading(true);
    setProcessedImage(null);
    setFinalImage(null);

    try {
      const result = await removeBackground({ photoDataUri: originalImage });
      setProcessedImage(result.imageDataUri);
      toast({
        title: 'Background Removed!',
        description: 'The background has been successfully removed.',
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Something went wrong',
        description: 'Failed to remove background. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generatePassportSheet = async () => {
    if (!processedImage) return;
    setIsLoading(true);

    try {
        const img = await loadImage(processedImage);
        
        const passportWidth = 350; // 3.5cm at 100dpi
        const passportHeight = 450; // 4.5cm at 100dpi
        const sheetWidth = 1200; // 4x6 inch sheet at ~200 dpi approx
        const sheetHeight = 1800;

        const canvas = createCanvas(sheetWidth, sheetHeight);
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, sheetWidth, sheetHeight);

        const columns = 3;
        const rows = 4;
        const marginX = (sheetWidth - (columns * passportWidth)) / (columns + 1);
        const marginY = (sheetHeight - (rows * passportHeight)) / (rows + 1);

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < columns; col++) {
                const x = marginX + col * (passportWidth + marginX);
                const y = marginY + row * (passportHeight + marginY);
                ctx.drawImage(img, x, y, passportWidth, passportHeight);
            }
        }
        
        setFinalImage(canvas.toDataURL('image/jpeg'));

    } catch (error) {
        console.error(error);
        toast({
            variant: 'destructive',
            title: 'Failed to generate sheet',
            description: 'Could not create the passport photo sheet. Please try again.'
        });
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center bg-secondary min-h-[calc(100vh-4rem)]">
      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-3xl font-bold md:text-5xl">AI Passport Photo Maker</h1>
          <p className="mx-auto mt-4 max-w-3xl text-base text-foreground/80 md:text-lg">
            Create professional passport photos in seconds. Upload your image, and let our AI do the rest.
          </p>
        </div>
      </section>

      <section className="container mx-auto -mt-16 mb-20 px-4">
        <Card className="mx-auto max-w-4xl shadow-lg">
          <CardHeader>
            <CardTitle>Photo Studio</CardTitle>
            <CardDescription>Follow the steps below to create your passport photo.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Upload className="h-5 w-5" /> 1. Upload Your Photo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Input
                      id="photo-upload"
                      type="file"
                      accept="image/png, image/jpeg, image/webp"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Button onClick={() => fileInputRef.current?.click()} className="w-full">
                      Choose a File
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">Max file size: 4MB. Use a clear, front-facing photo.</p>
                  </CardContent>
                </Card>

                {originalImage && (
                  <Button onClick={handleRemoveBackground} disabled={isLoading} className="w-full">
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Scissors className="mr-2 h-4 w-4" />}
                    2. Remove Background
                  </Button>
                )}

                {processedImage && (
                  <Button onClick={generatePassportSheet} disabled={isLoading} className="w-full">
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Users className="mr-2 h-4 w-4" />}
                    3. Create Photo Sheet
                  </Button>
                )}

                {finalImage && (
                  <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                    <a href={finalImage} download="passport_photos.jpg">
                        <Download className="mr-2 h-4 w-4" />
                        4. Download Your Photos
                    </a>
                  </Button>
                )}
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex-1">
                  <Label>Original</Label>
                  <div className="mt-2 flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                    {originalImage ? (
                      <Image src={originalImage} alt="Original" width={400} height={400} className="rounded-md object-contain max-h-full" />
                    ) : (
                      <div className="text-center text-muted-foreground">
                        <ImageIcon className="mx-auto h-12 w-12" />
                        <p>Your photo will appear here</p>
                      </div>
                    )}
                  </div>
                </div>
                 <div className="flex-1">
                  <Label>Result</Label>
                  <div className="mt-2 flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                    {isLoading && <Loader2 className="h-8 w-8 animate-spin" />}
                    {!isLoading && finalImage && (
                      <Image src={finalImage} alt="Final photo sheet" width={400} height={400} className="rounded-md object-contain max-h-full" />
                    )}
                    {!isLoading && !finalImage && processedImage && (
                        <Image src={processedImage} alt="Processed" width={400} height={400} className="rounded-md object-contain max-h-full" />
                    )}
                    {!isLoading && !processedImage && !finalImage && (
                       <div className="text-center text-muted-foreground">
                        <ImageIcon className="mx-auto h-12 w-12" />
                        <p>Your processed photo will appear here</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
