import React, { useState, useMemo, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { useMutation } from '@apollo/client/react';
import { CREATE_BID } from '../graphql/createBid';
import { useAuth } from './AuthProvider';
import { formatCurrency } from '../lib/utils';

interface CreateBidDialogProps {
  open: boolean;
  onClose: () => void;
  rfpId?: number;
  onCreated?: () => void;
}

interface LineItem {
  description: string;
  amount: string; // keep as string for input
}

const emptyLine: LineItem = { description: '', amount: '' };

const CreateBidDialog: React.FC<CreateBidDialogProps> = ({ open, onClose, rfpId, onCreated }) => {
  const [user, setUser] = useState('');
  const [company, setCompany] = useState('');
  const { token, user: authUser } = useAuth();

  useEffect(() => {
    if (!open) return;
    // Prefer server authoritative data when token available
    if (token) {
      fetch('/api/me', { headers: { Authorization: `Bearer ${token}` } })
        .then((r) => {
          if (!r.ok) throw new Error('unauthorized');
          return r.json();
        })
        .then((d) => {
          const display = d?.user?.displayName ?? d?.user?.email ?? '';
          setUser(display);
          setCompany(d?.company?.name ?? '');
        })
        .catch(() => {
          // fallback to local authUser if available
          if (authUser) {
            const name = authUser.firstName || authUser.lastName
              ? `${authUser.firstName ?? ''} ${authUser.lastName ?? ''}`.trim()
              : authUser.email ?? '';
            setUser(name);
            if (authUser.companyId) {
              fetch(`/api/company/${authUser.companyId}`)
                .then((r) => r.json())
                .then((d) => setCompany(d?.company?.name ?? ''))
                .catch(() => setCompany(''));
            } else {
              setCompany('');
            }
          } else {
            setUser('');
            setCompany('');
          }
        });
      return;
    }

    // No token: fall back to local authUser if present
    if (authUser) {
      const name = authUser.firstName || authUser.lastName
        ? `${authUser.firstName ?? ''} ${authUser.lastName ?? ''}`.trim()
        : authUser.email ?? '';
      setUser(name);
      if (authUser.companyId) {
        fetch(`/api/company/${authUser.companyId}`)
          .then((r) => r.json())
          .then((d) => setCompany(d?.company?.name ?? ''))
          .catch(() => setCompany(''));
      } else {
        setCompany('');
      }
    } else {
      setUser('');
      setCompany('');
    }
  }, [open, token, authUser]);
  const [info, setInfo] = useState('');
  const [expectedDate, setExpectedDate] = useState('');
  const [lineItems, setLineItems] = useState<LineItem[]>([{ ...emptyLine }]);
  const [createBid, { loading, error }] = useMutation(CREATE_BID);

  const total = useMemo(() => {
    return lineItems.reduce((sum, li) => sum + (parseFloat(li.amount || '0') || 0), 0);
  }, [lineItems]);

  const updateLine = (index: number, key: keyof LineItem, value: string) => {
    const copy = [...lineItems];
    copy[index] = { ...copy[index], [key]: value };
    setLineItems(copy);
  };

  const addLine = () => setLineItems([...lineItems, { ...emptyLine }]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const variables: any = { input: {
      user,
      company,
      info,
      expectedDate: expectedDate || null,
      lineItems: lineItems.map(li => ({ description: li.description, amount: parseFloat(li.amount || '0') })),
      amount: total
    }};
    if (typeof rfpId !== 'undefined') variables.input.rfpId = rfpId;
    await createBid({ variables });
    // reset only editable fields; keep user/company populated from /api/me
    setInfo(''); setExpectedDate(''); setLineItems([{ ...emptyLine }]);
    onClose();
    if (onCreated) onCreated();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Bid on RFP</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <TextField label="User" value={user} fullWidth sx={{ mb: 2 }} disabled />
          <TextField label="Company" value={company} fullWidth sx={{ mb: 2 }} disabled />
          <TextField label="Info" value={info} onChange={(e) => setInfo(e.target.value)} fullWidth multiline rows={2} sx={{ mb: 2 }} />
          <TextField label="Expected Date" type="date" value={expectedDate} onChange={(e) => setExpectedDate(e.target.value)} fullWidth InputLabelProps={{ shrink: true }} sx={{ mb: 2 }} />

          <Typography variant="subtitle1" sx={{ mb: 1 }}>Bid Line Items</Typography>
          <TableContainer component={Paper} sx={{ mb: 1 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell style={{ width: 160 }}>Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {lineItems.map((li, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <TextField value={li.description} onChange={(e) => updateLine(idx, 'description', e.target.value)} fullWidth />
                    </TableCell>
                    <TableCell>
                      <TextField value={li.amount} onChange={(e) => updateLine(idx, 'amount', e.target.value)} type="number" fullWidth />
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={2} align="left">
                    <IconButton size="small" onClick={addLine}><AddIcon /></IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><b>Total</b></TableCell>
                  <TableCell><b>{formatCurrency(total)}</b></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          {error && <div style={{ color: 'red', marginTop: 8 }}>{(error as any).message}</div>}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">Cancel</Button>
          <Button type="submit" color="primary" variant="contained" disabled={loading}>Submit Bid</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateBidDialog;
