import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { Spinner } from '../../../components/Spinner';
import { checkPasswordComplexity } from '../utils/authValidation';

interface RegisterFormProps {
  values: { fullName: string; email: string; password: string; confirmPassword: string; role: string };
  errors: Record<string, string>;
  loading: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: () => void;
  onLoginClick: () => void;
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

function ComplexityRule({ met, label }: { met: boolean; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: met ? 'var(--success)' : 'var(--danger)' }}>
      <span style={{ fontWeight: 700 }}>{met ? '✓' : '✗'}</span>
      <span>{label}</span>
    </div>
  );
}

export function RegisterForm({ values, errors, loading, onChange, onSubmit, onLoginClick }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const complexity = checkPasswordComplexity(values.password);
  const hasMinLength = values.password.length >= 8;

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
        <h1 style={{ fontSize: 30, fontWeight: 700 }}>Create Account</h1>
        <p style={{ color: 'var(--text2)', marginTop: 8, fontSize: 15 }}>
          Join IponMo and start saving together.
        </p>
      </div>

      <div className="input-group">
        <label>Full Name</label>
        <input
          type="text"
          name="fullName"
          placeholder="Juan dela Cruz"
          value={values.fullName}
          onChange={onChange}
          style={errors.fullName ? { borderColor: 'var(--danger)' } : undefined}
        />
        {errors.fullName && (
          <p style={{ color: 'var(--danger)', fontSize: 12, marginTop: 5, fontWeight: 500 }}>{errors.fullName}</p>
        )}
      </div>

      <div className="input-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="you@email.com"
          value={values.email}
          onChange={onChange}
          style={errors.email ? { borderColor: 'var(--danger)' } : undefined}
        />
        {errors.email && (
          <p style={{ color: 'var(--danger)', fontSize: 12, marginTop: 5, fontWeight: 500 }}>{errors.email}</p>
        )}
      </div>

      <div className="input-group">
        <label>Role</label>
        <select
          name="role"
          value={values.role}
          onChange={onChange}
          style={errors.role ? { borderColor: 'var(--danger)' } : undefined}
        >
          <option value="">Select a role</option>
          <option value="Organizer">Organizer</option>
          <option value="Member">Member</option>
        </select>
        {errors.role && (
          <p style={{ color: 'var(--danger)', fontSize: 12, marginTop: 5, fontWeight: 500 }}>{errors.role}</p>
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
        {values.password.length > 0 && (
          <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <ComplexityRule met={hasMinLength} label="At least 8 characters" />
            <ComplexityRule met={complexity.uppercase} label="One uppercase letter (A–Z)" />
            <ComplexityRule met={complexity.lowercase} label="One lowercase letter (a–z)" />
            <ComplexityRule met={complexity.digit} label="One digit (0–9)" />
            <ComplexityRule met={complexity.special} label="One special character (!, @, #, $...)" />
          </div>
        )}
        {errors.password && (
          <p style={{ color: 'var(--danger)', fontSize: 12, marginTop: 5, fontWeight: 500 }}>{errors.password}</p>
        )}
      </div>

      <div className="input-group">
        <label>Confirm Password</label>
        <div style={{ position: 'relative' }}>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="••••••••"
            value={values.confirmPassword}
            onChange={onChange}
            style={{ paddingRight: 48, ...(errors.confirmPassword ? { borderColor: 'var(--danger)' } : {}) }}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((v) => !v)}
            style={{
              position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--text3)', display: 'flex', alignItems: 'center', padding: 0,
            }}
            aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
          >
            <EyeIcon open={showConfirmPassword} />
          </button>
        </div>
        {errors.confirmPassword && (
          <p style={{ color: 'var(--danger)', fontSize: 12, marginTop: 5, fontWeight: 500 }}>{errors.confirmPassword}</p>
        )}
      </div>

      <div style={{ marginTop: 8 }}>
        <button className="btn btn-primary" onClick={onSubmit} disabled={loading}>
          {loading && <Spinner />}
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
      </div>

      <p style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: 'var(--text3)' }}>
        Already have an account?{' '}
        <span style={{ color: 'var(--primary)', fontWeight: 700, cursor: 'pointer' }} onClick={onLoginClick}>
          Sign in
        </span>
      </p>
    </div>
  );
}
