import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { Spinner } from '../../../components/Spinner';

interface LoginFormProps {
  values: { email: string; password: string };
  errors: Record<string, string>;
  loading: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onRegisterClick: () => void;
}

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

export function LoginForm({ values, errors, loading, onChange, onSubmit, onRegisterClick }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 28px' }}>
      <div style={{ marginBottom: 40 }}>
        <div style={{
          width: 56, height: 56, borderRadius: 16,
          background: 'linear-gradient(135deg, var(--primary), var(--accent))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 24, fontSize: 26,
        }}>
          💰
        </div>
        <h1 style={{ fontSize: 30, fontWeight: 700 }}>
          Ipon<span style={{ color: 'var(--primary)' }}>Mo</span>
        </h1>
        <p style={{ color: 'var(--text2)', marginTop: 8, fontSize: 15 }}>
          Paluwagan made simple. Sign in to continue.
        </p>
      </div>

      <div className="input-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="you@email.com"
          value={values.email}
          onChange={onChange}
          onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
          style={errors.email ? { borderColor: 'var(--danger)' } : undefined}
        />
        {errors.email && (
          <p style={{ color: 'var(--danger)', fontSize: 12, marginTop: 5, fontWeight: 500 }}>{errors.email}</p>
        )}
      </div>

      <div className="input-group">
        <label>Password</label>
        <div style={{ position: 'relative' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="••••••••"
            value={values.password}
            onChange={onChange}
            onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
            style={{ paddingRight: 48, ...(errors.password ? { borderColor: 'var(--danger)' } : {}) }}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            style={{
              position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--text3)', display: 'flex', alignItems: 'center', padding: 0,
            }}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <EyeIcon open={showPassword} />
          </button>
        </div>
        {errors.password && (
          <p style={{ color: 'var(--danger)', fontSize: 12, marginTop: 5, fontWeight: 500 }}>{errors.password}</p>
        )}
      </div>

      <div style={{ marginTop: 8 }}>
        <button className="btn btn-primary" onClick={onSubmit} disabled={loading}>
          {loading && <Spinner />}
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </div>

      <p style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: 'var(--text3)' }}>
        No account yet?{' '}
        <span style={{ color: 'var(--primary)', fontWeight: 700, cursor: 'pointer' }} onClick={onRegisterClick}>
          Sign up
        </span>
      </p>
    </div>
  );
}
