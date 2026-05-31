import { jsx as _jsx } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../features/auth/components/LoginForm';
import { useLogin } from '../features/auth/hooks/useLogin';
import { useForm } from '../hooks/useForm';
const initialValues = {
    email: '',
    password: '',
};
export function LoginPage() {
    const navigate = useNavigate();
    const { values, handleChange, clearFields } = useForm(initialValues);
    const { handleLogin, loading, errors, clearError } = useLogin(() => clearFields('password'));
    function handleFieldChange(e) {
        handleChange(e);
        clearError(e.target.name);
    }
    return (_jsx(LoginForm, { values: values, errors: errors, loading: loading, onChange: handleFieldChange, onSubmit: () => handleLogin(values), onRegisterClick: () => navigate('/register') }));
}
