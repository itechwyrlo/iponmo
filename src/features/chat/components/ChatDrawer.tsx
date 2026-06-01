import { useEffect, useRef } from 'react';
import { useAuthContext } from '../../../context/AuthContext';
import { useChat } from '../hooks/useChat';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';
import { TabContentSkeleton } from '../../../components/Skeleton';

interface ChatDrawerProps {
  groupId: string;
  receiverId: string;
  receiverName: string;
  onClose: () => void;
}

export function ChatDrawer({ groupId, receiverId, receiverName, onClose }: ChatDrawerProps) {
  const { user } = useAuthContext();
  const { messages, loading, sending, sendMessage } = useChat(groupId, receiverId);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div
      className="modal-overlay"
      style={{ alignItems: 'stretch' }}
    >
      <div
        className="modal-sheet"
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          padding: 0,
          borderRadius: 0,
        }}
      >
        <div
          style={{
            padding: '54px 20px 16px',
            background: 'linear-gradient(180deg, var(--bg2) 0%, transparent 100%)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            borderBottom: '1px solid var(--border)',
            flexShrink: 0,
          }}
        >
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text2)',
              cursor: 'pointer',
              fontSize: 20,
              padding: 4,
              lineHeight: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ✕
          </button>
          <p style={{ fontWeight: 700, fontSize: 16 }}>{receiverName}</p>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
          {loading ? (
            <TabContentSkeleton />
          ) : (
            <>
              {messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  isSender={msg.senderId === user?.userId}
                />
              ))}
              <div ref={bottomRef} />
            </>
          )}
        </div>

        <MessageInput onSend={sendMessage} sending={sending} />
      </div>
    </div>
  );
}
