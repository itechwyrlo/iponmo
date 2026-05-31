import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from '../types/auth.types';
import { apiFetch } from './apiFetch';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function register(data: RegisterRequest): Promise<RegisterResponse> {
  const response = await fetch(`${BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Registration failed.' }));
    throw new Error(error.message ?? 'Registration failed.');
  }

  return response.json();
}

export async function login(data: LoginRequest): Promise<LoginResponse> {
  const response = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // credentials: include so the browser stores the HTTP-only refreshToken cookie
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Invalid credentials.' }));
    throw new Error(error.message ?? 'Invalid credentials.');
  }

  return response.json();
}

export async function logout(accessToken: string): Promise<void> {
  await apiFetch(`${BASE_URL}/api/auth/logout`, { method: 'POST' }, accessToken);
}
