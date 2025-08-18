'use server';
/**
 * @fileoverview A contact form submission flow.
 */

import {ai} from '@/backend/genkit';
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

const sendEmailTool = ai.defineTool(
  {
    name: 'sendEmail',
    description: 'Send an email.',
    inputSchema: z.object({
      to: z.string().describe('The email address to send the email to.'),
      subject: z.string().describe('The subject of the email.'),
      body: z.string().describe('The body of the email.'),
    }),
    outputSchema: z.void(),
  },
  async (input) => {
    // In a real application, you would use an email sending service like SendGrid, Resend, etc.
    // For this example, we will just log the email to the console.
    console.log('--- SENDING EMAIL ---');
    console.log(`To: ${input.to}`);
    console.log(`Subject: ${input.subject}`);
    console.log(`Body: ${input.body}`);
    console.log('---------------------');
  }
);

const contactFlow = ai.defineFlow(
  {
    name: 'contactFlow',
    inputSchema: ContactFormInputSchema,
    outputSchema: z.void(),
  },
  async (input) => {
    // 1. Log the message to the console (since Firestore is removed)
    console.log('--- NEW CONTACT MESSAGE ---');
    console.log(`From: ${input.name} (${input.email})`);
    console.log(`Subject: ${input.subject}`);
    console.log(`Message: ${input.message}`);
    console.log('---------------------------');

    // 2. Send a notification email to the admin
    await sendEmailTool({
      to: 'admin@webandapp.edu',
      subject: `New Contact Form Submission: ${input.subject}`,
      body: `
        You have received a new message from your website contact form.
        
        From: ${input.name} (${input.email})
        Subject: ${input.subject}
        
        Message:
        ${input.message}
      `,
    });
  }
);
