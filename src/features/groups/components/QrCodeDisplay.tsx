import { QRCodeSVG } from 'qrcode.react';

interface QrCodeDisplayProps {
  value: string;
  label: string;
  size?: number;
}

export function QrCodeDisplay({ value, label, size = 160 }: QrCodeDisplayProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{ background: 'white', padding: 12, borderRadius: 12 }}>
        <QRCodeSVG value={value} size={size} />
      </div>
      <p style={{ fontSize: 12, color: 'var(--text2)', textAlign: 'center' }}>{label}</p>
    </div>
  );
}
