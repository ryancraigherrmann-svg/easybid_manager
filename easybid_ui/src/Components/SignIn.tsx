import React, { useState } from 'react';
import { useAuth } from './AuthProvider';
import SignUp from './SignUp';

export default function SignIn() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showSignup, setShowSignup] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err?.message || 'Login failed');
    }
  };

  return (
    <>
      <div style={{ width: 420, padding: 28, borderRadius: 10, boxShadow: '0 8px 32px rgba(0,0,0,0.18)', background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
        <h2 style={{ textAlign: 'center', marginBottom: 12, color: '#1E3A50', fontWeight: 700 }}>Sign In</h2>
        <form onSubmit={submit}>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, color: '#2C5272', fontSize: '0.9rem' }}>Email</label>
            <input style={{ width: '100%', padding: '8px 10px', background: '#F4F7FA', border: '1px solid #CBD5E1', borderRadius: 6, color: '#1E3A50' }} value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, color: '#2C5272', fontSize: '0.9rem' }}>Password</label>
            <input type="password" style={{ width: '100%', padding: '8px 10px', background: '#F4F7FA', border: '1px solid #CBD5E1', borderRadius: 6, color: '#1E3A50' }} value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error && <div style={{ color: '#DC2626', marginBottom: 8 }}>{error}</div>}
          <button type="submit" style={{
            width: '100%',
            padding: '10px 12px',
            background: '#2C5272',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            fontWeight: 700,
            fontSize: '0.95rem'
          }}>Sign In</button>
        </form>
        <div style={{ marginTop: 12, textAlign: 'center' }}>
          <small>Don't have an account? <button onClick={() => setShowSignup(true)} style={{ background: 'none', border: 'none', color: '#3B6E8F', cursor: 'pointer', padding: 0, fontWeight: 600 }}>Create One</button></small>
        </div>
      </div>

      {showSignup && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1200 }}>
          <div style={{ position: 'relative' }}>
            <button onClick={() => setShowSignup(false)} style={{ position: 'absolute', right: -12, top: -12, background: '#fff', border: '1px solid #ddd', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer' }}>×</button>
            <SignUp compact />
          </div>
        </div>
      )}
    </>
  );
}
