
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Loader2, Inbox, Mail, MailOpen } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';

type Message = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: Date;
  read: boolean;
};

// Mock data
const mockMessages: Message[] = [
    { id: '1', name: 'Anjali Gupta', email: 'anjali@example.com', subject: 'Inquiry about Web Development course', message: 'Hello, I would like to know more about the full-stack web development course. What is the duration and fee structure? Thanks.', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), read: false },
    { id: '2', name: 'Sandeep Singh', email: 'sandeep@example.com', subject: 'Placement Assistance', message: 'I am a final year student. Can you please provide details about the placement support provided by your institute?', timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), read: true },
    { id: '3', name: 'Kavita Reddy', email: 'kavita@example.com', subject: 'Question about DIFA course', message: 'Is the Diploma in Financial Accounting course suitable for someone with a non-commerce background?', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), read: true },
];

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [loading, setLoading] = useState(false);

  const handleMarkAsRead = async (id: string) => {
    setMessages(messages.map(msg => msg.id === id ? { ...msg, read: true } : msg));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">Inbox</h1>
          <p className="text-muted-foreground">Messages from the website contact form.</p>
        </div>
      </div>
      
      {messages.length === 0 ? (
         <Card className="mt-8">
            <CardContent className="p-12 flex flex-col items-center justify-center text-center">
                <Inbox className="h-20 w-20 text-muted-foreground mb-4" />
                <h2 className="text-2xl font-semibold">Your inbox is empty</h2>
                <p className="text-muted-foreground mt-2">New messages from your website will appear here.</p>
            </CardContent>
         </Card>
      ) : (
        <Card>
            <CardContent className="p-0">
                <Accordion type="single" collapsible className="w-full">
                {messages.map((msg) => (
                    <AccordionItem value={msg.id} key={msg.id} className="border-b">
                        <AccordionTrigger 
                            className="p-4 hover:no-underline hover:bg-muted/50"
                            onClick={() => !msg.read && handleMarkAsRead(msg.id)}
                        >
                            <div className="flex items-center gap-4 w-full">
                                {msg.read ? <MailOpen className="h-5 w-5 text-muted-foreground" /> : <Mail className="h-5 w-5 text-primary" />}
                                <div className="flex-1 text-left">
                                    <p className={`font-semibold ${!msg.read ? 'text-foreground' : 'text-muted-foreground'}`}>{msg.name}</p>
                                    <p className={`text-sm truncate ${!msg.read ? 'text-foreground' : 'text-muted-foreground'}`}>{msg.subject}</p>
                                </div>
                                <div className="text-right">
                                    {!msg.read && <Badge>New</Badge>}
                                    <p className="text-xs text-muted-foreground mt-1">
                                    {formatDistanceToNow(msg.timestamp, { addSuffix: true })}
                                    </p>
                                </div>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="p-6 bg-secondary/20">
                            <h4 className="font-semibold text-sm mb-1">From: <a href={`mailto:${msg.email}`} className="text-primary underline">{msg.email}</a></h4>
                            <p className="text-base whitespace-pre-wrap">{msg.message}</p>
                        </AccordionContent>
                    </AccordionItem>
                ))}
                </Accordion>
            </CardContent>
        </Card>
      )}
    </div>
  );
}
