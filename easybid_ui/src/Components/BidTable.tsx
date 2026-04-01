import { gql } from '@apollo/client';
import { useQuery, useMutation } from '@apollo/client/react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useEffect, useState } from 'react';
import RFPDetailView from './RFPDetailView';
import CreateBidDialog from './CreateBidDialog';
import { GET_RFPS } from '../graphql/queries';
import { DELETE_BID } from '../graphql/deleteBid';
import { formatCurrency } from '../lib/utils';

const GET_BIDS = gql`
  query GetBids($limit: Int, $page: Int) {
    bids(limit: $limit, page: $page) {
      id
      title
      amount
      status
      approved
      rfpId
      user
      company
      info
      expectedDate
      createdAt
      updatedAt
      lineItems {
        id
        description
        amount
      }
      postings {
        id
      }
    }
  }
`;

type Bid = {
  id: number;
  title: string;
  amount: number;
  status: string;
  approved: boolean;
  rfpId?: number | null;
  user?: string | null;
  company?: string | null;
  info?: string | null;
  expectedDate?: string | null;
  createdAt: string;
  updatedAt: string;
  lineItems?: { id: number; description: string; amount: number }[];
  postings?: { id: number }[];
};

export default function BidTable() {
  const [selectedRFP, setSelectedRFP] = useState<any | null>(null);
  const [rfpDetailOpen, setRfpDetailOpen] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [createOpen, setCreateOpen] = useState(false);

  const { data, loading, error, refetch } = useQuery<{ bids: Bid[] }>(GET_BIDS, {
    variables: { limit: 100, page: 1 },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
  });

  const { data: rfpsData, refetch: refetchRFPs } = useQuery<{ rfps: any[] }>(GET_RFPS);
  const [deleteBid] = useMutation(DELETE_BID);

  useEffect(() => {
    // initial fetch / keep refetch function available
  }, [refetch]);

  const handleBidRowClick = async (rfpId?: number | null) => {
    if (!rfpId) return;
    let rfp = rfpsData?.rfps.find((r: any) => r.id === rfpId) || null;
    if (!rfp) {
      // RFP may have been created recently; refetch and retry
      const result = await refetchRFPs();
      rfp = result.data?.rfps?.find((r: any) => r.id === rfpId) || null;
    }
    if (rfp) {
      setSelectedRFP(rfp);
      setRfpDetailOpen(true);
    }
  };
  const handleRfpDetailClose = () => {
    setRfpDetailOpen(false);
    setSelectedRFP(null);
    refetch();
  };

  const handleBidCreated = async () => {
    setCreateOpen(false);
    await refetch();
    await refetchRFPs();
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteBid({ variables: { id } });
      refetch();
    } catch (err) {
      console.error('Failed to delete bid:', err);
    }
    setConfirmDeleteId(null);
  };

  return (
    <Paper sx={{ width: '85vw', maxWidth: '85vw', overflow: 'hidden', mx: 'auto' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, pb: 1, bgcolor: '#374151' }}>
        <Typography variant="h6" sx={{ color: 'primary.contrastText' }}>
          Open Bids
        </Typography>
        <Button variant="contained" color="secondary" sx={{ minWidth: 140 }} onClick={() => setCreateOpen(true)}>
          Create Bid
        </Button>
      </Box>
      <Divider sx={{ bgcolor: 'primary.dark', height: '2px' }} />
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="bids table">
          <TableHead>
            <TableRow sx={{ '& th': { bgcolor: '#374151', color: '#FFFFFF', fontWeight: 'bold' } }}>
              <TableCell>RFP #</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Postings</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Updated</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={8}>Loading...</TableCell></TableRow>
            ) : error ? (
              <TableRow><TableCell colSpan={8} style={{ color: 'red' }}>Error: {error.message}</TableCell></TableRow>
            ) : data && data.bids.length === 0 ? (
              <TableRow><TableCell colSpan={8}>No bids found.</TableCell></TableRow>
            ) : (
              data?.bids.map((bid) => (
                <TableRow key={bid.id} hover sx={{ cursor: bid.rfpId ? 'pointer' : 'default' }} onClick={() => handleBidRowClick(bid.rfpId)}>
                  <TableCell>
                    {bid.rfpId ? (
                      <span style={{ color: '#2C5272', fontWeight: 600 }}>
                        {bid.rfpId}
                      </span>
                    ) : (
                      ''
                    )}
                  </TableCell>
                  <TableCell>{bid.title}</TableCell>
                  <TableCell>{formatCurrency(bid.amount)}</TableCell>
                  <TableCell>
                    <Chip
                      label={bid.approved ? 'Approved' : 'Open'}
                      color={bid.approved ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{bid.postings?.length ?? 0}</TableCell>
                  <TableCell>{bid.createdAt ? new Date(bid.createdAt).toLocaleDateString() : ''}</TableCell>
                  <TableCell>{bid.updatedAt ? new Date(bid.updatedAt).toLocaleDateString() : ''}</TableCell>
                  <TableCell>
                    <IconButton size="small" color="error" onClick={(e) => { e.stopPropagation(); setConfirmDeleteId(bid.id); }}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={confirmDeleteId !== null} onClose={() => setConfirmDeleteId(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this bid?</DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteId(null)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={() => confirmDeleteId && handleDelete(confirmDeleteId)}>Delete</Button>
        </DialogActions>
      </Dialog>

      <RFPDetailView open={rfpDetailOpen} onClose={handleRfpDetailClose} rfp={selectedRFP} />

      <CreateBidDialog open={createOpen} onClose={() => setCreateOpen(false)} onCreated={handleBidCreated} />
    </Paper>
  );
}
