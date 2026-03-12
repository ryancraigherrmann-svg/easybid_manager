import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import Button from '@mui/material/Button';

interface VerifyEmailProps {
  token: string;
  onDone: () => void;
}

const VerifyEmail: React.FC<VerifyEmailProps> = ({ token, onDone }) => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await fetch(`/api/verify-email?token=${encodeURIComponent(token)}`);
        const data = await res.json();
        if (res.ok && data.success) {
          setStatus('success');
          setMessage(data.message || 'Email verified successfully!');
        } else {
          setStatus('error');
          setMessage(data.error || 'Verification failed.');
        }
      } catch {
        setStatus('error');
        setMessage('Network error. Please try again.');
      }
    };
    verify();
  }, [token]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#F4F7FA',
      }}
    >
      <Box
        sx={{
          width: 440,
          p: 4,
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" sx={{ mb: 3, color: '#1E3A50', fontWeight: 700 }}>
          Email Verification
        </Typography>

        {status === 'loading' && (
          <>
            <CircularProgress size={48} sx={{ mb: 2 }} />
            <Typography color="text.secondary">Verifying your email...</Typography>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircleIcon sx={{ fontSize: 56, color: '#16a34a', mb: 2 }} />
            <Typography sx={{ mb: 3, color: '#1E3A50' }}>{message}</Typography>
            <Button variant="contained" onClick={onDone} sx={{ background: '#2C5272' }}>
              Continue to EasyBid
            </Button>
          </>
        )}

        {status === 'error' && (
          <>
            <ErrorIcon sx={{ fontSize: 56, color: '#DC2626', mb: 2 }} />
            <Typography sx={{ mb: 3, color: '#DC2626' }}>{message}</Typography>
            <Button variant="contained" onClick={onDone} sx={{ background: '#2C5272' }}>
              Go to Login
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default VerifyEmail;
