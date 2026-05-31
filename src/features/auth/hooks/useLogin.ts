import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import type { AuthUser, LoginRequest } from '../types/auth.types';
import { useAuthContext } from '../../../context/AuthContext';
import { jwtDecode } from '../utils/jwtDecode';
import { validateLoginForm } from '../utils/authValidation';

export function useLogin(onError?: () => void) {
  const navigate = useNavigate();
  const { saveAuth } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function clearError(field: string) {
    setErrors((prev) => {
      if (!(field in prev)) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  async function handleLogin(form: LoginRequest) {
    const validationErrors = validateLoginForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      const response = await login(form);
      const decoded = jwtDecode(response.accessToken);
      const authUser: AuthUser = {
        userId: response.userId,
        email: decoded.email,
        role: decoded.role,
      };
      saveAuth(response, authUser);
      toast.success('Welcome back.');
      navigate('/');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed.');
      onError?.();
    } finally {
      setLoading(false);
    }
  }

  return { handleLogin, loading, errors, clearError };
}
