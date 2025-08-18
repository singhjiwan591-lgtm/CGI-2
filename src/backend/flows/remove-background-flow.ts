
'use server';
/**
 * @fileOverview An AI flow to remove the background from an image.
 *
 * - removeBackground - A function that takes an image and returns it with a transparent background.
 * - BackgroundRemovalInput - The input type for the removeBackground function.
 * - BackgroundRemovalOutput - The return type for the removeBackground function.
 */

import {ai} from '@/backend/genkit';
import {z} from 'genkit';

const BackgroundRemovalInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a person, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type BackgroundRemovalInput = z.infer<typeof BackgroundRemovalInputSchema>;

const BackgroundRemovalOutputSchema = z.object({
  imageDataUri: z.string().describe('The image with the background removed, as a PNG data URI.'),
});
export type BackgroundRemovalOutput = z.infer<
  typeof BackgroundRemovalOutputSchema
>;

export async function removeBackground(
  input: BackgroundRemovalInput
): Promise<BackgroundRemovalOutput> {
  const {media} = await ai.generate({
    model: 'googleai/gemini-2.0-flash-preview-image-generation',
    prompt: `
      Remove the background from the image and make it transparent.
      Here is the image:
      {{media url=photoDataUri}}
    `,
    input: {
      schema: BackgroundRemovalInputSchema,
      value: input,
    },
    config: {
      responseModalities: ['IMAGE'],
    },
  });

  if (!media?.url) {
    throw new Error('AI did not return an image.');
  }

  return { imageDataUri: media.url };
}
