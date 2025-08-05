
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Loader2, Inbox, Mail, MailOpen } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';
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

const mockMessages: Message[] = [
    {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        subject: 'Inquiry about Web Development course',
        message: 'Hello, I would like to know more about the Web Development course. What are the prerequisites and the total fee? Thank you.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        read: false,
    },
    {
        id: '2',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        subject: 'Question regarding placement assistance',
        message: 'Hi, I am interested in your Data Science program and wanted to understand the placement assistance process. Could you please provide some details?',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        read: true,
    },
    {
        id: '3',
        name: 'Amit Patel',
        email: 'amit.patel@example.com',
        subject: 'Free Counseling Session',
        message: 'I would like to book a free counseling session for this Saturday. Please let me know the available time slots.',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        read: true,
    }
]


export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
        setMessages(mockMessages);
        setLoading(false);
    }, 1000);
  }, []);

  const handleMarkAsRead = (id: string) => {
    setMessages(prevMessages => 
        prevMessages.map(msg => 
            msg.id === id ? { ...msg, read: true } : msg
        )
    );
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
