import { useAuthContext } from '../context/AuthContext';

export function HomePage() {
  const { user, clearAuth } = useAuthContext();

  return (
    <div style={{ padding: 28 }}>
      <h1>Welcome, {user?.email}</h1>
      <button className="btn btn-outline" style={{ marginTop: 20 }} onClick={() => clearAuth()}>
        Sign Out
      </button>
    </div>
  );
}
