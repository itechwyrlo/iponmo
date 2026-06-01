import { useState, useEffect } from 'react';
import { useAuthContext } from '../../../context/AuthContext';
import { updatePaymentDetails } from '../services/profileService';

interface UseUpdatePaymentReturn {
  gCashInput: string;
  setGCashInput: (v: string) => void;
  mayaInput: string;
  setMayaInput: (v: string) => void;
  saving: boolean;
  saveError: string | null;
  savePayment: () => Promise<void>;
}

export function useUpdatePayment(
  initialGCash: string | null,
  initialMaya: string | null
): UseUpdatePaymentReturn {
  const { token } = useAuthContext();
  const [gCashInput, setGCashInput] = useState(initialGCash ?? '');
  const [mayaInput, setMayaInput] = useState(initialMaya ?? '');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    setGCashInput(initialGCash ?? '');
    setMayaInput(initialMaya ?? '');
  }, [initialGCash, initialMaya]);

  async function savePayment(): Promise<void> {
    if (!token) return;
    setSaving(true);
    setSaveError(null);
    try {
      await updatePaymentDetails(token, {
        gCashNumber: gCashInput.trim() || null,
        mayaNumber: mayaInput.trim() || null,
      });
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Failed to save payment details.');
      throw err;
    } finally {
      setSaving(false);
    }
  }

  return { gCashInput, setGCashInput, mayaInput, setMayaInput, saving, saveError, savePayment };
}
