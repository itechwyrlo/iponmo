import { useEffect, useRef, useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import type { HubConnection } from '@microsoft/signalr';
import toast from 'react-hot-toast';
import { useAuthContext } from '../../../context/AuthContext';
import { useNotificationContext } from '../../../context/NotificationContext';
import { getMessages, sendMessage as sendMessageService } from '../services/chatService';
import type { Message, SendMessageRequest } from '../types/chat.types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface UseChatResult {
  messages: Message[];
  loading: boolean;
  sending: boolean;
  sendMessage: (text: string | null, imageUrl: string | null) => Promise<void>;
}

export function useChat(groupId: string, receiverId: string): UseChatResult {
  const { token, user } = useAuthContext();
  const { addNotification } = useNotificationContext();
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
      .withUrl(`${BASE_URL}/hubs/chat?access_token=${token}`)
      .configureLogging(LogLevel.Warning)
      .withAutomaticReconnect()
      .build();

    connection.on('ReceiveMessage', (msg: Message) => {
      if (msg.senderId === receiverId || msg.receiverId === receiverId) {
        setMessages((prev) => [...prev, msg]);
        if (msg.receiverId === currentUserIdRef.current) {
          addNotification({
            id: crypto.randomUUID(),
            type: 'new_message',
            senderName: msg.senderName,
            messagePreview: msg.text ?? 'Sent an image',
            groupId: msg.groupId,
            groupName: '',
            receivedAt: msg.sentAt,
            isRead: false,
          });
        }
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
  }, [token, groupId, receiverId, addNotification]);

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
