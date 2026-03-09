import React, { useState } from 'react';
import { useAuth } from './AuthProvider';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useMutation } from '@apollo/client/react';
import { CREATE_RFP } from '../graphql/createRFP';

interface CreateRFPDialogProps {
  open: boolean;
  onClose: () => void;
  onCreated?: () => void;
  userName?: string;
  companyName?: string;
}

const initialState = {
  title: '',
  description: '',
  jobType: '',
  originalCompany: '',
  startDate: '',
  bidsDueDate: '',
  User: '',
  emailList: [] as string[],
  
};

const CreateRFPDialog: React.FC<CreateRFPDialogProps> = ({ open, onClose, onCreated, userName, companyName }) => {
  const { user, token } = useAuth();
  const [form, setForm] = useState(initialState);

  React.useEffect(() => {
    const fillFromAuth = async () => {
      let resolvedCompany = companyName ?? '';
      // If no companyName prop provided, try to fetch by companyId on the user
      const companyId = user?.companyId;
      const companyNameFallback = (user as any)?.company;
      if (!resolvedCompany && (companyId || companyNameFallback)) {
        try {
          const url = companyId ? `/api/company/${encodeURIComponent(String(companyId))}` : `/api/company/by-name/${encodeURIComponent(String(companyNameFallback))}`;
          const headers: Record<string, string> = { 'Content-Type': 'application/json' };
          if (token) headers['Authorization'] = `Bearer ${token}`;
          const res = await fetch(url, { headers });
          if (res.ok) {
            const data = await res.json();
            resolvedCompany = data.company?.name ?? (companyNameFallback ? String(companyNameFallback) : resolvedCompany);
          }
        } catch (e) {
          // ignore, leave resolvedCompany blank
        }
      }

      const resolvedUserName = userName ?? (user ? [ (user as any).firstName, (user as any).lastName ].filter(Boolean).join(' ') || user.email || '' : '');
      setForm(() => ({ ...initialState, User: resolvedUserName, originalCompany: resolvedCompany }));
    };

    if (open) fillFromAuth();
  }, [open, userName, companyName, user, token]);
  const [createRFP, { loading, error }] = useMutation(CREATE_RFP);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // status is set server-side to Draft on creation; no client selection provided

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const input: any = { ...form };
    await createRFP({ variables: { input } });
    setForm(initialState);
    onClose();
    if (onCreated) onCreated();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create New RFP</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField label="User" name="User" value={form.User} onChange={handleChange} fullWidth InputProps={{ readOnly: Boolean(userName) }} disabled={Boolean(userName)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Company" name="originalCompany" value={form.originalCompany} onChange={handleChange} fullWidth InputProps={{ readOnly: Boolean(companyName) }} disabled={Boolean(companyName)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Title" name="title" value={form.title} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Job Type" name="jobType" value={form.jobType} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Start Date" name="startDate" type="date" value={form.startDate} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Bids Due Date" name="bidsDueDate" type="date" value={form.bidsDueDate} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} />
            </Grid>
            <TextField label="Description" name="description" value={form.description} onChange={handleChange} fullWidth required multiline rows={6} />
          </Grid>
          {error && <div style={{ color: 'red', marginTop: 8 }}>{error.message}</div>}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">Cancel</Button>
          <Button type="submit" color="primary" variant="contained" disabled={loading}>Create</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateRFPDialog;
