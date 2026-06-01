import { useState } from 'react';
import toast from 'react-hot-toast';
import { QrCodeDisplay } from './QrCodeDisplay';
import { EmptyState } from '../../../components/EmptyState';

interface PaymentInfoSheetProps {
  organizerGCash: string | null;
  organizerMaya: string | null;
  contributionAmount: number;
  onClose: () => void;
}

type QrTab = 'static' | 'dynamic';

export function PaymentInfoSheet({
  organizerGCash,
  organizerMaya,
  contributionAmount,
  onClose,
}: PaymentInfoSheetProps) {
  const [qrTab, setQrTab] = useState<QrTab>('static');

  function copyToClipboard(value: string, label: string) {
    navigator.clipboard.writeText(value);
    toast.success(`${label} number copied.`);
  }

  function buildDynamicPayload(number: string): string {
    return `amount=${contributionAmount.toFixed(2)}|recipient=${number}`;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-handle" />
        <h2 style={{ fontSize: 18, marginBottom: 6 }}>Send Payment To</h2>
        <p style={{ fontSize: 14, color: 'var(--text2)', marginBottom: 20 }}>
          Send ₱{contributionAmount.toLocaleString()} to the organizer then wait for confirmation.
        </p>

        <div className="tab-group" style={{ marginBottom: 20 }}>
          {(['static', 'dynamic'] as const).map((tab) => (
            <button
              key={tab}
              className={`tab-pill ${qrTab === tab ? 'active' : ''}`}
              onClick={() => setQrTab(tab)}
            >
              {tab === 'static' ? 'Static QR' : 'Dynamic QR'}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div className="payment-icon gcash-icon" style={{ width: 28, height: 28, fontSize: 10 }}>GC</div>
              <p style={{ fontWeight: 700, fontSize: 14 }}>GCash</p>
            </div>
            {organizerGCash ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                <QrCodeDisplay
                  value={qrTab === 'static' ? organizerGCash : buildDynamicPayload(organizerGCash)}
                  label={organizerGCash}
                />
                <button
                  className="btn btn-outline"
                  style={{ padding: '8px 16px', fontSize: 13 }}
                  onClick={() => copyToClipboard(organizerGCash, 'GCash')}
                >
                  Copy Number
                </button>
              </div>
            ) : (
              <EmptyState message="No GCash number on file." />
            )}
          </div>

          <div className="divider" />

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div className="payment-icon maya-icon" style={{ width: 28, height: 28, fontSize: 10 }}>MY</div>
              <p style={{ fontWeight: 700, fontSize: 14 }}>Maya</p>
            </div>
            {organizerMaya ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                <QrCodeDisplay
                  value={qrTab === 'static' ? organizerMaya : buildDynamicPayload(organizerMaya)}
                  label={organizerMaya}
                />
                <button
                  className="btn btn-outline"
                  style={{ padding: '8px 16px', fontSize: 13 }}
                  onClick={() => copyToClipboard(organizerMaya, 'Maya')}
                >
                  Copy Number
                </button>
              </div>
            ) : (
              <EmptyState message="No Maya number on file." />
            )}
          </div>
        </div>

        <div style={{ marginTop: 24 }}>
          <button className="btn btn-outline" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
