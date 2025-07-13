
'use server';
/**
 * @fileOverview An AI flow to calculate estimated shipping costs.
 *
 * - calculateShippingCost - A function that handles the shipping cost calculation.
 * - CalculateShippingCostInput - The input type for the function.
 * - CalculateShippingCostOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CalculateShippingCostInputSchema = z.object({
  origin: z.string().describe('The starting point of the shipment (city or region).'),
  destination: z.string().describe('The destination of the shipment (city or region).'),
  productDetails: z.string().describe('Details of the product being shipped, including name, quantity, weight, and any special handling requirements (e.g., "10 Tons of Organic Wheat in 50kg bags", "2 Tons of Fresh Salmon, requires refrigeration").'),
});
export type CalculateShippingCostInput = z.infer<typeof CalculateShippingCostInputSchema>;

const CalculateShippingCostOutputSchema = z.object({
  estimatedCost: z.number().describe('The estimated shipping cost in USD.'),
  reasoning: z.string().describe('A brief explanation of how the cost was estimated, considering distance, weight, volume, and product type.'),
});
export type CalculateShippingCostOutput = z.infer<typeof CalculateShippingCostOutputSchema>;


export async function calculateShippingCost(input: CalculateShippingCostInput): Promise<CalculateShippingCostOutput> {
  return calculateShippingCostFlow(input);
}

const prompt = ai.definePrompt({
  name: 'calculateShippingCostPrompt',
  input: {schema: CalculateShippingCostInputSchema},
  output: {schema: CalculateShippingCostOutputSchema},
  prompt: `You are a logistics cost estimation expert for an agricultural marketplace in Indonesia. Your task is to provide a realistic shipping cost estimate in USD based on the provided details.

Consider the following factors:
- **Distance:** Estimate the distance between the origin and destination within Indonesia or to nearby countries.
- **Weight/Volume:** Analyze the product details to gauge its size and weight.
- **Product Type:** Consider if the product requires special handling like refrigeration (e.g., seafood, fresh produce) or is a bulk commodity (e.g., grains, palm oil).
- **Standard Rates:** Assume standard freight rates within Indonesia. For example, a 10-ton truck for a 500km journey might cost around $300-$500. Refrigerated transport could be 50-100% more expensive.

Analyze the following shipment details:
- **Origin:** {{{origin}}}
- **Destination:** {{{destination}}}
- **Product Details:** {{{productDetails}}}

Provide your response in the requested JSON format, including the estimated cost and a brief reasoning for your calculation.
`,
});

const calculateShippingCostFlow = ai.defineFlow(
  {
    name: 'calculateShippingCostFlow',
    inputSchema: CalculateShippingCostInputSchema,
    outputSchema: CalculateShippingCostOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
