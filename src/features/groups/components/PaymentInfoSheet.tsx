import { useState } from 'react';
import toast from 'react-hot-toast';
import { EmptyState } from '../../../components/EmptyState';
import { Spinner } from '../../../components/Spinner';

interface PaymentInfoSheetProps {
  organizerQrCodeUrl: string | null;
  contributionAmount: number;
  onClose: () => void;
}

export function PaymentInfoSheet({
  organizerQrCodeUrl,
  contributionAmount,
  onClose,
}: PaymentInfoSheetProps) {
  const [downloading, setDownloading] = useState(false);

  async function handleDownload() {
    if (!organizerQrCodeUrl) return;
    setDownloading(true);
    try {
      const response = await fetch(organizerQrCodeUrl);
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = objectUrl;
      a.download = 'payment-qr-code.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(objectUrl);
    } catch {
      toast.error('Failed to download QR code.');
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-handle" />
        <h2 style={{ fontSize: 18, marginBottom: 6 }}>Scan to Pay</h2>
        <p style={{ fontSize: 14, color: 'var(--text2)', marginBottom: 20 }}>
          Send ₱{contributionAmount.toLocaleString()} to the organizer then wait for confirmation.
        </p>

        {organizerQrCodeUrl ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <img
              src={organizerQrCodeUrl}
              alt="Payment QR Code"
              style={{
                width: '100%',
                maxWidth: 240,
                borderRadius: 12,
                border: '1px solid var(--border)',
              }}
            />
            <button
              className="btn btn-outline"
              style={{ padding: '8px 20px', fontSize: 13 }}
              onClick={handleDownload}
              disabled={downloading}
            >
              {downloading && <Spinner />}
              Download QR Code
            </button>
          </div>
        ) : (
          <EmptyState message="The organizer hasn't uploaded a payment QR code yet." />
        )}

        <div style={{ marginTop: 24 }}>
          <button className="btn btn-outline" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
