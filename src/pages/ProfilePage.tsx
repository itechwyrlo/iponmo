import { useRef } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useProfile } from '../features/profile/hooks/useProfile';
import { useUploadQrCode } from '../features/profile/hooks/useUploadQrCode';
import { useNotificationBell } from '../features/notifications/hooks/useNotificationBell';
import { NotificationBell } from '../features/notifications/components/NotificationBell';
import { NotificationDropdown } from '../features/notifications/components/NotificationDropdown';
import { Skeleton } from '../components/Skeleton';
import { Spinner } from '../components/Spinner';
import type { AppNotification } from '../features/notifications/types/notification.types';

export function ProfilePage() {
  const { clearAuth } = useAuthContext();
  const navigate = useNavigate();
  const { profile, loading, error, refetch } = useProfile();
  const { uploading, uploadError, uploadQrCode } = useUploadQrCode();
  const qrInputRef = useRef<HTMLInputElement>(null);
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    showNotifications,
    toggleNotifications,
    closeNotifications,
    containerRef,
  } = useNotificationBell();

  async function handleSignOut() {
    await clearAuth();
    toast.success('Signed out.');
    navigate('/login');
  }

  async function handleQrUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = '';
    try {
      await uploadQrCode(file);
      toast.success('QR code uploaded.');
      refetch();
    } catch {
      // uploadError displayed inline
    }
  }

  function handleCopyId() {
    if (!profile) return;
    navigator.clipboard.writeText(profile.accountId).then(() => {
      toast.success('Account ID copied.');
    });
  }

  function handleNotificationClick(notification: AppNotification) {
    markAsRead(notification.id);
    navigate(`/groups/${notification.groupId}`);
    closeNotifications();
  }

  return (
    <div className="screen">
      <div className="page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1>Profile</h1>
            <p>Manage your account details.</p>
          </div>
          <div ref={containerRef} style={{ position: 'relative' }}>
            <NotificationBell unreadCount={unreadCount} onClick={toggleNotifications} />
            {showNotifications && (
              <NotificationDropdown
                notifications={notifications}
                onNotificationClick={handleNotificationClick}
                onMarkAllRead={markAllAsRead}
                onClose={closeNotifications}
              />
            )}
          </div>
        </div>
      </div>

      <div className="scroll-container">
        <div className="card" style={{ textAlign: 'center', padding: '28px 20px' }}>
          <div className="avatar" style={{ width: 72, height: 72, fontSize: 28, margin: '0 auto 14px' }}>
            {loading ? '?' : (profile?.fullName.charAt(0).toUpperCase() ?? '?')}
          </div>
          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <Skeleton height="22px" width="160px" />
              <Skeleton height="14px" width="80px" />
            </div>
          ) : (
            <>
              <h2 style={{ fontSize: 20 }}>{profile?.fullName}</h2>
              <p style={{ color: 'var(--text2)', fontSize: 14, marginTop: 4, textTransform: 'capitalize' }}>
                {profile?.role}
              </p>
            </>
          )}
        </div>

        {error && (
          <p style={{ color: 'var(--danger)', fontSize: 14, textAlign: 'center' }}>{error}</p>
        )}

        <div className="card">
          <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>
            Account Info
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <p style={{ fontSize: 11, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Full Name</p>
              {loading ? <div style={{ marginTop: 4 }}><Skeleton height="18px" width="55%" /></div> : (
                <p style={{ fontSize: 15, fontWeight: 600, marginTop: 2 }}>{profile?.fullName}</p>
              )}
            </div>
            <div style={{ height: 1, background: 'var(--border)' }} />
            <div>
              <p style={{ fontSize: 11, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Email</p>
              {loading ? <div style={{ marginTop: 4 }}><Skeleton height="18px" width="70%" /></div> : (
                <p style={{ fontSize: 15, fontWeight: 600, marginTop: 2 }}>{profile?.email}</p>
              )}
            </div>
            <div style={{ height: 1, background: 'var(--border)' }} />
            <div>
              <p style={{ fontSize: 11, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Role</p>
              {loading ? <div style={{ marginTop: 4 }}><Skeleton height="18px" width="40%" /></div> : (
                <p style={{ fontSize: 15, fontWeight: 600, marginTop: 2, textTransform: 'capitalize' }}>{profile?.role}</p>
              )}
            </div>
          </div>
        </div>

        <div className="card">
          <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
            Member ID
          </p>
          <p style={{ fontSize: 12, color: 'var(--text2)', marginBottom: 10 }}>
            Share this ID with a group organizer to be added as a member.
          </p>
          {loading ? (
            <Skeleton height="40px" />
          ) : (
            <button
              className="btn btn-secondary"
              onClick={handleCopyId}
              style={{ width: '100%', fontFamily: 'monospace', fontSize: 13, letterSpacing: '0.04em', wordBreak: 'break-all' }}
            >
              {profile?.accountId} — Copy
            </button>
          )}
        </div>

        <div className="card">
          <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
            Payment QR Code
          </p>
          <p style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 16 }}>
            Members will scan your QR code to send payments.
          </p>
          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Skeleton height="200px" />
              <Skeleton height="46px" />
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {profile?.qrCodeUrl && (
                <img
                  src={profile.qrCodeUrl}
                  alt="Payment QR Code"
                  style={{
                    width: '100%',
                    maxWidth: 220,
                    margin: '0 auto',
                    display: 'block',
                    borderRadius: 12,
                    border: '1px solid var(--border)',
                  }}
                />
              )}
              {uploadError && (
                <p style={{ color: 'var(--danger)', fontSize: 13 }}>{uploadError}</p>
              )}
              <input
                ref={qrInputRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleQrUpload}
              />
              <button
                className="btn btn-primary"
                onClick={() => qrInputRef.current?.click()}
                disabled={uploading}
              >
                {uploading && <Spinner />}
                {profile?.qrCodeUrl ? 'Replace QR Code' : 'Upload QR Code'}
              </button>
            </div>
          )}
        </div>

        <button className="btn btn-danger" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
}
