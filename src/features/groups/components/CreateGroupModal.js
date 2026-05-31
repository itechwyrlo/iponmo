import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../../../context/AuthContext';
import { createGroup } from '../services/groupService';
import { Spinner } from '../../../components/Spinner';
import { validateCreateGroupForm } from '../utils/groupValidation';
const scheduleOptions = [
    { value: 'Weekly', label: 'Weekly' },
    { value: 'Bi-weekly', label: 'Bi-weekly' },
    { value: 'Monthly', label: 'Monthly' },
];
export function CreateGroupModal({ onClose, onCreated }) {
    const { token } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({
        name: '',
        contributionAmount: '',
        schedule: 'Monthly',
        numberOfSlots: '',
        startDate: '',
    });
    function setField(key, value) {
        setForm((prev) => ({ ...prev, [key]: value }));
        setErrors((prev) => {
            if (!(key in prev))
                return prev;
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
        if (!token)
            return;
        const payload = {
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
        }
        catch (err) {
            toast.error(err instanceof Error ? err.message : 'Failed to create group.');
        }
        finally {
            setLoading(false);
        }
    }
    return (_jsx("div", { className: "modal-overlay", onClick: onClose, children: _jsxs("div", { className: "modal-sheet", onClick: (e) => e.stopPropagation(), children: [_jsx("div", { className: "modal-handle" }), _jsx("h2", { style: { fontSize: 20, marginBottom: 20 }, children: "Create Group" }), _jsxs("div", { className: "input-group", children: [_jsx("label", { children: "Group Name" }), _jsx("input", { type: "text", placeholder: "Opisina Paluwagan", value: form.name, onChange: (e) => setField('name', e.target.value), style: errors.name ? { borderColor: 'var(--danger)' } : undefined }), errors.name && (_jsx("p", { style: { color: 'var(--danger)', fontSize: 12, marginTop: 5, fontWeight: 500 }, children: errors.name }))] }), _jsxs("div", { className: "input-group", children: [_jsx("label", { children: "Schedule" }), _jsx("select", { value: form.schedule, onChange: (e) => setField('schedule', e.target.value), style: errors.schedule ? { borderColor: 'var(--danger)' } : undefined, children: scheduleOptions.map((opt) => (_jsx("option", { value: opt.value, children: opt.label }, opt.value))) }), errors.schedule && (_jsx("p", { style: { color: 'var(--danger)', fontSize: 12, marginTop: 5, fontWeight: 500 }, children: errors.schedule }))] }), _jsxs("div", { className: "input-group", children: [_jsx("label", { children: "Contribution Amount (\u20B1)" }), _jsx("input", { type: "number", placeholder: "1000", value: form.contributionAmount, onChange: (e) => setField('contributionAmount', e.target.value), style: errors.contributionAmount ? { borderColor: 'var(--danger)' } : undefined }), errors.contributionAmount && (_jsx("p", { style: { color: 'var(--danger)', fontSize: 12, marginTop: 5, fontWeight: 500 }, children: errors.contributionAmount }))] }), _jsxs("div", { className: "input-group", children: [_jsx("label", { children: "Number of Slots" }), _jsx("input", { type: "number", placeholder: "5", value: form.numberOfSlots, onChange: (e) => setField('numberOfSlots', e.target.value), style: errors.numberOfSlots ? { borderColor: 'var(--danger)' } : undefined }), errors.numberOfSlots && (_jsx("p", { style: { color: 'var(--danger)', fontSize: 12, marginTop: 5, fontWeight: 500 }, children: errors.numberOfSlots }))] }), _jsxs("div", { className: "input-group", children: [_jsx("label", { children: "Start Date" }), _jsx("input", { type: "date", value: form.startDate, onChange: (e) => setField('startDate', e.target.value), style: errors.startDate ? { borderColor: 'var(--danger)' } : undefined }), errors.startDate && (_jsx("p", { style: { color: 'var(--danger)', fontSize: 12, marginTop: 5, fontWeight: 500 }, children: errors.startDate }))] }), _jsxs("div", { style: { display: 'flex', gap: 10, marginTop: 4 }, children: [_jsx("button", { className: "btn btn-outline", onClick: onClose, disabled: loading, children: "Cancel" }), _jsxs("button", { className: "btn btn-primary", onClick: handleSubmit, disabled: loading, children: [loading && _jsx(Spinner, {}), loading ? 'Creating...' : 'Create Group'] })] })] }) }));
}
