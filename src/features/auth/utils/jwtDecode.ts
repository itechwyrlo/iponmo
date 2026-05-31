interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  jti: string;
  exp: number;
}

export function jwtDecode(token: string): JwtPayload {
  const parts = token.split('.');
  if (parts.length !== 3) throw new Error('Invalid token format.');

  const payload = parts[1];
  const padded = payload + '='.repeat((4 - (payload.length % 4)) % 4);
  const decoded = atob(padded.replace(/-/g, '+').replace(/_/g, '/'));

  return JSON.parse(decoded) as JwtPayload;
}
