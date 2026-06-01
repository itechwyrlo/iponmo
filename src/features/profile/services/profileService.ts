import type { ProfileResponse, UpdatePaymentDetailsRequest } from '../types/profile.types';
import { apiFetch } from '../../auth/services/apiFetch';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getProfile(token: string): Promise<ProfileResponse> {
  const response = await fetch(`${BASE_URL}/api/profiles`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Failed to load profile.');
  return response.json();
}

export async function updatePaymentDetails(
  token: string,
  data: UpdatePaymentDetailsRequest
): Promise<ProfileResponse> {
  const response = await apiFetch(
    `${BASE_URL}/api/profiles/payment`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    },
    token
  );
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to save payment details.' }));
    throw new Error((error as { message?: string }).message ?? 'Failed to save payment details.');
  }
  return response.json();
}
