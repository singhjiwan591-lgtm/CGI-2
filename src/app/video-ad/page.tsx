
'use client';
import {useState, useEffect} from 'react';
import {generateVideoAd} from '@/ai/flows/generate-video-flow';
import { Card, CardContent } from '@/components/ui/card';
import { LoaderCircle } from 'lucide-react';

export default function VideoAdPage() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const generateVideo = async () => {
      try {
        const result = await generateVideoAd({
          prompt: 'A cinematic promotional video for a modern computer institute, showing students collaborating and using advanced technology.',
        });
        setVideoUrl(result.videoUrl);
      } catch (err) {
        console.error(err);
        setError('Sorry, we could not generate the video at this time. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    generateVideo();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-background p-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-center font-headline text-3xl font-bold md:text-5xl mb-8">
          Our Vision in Motion
        </h1>
        <Card className="overflow-hidden shadow-2xl">
            <CardContent className="p-0">
                <div className="aspect-video bg-secondary flex items-center justify-center">
                {isLoading && (
                    <div className="flex flex-col items-center gap-4 text-foreground/80">
                        <LoaderCircle className="h-12 w-12 animate-spin text-primary" />
                        <p className="text-lg">Generating your AI-powered video ad...</p>
                        <p className="text-sm">(This may take up to a minute)</p>
                    </div>
                )}
                {error && (
                    <div className="text-destructive p-8 text-center">
                        <p className="font-bold">An Error Occurred</p>
                        <p>{error}</p>
                    </div>
                )}
                {videoUrl && (
                    <video
                    src={videoUrl}
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    />
                )}
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
