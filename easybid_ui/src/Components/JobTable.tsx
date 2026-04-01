import { useQuery, useMutation } from '@apollo/client/react';
import { GET_JOBS } from '../graphql/jobs';
import { GET_RFPS } from '../graphql/queries';
import Button from '@mui/material/Button';
import CreateJobDialog from './CreateJobDialog';
import RFPDetailView from './RFPDetailView';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { DELETE_JOB } from '../graphql/deleteJob';
import { useState } from 'react';

export type Job = {
  id: string;
  title: string;
  description: string;
  rfpId?: number | null;
  jobType: string;
  startDate: string; // ISO date
  daysExpected: number;
  company: string;
};


export default function JobTable() {
  const { data, loading, error, refetch } = useQuery<{ jobs: Job[] }>(GET_JOBS);
  const { data: rfpsData, refetch: refetchRFPs } = useQuery<{ rfps: any[] }>(GET_RFPS);
  const [createOpen, setCreateOpen] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [deleteJob] = useMutation(DELETE_JOB);
  const [selectedRFP, setSelectedRFP] = useState<any | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [rfpDetailOpen, setRfpDetailOpen] = useState(false);

  const handleCreateOpen = () => setCreateOpen(true);
  const handleCreateClose = () => setCreateOpen(false);
  const handleCreated = () => {
    setCreateOpen(false);
    refetch();
  };

  const handleJobRowClick = async (job: Job) => {
    if (!job.rfpId) return;
    let rfp = rfpsData?.rfps.find((r: any) => r.id === job.rfpId) || null;
    if (!rfp) {
      const result = await refetchRFPs();
      rfp = result.data?.rfps?.find((r: any) => r.id === job.rfpId) || null;
    }
    if (rfp) {
      setSelectedRFP(rfp);
      setSelectedJob(job);
      setRfpDetailOpen(true);
    }
  };

  const handleRfpDetailClose = () => {
    setRfpDetailOpen(false);
    setSelectedRFP(null);
    setSelectedJob(null);
    refetch();
  };

  const handleDeleteJob = async (id: string) => {
    try {
      await deleteJob({ variables: { id: parseInt(id, 10) } });
      refetch();
    } catch (err) {
      console.error('Failed to delete job:', err);
    }
    setConfirmDeleteId(null);
  };

  return (
    <Paper sx={{ width: '85vw', maxWidth: '85vw', overflow: 'hidden', mx: 'auto' }}>
      <CreateJobDialog open={createOpen} onClose={handleCreateClose} onCreated={handleCreated} />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, pb: 1, bgcolor: '#374151' }}>
        <Typography variant="h6" sx={{ color: 'primary.contrastText' }}>
          Jobs Table
        </Typography>
        <Button variant="contained" color="secondary" sx={{ minWidth: 140 }} onClick={handleCreateOpen}>
          Create Job
        </Button>
      </Box>
      <Divider sx={{ bgcolor: 'primary.dark', height: '2px' }} />
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="jobs table">
          <TableHead>
            <TableRow sx={{ '& th': { bgcolor: '#374151', color: '#FFFFFF', fontWeight: 'bold' } }}>
              <TableCell>ID #</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Job Type</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>Days Expected</TableCell>
              <TableCell>RFP ID</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={9}>Loading...</TableCell></TableRow>
            ) : error ? (
              <TableRow><TableCell colSpan={9} style={{ color: 'red' }}>Error: {error.message}</TableCell></TableRow>
            ) : data && data.jobs.length === 0 ? (
              <TableRow><TableCell colSpan={9}>No jobs found.</TableCell></TableRow>
            ) : (
              data?.jobs.map((job) => (
                <TableRow key={String(job.id)} hover sx={{ cursor: job.rfpId ? 'pointer' : 'default' }} onClick={() => handleJobRowClick(job)}>
                  <TableCell>{job.id}</TableCell>
                  <TableCell>{job.title}</TableCell>
                  <TableCell>{job.description}</TableCell>
                  <TableCell>{job.jobType}</TableCell>
                  <TableCell>{job.company}</TableCell>
                  <TableCell>{job.startDate ? new Date(job.startDate).toLocaleDateString() : ''}</TableCell>
                  <TableCell>{job.daysExpected ?? ''}</TableCell>
                  <TableCell>
                    {job.rfpId ? (
                      <span
                        style={{ color: '#2C5272', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}
                        onClick={(e) => { e.stopPropagation(); handleJobRowClick(job); }}
                      >
                        {job.rfpId}
                      </span>
                    ) : ''}
                  </TableCell>
                  <TableCell>
                    <IconButton size="small" color="error" onClick={(e) => { e.stopPropagation(); setConfirmDeleteId(String(job.id)); }}>
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
        <DialogContent>Are you sure you want to delete this job?</DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteId(null)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={() => confirmDeleteId && handleDeleteJob(confirmDeleteId)}>Delete</Button>
        </DialogActions>
      </Dialog>

      <RFPDetailView open={rfpDetailOpen} onClose={handleRfpDetailClose} rfp={selectedRFP} initialTab={2} job={selectedJob} />
    </Paper>
  );
}

