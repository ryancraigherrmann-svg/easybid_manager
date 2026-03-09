import { useQuery } from '@apollo/client/react';
import { GET_JOBS } from '../graphql/jobs';
import Button from '@mui/material/Button';
import CreateJobDialog from './CreateJobDialog';
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
  const [createOpen, setCreateOpen] = useState(false);

  const handleCreateOpen = () => setCreateOpen(true);
  const handleCreateClose = () => setCreateOpen(false);
  const handleCreated = () => {
    setCreateOpen(false);
    refetch();
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
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={8}>Loading...</TableCell></TableRow>
            ) : error ? (
              <TableRow><TableCell colSpan={8} style={{ color: 'red' }}>Error: {error.message}</TableCell></TableRow>
            ) : data && data.jobs.length === 0 ? (
              <TableRow><TableCell colSpan={8}>No jobs found.</TableCell></TableRow>
            ) : (
              data?.jobs.map((job) => (
                <TableRow key={String(job.id)} hover>
                  <TableCell>{job.id}</TableCell>
                  <TableCell>{job.title}</TableCell>
                  <TableCell>{job.description}</TableCell>
                  <TableCell>{job.jobType}</TableCell>
                  <TableCell>{job.company}</TableCell>
                  <TableCell>{job.startDate ? new Date(job.startDate).toLocaleDateString() : ''}</TableCell>
                  <TableCell>{job.daysExpected ?? ''}</TableCell>
                  <TableCell>{job.rfpId ?? ''}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

