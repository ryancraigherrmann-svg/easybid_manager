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
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import GavelIcon from '@mui/icons-material/Gavel';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import Tooltip from '@mui/material/Tooltip';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CircularProgress from '@mui/material/CircularProgress';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useQuery, useMutation } from '@apollo/client/react';
import { GET_BIDS_FOR_RFP } from '../graphql/bidsForRFP';
import { UPDATE_RFP_STATUS } from '../graphql/updateRFPStatus';
import { GET_EMAIL_GROUPS } from '../graphql/emailGroups';
import { useAuth } from './AuthProvider';
import { UPDATE_RFP } from '../graphql/updateRFP';
import { UPDATE_BID } from '../graphql/updateBid';
import { CREATE_JOB } from '../graphql/createJob';
import { NOTIFY_RFP_RECIPIENTS } from '../graphql/notifyRFPRecipients';
import { GET_RFPS } from '../graphql/queries';
import CreateBidDialog from './CreateBidDialog';
import BidBreakdownDialog from './BidBreakdownDialog';
import { GET_JOB_ACTIVITIES, CREATE_JOB_ACTIVITY } from '../graphql/jobActivity';
import Chip from '@mui/material/Chip';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import SendIcon from '@mui/icons-material/Send';
import { formatCurrency } from '../lib/utils';

export interface RFPDetailViewProps {
  open: boolean;
  onClose: () => void;
  rfp: any; // Replace 'any' with your RFP type if available
  onRefetchRFPs?: () => void;
  initialTab?: number;
  job?: any;
}

interface Bid {
  id: number;
  company: string;
  amount: number;
  title?: string;
  user?: string;
  info?: string;
  expectedDate?: string;
  approved?: boolean;
  lineItems?: { description: string; amount: number }[];
  createdAt?: string;
}

interface BidsForRFPData {
  bidsForRFP: Bid[];
}

// ── File upload / display section for an RFP ──────────────────────────────

interface RFPFile {
  key: string;
  name: string;
}

function parseRFPFiles(images: any): RFPFile[] {
  if (!images) return [];
  let arr: any[] = [];
  if (Array.isArray(images)) {
    arr = images;
  } else if (typeof images === 'string') {
    try { const parsed = JSON.parse(images); arr = Array.isArray(parsed) ? parsed : []; } catch { return []; }
  }
  // Support both legacy plain-string keys and new { key, name } objects
  return arr.map((item: any) => {
    if (typeof item === 'string') {
      const parts = item.split('/');
      return { key: item, name: parts[parts.length - 1] };
    }
    if (item && typeof item === 'object' && item.key) {
      return { key: item.key, name: item.name || item.key.split('/').pop() || item.key };
    }
    return null;
  }).filter(Boolean) as RFPFile[];
}

interface RFPFilesSectionProps {
  rfp: any;
  updateRfp: any;
  cardBg: string;
  onRefetchRFPs?: () => void;
  setSnackbar: (s: { open: boolean; message: string; severity: 'success' | 'error' }) => void;
}

