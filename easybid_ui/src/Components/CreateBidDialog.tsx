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
import { CREATE_RFP } from '../graphql/createRFP';
import { GET_RFPS } from '../graphql/queries';
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
          setUser(d?.user?.email ?? '');
          setCompany(d?.company?.name ?? '');
        })
        .catch(() => {
          // fallback to local authUser if available
          if (authUser) {
            setUser(authUser.email ?? '');
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
      setUser(authUser.email ?? '');
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
  const [title, setTitle] = useState('');
  const [expectedDate, setExpectedDate] = useState('');
  const [lineItems, setLineItems] = useState<LineItem[]>([{ ...emptyLine }]);
  const [createBid, { loading, error }] = useMutation(CREATE_BID);
  const [createRFP] = useMutation(CREATE_RFP, { refetchQueries: [{ query: GET_RFPS }] });

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
    let linkedRfpId = rfpId;
    // If no rfpId provided, create a blank RFP behind the scenes and link bid to it
    if (typeof linkedRfpId === 'undefined') {
      const rfpResult = await createRFP({ variables: { input: { title: title || null, User: user, originalCompany: company } } });
      linkedRfpId = (rfpResult.data as any)?.createRFP?.id;
    }
    const variables: any = { input: {
      user,
      company,
      info,
      expectedDate: expectedDate || null,
      lineItems: lineItems.map(li => ({ description: li.description, amount: parseFloat(li.amount || '0') })),
      amount: total,
      rfpId: linkedRfpId,
    }};
    await createBid({ variables });
    // reset only editable fields; keep user/company populated from /api/me
    setInfo(''); setExpectedDate(''); setTitle(''); setLineItems([{ ...emptyLine }]);
    onClose();
    if (onCreated) await onCreated();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{rfpId ? 'Bid on RFP' : 'Create Bid'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          {!rfpId && (
            <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth sx={{ mb: 2 }} placeholder="Enter a title for this bid" />
          )}
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
