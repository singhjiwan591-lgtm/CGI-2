
'use server';
/**
 * @fileoverview A contact form submission flow.
 */

import {ai} from './genkit';
import {z} from 'zod';

const ContactFormInputSchema = z.object({
  name: z.string().min(2).describe('The name of the person.'),
  email: z.string().email().describe('The email of the person.'),
  subject: z.string().min(5).describe('The subject of the message.'),
  message: z.string().min(10).describe('The message content.'),
});
export type ContactFormInput = z.infer<typeof ContactFormInputSchema>;

export async function processContactRequest(input: ContactFormInput) {
  return await contactFlow(input);
}

const SendEmailToolInput = z.object({
  to: z.string().describe('The email address to send the email to.'),
  subject: z.string().describe('The subject of the email.'),
  body: z.string().describe('The body of the email.'),
});

const sendEmailTool = ai.defineTool(
  {
    name: 'sendEmail',
    description: 'Send an email.',
    inputSchema: SendEmailToolInput,
    outputSchema: z.void(),
  },
  async (input: z.infer<typeof SendEmailToolInput>) => {
    // In a real application, you would use an email sending service like SendGrid, Resend, etc.
    // For this example, we will just log the email to the console.
    console.log('--- SENDING EMAIL ---');
    console.log(`To: ${input.to}`);
    console.log(`Subject: ${input.subject}`);
    console.log(`Body: ${input.body}`);
    console.log('---------------------');
  }
);

const contactPrompt = ai.definePrompt(
    {
        name: 'contactPrompt',
        input: { schema: ContactFormInputSchema },
        tools: [sendEmailTool],
        system: `You have received a new contact form submission. Log it to the console and then send a notification email to the site admin at admin@webandapp.edu.
        
        From: {{name}} ({{email}})
        Subject: {{subject}}
        Message: {{message}}
        `
    }
);


const contactFlow = ai.defineFlow(
  {
    name: 'contactFlow',
    inputSchema: ContactFormInputSchema,
    outputSchema: z.void(),
  },
  async (input: ContactFormInput) => {
    // 1. Log the message to the console
    console.log('--- NEW CONTACT MESSAGE ---');
    console.log(`From: ${input.name} (${input.email})`);
    console.log(`Subject: ${input.subject}`);
    console.log(`Message: ${input.message}`);
    console.log('---------------------------');

    // 2. Use AI to process and send the email
    await contactPrompt(input);
  }
);
