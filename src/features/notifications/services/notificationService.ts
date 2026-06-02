import { apiFetch } from '../../auth/services/apiFetch';
import type { Notification } from '../types/notification.types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const JSON_CONTENT: HeadersInit = { 'Content-Type': 'application/json' };

export async function getNotifications(token: string): Promise<Notification[]> {
  const res = await apiFetch(`${BASE_URL}/api/notifications`, {}, token);
  if (!res.ok) throw new Error(`Failed to fetch notifications: ${res.status}`);
  return res.json();
}

export async function markAllAsRead(token: string): Promise<void> {
  const res = await apiFetch(
    `${BASE_URL}/api/notifications/read-all`,
    { method: 'PUT' },
    token
  );
  if (!res.ok) throw new Error(`Failed to mark all notifications as read: ${res.status}`);
}

export async function markAsRead(id: string, token: string): Promise<void> {
  const res = await apiFetch(
    `${BASE_URL}/api/notifications/${id}/read`,
    { method: 'PUT' },
    token
  );
  if (!res.ok) throw new Error(`Failed to mark notification as read: ${res.status}`);
}

export async function saveFcmToken(fcmToken: string, authToken: string): Promise<void> {
  const res = await apiFetch(
    `${BASE_URL}/api/notifications/fcm-token`,
    {
      method: 'POST',
      headers: JSON_CONTENT,
      body: JSON.stringify({ token: fcmToken }),
    },
    authToken
  );
  if (!res.ok) throw new Error(`Failed to save FCM token: ${res.status}`);
}
