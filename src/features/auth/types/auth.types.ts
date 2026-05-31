export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role?: 'Organizer' | 'Member';
}

export interface LoginRequest {
  email: string;
  password: string;
}

// POST /api/auth/register returns HTTP 201
export interface RegisterResponse {
  userId: string;
  email: string;
}

// POST /api/auth/login returns access token only
// refresh token arrives as HTTP-only cookie, not in body
export interface LoginResponse {
  accessToken: string;
  userId: string;
}

// POST /api/auth/refresh returns new access token
// new refresh token arrives as HTTP-only cookie
export interface RefreshResponse {
  accessToken: string;
  userId: string;
}

// What we store in context after login
export interface AuthUser {
  userId: string;
  email: string;
  role: string;
}