const RFPFilesSection: React.FC<RFPFilesSectionProps> = ({ rfp, updateRfp, cardBg, onRefetchRFPs, setSnackbar }) => {
  const { token } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState<RFPFile[]>(parseRFPFiles(rfp?.images));

  // Keep local state in sync when rfp prop changes
  React.useEffect(() => {
    setFiles(parseRFPFiles(rfp?.images));
  }, [rfp?.images]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0 || !rfp?.id) return;

    setUploading(true);
    try {
      const formData = new FormData();
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append('files', selectedFiles[i]);
      }

      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch('/api/upload', { method: 'POST', headers, body: formData });
      if (!res.ok) throw new Error(`Upload failed (${res.status})`);
      const uploaded: { key: string; name: string; url: string }[] = await res.json();

      const newFiles: RFPFile[] = [...files, ...uploaded.map((u) => ({ key: u.key, name: u.name }))];
      await updateRfp({ variables: { id: rfp.id, input: { images: JSON.stringify(newFiles) } } });
      setFiles(newFiles);
      setSnackbar({ open: true, message: `${uploaded.length} file(s) uploaded.`, severity: 'success' });
      await onRefetchRFPs?.();
    } catch (err: any) {
      console.error('Upload error', err);
      setSnackbar({ open: true, message: `Upload failed: ${err.message || err}`, severity: 'error' });
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleDelete = async (key: string) => {
    if (!rfp?.id) return;
    try {
      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;
      await fetch(`/api/files/${encodeURIComponent(key)}`, { method: 'DELETE', headers });

      const newFiles = files.filter((f) => f.key !== key);
      await updateRfp({ variables: { id: rfp.id, input: { images: JSON.stringify(newFiles) } } });
      setFiles(newFiles);
      setSnackbar({ open: true, message: 'File deleted.', severity: 'success' });
      await onRefetchRFPs?.();
    } catch (err: any) {
      setSnackbar({ open: true, message: `Delete failed: ${err.message || err}`, severity: 'error' });
    }
  };

  const handleDownload = async (key: string) => {
    try {
      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const res = await fetch(`/api/files/${encodeURIComponent(key)}`, { headers });
      if (!res.ok) throw new Error('Failed to get download URL');
      const { url } = await res.json();
      window.open(url, '_blank');
    } catch (err: any) {
      setSnackbar({ open: true, message: `Download failed: ${err.message || err}`, severity: 'error' });
    }
  };

  return (
    <Box sx={{ backgroundColor: cardBg, borderRadius: 2, p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="h6">Files</Typography>
        <Button
          component="label"
          variant="outlined"
          size="small"
          startIcon={uploading ? <CircularProgress size={16} /> : <CloudUploadIcon />}
          disabled={uploading}
        >
          {uploading ? 'Uploading…' : 'Upload Files'}
          <input type="file" hidden multiple onChange={handleUpload} />
        </Button>
      </Box>
      {files.length > 0 ? (
        <Table size="small">
          <TableBody>
            {files.map((file) => (
              <TableRow key={file.key} hover>
                <TableCell sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <InsertDriveFileIcon fontSize="small" color="action" />
                  <Typography variant="body2" noWrap title={file.name}>{file.name}</Typography>
                </TableCell>
                <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                  <Tooltip title="Download">
                    <IconButton size="small" onClick={() => handleDownload(file.key)}>
                      <DownloadIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton size="small" onClick={() => handleDelete(file.key)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          No files uploaded yet. Click "Upload Files" to attach documents.
        </Typography>
      )}
    </Box>
  );
};

// ── Job Activity View (chronological messages / file uploads) ─────────────

interface JobActivityViewProps {
  rfp: any;
  cardBg: string;
  token: string | null;
  setSnackbar: (s: { open: boolean; message: string; severity: 'success' | 'error' }) => void;
}

const JobActivityView: React.FC<JobActivityViewProps> = ({ rfp, cardBg, token, setSnackbar }) => {
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);

  const { data: activityData, loading: activityLoading, refetch: refetchActivities } = useQuery<{ jobActivities: any[] }>(GET_JOB_ACTIVITIES, {
    variables: { rfpId: rfp?.id },
    skip: !rfp?.id || rfp?.status !== 4,
    fetchPolicy: 'network-only',
  });
  const [createActivity] = useMutation(CREATE_JOB_ACTIVITY);

  const entries = activityData?.jobActivities ?? [];

  const handleSendMessage = async () => {
    const text = message.trim();
    if (!text || !rfp?.id) return;
    try {
      await createActivity({
        variables: {
          input: {
            rfpId: rfp.id,
            type: 'message',
            content: text,
          },
        },
      });
      setMessage('');
      refetchActivities();
    } catch (err: any) {
      setSnackbar({ open: true, message: `Failed to send message: ${err.message || err}`, severity: 'error' });
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !rfp?.id) return;
    setUploading(true);
    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) formData.append('files', files[i]);
      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const res = await fetch('/api/upload', { method: 'POST', headers, body: formData });
      if (!res.ok) throw new Error(`Upload failed (${res.status})`);
      const uploaded: { key: string; name: string }[] = await res.json();
      for (const u of uploaded) {
        await createActivity({
          variables: {
            input: {
              rfpId: rfp.id,
              type: 'file',
              content: `Uploaded file: ${u.name}`,
              fileName: u.name,
              fileKey: u.key,
            },
          },
        });
      }
      refetchActivities();
      setSnackbar({ open: true, message: `${uploaded.length} file(s) uploaded.`, severity: 'success' });
    } catch (err: any) {
      setSnackbar({ open: true, message: `Upload failed: ${err.message || err}`, severity: 'error' });
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleDownload = async (key: string) => {
    try {
      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const res = await fetch(`/api/files/${encodeURIComponent(key)}`, { headers });
      if (!res.ok) throw new Error('Failed to get download URL');
      const { url } = await res.json();
      window.open(url, '_blank');
    } catch (err: any) {
      setSnackbar({ open: true, message: `Download failed: ${err.message || err}`, severity: 'error' });
    }
  };

  if (!rfp) return <Typography>No RFP selected.</Typography>;
  if (rfp.status !== 4) return (
    <Box sx={{ p: 2 }}>
      <Typography color="text.secondary">The Job View is available once a bid has been selected and the RFP is closed.</Typography>
    </Box>
  );

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>Job Activity</Typography>

      {/* Chronological activity feed */}
      <Box sx={{ maxHeight: 400, overflowY: 'auto', mb: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
        {activityLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}><CircularProgress size={24} /></Box>
        )}
        {!activityLoading && entries.length === 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ p: 2, textAlign: 'center' }}>
            No activity yet. Post a message or upload a file to get started.
          </Typography>
        )}
        {entries.map((entry: any) => (
          <Box key={entry.id} sx={{ backgroundColor: cardBg, borderRadius: 2, p: 1.5, borderLeft: entry.type === 'file' ? '3px solid #1976d2' : '3px solid #4caf50' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>{entry.author}</Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(entry.createdAt).toLocaleString()}
              </Typography>
            </Box>
            {entry.type === 'message' ? (
              <Typography variant="body2">{entry.content}</Typography>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <InsertDriveFileIcon fontSize="small" color="action" />
                <Typography variant="body2">{entry.fileName}</Typography>
                {entry.fileKey && (
                  <IconButton size="small" onClick={() => handleDownload(entry.fileKey)}>
                    <DownloadIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>
            )}
          </Box>
        ))}
      </Box>

      {/* Input area */}
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
        <TextField
          fullWidth
          multiline
          maxRows={4}
          size="small"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
        <Button variant="contained" size="small" onClick={handleSendMessage} disabled={!message.trim()}>
          <SendIcon fontSize="small" />
        </Button>
        <Button component="label" variant="outlined" size="small" disabled={uploading}>
          {uploading ? <CircularProgress size={16} /> : <AttachFileIcon fontSize="small" />}
          <input type="file" hidden multiple onChange={handleFileUpload} />
        </Button>
      </Box>
    </Box>
  );
};

// ── Main RFP Detail View ──────────────────────────────────────────────────

/** Safely parse a date value that may be an ISO string, a numeric timestamp, or a stringified number. */
function formatDate(value: any): string {
  if (!value) return '';
  const d = isNaN(Number(value)) ? new Date(value) : new Date(Number(value));
  return isNaN(d.getTime()) ? '' : d.toLocaleDateString();
}

const RFPDetailView: React.FC<RFPDetailViewProps> = ({ open, onClose, rfp, onRefetchRFPs, initialTab, job }) => {
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

  const [tab, setTab] = useState<number>(initialTab ?? 0);

  React.useEffect(() => {
    if (open) setTab(initialTab ?? 0);
  }, [open, initialTab]);
  const [selectedBid, setSelectedBid] = useState<any | null>(null);
  const [breakdownOpen, setBreakdownOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editFields, setEditFields] = useState({
    title: '',
    description: '',
    jobType: '',
    originalCompany: '',
    startDate: '',
    bidsDueDate: '',
  });
  const [emailList, setEmailList] = useState<string[]>(rfp?.emailList ?? []);
  const [newEmail, setNewEmail] = useState('');
  const [selectedEmailGroup, setSelectedEmailGroup] = useState<number | ''>(rfp?.emailGroupId ?? '');
  const [selectedGroupEmails, setSelectedGroupEmails] = useState<string[]>([]);
  const [emailsSaved, setEmailsSaved] = useState(true); // tracks if local list matches persisted

  const { user, token } = useAuth();
  const companyVar = user?.companyId ? String(user.companyId) : undefined;
  const { data: emailGroupsData } = useQuery(GET_EMAIL_GROUPS, { variables: { company: companyVar } });
  const [updateRfp] = useMutation(UPDATE_RFP);
  const [updateBid] = useMutation(UPDATE_BID);
  const [createJob] = useMutation(CREATE_JOB);
  const [notifyRecipients, { loading: notifyLoading }] = useMutation(NOTIFY_RFP_RECIPIENTS, {
    refetchQueries: [{ query: GET_RFPS }],
    awaitRefetchQueries: true,
  });
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });

  // Determine if the current user is the RFP owner (vs a recipient/bidder)
  // Owner: their company matches originalCompany. Recipient: their email is in emailList.
  const isOwner = React.useMemo(() => {
    if (!user || !rfp) return false;
    const userEmail = user.email?.toLowerCase() ?? '';
    const rfpEmails: string[] = Array.isArray(rfp.emailList) ? rfp.emailList.map((e: string) => e.toLowerCase()) : [];
    // If user's email is in the recipient list, they are a recipient, not the owner
    if (rfpEmails.includes(userEmail)) return false;
    // Otherwise they can see it because they're the owner / owner's company
    return true;
  }, [user, rfp]);

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
    setEmailsSaved(true);
    setEditing(false);
  }, [rfp]);

  React.useEffect(() => {
    if (editing && rfp) {
      const fmtDate = (v: any) => {
        if (!v) return '';
        const d = isNaN(Number(v)) ? new Date(v) : new Date(Number(v));
        return isNaN(d.getTime()) ? '' : d.toISOString().slice(0, 10);
      };
      setEditFields({
        title: rfp.title || '',
        description: rfp.description || '',
        jobType: rfp.jobType || '',
        originalCompany: rfp.originalCompany || '',
        startDate: fmtDate(rfp.startDate),
        bidsDueDate: fmtDate(rfp.bidsDueDate),
      });
    }
  }, [editing, rfp]);
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

  const handleSaveDetails = async () => {
    if (!rfp?.id) return;
    try {
      await updateRfp({
        variables: {
          id: rfp.id,
          input: {
            title: editFields.title || null,
            description: editFields.description || null,
            jobType: editFields.jobType || null,
            originalCompany: editFields.originalCompany || null,
            startDate: editFields.startDate || null,
            bidsDueDate: editFields.bidsDueDate || null,
          },
        },
      });
      setEditing(false);
      setSnackbar({ open: true, message: 'RFP details saved.', severity: 'success' });
      await onRefetchRFPs?.();
    } catch (e: any) {
      setSnackbar({ open: true, message: `Failed to save: ${e.message || e}`, severity: 'error' });
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
            <Tab label="Bid View" />
            <Tab label="Job View" />
          </Tabs>
          <Divider />
          <Box sx={{ p: 2, minHeight: 300 }}>
            {tab === 0 && (
              <Box>
                {rfp ? (
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr' }, gap: 2 }}>
                    <Box sx={{ backgroundColor: cardBg, borderRadius: 2, p: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="h6">Details</Typography>
                        {isOwner && !editing && (
                          <Button size="small" variant="outlined" onClick={() => setEditing(true)}>Edit</Button>
                        )}
                        {editing && (
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button size="small" variant="contained" color="primary" onClick={handleSaveDetails}>Save</Button>
                            <Button size="small" variant="outlined" onClick={() => setEditing(false)}>Cancel</Button>
                          </Box>
                        )}
                      </Box>
                      <Box sx={{ mt: 1, display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 1 }}>
                        <Box>
                          <Typography sx={{ fontWeight: 600 }}>Title</Typography>
                          {editing ? (
                            <TextField size="small" fullWidth value={editFields.title} onChange={(e) => setEditFields(f => ({ ...f, title: e.target.value }))} />
                          ) : (
                            <Typography>{rfp.title}</Typography>
                          )}

                          <Typography sx={{ fontWeight: 600, mt: 1 }}>Status</Typography>
                          <Typography>{rfp.status === 1 ? 'Draft' : rfp.status === 2 ? 'Receiving Bids' : rfp.status === 3 ? 'In Process' : rfp.status === 4 ? 'Bid Selected' : ''}</Typography>

                          <Typography sx={{ fontWeight: 600, mt: 1 }}>Job Type</Typography>
                          {editing ? (
                            <TextField size="small" fullWidth value={editFields.jobType} onChange={(e) => setEditFields(f => ({ ...f, jobType: e.target.value }))} />
                          ) : (
                            <Typography>{rfp.jobType}</Typography>
                          )}
                        </Box>

                        <Box>
                          <Typography sx={{ fontWeight: 600 }}>Company</Typography>
                          {editing ? (
                            <TextField size="small" fullWidth value={editFields.originalCompany} onChange={(e) => setEditFields(f => ({ ...f, originalCompany: e.target.value }))} />
                          ) : (
                            <Typography>{rfp.originalCompany}</Typography>
                          )}

                          <Typography sx={{ fontWeight: 600, mt: 1 }}>Start Date</Typography>
                          {editing ? (
                            <TextField size="small" fullWidth type="date" InputLabelProps={{ shrink: true }} value={editFields.startDate} onChange={(e) => setEditFields(f => ({ ...f, startDate: e.target.value }))} />
                          ) : (
                            <Typography>{formatDate(rfp.startDate)}</Typography>
                          )}

                          <Typography sx={{ fontWeight: 600, mt: 1 }}>Bids Due Date</Typography>
                          {editing ? (
                            <TextField size="small" fullWidth type="date" InputLabelProps={{ shrink: true }} value={editFields.bidsDueDate} onChange={(e) => setEditFields(f => ({ ...f, bidsDueDate: e.target.value }))} />
                          ) : (
                            <Typography>{formatDate(rfp.bidsDueDate)}</Typography>
                          )}
                        </Box>

                        <Box sx={{ gridColumn: '1 / -1', mt: 1 }}>
                          <Typography sx={{ fontWeight: 600 }}>User</Typography>
                          <Typography>{rfp.User}</Typography>

                          <Typography sx={{ fontWeight: 600, mt: 1 }}>Description</Typography>
                          {editing ? (
                            <TextField size="small" fullWidth multiline rows={3} value={editFields.description} onChange={(e) => setEditFields(f => ({ ...f, description: e.target.value }))} />
                          ) : (
                            <Typography>{rfp.description}</Typography>
                          )}
                        </Box>
                      </Box>
                    </Box>

                    {isOwner && <Box sx={{ backgroundColor: cardBg, borderRadius: 2, p: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="h6">Email Recipients</Typography>
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                          {/* Saved / Unsaved indicator */}
                          {emailsSaved ? (
                            <Chip label="Saved" color="success" size="small" variant="outlined" />
                          ) : (
                            <Chip label="Unsaved changes" color="warning" size="small" />
                          )}
                          {/* Notification status */}
                          {rfp?.notifiedAt ? (
                            <Chip
                              label={`Notified ${new Date(rfp.notifiedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}`}
                              color="info"
                              size="small"
                              variant="outlined"
                            />
                          ) : (
                            <Chip label="Not yet notified" size="small" variant="outlined" />
                          )}
                        </Box>
                      </Box>

                      {/* Linked email group display */}
                      {rfp?.emailGroup && (
                        <Box sx={{ mb: 1, p: 1, borderRadius: 1, backgroundColor: isDark ? '#223d55' : '#e3f2fd' }}>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            Linked Group: <Chip label={`${rfp.emailGroup.name} (${rfp.emailGroup.emails?.length || 0} emails)`} size="small" color="primary" variant="outlined" />
                          </Typography>
                        </Box>
                      )}

                      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1, mt: 1, flexWrap: 'wrap' }}>
                        <FormControl sx={{ minWidth: 220 }} size="small">
                          <InputLabel id="email-group-label">Email Group</InputLabel>
                          <Select
                            labelId="email-group-label"
                            label="Email Group"
                            value={selectedEmailGroup}
                            onChange={(e: any) => {
                              setSelectedEmailGroup(e.target.value === '' ? '' : Number(e.target.value));
                              setEmailsSaved(false);
                            }}
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
                          setEmailsSaved(false);
                        }} disabled={selectedGroupEmails.length === 0}>
                          Add Group
                        </Button>
                        <TextField size="small" label="Add Email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              const email = (newEmail || '').trim();
                              if (!email) return;
                              setEmailList(Array.isArray(emailList) ? [...emailList, email] : [email]);
                              setNewEmail('');
                              setEmailsSaved(false);
                            }
                          }}
                        />
                        <Button variant="outlined" size="small" onClick={() => {
                          const email = (newEmail || '').trim();
                          if (!email) return;
                          setEmailList(Array.isArray(emailList) ? [...emailList, email] : [email]);
                          setNewEmail('');
                          setEmailsSaved(false);
                        }}>Add</Button>
                      </Box>

                      {/* Action buttons row */}
                      <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                        <Button variant="contained" size="small" color="primary" disabled={emailsSaved} onClick={async () => {
                          if (!rfp?.id) return;
                          try {
                            await updateRfp({ variables: { id: rfp.id, input: { emailList, emailGroupId: selectedEmailGroup === '' ? null : selectedEmailGroup } } });
                            setEmailsSaved(true);
                            setSnackbar({ open: true, message: 'Email recipients saved.', severity: 'success' });
                            await onRefetchRFPs?.();
                          } catch (e: any) {
                            setSnackbar({ open: true, message: `Failed to save emails: ${e.message || e}`, severity: 'error' });
                          }
                        }}>Save</Button>
                        <Button
                          variant="contained"
                          size="small"
                          color="success"
                          startIcon={<SendIcon />}
                          disabled={notifyLoading || !emailList || emailList.length === 0}
                          onClick={async () => {
                            if (!rfp?.id || !emailList || emailList.length === 0) return;
                            try {
                              // Save emails first, then notify all
                              await updateRfp({ variables: { id: rfp.id, input: { emailList, emailGroupId: selectedEmailGroup === '' ? null : selectedEmailGroup } } });
                              await notifyRecipients({ variables: { rfpId: rfp.id, emails: emailList } });
                              setEmailsSaved(true);
                              setSnackbar({ open: true, message: `Notification sent to ${emailList.length} recipient(s)!`, severity: 'success' });
                              await onRefetchRFPs?.();
                            } catch (e: any) {
                              setSnackbar({ open: true, message: `Failed to notify: ${e.message || e}`, severity: 'error' });
                            }
                          }}
                        >
                          {notifyLoading ? 'Sending...' : 'Notify All'}
                        </Button>
                        {/* Notify only new (un-notified) emails */}
                        {(() => {
                          const notifiedSet = new Set((rfp?.notifiedEmails ?? []).map((e: string) => e.toLowerCase()));
                          const unnotified = (emailList ?? []).filter(e => !notifiedSet.has(e.toLowerCase()));
                          return unnotified.length > 0 ? (
                            <Button
                              variant="outlined"
                              size="small"
                              color="info"
                              startIcon={<SendIcon />}
                              disabled={notifyLoading || !emailsSaved}
                              onClick={async () => {
                                if (!rfp?.id) return;
                                try {
                                  await notifyRecipients({ variables: { rfpId: rfp.id, emails: unnotified } });
                                  setSnackbar({ open: true, message: `Notification sent to ${unnotified.length} new recipient(s)!`, severity: 'success' });
                                  await onRefetchRFPs?.();
                                } catch (e: any) {
                                  setSnackbar({ open: true, message: `Failed to notify: ${e.message || e}`, severity: 'error' });
                                }
                              }}
                            >
                              {`Notify New (${unnotified.length})`}
                            </Button>
                          ) : null;
                        })()}
                      </Box>

                      {/* Email recipients table */}
                      {emailList && emailList.length > 0 ? (
                        <TableContainer component={Paper} variant="outlined" sx={{ maxHeight: 260 }}>
                          <Table size="small" stickyHeader>
                            <TableHead>
                              <TableRow>
                                <TableCell>Email</TableCell>
                                <TableCell align="center" sx={{ width: 70 }}>Saved</TableCell>
                                <TableCell align="center" sx={{ width: 80 }}>Notified</TableCell>
                                <TableCell align="center" sx={{ width: 100 }}>Bid Placed</TableCell>
                                <TableCell align="center" sx={{ width: 50 }}></TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {emailList.map((e: string, idx: number) => {
                                const emailLower = e.toLowerCase();
                                const isSaved = Array.isArray(rfp?.emailList) && rfp.emailList.some((s: string) => s.toLowerCase() === emailLower);
                                const isNotified = Array.isArray(rfp?.notifiedEmails) && rfp.notifiedEmails.some((n: string) => n.toLowerCase() === emailLower);
                                // Match bid by user field (email or display name) or by company name
                                const matchingBid = data?.bidsForRFP?.find((b: any) => {
                                  if (b.user && b.user.toLowerCase() === emailLower) return true;
                                  // Also check if the email domain matches the bid's company-associated email
                                  // e.g. email "tom@brightsparkelec.com" and bid.user "Tom@brightsparkelec.com"
                                  if (b.user && emailLower.includes('@') && b.user.toLowerCase().includes('@')) {
                                    // Match by email domain
                                    const emailDomain = emailLower.split('@')[1];
                                    const bidDomain = b.user.toLowerCase().split('@')[1];
                                    if (emailDomain && bidDomain && emailDomain === bidDomain) return true;
                                  }
                                  return false;
                                });
                                const hasBid = !!matchingBid;
                                return (
                                  <TableRow key={`${e}-${idx}`} hover>
                                    <TableCell>
                                      <Typography variant="body2">{e}</Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                      {isSaved ? (
                                        <Tooltip title="Saved" arrow>
                                          <CheckCircleIcon sx={{ fontSize: 18, color: 'success.main' }} />
                                        </Tooltip>
                                      ) : (
                                        <Tooltip title="Not saved yet" arrow>
                                          <RadioButtonUncheckedIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
                                        </Tooltip>
                                      )}
                                    </TableCell>
                                    <TableCell align="center">
                                      {isNotified ? (
                                        <Tooltip title={`Notified${rfp?.notifiedAt ? ` ${new Date(rfp.notifiedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}` : ''}`} arrow>
                                          <NotificationsActiveIcon sx={{ fontSize: 18, color: 'info.main' }} />
                                        </Tooltip>
                                      ) : (
                                        <Tooltip title="Not yet notified" arrow>
                                          <RadioButtonUncheckedIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
                                        </Tooltip>
                                      )}
                                    </TableCell>
                                    <TableCell align="center">
                                      {hasBid ? (
                                        <Tooltip title={`Bid #${matchingBid.id} – ${formatCurrency(matchingBid.amount)}`} arrow>
                                          <GavelIcon sx={{ fontSize: 18, color: 'warning.main' }} />
                                        </Tooltip>
                                      ) : (
                                        <Tooltip title="No bid submitted" arrow>
                                          <RadioButtonUncheckedIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
                                        </Tooltip>
                                      )}
                                    </TableCell>
                                    <TableCell align="center">
                                      <IconButton size="small" aria-label="delete" onClick={() => {
                                        setEmailList(emailList.filter((_: string, i: number) => i !== idx));
                                        setEmailsSaved(false);
                                      }}>
                                        <DeleteIcon fontSize="small" />
                                      </IconButton>
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      ) : (
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          No email recipients added yet. Use the fields above to add individual emails or an email group.
                        </Typography>
                      )}
                    </Box>}

                    <RFPFilesSection rfp={rfp} updateRfp={updateRfp} cardBg={cardBg} onRefetchRFPs={onRefetchRFPs} setSnackbar={setSnackbar} />
                  </Box>
                ) : (
                  <Typography>No RFP selected.</Typography>
                )}
              </Box>
            )}

            {/* ── Bid View Tab ── */}
            {tab === 1 && (
              <Box>
                {isOwner ? (
                  <Box>
                    {/* Show approved bid detail at top when RFP is closed */}
                    {rfp?.status === 4 && (() => {
                      const approvedBids = data?.bidsForRFP?.filter((b: any) => b.approved) ?? [];
                      if (approvedBids.length === 0) return (
                        <Box sx={{ backgroundColor: cardBg, borderRadius: 2, p: 2, mb: 2 }}>
                          <Typography color="text.secondary">RFP closed with no approved bids.</Typography>
                        </Box>
                      );
                      if (approvedBids.length === 1) {
                        const bid = approvedBids[0];
                        const items = bid.lineItems || [];
                        const total = items.reduce((s: number, it: any) => s + (it.amount || 0), 0) || bid.amount || 0;
                        return (
                          <Box sx={{ backgroundColor: isDark ? '#1b3a2a' : '#e8f5e9', borderRadius: 2, p: 2, mb: 2 }}>
                            <Typography variant="h6" sx={{ mb: 1 }}>Approved Bid</Typography>
                            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
                              <Typography><b>Bid #:</b> {bid.id}</Typography>
                              <Typography><b>Company:</b> {bid.company}</Typography>
                              <Typography><b>Title:</b> {bid.title}</Typography>
                              <Typography><b>Amount:</b> {formatCurrency(bid.amount)}</Typography>
                              <Typography><b>User:</b> {bid.user}</Typography>
                              <Typography><b>Expected Date:</b> {bid.expectedDate ? new Date(bid.expectedDate).toLocaleDateString() : 'N/A'}</Typography>
                            </Box>
                            {items.length > 0 && (
                              <TableContainer component={Paper} sx={{ mt: 2 }}>
                                <Table size="small">
                                  <TableHead>
                                    <TableRow>
                                      <TableCell>Description</TableCell>
                                      <TableCell>Amount</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {items.map((it: any, i: number) => (
                                      <TableRow key={i}>
                                        <TableCell>{it.description}</TableCell>
                                        <TableCell>{formatCurrency(it.amount)}</TableCell>
                                      </TableRow>
                                    ))}
                                    <TableRow>
                                      <TableCell><b>Total</b></TableCell>
                                      <TableCell><b>{formatCurrency(total)}</b></TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            )}
                            <Chip label="RFP Closed" color="default" sx={{ mt: 2 }} />
                          </Box>
                        );
                      }
                      // Multiple approved bids
                      return (
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="h6" sx={{ mb: 1 }}>Approved Bids</Typography>
                          {approvedBids.map((bid: any) => (
                            <Box key={bid.id} sx={{ backgroundColor: isDark ? '#1b3a2a' : '#e8f5e9', borderRadius: 2, p: 2, mb: 1, cursor: 'pointer', '&:hover': { opacity: 0.9 } }}
                              onClick={() => { setSelectedBid(bid); setBreakdownOpen(true); }}
                            >
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box>
                                  <Typography sx={{ fontWeight: 600 }}>Bid #{bid.id} — {bid.company}</Typography>
                                  <Typography variant="body2">{bid.title} &bull; {formatCurrency(bid.amount)}</Typography>
                                </Box>
                                <Chip label="Approved" color="success" size="small" />
                              </Box>
                            </Box>
                          ))}
                          <Chip label="RFP Closed" color="default" sx={{ mt: 1 }} />
                        </Box>
                      );
                    })()}

                    {/* Status action buttons & bid table */}
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="h6">Bids for this RFP</Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {rfp?.status === 1 && (
                          <Button variant="contained" color="primary" size="small" onClick={() => handleSetStatus(2)}>
                            Send Out Bid Requests
                          </Button>
                        )}
                        {rfp?.status === 2 && (
                          <Button variant="contained" color="primary" size="small" onClick={() => handleSetStatus(3)}>
                            Done Receiving Bids
                          </Button>
                        )}
                        {rfp?.status === 3 && (
                          <>
                            <Button
                              variant="contained"
                              color="success"
                              size="small"
                              disabled={!acceptedBid}
                              onClick={handleApproveRFP}
                            >
                              Approve RFP & Create Job
                            </Button>
                            <Button
                              variant="outlined"
                              color="error"
                              size="small"
                              onClick={handleCloseRFP}
                            >
                              Close RFP (No Job)
                            </Button>
                          </>
                        )}
                        <Button variant="contained" color="secondary" size="small" onClick={handleBidOpen}>
                          Bid on RFP
                        </Button>
                      </Box>
                    </Box>
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
                  /* Recipient view: only see own bids */
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="h6">Your Bid</Typography>
                      <Button variant="contained" color="secondary" size="small" onClick={handleBidOpen}>
                        Bid on RFP
                      </Button>
                    </Box>
                    {(() => {
                      const userEmail = user?.email?.toLowerCase() ?? '';
                      const userDisplay = [user?.firstName, user?.lastName].filter(Boolean).join(' ').toLowerCase();
                      const myBids = data?.bidsForRFP?.filter((b: any) => {
                        const bidUser = (b.user ?? '').toLowerCase();
                        if (bidUser === userEmail) return true;
                        if (userDisplay && bidUser === userDisplay) return true;
                        return false;
                      }) ?? [];
                      if (loading) return <Typography variant="body2">Loading...</Typography>;
                      if (myBids.length === 0) return (
                        <Typography variant="body2" color="text.secondary">
                          You haven't submitted a bid yet. Click "Bid on RFP" to submit yours.
                        </Typography>
                      );
                      return (
                        <TableContainer component={Paper}>
                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell>Bid #</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Submitted</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {myBids.map((bid: any) => (
                                <TableRow key={bid.id}>
                                  <TableCell>
                                    <span style={{ color: '#1976d2', cursor: 'pointer', textDecoration: 'underline' }}
                                      onClick={() => { setSelectedBid(bid); setBreakdownOpen(true); }}
                                    >
                                      {bid.id}
                                    </span>
                                  </TableCell>
                                  <TableCell>{formatCurrency(bid.amount)}</TableCell>
                                  <TableCell>
                                    <Chip
                                      label={bid.approved ? 'Approved' : 'Submitted'}
                                      color={bid.approved ? 'success' : 'info'}
                                      size="small"
                                    />
                                  </TableCell>
                                  <TableCell>{bid.createdAt ? new Date(bid.createdAt).toLocaleDateString() : ''}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      );
                    })()}
                  </Box>
                )}
              </Box>
            )}

            {/* ── Job View Tab ── */}
            {tab === 2 && (
              <Box>
                {job && (
                  <Box sx={{ backgroundColor: cardBg, borderRadius: 2, p: 2, mb: 2 }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>Job Details</Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 1 }}>
                      <Box>
                        <Typography sx={{ fontWeight: 600 }}>Title</Typography>
                        <Typography>{job.title}</Typography>
                      </Box>
                      <Box>
                        <Typography sx={{ fontWeight: 600 }}>Company</Typography>
                        <Typography>{job.company}</Typography>
                      </Box>
                      <Box>
                        <Typography sx={{ fontWeight: 600 }}>Job Type</Typography>
                        <Typography>{job.jobType}</Typography>
                      </Box>
                      <Box>
                        <Typography sx={{ fontWeight: 600 }}>Start Date</Typography>
                        <Typography>{job.startDate ? new Date(job.startDate).toLocaleDateString() : ''}</Typography>
                      </Box>
                      <Box>
                        <Typography sx={{ fontWeight: 600 }}>Days Expected</Typography>
                        <Typography>{job.daysExpected ?? ''}</Typography>
                      </Box>
                      <Box sx={{ gridColumn: '1 / -1' }}>
                        <Typography sx={{ fontWeight: 600 }}>Description</Typography>
                        <Typography>{job.description}</Typography>
                      </Box>
                    </Box>
                  </Box>
                )}
                <JobActivityView rfp={rfp} cardBg={cardBg} token={token} setSnackbar={setSnackbar} />
              </Box>
            )}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Close</Button>
      </DialogActions>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      <CreateBidDialog open={bidOpen} onClose={handleBidClose} rfpId={rfp?.id} onCreated={handleBidCreated} />
      <BidBreakdownDialog open={breakdownOpen} onClose={() => setBreakdownOpen(false)} bid={selectedBid} />
    </Dialog>
  );
};

export default RFPDetailView;
