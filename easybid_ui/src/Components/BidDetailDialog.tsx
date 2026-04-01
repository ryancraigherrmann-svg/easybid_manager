import React, { useState, useEffect } from 'react';
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
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { useMutation } from '@apollo/client/react';
import { UPDATE_BID } from '../graphql/updateBid';
import { formatCurrency } from '../lib/utils';

interface LineItem {
  id?: number;
  description: string;
  amount: number;
}

interface BidDetailDialogProps {
  open: boolean;
  onClose: () => void;
  bid: any | null;
  onUpdated?: () => void;
}

const BidDetailDialog: React.FC<BidDetailDialogProps> = ({ open, onClose, bid, onUpdated }) => {
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState('');
  const [company, setCompany] = useState('');
  const [info, setInfo] = useState('');
  const [expectedDate, setExpectedDate] = useState('');
  const [amount, setAmount] = useState('');

  const [updateBid, { loading }] = useMutation(UPDATE_BID);

  useEffect(() => {
    if (bid && open) {
      setUser(bid.user || '');
      setCompany(bid.company || '');
      setInfo(bid.info || '');
      setExpectedDate(bid.expectedDate ? bid.expectedDate.slice(0, 10) : '');
      setAmount(String(bid.amount || 0));
      setEditing(false);
    }
  }, [bid, open]);

  if (!bid) return null;

  const items: LineItem[] = bid.lineItems || [];
  const total = items.reduce((s, it) => s + (it.amount || 0), 0) || bid.amount || 0;

  const handleSave = async () => {
    try {
      await updateBid({
        variables: {
          id: bid.id,
          input: {
            user: user || null,
            company: company || null,
            info: info || null,
            expectedDate: expectedDate || null,
            amount: parseFloat(amount) || 0,
          },
        },
      });
      setEditing(false);
      if (onUpdated) onUpdated();
    } catch (err) {
      console.error('Failed to update bid:', err);
    }
  };

  const handleCancel = () => {
    setUser(bid.user || '');
    setCompany(bid.company || '');
    setInfo(bid.info || '');
    setExpectedDate(bid.expectedDate ? bid.expectedDate.slice(0, 10) : '');
    setAmount(String(bid.amount || 0));
    setEditing(false);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span>Bid #{bid.id} Details</span>
        <Chip
          label={bid.approved ? 'Approved' : 'Open'}
          color={bid.approved ? 'success' : 'default'}
          size="small"
        />
      </DialogTitle>
      <DialogContent dividers>
        {bid.title && (
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            <b>RFP Title:</b> {bid.title}
            {bid.rfpId && <span style={{ color: '#666', marginLeft: 8 }}>(RFP #{bid.rfpId})</span>}
          </Typography>
        )}
        {!bid.title && !bid.rfpId && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Standalone bid — not linked to an RFP
          </Typography>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="User"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            fullWidth
            disabled={!editing}
            size="small"
          />
          <TextField
            label="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            fullWidth
            disabled={!editing}
            size="small"
          />
          <TextField
            label="Info"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
            fullWidth
            multiline
            rows={2}
            disabled={!editing}
            size="small"
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Expected Date"
              type="date"
              value={expectedDate}
              onChange={(e) => setExpectedDate(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
              disabled={!editing}
              size="small"
            />
            <TextField
              label="Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              fullWidth
              disabled={!editing}
              size="small"
            />
          </Box>
        </Box>

        <Typography variant="subtitle1" sx={{ mt: 3, mb: 1 }}>Line Items</Typography>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell style={{ width: 160 }}>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.length === 0 ? (
                <TableRow><TableCell colSpan={2}>No line items</TableCell></TableRow>
              ) : (
                items.map((it, i) => (
                  <TableRow key={it.id ?? i}>
                    <TableCell>{it.description}</TableCell>
                    <TableCell>{formatCurrency(it.amount)}</TableCell>
                  </TableRow>
                ))
              )}
              <TableRow>
                <TableCell><b>Total</b></TableCell>
                <TableCell><b>{formatCurrency(total)}</b></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <Typography variant="caption" color="text.secondary">
            Created: {bid.createdAt ? new Date(bid.createdAt).toLocaleString() : '—'}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            | Updated: {bid.updatedAt ? new Date(bid.updatedAt).toLocaleString() : '—'}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        {editing ? (
          <>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button variant="contained" onClick={handleSave} disabled={loading}>Save</Button>
          </>
        ) : (
          <>
            <Button onClick={onClose}>Close</Button>
            <Button variant="outlined" onClick={() => setEditing(true)}>Edit</Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default BidDetailDialog;
