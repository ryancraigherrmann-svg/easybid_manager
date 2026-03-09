import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { formatCurrency } from '../lib/utils';

interface LineItem {
  description: string;
  amount: number;
}

interface BidBreakdownDialogProps {
  open: boolean;
  onClose: () => void;
  bid: any | null;
}

const BidBreakdownDialog: React.FC<BidBreakdownDialogProps> = ({ open, onClose, bid }) => {
  if (!bid) return null;
  const items: LineItem[] = bid.lineItems || [];
  const total = items.reduce((s, it) => s + (it.amount || 0), 0) || bid.amount || 0;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Bid #{bid.id} Breakdown</DialogTitle>
      <DialogContent dividers>
        <Typography><b>Title:</b> {bid.title}</Typography>
        <Typography><b>User:</b> {bid.user}</Typography>
        <Typography><b>Company:</b> {bid.company}</Typography>
        <Typography><b>Expected Date:</b> {bid.expectedDate ? new Date(bid.expectedDate).toLocaleDateString() : ''}</Typography>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.length === 0 ? (
                <TableRow><TableCell colSpan={2}>No line items</TableCell></TableRow>
              ) : (
                items.map((it, i) => (
                  <TableRow key={i}>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default BidBreakdownDialog;
