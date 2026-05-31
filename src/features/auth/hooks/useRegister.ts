import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import type { RegisterRequest } from '../types/auth.types';
import { validateRegisterForm } from '../utils/authValidation';

interface RegisterForm {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

export function useRegister(onError?: () => void) {
  const navigate = useNavigate();
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

  async function handleRegister(form: RegisterForm) {
    const validationErrors = validateRegisterForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    const payload: RegisterRequest = {
      fullName: form.fullName,
      email: form.email,
      password: form.password,
      confirmPassword: form.confirmPassword,
      role: form.role as 'Organizer' | 'Member',
    };

    setLoading(true);
    try {
      await register(payload);
      toast.success('Account created. Please sign in.');
      navigate('/login');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Registration failed.');
      onError?.();
    } finally {
      setLoading(false);
    }
  }

  return { handleRegister, loading, errors, clearError };
}
