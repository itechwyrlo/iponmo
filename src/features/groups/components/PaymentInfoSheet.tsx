import toast from 'react-hot-toast';
import type { AuthUser } from '../../auth/types/auth.types';

interface PaymentInfoSheetProps {
  user: AuthUser;
  contributionAmount: number;
  onClose: () => void;
}

export function PaymentInfoSheet({ user, contributionAmount, onClose }: PaymentInfoSheetProps) {
  function copyToClipboard(value: string, label: string) {
    navigator.clipboard.writeText(value);
    toast.success(`${label} number copied.`);
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-handle" />
        <h2 style={{ fontSize: 18, marginBottom: 6 }}>Send Payment To</h2>
        <p style={{ fontSize: 14, color: 'var(--text2)', marginBottom: 20 }}>
          Send ₱{contributionAmount.toLocaleString()} to the organizer then wait for confirmation.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div className="payment-method">
            <div className="payment-icon gcash-icon">GC</div>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 700, fontSize: 14 }}>GCash</p>
              <p style={{ fontSize: 13, color: 'var(--text2)' }}>{user.userId}</p>
            </div>
            <button
              className="btn btn-outline"
              style={{ width: 'auto', padding: '8px 12px', fontSize: 13 }}
              onClick={() => copyToClipboard(user.userId, 'GCash')}
            >
              Copy
            </button>
          </div>

          <div className="payment-method">
            <div className="payment-icon maya-icon">MY</div>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 700, fontSize: 14 }}>Maya</p>
              <p style={{ fontSize: 13, color: 'var(--text2)' }}>{user.userId}</p>
            </div>
            <button
              className="btn btn-outline"
              style={{ width: 'auto', padding: '8px 12px', fontSize: 13 }}
              onClick={() => copyToClipboard(user.userId, 'Maya')}
            >
              Copy
            </button>
          </div>
        </div>

        <div style={{ marginTop: 20 }}>
          <button className="btn btn-outline" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
