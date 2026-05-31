import { useState } from 'react';
import toast from 'react-hot-toast';
import { Spinner } from '../../../components/Spinner';
import { validateAddMemberForm } from '../utils/groupValidation';

interface AddMemberModalProps {
  numberOfSlots: number;
  onClose: () => void;
  onAddMember: (accountId: string, slotNumber: number) => Promise<void>;
}

export function AddMemberModal({ numberOfSlots, onClose, onAddMember }: AddMemberModalProps) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [accountId, setAccountId] = useState('');
  const [slotNumber, setSlotNumber] = useState('');

  function handleAccountIdChange(value: string) {
    setAccountId(value);
    setErrors((prev) => {
      if (!('accountId' in prev)) return prev;
      const next = { ...prev };
      delete next.accountId;
      return next;
    });
  }

  function handleSlotNumberChange(value: string) {
    setSlotNumber(value);
    setErrors((prev) => {
      if (!('slotNumber' in prev)) return prev;
      const next = { ...prev };
      delete next.slotNumber;
      return next;
    });
  }

  async function handleSubmit() {
    const validationErrors = validateAddMemberForm({ accountId, slotNumber }, numberOfSlots);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await onAddMember(accountId.trim(), parseInt(slotNumber, 10));
      toast.success('Member added.');
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to add member.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-handle" />
        <h2 style={{ fontSize: 20, marginBottom: 20 }}>Add Member</h2>

        <div className="input-group">
          <label>Account ID</label>
          <input
            type="text"
            placeholder="PAL-1A2B3C4D"
            value={accountId}
            onChange={(e) => handleAccountIdChange(e.target.value)}
            style={errors.accountId ? { borderColor: 'var(--danger)' } : undefined}
          />
          {errors.accountId && (
            <p style={{ color: 'var(--danger)', fontSize: 12, marginTop: 5, fontWeight: 500 }}>{errors.accountId}</p>
          )}
        </div>

        <div className="input-group">
          <label>Slot Number (1–{numberOfSlots})</label>
          <input
            type="number"
            placeholder="1"
            min={1}
            max={numberOfSlots}
            value={slotNumber}
            onChange={(e) => handleSlotNumberChange(e.target.value)}
            style={errors.slotNumber ? { borderColor: 'var(--danger)' } : undefined}
          />
          {errors.slotNumber && (
            <p style={{ color: 'var(--danger)', fontSize: 12, marginTop: 5, fontWeight: 500 }}>{errors.slotNumber}</p>
          )}
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
          <button className="btn btn-outline" onClick={onClose} disabled={loading}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
            {loading && <Spinner />}
            {loading ? 'Adding...' : 'Add Member'}
          </button>
        </div>
      </div>
    </div>
  );
}
