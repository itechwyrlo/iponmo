import { useState } from 'react';
import type { ChangeEvent } from 'react';

export function useForm<T extends Record<string, string>>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function resetForm() {
    setValues(initialValues);
  }

  function clearFields(...fieldNames: Array<keyof T>) {
    setValues((prev) => ({
      ...prev,
      ...Object.fromEntries(fieldNames.map((k) => [k, ''])),
    }));
  }

  return { values, handleChange, resetForm, clearFields };
}
