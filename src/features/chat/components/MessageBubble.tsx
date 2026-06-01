import type { Message } from '../types/chat.types';

interface MessageBubbleProps {
  message: Message;
  isSender: boolean;
}

export function MessageBubble({ message, isSender }: MessageBubbleProps) {
  const time = new Date(message.sentAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isSender ? 'flex-end' : 'flex-start',
        marginBottom: 10,
      }}
    >
      {!isSender && (
        <p style={{ fontSize: 11, color: 'var(--text2)', marginBottom: 3, fontWeight: 600 }}>
          {message.senderName}
        </p>
      )}
      <div
        style={{
          maxWidth: '75%',
          background: isSender ? 'var(--primary)' : 'var(--card2)',
          color: isSender ? '#0f0e17' : 'var(--text)',
          padding: '10px 14px',
          borderRadius: isSender ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
        }}
      >
        {message.imageUrl && (
          <img
            src={message.imageUrl}
            alt="attachment"
            style={{
              maxWidth: 200,
              borderRadius: 8,
              display: 'block',
              marginBottom: message.text ? 6 : 0,
            }}
          />
        )}
        {message.text && (
          <p style={{ fontSize: 14, lineHeight: 1.4 }}>{message.text}</p>
        )}
      </div>
      <p style={{ fontSize: 10, color: 'var(--text3)', marginTop: 3 }}>{time}</p>
    </div>
  );
}
