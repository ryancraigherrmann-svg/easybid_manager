import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
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
import { useEffect, useState } from 'react';
import RFPDetailView from './RFPDetailView';
import { GET_RFPS } from '../graphql/queries';
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
      createdAt
      updatedAt
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
  createdAt: string;
  updatedAt: string;
  postings?: { id: number }[];
};

export default function BidTable() {
  const [selectedBid, setSelectedBid] = useState<Bid | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedRFP, setSelectedRFP] = useState<any | null>(null);
  const [rfpDetailOpen, setRfpDetailOpen] = useState(false);

  const { data, loading, error, refetch } = useQuery<{ bids: Bid[] }>(GET_BIDS, {
    variables: { limit: 100, page: 1 },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
  });

  const { data: rfpsData } = useQuery<{ rfps: any[] }>(GET_RFPS);

  useEffect(() => {
    // initial fetch / keep refetch function available
  }, [refetch]);

  const handleRowClick = (id: number) => {
    const bid = data?.bids.find((b) => b.id === id) || null;
    setSelectedBid(bid);
    setDetailOpen(true);
  };
  const handleDetailClose = () => {
    setDetailOpen(false);
    setSelectedBid(null);
  };

  const handleRfpClick = (rfpId?: number | null) => {
    if (!rfpId) return;
    const rfp = rfpsData?.rfps.find((r: any) => r.id === rfpId) || null;
    setSelectedRFP(rfp);
    setRfpDetailOpen(true);
  };
  const handleRfpDetailClose = () => {
    setRfpDetailOpen(false);
    setSelectedRFP(null);
  };

  return (
    <Paper sx={{ width: '85vw', maxWidth: '85vw', overflow: 'hidden', mx: 'auto' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, pb: 1, bgcolor: '#374151' }}>
        <Typography variant="h6" sx={{ color: 'primary.contrastText' }}>
          Open Bids
        </Typography>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={7}>Loading...</TableCell></TableRow>
            ) : error ? (
              <TableRow><TableCell colSpan={7} style={{ color: 'red' }}>Error: {error.message}</TableCell></TableRow>
            ) : data && data.bids.length === 0 ? (
              <TableRow><TableCell colSpan={7}>No bids found.</TableCell></TableRow>
            ) : (
              data?.bids.map((bid) => (
                <TableRow key={bid.id} hover>
                  <TableCell>
                    {bid.rfpId ? (
                      <span style={{ color: '#2C5272', cursor: 'pointer', textDecoration: 'underline', fontWeight: 600 }} onClick={() => handleRfpClick(bid.rfpId)}>
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
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <RFPDetailView open={rfpDetailOpen} onClose={handleRfpDetailClose} rfp={selectedRFP} />
    </Paper>
  );
}
