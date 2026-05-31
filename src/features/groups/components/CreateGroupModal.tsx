import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../../../context/AuthContext';
import { createGroup } from '../services/groupService';
import type { CreateGroupRequest, PaymentSchedule } from '../types/group.types';
import { Spinner } from '../../../components/Spinner';
import { validateCreateGroupForm } from '../utils/groupValidation';

interface CreateGroupModalProps {
  onClose: () => void;
  onCreated: () => void;
}

const scheduleOptions: { value: PaymentSchedule; label: string }[] = [
  { value: 'Weekly', label: 'Weekly' },
  { value: 'Bi-weekly', label: 'Bi-weekly' },
  { value: 'Monthly', label: 'Monthly' },
];

export function CreateGroupModal({ onClose, onCreated }: CreateGroupModalProps) {
  const { token } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    name: '',
    contributionAmount: '',
    schedule: 'Monthly' as PaymentSchedule,
    numberOfSlots: '',
    startDate: '',
  });

  function setField<K extends keyof typeof form>(key: K, value: typeof form[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!(key in prev)) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  async function handleSubmit() {
    const validationErrors = validateCreateGroupForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    if (!token) return;

    const payload: CreateGroupRequest = {
      name: form.name,
      contributionAmount: parseFloat(form.contributionAmount),
      schedule: form.schedule,
      numberOfSlots: parseInt(form.numberOfSlots, 10),
      startDate: form.startDate,
    };

    setLoading(true);
    try {
      await createGroup(token, payload);
      toast.success('Group created.');
      onCreated();
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to create group.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-handle" />
        <h2 style={{ fontSize: 20, marginBottom: 20 }}>Create Group</h2>

        <div className="input-group">
          <label>Group Name</label>
          <input
            type="text"
            placeholder="Opisina Paluwagan"
            value={form.name}
            onChange={(e) => setField('name', e.target.value)}
            style={errors.name ? { borderColor: 'var(--danger)' } : undefined}
          />
          {errors.name && (
            <p style={{ color: 'var(--danger)', fontSize: 12, marginTop: 5, fontWeight: 500 }}>{errors.name}</p>
          )}
        </div>

        <div className="input-group">
          <label>Schedule</label>
          <select
            value={form.schedule}
            onChange={(e) => setField('schedule', e.target.value as PaymentSchedule)}
            style={errors.schedule ? { borderColor: 'var(--danger)' } : undefined}
          >
            {scheduleOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          {errors.schedule && (
            <p style={{ color: 'var(--danger)', fontSize: 12, marginTop: 5, fontWeight: 500 }}>{errors.schedule}</p>
          )}
        </div>

        <div className="input-group">
          <label>Contribution Amount (₱)</label>
          <input
            type="number"
            placeholder="1000"
            value={form.contributionAmount}
            onChange={(e) => setField('contributionAmount', e.target.value)}
            style={errors.contributionAmount ? { borderColor: 'var(--danger)' } : undefined}
          />
          {errors.contributionAmount && (
            <p style={{ color: 'var(--danger)', fontSize: 12, marginTop: 5, fontWeight: 500 }}>{errors.contributionAmount}</p>
          )}
        </div>

        <div className="input-group">
          <label>Number of Slots</label>
          <input
            type="number"
            placeholder="5"
            value={form.numberOfSlots}
            onChange={(e) => setField('numberOfSlots', e.target.value)}
            style={errors.numberOfSlots ? { borderColor: 'var(--danger)' } : undefined}
          />
          {errors.numberOfSlots && (
            <p style={{ color: 'var(--danger)', fontSize: 12, marginTop: 5, fontWeight: 500 }}>{errors.numberOfSlots}</p>
          )}
        </div>

        <div className="input-group">
          <label>Start Date</label>
          <input
            type="date"
            value={form.startDate}
            onChange={(e) => setField('startDate', e.target.value)}
            style={errors.startDate ? { borderColor: 'var(--danger)' } : undefined}
          />
          {errors.startDate && (
            <p style={{ color: 'var(--danger)', fontSize: 12, marginTop: 5, fontWeight: 500 }}>{errors.startDate}</p>
          )}
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
          <button className="btn btn-outline" onClick={onClose} disabled={loading}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
            {loading && <Spinner />}
            {loading ? 'Creating...' : 'Create Group'}
          </button>
        </div>
      </div>
    </div>
  );
}
