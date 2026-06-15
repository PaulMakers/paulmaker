'use server';
/**
 * @fileOverview A Genkit flow for generating catchy livestream titles and compelling server descriptions.
 *
 * - generateLivestreamPromotion - A function that handles the generation process.
 * - GenerateLivestreamPromotionInput - The input type for the generateLivestreamPromotion function.
 * - GenerateLivestreamPromotionOutput - The return type for the generateLivestreamPromotion function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateLivestreamPromotionInputSchema = z.object({
  serverName: z.string().describe('The name of the Growtopia Private Server (GTPS).'),
  serverType: z.string().describe('The type of the GTPS, e.g., PVP, Faction, Economy, Roleplay.'),
  uniqueFeatures: z
    .string()
    .describe('A comma-separated list of unique features or selling points of the GTPS.'),
  targetAudience: z
    .string()
    .describe('The primary target audience for the GTPS, e.g., competitive players, casual farmers, new players.'),
});
export type GenerateLivestreamPromotionInput = z.infer<typeof GenerateLivestreamPromotionInputSchema>;

const GenerateLivestreamPromotionOutputSchema = z.object({
  livestreamTitle: z.string().describe('A catchy and high-converting title for the livestream promotion.'),
  serverDescription: z
    .string()
    .describe('A compelling and descriptive summary of the GTPS for promotional purposes.'),
});
export type GenerateLivestreamPromotionOutput = z.infer<typeof GenerateLivestreamPromotionOutputSchema>;

export async function generateLivestreamPromotion(
  input: GenerateLivestreamPromotionInput
): Promise<GenerateLivestreamPromotionOutput> {
  return generateLivestreamPromotionFlow(input);
}

const generateLivestreamPromotionPrompt = ai.definePrompt({
  name: 'generateLivestreamPromotionPrompt',
  input: { schema: GenerateLivestreamPromotionInputSchema },
  output: { schema: GenerateLivestreamPromotionOutputSchema },
  prompt: `You are an expert marketing strategist specializing in Growtopia Private Server (GTPS) promotions.
Your goal is to create highly engaging and converting content for livestream promotions.

Generate a catchy livestream title and a compelling server description based on the following GTPS characteristics.

Server Name: {{{serverName}}}
Server Type: {{{serverType}}}
Unique Features: {{{uniqueFeatures}}}
Target Audience: {{{targetAudience}}}

Ensure the livestream title is attention-grabbing and the server description highlights the best aspects for the target audience.
`,
});

const generateLivestreamPromotionFlow = ai.defineFlow(
  {
    name: 'generateLivestreamPromotionFlow',
    inputSchema: GenerateLivestreamPromotionInputSchema,
    outputSchema: GenerateLivestreamPromotionOutputSchema,
  },
  async (input) => {
    const { output } = await generateLivestreamPromotionPrompt(input);
    return output!;
  }
);
