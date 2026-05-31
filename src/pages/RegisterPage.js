import { jsx as _jsx } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import { RegisterForm } from '../features/auth/components/RegisterForm';
import { useRegister } from '../features/auth/hooks/useRegister';
import { useForm } from '../hooks/useForm';
const initialValues = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
};
export function RegisterPage() {
    const navigate = useNavigate();
    const { values, handleChange, clearFields } = useForm(initialValues);
    const { handleRegister, loading, errors, clearError } = useRegister(() => clearFields('password', 'confirmPassword'));
    function handleFieldChange(e) {
        handleChange(e);
        clearError(e.target.name);
    }
    return (_jsx(RegisterForm, { values: values, errors: errors, loading: loading, onChange: handleFieldChange, onSubmit: () => handleRegister(values), onLoginClick: () => navigate('/login') }));
}
