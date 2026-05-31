import { useState } from 'react';
export function useForm(initialValues) {
    const [values, setValues] = useState(initialValues);
    function handleChange(e) {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
    }
    function resetForm() {
        setValues(initialValues);
    }
    function clearFields(...fieldNames) {
        setValues((prev) => ({
            ...prev,
            ...Object.fromEntries(fieldNames.map((k) => [k, ''])),
        }));
    }
    return { values, handleChange, resetForm, clearFields };
}
