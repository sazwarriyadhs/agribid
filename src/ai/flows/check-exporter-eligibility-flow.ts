
'use server';
/**
 * @fileOverview An AI flow to check a user's eligibility to become an exporter.
 *
 * - checkExporterEligibility - Checks if a user meets the criteria.
 * - CheckExporterEligibilityInput - The input type for the function.
 * - CheckExporterEligibilityOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import type { Role } from '@/config/sidebar';

const CheckExporterEligibilityInputSchema = z.object({
  producerName: z.string().describe('The name of the user or their company.'),
  successfulAuctions: z.number().describe('The number of successful auction transactions the user has completed (either as a seller or a winning bidder).'),
  uploadedDocuments: z.array(z.string()).describe('A list of document types the user has uploaded (e.g., "npwp", "siup", "legal_entity_deed").'),
  requestingRole: z.string().describe('The role of the user making the request (e.g., "admin", "partner", "bidder").'),
});
export type CheckExporterEligibilityInput = z.infer<typeof CheckExporterEligibilityInputSchema>;

const CheckExporterEligibilityOutputSchema = z.object({
  status: z.enum(['eligible', 'not_eligible', 'needs_review']).describe('The eligibility status of the user.'),
  recommendation: z.string().describe('A clear recommendation for the next step (e.g., "Ready for admin verification", "Complete transaction requirements", "Upload required documents").'),
  missingDocuments: z.array(z.string()).describe('A list of required documents that are still missing.'),
  notes: z.string().describe('Additional notes or explanation for the user.'),
});
export type CheckExporterEligibilityOutput = z.infer<typeof CheckExporterEligibilityOutputSchema>;


export async function checkExporterEligibility(input: CheckExporterEligibilityInput): Promise<CheckExporterEligibilityOutput> {
  return checkExporterEligibilityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'checkExporterEligibilityPrompt',
  input: {schema: CheckExporterEligibilityInputSchema},
  output: {schema: CheckExporterEligibilityOutputSchema},
  prompt: `You are an expert consultant for Indonesian export regulations. Your task is to analyze a user's profile to determine if they are eligible to become an exporter on the AgriBid platform.

The requirements to become an exporter are:
1.  **Transaction History:** At least 5 successful transactions (can be as a seller or a winning bidder).
2.  **Legal Documents:** The user's entity must have a legal entity (PT, CV, etc.), an NPWP (Tax ID), and at least one valid business license (like SIUP). For simplicity, we will check for the presence of 'legal_entity_deed', 'npwp', and 'siup' in the uploaded documents list.

Analyze the following user data:
- User/Company Name: {{{producerName}}}
- Successful Transactions: {{{successfulAuctions}}}
- Uploaded Documents: {{#each uploadedDocuments}} {{this}} {{/each}}

Based on the data, determine the user's eligibility status ('eligible', 'not_eligible', 'needs_review').
- If they meet all criteria, set status to 'eligible' and provide a positive recommendation for admin verification.
- If they do not meet the transaction requirement, set status to 'not_eligible' and explain they need to complete more successful transactions.
- If they meet the transaction requirement but are missing documents, set status to 'not_eligible', list the missing documents, and instruct them to upload the required files.

Provide a concise recommendation and notes in your response. The response MUST be in the requested JSON format.
`,
});

const checkExporterEligibilityFlow = ai.defineFlow(
  {
    name: 'checkExporterEligibilityFlow',
    inputSchema: CheckExporterEligibilityInputSchema,
    outputSchema: CheckExporterEligibilityOutputSchema,
  },
  async (input) => {
    // BACKEND ROLE VALIDATION EXAMPLE
    // In a real app, you'd get the user role from a secure session/token, not from the input.
    // This demonstrates how a backend endpoint would protect itself.
    const allowedRoles: Role[] = ['admin', 'partner', 'exporter', 'producer', 'bidder', 'seller', 'buyer', 'vendor'];
    if (!allowedRoles.includes(input.requestingRole as Role)) {
      throw new Error(`Unauthorized: Role '${input.requestingRole}' cannot perform this action.`);
    }

    const {output} = await prompt(input);
    return output!;
  }
);
