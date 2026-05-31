import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import { validateRegisterForm } from '../utils/authValidation';
export function useRegister(onError) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    function clearError(field) {
        setErrors((prev) => {
            if (!(field in prev))
                return prev;
            const next = { ...prev };
            delete next[field];
            return next;
        });
    }
    async function handleRegister(form) {
        const validationErrors = validateRegisterForm(form);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        const payload = {
            fullName: form.fullName,
            email: form.email,
            password: form.password,
            confirmPassword: form.confirmPassword,
            role: form.role,
        };
        setLoading(true);
        try {
            await register(payload);
            toast.success('Account created. Please sign in.');
            navigate('/login');
        }
        catch (error) {
            toast.error(error instanceof Error ? error.message : 'Registration failed.');
            onError?.();
        }
        finally {
            setLoading(false);
        }
    }
    return { handleRegister, loading, errors, clearError };
}
