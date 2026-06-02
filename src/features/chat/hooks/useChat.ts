import { useEffect, useRef, useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import type { HubConnection } from '@microsoft/signalr';
import toast from 'react-hot-toast';
import { useAuthContext } from '../../../context/AuthContext';
import { getMessages, sendMessage as sendMessageService } from '../services/chatService';
import type { Message, SendMessageRequest } from '../types/chat.types';

interface UseChatResult {
  messages: Message[];
  loading: boolean;
  sending: boolean;
  sendMessage: (text: string | null, imageUrl: string | null) => Promise<void>;
}

export function useChat(groupId: string, receiverId: string): UseChatResult {
  const { token, user } = useAuthContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const connectionRef = useRef<HubConnection | null>(null);
  const currentUserIdRef = useRef<string | undefined>(user?.userId);
  currentUserIdRef.current = user?.userId;

  useEffect(() => {
    if (!token) return;
    let cancelled = false;

    getMessages(token, groupId, receiverId)
      .then((data) => { if (!cancelled) setMessages(data); })
      .catch(() => { if (!cancelled) toast.error('Failed to load messages.'); })
      .finally(() => { if (!cancelled) setLoading(false); });

    const connection = new HubConnectionBuilder()
      .withUrl(`${import.meta.env.VITE_SIGNALR_HUB_URL}?access_token=${token}`)
      .configureLogging(LogLevel.Warning)
      .withAutomaticReconnect()
      .build();

    connection.on('ReceiveMessage', (msg: Message) => {
      console.log('[SignalR] ReceiveMessage — senderId:', msg.senderId, '| receiverId:', msg.receiverId, '| currentUserId:', currentUserIdRef.current, '| groupId:', msg.groupId);
      if (msg.senderId === receiverId || msg.receiverId === receiverId) {
        setMessages((prev) => [...prev, msg]);
      } else {
        console.log('[SignalR] Message ignored — not related to this conversation (receiverId:', receiverId, ')');
      }
    });

    connection.start()
      .then(() => connection.invoke('JoinGroupChat', groupId))
      .catch(() => null);

    connectionRef.current = connection;

    return () => {
      cancelled = true;
      const conn = connectionRef.current;
      if (conn) {
        conn.invoke('LeaveGroupChat', groupId).catch(() => null);
        conn.stop().catch(() => null);
        connectionRef.current = null;
      }
    };
  }, [token, groupId, receiverId]);

  async function sendMessage(text: string | null, imageUrl: string | null): Promise<void> {
    if (!token) return;
    setSending(true);
    const request: SendMessageRequest = { groupId, receiverId, text, imageUrl };
    try {
      await sendMessageService(token, request);
    } catch {
      toast.error('Failed to send message.');
    } finally {
      setSending(false);
    }
  }

  return { messages, loading, sending, sendMessage };
}
