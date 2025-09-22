
'use server';
/**
 * @fileoverview A simple messaging flow to send emails.
 */

import {ai} from './genkit';
import {z} from 'zod';

const MessageInputSchema = z.object({
  toEmail: z.string().email().describe('The email address of the recipient.'),
  subject: z.string().min(3).describe('The subject of the message.'),
  message: z.string().min(5).describe('The content of the message.'),
});
export type MessageInput = z.infer<typeof MessageInputSchema>;


const SendParentEmailInput = z.object({
  to: z.string().email().describe("The parent's email address."),
  subject: z.string().describe('The subject of the email.'),
  body: z.string().describe('The body of the email.'),
});

const sendEmailTool = ai.defineTool(
  {
    name: 'sendParentEmail',
    description: 'Send an email to a parent.',
    inputSchema: SendParentEmailInput,
    outputSchema: z.void(),
  },
  async (input: z.infer<typeof SendParentEmailInput>) => {
    // In a real application, you would use an email sending service like SendGrid, Resend, etc.
    // For this example, we will just log the email to the console.
    console.log('--- SENDING PARENT EMAIL ---');
    console.log(`To: ${input.to}`);
    console.log(`Subject: ${input.subject}`);
    console.log(`Body: ${input.body}`);
    console.log('----------------------------');
  }
);

const messageFlow = ai.defineFlow(
  {
    name: 'messageFlow',
    inputSchema: MessageInputSchema,
    outputSchema: z.void(),
    tools: [sendEmailTool]
  },
  async (input) => {
    await sendEmailTool({
      to: input.toEmail,
      subject: input.subject,
      body: input.message,
    });
  }
);


export async function sendMessage(input: MessageInput) {
  return await messageFlow(input);
}
