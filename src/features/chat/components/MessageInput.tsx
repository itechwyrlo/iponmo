import { useRef, useState } from 'react';
import { useImageUpload } from '../hooks/useImageUpload';

interface MessageInputProps {
  onSend: (text: string | null, imageUrl: string | null) => void;
  sending: boolean;
}

export function MessageInput({ onSend, sending }: MessageInputProps) {
  const { uploading, uploadImage } = useImageUpload();
  const [text, setText] = useState('');
  const [pendingImageUrl, setPendingImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const disabled = sending || uploading;

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !disabled) {
      handleSend();
    }
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await uploadImage(file);
    if (url) setPendingImageUrl(url);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  function handleSend() {
    const trimmed = text.trim() || null;
    if (!trimmed && !pendingImageUrl) return;
    onSend(trimmed, pendingImageUrl);
    setText('');
    setPendingImageUrl(null);
  }

  return (
    <div style={{ borderTop: '1px solid var(--border)', padding: '12px 16px 28px', background: 'var(--card)' }}>
      {pendingImageUrl && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <img
            src={pendingImageUrl}
            alt="preview"
            style={{ maxWidth: 72, borderRadius: 8, border: '1px solid var(--border)' }}
          />
          <button
            onClick={() => setPendingImageUrl(null)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text2)',
              cursor: 'pointer',
              fontSize: 16,
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>
      )}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          disabled={disabled}
          style={{
            flex: 1,
            background: 'var(--card2)',
            border: '1px solid var(--border)',
            borderRadius: 20,
            padding: '10px 16px',
            color: 'var(--text)',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: 14,
            outline: 'none',
          }}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
          style={{
            background: 'none',
            border: '1px solid var(--border)',
            borderRadius: '50%',
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: disabled ? 'not-allowed' : 'pointer',
            color: uploading ? 'var(--primary)' : 'var(--text2)',
            flexShrink: 0,
            fontSize: 18,
          }}
        >
          {uploading ? '…' : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          )}
        </button>
        <button
          onClick={handleSend}
          disabled={disabled || (!text.trim() && !pendingImageUrl)}
          className="btn btn-primary"
          style={{ width: 'auto', padding: '10px 18px', flexShrink: 0, fontSize: 14 }}
        >
          Send
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
