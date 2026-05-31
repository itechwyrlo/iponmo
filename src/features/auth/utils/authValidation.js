const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export function checkPasswordComplexity(password) {
    return {
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        digit: /[0-9]/.test(password),
        special: /[^a-zA-Z0-9]/.test(password),
    };
}
export function validateLoginForm(values) {
    const errors = {};
    if (!values.email.trim()) {
        errors.email = 'Email is required.';
    }
    else if (!EMAIL_REGEX.test(values.email)) {
        errors.email = 'Enter a valid email address.';
    }
    else if (values.email.length > 256) {
        errors.email = 'Email must be 256 characters or fewer.';
    }
    if (!values.password) {
        errors.password = 'Password is required.';
    }
    else if (values.password.length < 8) {
        errors.password = 'Password must be at least 8 characters.';
    }
    else if (values.password.length > 256) {
        errors.password = 'Password must be 256 characters or fewer.';
    }
    return errors;
}
export function validateRegisterForm(values) {
    const errors = {};
    if (!values.fullName.trim()) {
        errors.fullName = 'Full name is required.';
    }
    else if (/[<>]/.test(values.fullName)) {
        errors.fullName = 'Full name cannot contain < or > characters.';
    }
    else if (values.fullName.length > 100) {
        errors.fullName = 'Full name must be 100 characters or fewer.';
    }
    if (!values.email.trim()) {
        errors.email = 'Email is required.';
    }
    else if (!EMAIL_REGEX.test(values.email)) {
        errors.email = 'Enter a valid email address.';
    }
    else if (values.email.length > 256) {
        errors.email = 'Email must be 256 characters or fewer.';
    }
    if (!values.password) {
        errors.password = 'Password is required.';
    }
    else if (values.password.length < 8) {
        errors.password = 'Password must be at least 8 characters.';
    }
    else if (values.password.length > 256) {
        errors.password = 'Password must be 256 characters or fewer.';
    }
    else {
        const c = checkPasswordComplexity(values.password);
        if (!c.uppercase || !c.lowercase || !c.digit || !c.special) {
            errors.password = 'Password does not meet all complexity requirements.';
        }
    }
    if (!values.confirmPassword) {
        errors.confirmPassword = 'Please confirm your password.';
    }
    else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = 'Passwords do not match.';
    }
    if (!values.role) {
        errors.role = 'Please select a role.';
    }
    else if (values.role !== 'Organizer' && values.role !== 'Member') {
        errors.role = 'Role must be Organizer or Member.';
    }
    return errors;
}
