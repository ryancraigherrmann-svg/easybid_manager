import React, { useState } from 'react';
import { useAuth } from './AuthProvider';

export default function SignUp({ compact = false }: { compact?: boolean }) {
  const { signup } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await signup(email, password, firstName, lastName, company);
    } catch (err: any) {
      setError(err?.message || 'Signup failed');
    }
  };

  const card = (
    <div style={{ width: 420, padding: 28, borderRadius: 10, boxShadow: '0 8px 32px rgba(0,0,0,0.18)', background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 12, color: '#1E3A50', fontWeight: 700 }}>Create account</h2>
      <form onSubmit={submit}>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, color: '#2C5272', fontSize: '0.9rem' }}>First name</label>
          <input style={{ width: '100%', padding: '8px 10px', background: '#F4F7FA', border: '1px solid #CBD5E1', borderRadius: 6, color: '#1E3A50' }} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, color: '#2C5272', fontSize: '0.9rem' }}>Last name</label>
          <input style={{ width: '100%', padding: '8px 10px', background: '#F4F7FA', border: '1px solid #CBD5E1', borderRadius: 6, color: '#1E3A50' }} value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, color: '#2C5272', fontSize: '0.9rem' }}>Company</label>
          <input style={{ width: '100%', padding: '8px 10px', background: '#F4F7FA', border: '1px solid #CBD5E1', borderRadius: 6, color: '#1E3A50' }} value={company} onChange={(e) => setCompany(e.target.value)} />
        </div>
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
        }}>Create account</button>
      </form>
      <div style={{ marginTop: 12, textAlign: 'center' }}>
        <small>Already have an account? Sign in.</small>
      </div>
    </div>
  );

  if (compact) return card;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      {card}
    </div>
  );
}
