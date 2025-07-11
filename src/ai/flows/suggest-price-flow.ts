
'use server';
/**
 * @fileOverview An AI flow to suggest a starting price for an agricultural product auction.
 *
 * - suggestPrice - A function that handles the price suggestion process.
 * - SuggestPriceInput - The input type for the suggestPrice function.
 * - SuggestPriceOutput - The return type for the suggestPrice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestPriceInputSchema = z.object({
  productName: z.string().describe('The name of the product.'),
  description: z.string().describe('A detailed description of the product, including quality, quantity, and origin.'),
  category: z.string().describe('The category of the product.'),
  photoDataUri: z
    .string()
    .describe(
      "A photo of the product, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type SuggestPriceInput = z.infer<typeof SuggestPriceInputSchema>;

const SuggestPriceOutputSchema = z.object({
  suggestedPrice: z.number().describe('The suggested starting bid price for the auction in USD.'),
  reasoning: z.string().describe('A brief explanation of how the price was determined.'),
});
export type SuggestPriceOutput = z.infer<typeof SuggestPriceOutputSchema>;


export async function suggestPrice(input: SuggestPriceInput): Promise<SuggestPriceOutput> {
  return suggestPriceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestPricePrompt',
  input: {schema: SuggestPriceInputSchema},
  output: {schema: SuggestPriceOutputSchema},
  prompt: `You are an expert agricultural commodity analyst. Your task is to suggest a reasonable starting bid price in USD for an online auction based on the provided product information.

Analyze the product name, description, category, and photo to determine a fair market value. Consider factors like quality, quantity (if mentioned), type, and visual appearance.

Provide the price in USD, as a number only.

Product Name: {{{productName}}}
Category: {{{category}}}
Description: {{{description}}}
Photo: {{media url=photoDataUri}}`,
});

const suggestPriceFlow = ai.defineFlow(
  {
    name: 'suggestPriceFlow',
    inputSchema: SuggestPriceInputSchema,
    outputSchema: SuggestPriceOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
