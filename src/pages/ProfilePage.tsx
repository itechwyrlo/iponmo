import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useProfile } from '../features/profile/hooks/useProfile';
import { Skeleton } from '../components/Skeleton';

export function ProfilePage() {
  const { clearAuth } = useAuthContext();
  const navigate = useNavigate();
  const { profile, loading, error } = useProfile();

  async function handleSignOut() {
    await clearAuth();
    toast.success('Signed out.');
    navigate('/login');
  }

  function handleCopyId() {
    if (!profile) return;
    navigator.clipboard.writeText(profile.accountId).then(() => {
      toast.success('Account ID copied.');
    });
  }

  return (
    <div className="screen">
      <div className="page-header">
        <h1>Profile</h1>
        <p>Manage your account details.</p>
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
          <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>
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
          <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>
            Payment Accounts
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <p style={{ fontSize: 11, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>GCash</p>
              {loading ? <div style={{ marginTop: 4 }}><Skeleton height="18px" width="50%" /></div> : (
                <p style={{ fontSize: 15, fontWeight: 600, marginTop: 2 }}>
                  {profile?.gCashNumber ?? <span style={{ color: 'var(--text3)', fontWeight: 400 }}>Not set</span>}
                </p>
              )}
            </div>
            <div style={{ height: 1, background: 'var(--border)' }} />
            <div>
              <p style={{ fontSize: 11, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Maya</p>
              {loading ? <div style={{ marginTop: 4 }}><Skeleton height="18px" width="50%" /></div> : (
                <p style={{ fontSize: 15, fontWeight: 600, marginTop: 2 }}>
                  {profile?.mayaNumber ?? <span style={{ color: 'var(--text3)', fontWeight: 400 }}>Not set</span>}
                </p>
              )}
            </div>
          </div>
        </div>

        <button className="btn btn-danger" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
}
