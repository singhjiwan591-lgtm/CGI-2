
'use client';

import { useState, useRef, useEffect } from 'react';
import { Bot, MessageCircle, Send, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { askAssistant } from '@/ai/flows/chat-flow';

type Message = {
  text: string;
  sender: 'user' | 'bot';
};

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
        setLoading(true);
        setTimeout(() => {
            setMessages([
                { sender: 'bot', text: "Hello! I'm the Global Computer Institute assistant. How can I help you with our courses, admissions, or anything else today?" }
            ]);
            setLoading(false);
        }, 1000);
    }
  }, [isOpen]);


  useEffect(() => {
    if (scrollAreaRef.current) {
        // Use `setTimeout` to allow the DOM to update before scrolling
        setTimeout(() => {
            const scrollableViewport = scrollAreaRef.current?.querySelector('div[data-radix-scroll-area-viewport]');
            if (scrollableViewport) {
                scrollableViewport.scrollTop = scrollableViewport.scrollHeight;
            }
        }, 0);
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const botResponse = await askAssistant(input);
      setMessages((prev) => [...prev, { text: botResponse, sender: 'bot' }]);
    } catch (error) {
      console.error('Chatbot error:', error);
      setMessages((prev) => [...prev, { text: "I'm sorry, I seem to be having some trouble. Please try again later.", sender: 'bot' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        className="fixed bottom-4 right-4 h-16 w-16 rounded-full shadow-lg z-50"
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
      >
        {isOpen ? <X className="h-8 w-8" /> : <MessageCircle className="h-8 w-8" />}
        <span className="sr-only">Toggle Chat</span>
      </Button>

      {isOpen && (
        <div className="fixed bottom-24 right-4 z-50 w-full max-w-sm">
          <Card className="flex flex-col h-[60vh] shadow-xl animate-in slide-in-from-bottom-10 fade-in-50 duration-300">
            <CardHeader className="flex flex-row items-center gap-3">
              <Bot className="h-8 w-8 text-primary" />
              <div>
                <CardTitle className="font-headline text-xl">GCI Assistant</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-0">
              <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
                <div className="space-y-4">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={cn('flex items-end gap-2', {
                        'justify-end': msg.sender === 'user',
                      })}
                    >
                      {msg.sender === 'bot' && (
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="https://i.ibb.co/5X00XdH9/0cbf6ee1-8add-4c4e-afdf-1d7eb2a4d1e7.png" alt="Bot Avatar" />
                          <AvatarFallback>GCI</AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={cn(
                          'max-w-[75%] rounded-lg p-3 text-sm',
                          msg.sender === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary'
                        )}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="flex items-end gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="https://i.ibb.co/5X00XdH9/0cbf6ee1-8add-4c4e-afdf-1d7eb2a4d1e7.png" alt="Bot Avatar" />
                          <AvatarFallback>GCI</AvatarFallback>
                        </Avatar>
                        <div className="bg-secondary p-3 rounded-lg">
                            <Loader2 className="h-5 w-5 animate-spin"/>
                        </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
            <CardFooter className="pt-4 border-t">
              <div className="flex w-full items-center gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type a message..."
                  disabled={loading}
                  className="flex-1"
                />
                <Button onClick={handleSend} disabled={loading || !input.trim()} size="icon">
                  <Send className="h-5 w-5" />
                  <span className="sr-only">Send</span>
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
}
