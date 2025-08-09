
'use client';

import { useEffect } from 'react';
import { messaging, requestNotificationPermission } from '@/lib/firebase';
import { onMessage } from 'firebase/messaging';
import { useToast } from '@/hooks/use-toast';

export function NotificationHandler() {
  const { toast } = useToast();

  useEffect(() => {
    requestNotificationPermission();

    if (messaging) {
      const unsubscribe = onMessage(messaging, (payload) => {
        console.log('Foreground message received.', payload);
        toast({
          title: payload.notification?.title || "New Notification",
          description: payload.notification?.body,
        });
      });

      return () => {
        unsubscribe();
      };
    }
  }, [toast]);

  return null;
}
