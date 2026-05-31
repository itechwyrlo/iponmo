import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Spinner } from '../../../components/Spinner';
import { validateAddMemberForm } from '../utils/groupValidation';
export function AddMemberModal({ numberOfSlots, onClose, onAddMember }) {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [accountId, setAccountId] = useState('');
    const [slotNumber, setSlotNumber] = useState('');
    function handleAccountIdChange(value) {
        setAccountId(value);
        setErrors((prev) => {
            if (!('accountId' in prev))
                return prev;
            const next = { ...prev };
            delete next.accountId;
            return next;
        });
    }
    function handleSlotNumberChange(value) {
        setSlotNumber(value);
        setErrors((prev) => {
            if (!('slotNumber' in prev))
                return prev;
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
        }
        catch (err) {
            toast.error(err instanceof Error ? err.message : 'Failed to add member.');
        }
        finally {
            setLoading(false);
        }
    }
    return (_jsx("div", { className: "modal-overlay", onClick: onClose, children: _jsxs("div", { className: "modal-sheet", onClick: (e) => e.stopPropagation(), children: [_jsx("div", { className: "modal-handle" }), _jsx("h2", { style: { fontSize: 20, marginBottom: 20 }, children: "Add Member" }), _jsxs("div", { className: "input-group", children: [_jsx("label", { children: "Account ID" }), _jsx("input", { type: "text", placeholder: "PAL-1A2B3C4D", value: accountId, onChange: (e) => handleAccountIdChange(e.target.value), style: errors.accountId ? { borderColor: 'var(--danger)' } : undefined }), errors.accountId && (_jsx("p", { style: { color: 'var(--danger)', fontSize: 12, marginTop: 5, fontWeight: 500 }, children: errors.accountId }))] }), _jsxs("div", { className: "input-group", children: [_jsxs("label", { children: ["Slot Number (1\u2013", numberOfSlots, ")"] }), _jsx("input", { type: "number", placeholder: "1", min: 1, max: numberOfSlots, value: slotNumber, onChange: (e) => handleSlotNumberChange(e.target.value), style: errors.slotNumber ? { borderColor: 'var(--danger)' } : undefined }), errors.slotNumber && (_jsx("p", { style: { color: 'var(--danger)', fontSize: 12, marginTop: 5, fontWeight: 500 }, children: errors.slotNumber }))] }), _jsxs("div", { style: { display: 'flex', gap: 10, marginTop: 4 }, children: [_jsx("button", { className: "btn btn-outline", onClick: onClose, disabled: loading, children: "Cancel" }), _jsxs("button", { className: "btn btn-primary", onClick: handleSubmit, disabled: loading, children: [loading && _jsx(Spinner, {}), loading ? 'Adding...' : 'Add Member'] })] })] }) }));
}
