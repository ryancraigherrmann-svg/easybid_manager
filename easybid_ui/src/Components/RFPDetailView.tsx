import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import DeleteIcon from '@mui/icons-material/Delete';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useQuery, useMutation } from '@apollo/client/react';
import { GET_BIDS_FOR_RFP } from '../graphql/bidsForRFP';
import { UPDATE_RFP_STATUS } from '../graphql/updateRFPStatus';
import { GET_EMAIL_GROUPS } from '../graphql/emailGroups';
import { useAuth } from './AuthProvider';
import { UPDATE_RFP } from '../graphql/updateRFP';
import { UPDATE_BID } from '../graphql/updateBid';
import { CREATE_JOB } from '../graphql/createJob';
import CreateBidDialog from './CreateBidDialog';
import BidBreakdownDialog from './BidBreakdownDialog';
import Chip from '@mui/material/Chip';
import { formatCurrency } from '../lib/utils';

export interface RFPDetailViewProps {
  open: boolean;
  onClose: () => void;
  rfp: any; // Replace 'any' with your RFP type if available
}

interface Bid {
  id: number;
  company: string;
  amount: number;
}

interface BidsForRFPData {
  bidsForRFP: Bid[];
}

const RFPDetailView: React.FC<RFPDetailViewProps> = ({ open, onClose, rfp }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const cardBg = isDark ? '#1A3348' : '#f5f5f7';
  const { data, loading, error, refetch } = useQuery<BidsForRFPData>(
    GET_BIDS_FOR_RFP,
    { variables: { rfpId: rfp?.id }, skip: !rfp?.id }
  );
  const [bidOpen, setBidOpen] = useState(false);
  const handleBidOpen = () => setBidOpen(true);
  const handleBidClose = () => setBidOpen(false);
  const handleBidCreated = () => {
    setBidOpen(false);
    refetch();
  };

  const [tab, setTab] = useState<number>(0);
  const [selectedBid, setSelectedBid] = useState<any | null>(null);
  const [breakdownOpen, setBreakdownOpen] = useState(false);
  const [emailList, setEmailList] = useState<string[]>(rfp?.emailList ?? []);
  const [newEmail, setNewEmail] = useState('');
  const [selectedEmailGroup, setSelectedEmailGroup] = useState<number | ''>(rfp?.emailGroupId ?? '');
  const [selectedGroupEmails, setSelectedGroupEmails] = useState<string[]>([]);

  const { user } = useAuth();
  const companyVar = user?.companyId ? String(user.companyId) : undefined;
  const { data: emailGroupsData } = useQuery(GET_EMAIL_GROUPS, { variables: { company: companyVar } });
  const [updateRfp] = useMutation(UPDATE_RFP);
  const [updateBid] = useMutation(UPDATE_BID);
  const [createJob] = useMutation(CREATE_JOB);

  // Find the accepted bid (if any) from the fetched bids
  const acceptedBid = data?.bidsForRFP?.find((b: any) => b.approved) ?? null;

  const handleApproveBid = async (bid: any) => {
    try {
      // Set this bid to approved; revoke any previously approved bid
      const currentlyApproved = data?.bidsForRFP?.find((b: any) => b.approved && b.id !== bid.id);
      if (currentlyApproved) {
        await updateBid({ variables: { id: currentlyApproved.id, input: { approved: false } } });
      }
      await updateBid({ variables: { id: bid.id, input: { approved: true } } });
      refetch();
    } catch (e: any) {
      alert(`Failed to approve bid: ${e.message || e}`);
    }
  };

  const handleApproveRFP = async () => {
    if (!rfp?.id || !acceptedBid) return;
    try {
      // Parse startDate defensively — it may be an ISO string, a timestamp number, or missing
      let startDate = new Date().toISOString().slice(0, 10);
      if (rfp.startDate) {
        const parsed = isNaN(Number(rfp.startDate))
          ? new Date(rfp.startDate)
          : new Date(Number(rfp.startDate));
        if (!isNaN(parsed.getTime())) {
          startDate = parsed.toISOString().slice(0, 10);
        }
      }

      // Create a job from the accepted bid
      await createJob({
        variables: {
          input: {
            title: acceptedBid.title || rfp.title || 'Untitled Job',
            description: rfp.description || '',
            rfpId: rfp.id,
            jobType: rfp.jobType || '',
            startDate,
            daysExpected: 30,
            company: acceptedBid.company || '',
          },
        },
      });
      // Move RFP to Closed (status 4)
      await updateRfpStatus({ variables: { id: rfp.id, status: 4 } });
      window.location.reload();
    } catch (e: any) {
      alert(`Failed to approve RFP: ${e.message || e}`);
    }
  };

  const handleCloseRFP = async () => {
    if (!rfp?.id) return;
    try {
      await updateRfpStatus({ variables: { id: rfp.id, status: 4 } });
      window.location.reload();
    } catch (e: any) {
      alert(`Failed to close RFP: ${e.message || e}`);
    }
  };

  const handleTabChange = (_: any, value: number) => setTab(value);

  React.useEffect(() => {
    setEmailList(rfp?.emailList ?? []);
    setSelectedEmailGroup(rfp?.emailGroupId ?? '');
  }, [rfp]);
  // When a group is selected, set a preview of the group's emails.
  React.useEffect(() => {
    if (!emailGroupsData) return;
    if (selectedEmailGroup === '' || selectedEmailGroup === undefined) {
      setSelectedGroupEmails([]);
      return;
    }
    const g = emailGroupsData.emailGroups?.find((eg: any) => eg.id === selectedEmailGroup);
    setSelectedGroupEmails(g && Array.isArray(g.emails) ? g.emails : []);
  }, [selectedEmailGroup, emailGroupsData]);

  const [updateRfpStatus] = useMutation(UPDATE_RFP_STATUS);

  const handleSetStatus = async (newStatus: number) => {
    if (!rfp?.id) return;
    try {
      await updateRfpStatus({ variables: { id: rfp.id, status: newStatus } });
      // Simple refresh to show updated status in the list
      window.location.reload();
    } catch (e: any) {
      alert(`Failed to update status: ${e.message || e}`);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth sx={{ m: 0, p: 0 }}>
      <DialogTitle>{rfp ? `RFP Details - ID #${rfp.id}` : 'RFP / Job Details'}</DialogTitle>
      <DialogContent dividers sx={{ display: 'flex', gap: 2, p: 0 }}>
        {/* Left: main content with tabs */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Tabs value={tab} onChange={handleTabChange} aria-label="RFP Job Tabs">
            <Tab label="RFP View" />
            <Tab label="Job View" />
          </Tabs>
          <Divider />
          <Box sx={{ p: 2, minHeight: 300 }}>
            {tab === 0 && (
              <Box>
                {rfp ? (
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr' }, gap: 2 }}>
                    <Box sx={{ backgroundColor: cardBg, borderRadius: 2, p: 2 }}>
                      <Typography variant="h6">Details</Typography>
                      <Box sx={{ mt: 1, display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 1 }}>
                        <Box>
                          <Typography sx={{ fontWeight: 600 }}>Title</Typography>
                          <Typography>{rfp.title}</Typography>

                          <Typography sx={{ fontWeight: 600, mt: 1 }}>Status</Typography>
                          <Typography>{rfp.status === 1 ? 'Draft' : rfp.status === 2 ? 'Receiving Bids' : rfp.status === 3 ? 'In Process' : rfp.status === 4 ? 'Bid Selected' : ''}</Typography>

                          <Typography sx={{ fontWeight: 600, mt: 1 }}>Job Type</Typography>
                          <Typography>{rfp.jobType}</Typography>
                        </Box>

                        <Box>
                          <Typography sx={{ fontWeight: 600 }}>Company</Typography>
                          <Typography>{rfp.originalCompany}</Typography>

                          <Typography sx={{ fontWeight: 600, mt: 1 }}>Start Date</Typography>
                          <Typography>{rfp.startDate ? new Date(rfp.startDate).toLocaleDateString() : ''}</Typography>

                          <Typography sx={{ fontWeight: 600, mt: 1 }}>Bids Due Date</Typography>
                          <Typography>{rfp.bidsDueDate ? new Date(rfp.bidsDueDate).toLocaleString() : ''}</Typography>
                        </Box>

                        <Box sx={{ gridColumn: '1 / -1', mt: 1 }}>
                          <Typography sx={{ fontWeight: 600 }}>User</Typography>
                          <Typography>{rfp.User}</Typography>

                          <Typography sx={{ fontWeight: 600, mt: 1 }}>Description</Typography>
                          <Typography>{rfp.description}</Typography>
                        </Box>
                      </Box>
                    </Box>

                    <Box sx={{ backgroundColor: cardBg, borderRadius: 2, p: 2 }}>
                      <Typography variant="h6">Email Recipients</Typography>
                      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1, mt: 1, flexWrap: 'wrap' }}>
                        <FormControl sx={{ minWidth: 220 }} size="small">
                          <InputLabel id="email-group-label">Email Group</InputLabel>
                          <Select
                            labelId="email-group-label"
                            label="Email Group"
                            value={selectedEmailGroup}
                            onChange={(e: any) => setSelectedEmailGroup(e.target.value === '' ? '' : Number(e.target.value))}
                          >
                            <MenuItem value={''}>None</MenuItem>
                            {emailGroupsData?.emailGroups?.map((g: any) => (
                              <MenuItem key={g.id} value={g.id}>{g.name} ({g.emails?.length || 0})</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <Button size="small" variant="outlined" onClick={() => {
                          if (!selectedGroupEmails || selectedGroupEmails.length === 0) return;
                          setEmailList((prev) => {
                            const merged = Array.from(new Set([...(prev || []), ...selectedGroupEmails]));
                            return merged;
                          });
                        }} disabled={selectedGroupEmails.length === 0}>
                          Add Group
                        </Button>
                        <TextField size="small" label="Add Email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                        <Button variant="outlined" size="small" onClick={() => {
                          const email = (newEmail || '').trim();
                          if (!email) return;
                          setEmailList(Array.isArray(emailList) ? [...emailList, email] : [email]);
                          setNewEmail('');
                        }}>Add</Button>
                        <Button variant="contained" size="small" color="primary" onClick={async () => {
                          if (!rfp?.id) return;
                          try {
                            await updateRfp({ variables: { id: rfp.id, input: { emailList, emailGroupId: selectedEmailGroup === '' ? null : selectedEmailGroup } } });
                            window.location.reload();
                          } catch (e: any) {
                            alert(`Failed to update emails: ${e.message || e}`);
                          }
                        }}>Save</Button>
                      </Box>
                      <List dense>
                        {(emailList || []).map((e: string, idx: number) => (
                          <ListItem key={`${e}-${idx}`}>
                            <ListItemText primary={e} />
                            <ListItemSecondaryAction>
                              <IconButton edge="end" aria-label="delete" onClick={() => setEmailList(emailList.filter((_: string, i: number) => i !== idx))}>
                                <DeleteIcon />
                              </IconButton>
                            </ListItemSecondaryAction>
                          </ListItem>
                        ))}
                      </List>
                    </Box>

                    <Box sx={{ backgroundColor: cardBg, borderRadius: 2, p: 2 }}>
                      <Typography variant="h6">Files</Typography>
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="body2" color="text.secondary">No files uploaded yet.</Typography>
                        <Box sx={{ mt: 1 }}>
                          <Button variant="outlined" size="small" disabled>Upload (coming soon)</Button>
                        </Box>
                      </Box>
                    </Box>


                    <Typography variant="h6" sx={{ mt: 3, mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      Bids for this RFP
                      <div>
                        {rfp.status === 1 && (
                          <Button variant="contained" color="primary" size="small" sx={{ ml: 2 }} onClick={() => handleSetStatus(2)}>
                            Send Out Bid Requests
                          </Button>
                        )}
                        {rfp.status === 2 && (
                          <Button variant="contained" color="primary" size="small" sx={{ ml: 2 }} onClick={() => handleSetStatus(3)}>
                            Done Receiving Bids
                          </Button>
                        )}
                        {rfp.status === 3 && (
                          <>
                            <Button
                              variant="contained"
                              color="success"
                              size="small"
                              sx={{ ml: 2 }}
                              disabled={!acceptedBid}
                              onClick={handleApproveRFP}
                            >
                              Approve RFP & Create Job
                            </Button>
                            <Button
                              variant="outlined"
                              color="error"
                              size="small"
                              sx={{ ml: 1 }}
                              onClick={handleCloseRFP}
                            >
                              Close RFP (No Job)
                            </Button>
                          </>
                        )}
                        <Button variant="contained" color="secondary" size="small" sx={{ ml: 2 }} onClick={handleBidOpen}>
                          Bid on RFP
                        </Button>
                      </div>
                    </Typography>
                    <TableContainer component={Paper}>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Bid #</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Company</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {loading ? (
                            <TableRow><TableCell colSpan={6}>Loading...</TableCell></TableRow>
                          ) : error ? (
                            <TableRow><TableCell colSpan={6} style={{ color: 'red' }}>Error: {error.message}</TableCell></TableRow>
                          ) : data && data.bidsForRFP.length === 0 ? (
                            <TableRow><TableCell colSpan={6}>No Current Bids for the Job</TableCell></TableRow>
                          ) : (
                            data?.bidsForRFP.map((bid: any) => (
                              <TableRow key={bid.id} sx={bid.approved ? { bgcolor: isDark ? '#1b3a2a' : '#e8f5e9' } : undefined}>
                                <TableCell>
                                  <span style={{ color: '#1976d2', cursor: 'pointer', textDecoration: 'underline' }}
                                    onClick={() => { setSelectedBid(bid); setBreakdownOpen(true); }}
                                  >
                                    {bid.id}
                                  </span>
                                </TableCell>
                                <TableCell>{bid.title}</TableCell>
                                <TableCell>{bid.company}</TableCell>
                                <TableCell>{formatCurrency(bid.amount)}</TableCell>
                                <TableCell>
                                  <Chip
                                    label={bid.approved ? 'Approved' : 'Open'}
                                    color={bid.approved ? 'success' : 'default'}
                                    size="small"
                                  />
                                </TableCell>
                                <TableCell>
                                  {!bid.approved ? (
                                    <Button size="small" variant="outlined" color="success" onClick={() => handleApproveBid(bid)}>
                                      Approve Bid
                                    </Button>
                                  ) : (
                                    <Button size="small" variant="outlined" color="warning" onClick={async () => {
                                      await updateBid({ variables: { id: bid.id, input: { approved: false } } });
                                      refetch();
                                    }}>
                                      Revoke
                                    </Button>
                                  )}
                                </TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                ) : (
                  <Typography>No RFP selected.</Typography>
                )}
              </Box>
            )}

            {tab === 1 && (
              <Box>
                {acceptedBid ? (
                  <Box>
                    <Typography variant="h6">Approved Bid</Typography>
                    <Typography><b>Bid #:</b> {acceptedBid.id}</Typography>
                    <Typography><b>Title:</b> {acceptedBid.title}</Typography>
                    <Typography><b>Company:</b> {acceptedBid.company}</Typography>
                    <Typography><b>Amount:</b> {formatCurrency(acceptedBid.amount)}</Typography>
                    <Typography sx={{ mt: 2 }}><b>Source RFP:</b> {rfp ? `#${rfp.id}` : 'None'}</Typography>
                    {rfp?.status === 3 && (
                      <Box sx={{ mt: 3, display: 'flex', gap: 1 }}>
                        <Button variant="contained" color="success" onClick={handleApproveRFP}>
                          Approve RFP & Create Job
                        </Button>
                        <Button variant="outlined" color="error" onClick={handleCloseRFP}>
                          Close RFP (No Job)
                        </Button>
                      </Box>
                    )}
                    {rfp?.status === 4 && (
                      <Chip label="RFP Closed" color="default" sx={{ mt: 2 }} />
                    )}
                  </Box>
                ) : (
                  <Typography>No bid has been approved yet. Go to the RFP View tab and approve a bid first.</Typography>
                )}
              </Box>
            )}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Close</Button>
      </DialogActions>
      <CreateBidDialog open={bidOpen} onClose={handleBidClose} rfpId={rfp?.id} onCreated={handleBidCreated} />
      <BidBreakdownDialog open={breakdownOpen} onClose={() => setBreakdownOpen(false)} bid={selectedBid} />
    </Dialog>
  );
};

export default RFPDetailView;
