const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function saveFcmToken(token: string, authToken: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/notifications/fcm-token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    credentials: 'include',
    body: JSON.stringify({ token }),
  });
  if (!res.ok) throw new Error(`Failed to save FCM token: ${res.status}`);
}
