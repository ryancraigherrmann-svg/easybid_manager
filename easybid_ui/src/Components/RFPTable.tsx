import { useQuery, useMutation } from '@apollo/client/react';
import { GET_RFPS } from '../graphql/queries';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import RFPDetailView from './RFPDetailView';
import CreateRFPDialog from './CreateRFPDialog';
import { useAuth } from './AuthProvider';
import { DELETE_RFP } from '../graphql/deleteRFP';
import React from 'react';

type RFP = {
  id: number;
  title?: string;
  currentBids?: number;
  description?: string;
  jobType?: string;
  images?: string;
  attributes?: string;
  originalCompany?: string;
  status?: number;
  startDate?: string | number | null;
  bidsDueDate?: string | number | null;
  emailList?: string[];
  emailGroupId?: number | null;
  emailGroup?: { id: number; name: string; company?: string; emails?: string[] } | null;
  notifiedAt?: string | null;
  User?: string;
  createdAt: string;
  updatedAt: string;
};


export default function RFPTable() {
  const formatDate = (val?: string | number | null) => {
    if (val === null || val === undefined || val === '') return '';
    let d: Date;
    if (typeof val === 'number') {
      d = new Date(val);
    } else if (typeof val === 'string') {
      const t = val.trim();
      if (/^\d+$/.test(t)) {
        d = new Date(parseInt(t, 10));
      } else {
        d = new Date(t);
      }
    } else {
      d = new Date(val as any);
    }
    return Number.isNaN(d.getTime()) ? '' : d.toLocaleDateString();
  };
  const renderStatus = (s?: number) => {
    if (s === 1) return <span style={{ color: '#DC2626', fontWeight: 'bold' }}>Draft</span>;
    if (s === 2) return <span style={{ color: '#D97706', fontWeight: 'bold' }}>Receiving Bids</span>;
    if (s === 3) return <span style={{ color: '#2C5272', fontWeight: 'bold' }}>In Process</span>;
    if (s === 4) return <span style={{ color: '#16A34A', fontWeight: 'bold' }}>Bid Selected</span>;
    return <span style={{ fontWeight: 'bold', color: '#94A3B8' }}>Unknown</span>;
  };
  const { data, loading, error, refetch } = useQuery<{ rfps: RFP[] }>(GET_RFPS);
  const [selectedRFPId, setSelectedRFPId] = useState<number | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [deleteRFP] = useMutation(DELETE_RFP);

  // Always derive the selected RFP from the latest query data so it stays fresh after refetch
  const selectedRFP = selectedRFPId != null ? (data?.rfps.find((r) => r.id === selectedRFPId) || null) : null;

  const handleIdClick = (id: number) => {
    setSelectedRFPId(id);
    setDetailOpen(true);
  };
  const handleDetailClose = () => {
    setDetailOpen(false);
    setSelectedRFPId(null);
  };

  const [createOpen, setCreateOpen] = useState(false);
  const handleCreateOpen = () => setCreateOpen(true);
  const handleCreateClose = () => setCreateOpen(false);
  const handleCreated = () => {
    setCreateOpen(false);
    refetch();
  };

  const handleDeleteRFP = async (id: number) => {
    try {
      await deleteRFP({ variables: { id } });
      refetch();
    } catch (err) {
      console.error('Failed to delete RFP:', err);
    }
    setConfirmDeleteId(null);
  };

  const { user, token } = useAuth();
  const [companyName, setCompanyName] = useState<string | undefined>(undefined);

  const userName = React.useMemo(() => {
    if (!user) return '';
    return user.email || '';
  }, [user]);

  React.useEffect(() => {
    const companyId = user?.companyId;
    const companyNameFallback = (user as any)?.company;
    if (!companyId && !companyNameFallback) return;
    const url = companyId ? `/api/company/${encodeURIComponent(String(companyId))}` : `/api/company/by-name/${encodeURIComponent(String(companyNameFallback))}`;
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    fetch(url, { headers })
      .then((r) => {
        if (!r.ok) throw new Error('Failed to load company data');
        return r.json();
      })
      .then((data) => {
        if (!data.company && companyNameFallback) {
          setCompanyName(String(companyNameFallback));
        } else {
          setCompanyName(data.company?.name ?? undefined);
        }
      })
      .catch(() => {
        // ignore
      });
  }, [user, token]);

  return (
    <Paper sx={{ width: '85vw', maxWidth: '85vw', overflow: 'hidden', mx: 'auto' }}>
      <RFPDetailView open={detailOpen} onClose={handleDetailClose} rfp={selectedRFP} onRefetchRFPs={refetch} />
      <CreateRFPDialog open={createOpen} onClose={handleCreateClose} onCreated={handleCreated} userName={userName} companyName={companyName} />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, pb: 1, bgcolor: '#374151' }}>
        <Typography variant="h6" sx={{ color: 'primary.contrastText' }}>
          Request for Proposal (RFP) Table
        </Typography>
        <Button variant="contained" color="secondary" sx={{ minWidth: 140 }} onClick={handleCreateOpen}>
          Create RFP
        </Button>
      </Box>
      <Divider sx={{ bgcolor: 'primary.dark', height: '2px' }} />
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader size="small" aria-label="rfp table">
          <TableHead>
            <TableRow sx={{ '& th': { bgcolor: '#374151', color: '#FFFFFF', fontWeight: 'bold', py: 0.5 } }}>
              <TableCell>ID #</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Job Type</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>Bids Due</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={9}>Loading...</TableCell></TableRow>
            ) : error ? (
              <TableRow><TableCell colSpan={9} style={{ color: 'red' }}>Error: {error.message}</TableCell></TableRow>
            ) : data && data.rfps.length === 0 ? (
              <TableRow><TableCell colSpan={9}>No RFPs found.</TableCell></TableRow>
            ) : (
              data?.rfps.map((rfp) => (
                <TableRow key={rfp.id} hover sx={{ '& td': { py: 0.5 } }}>
                  <TableCell>
                    <span
                      style={{ color: '#2C5272', cursor: 'pointer', textDecoration: 'underline', fontWeight: 600 }}
                      onClick={() => handleIdClick(rfp.id)}
                    >
                      {rfp.id}
                    </span>
                  </TableCell>
                      <TableCell>
                        <div>{rfp.title}</div>
                        <div style={{ color: '#3B6E8F', fontSize: '0.85em' }}>{rfp.User}</div>
                      </TableCell>
                      <TableCell>{rfp.description}</TableCell>
                      <TableCell>{renderStatus(rfp.status)}</TableCell>
                      <TableCell>{rfp.jobType}</TableCell>
                      <TableCell>{rfp.originalCompany}</TableCell>
                      <TableCell>{formatDate(rfp.startDate)}</TableCell>
                      <TableCell>{formatDate(rfp.bidsDueDate)}</TableCell>
                      <TableCell>
                        <IconButton size="small" color="error" onClick={(e) => { e.stopPropagation(); setConfirmDeleteId(rfp.id); }}>
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
        <DialogContent>Are you sure you want to delete this RFP? This will also delete all associated bids and jobs.</DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteId(null)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={() => confirmDeleteId && handleDeleteRFP(confirmDeleteId)}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
