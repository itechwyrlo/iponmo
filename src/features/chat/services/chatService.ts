import { apiFetch } from '../../auth/services/apiFetch';
import type { Message, SendMessageRequest } from '../types/chat.types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const JSON_CONTENT: HeadersInit = { 'Content-Type': 'application/json' };

export async function getMessages(
  token: string,
  groupId: string,
  otherUserId: string
): Promise<Message[]> {
  const response = await apiFetch(
    `${BASE_URL}/api/messages?groupId=${groupId}&otherUserId=${otherUserId}`,
    {},
    token
  );
  if (!response.ok) throw new Error('Failed to load messages.');
  return response.json();
}

export async function sendMessage(
  token: string,
  request: SendMessageRequest
): Promise<Message> {
  const response = await apiFetch(
    `${BASE_URL}/api/messages`,
    {
      method: 'POST',
      headers: JSON_CONTENT,
      body: JSON.stringify(request),
    },
    token
  );
  if (!response.ok) throw new Error('Failed to send message.');
  return response.json();
}

export async function uploadImage(token: string, file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  const response = await apiFetch(
    `${BASE_URL}/api/messages/upload-image`,
    { method: 'POST', body: formData },
    token
  );
  if (!response.ok) throw new Error('Failed to upload image.');
  const data = (await response.json()) as { imageUrl: string };
  return data.imageUrl;
}
