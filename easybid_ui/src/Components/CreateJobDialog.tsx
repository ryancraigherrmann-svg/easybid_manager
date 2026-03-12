import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { useMutation, useQuery } from '@apollo/client/react';
import { CREATE_JOB } from '../graphql/createJob';
import { GET_JOBS } from '../graphql/jobs';
import { GET_JOB_TYPES, CREATE_JOB_TYPE } from '../graphql/jobTypes';

interface CreateJobDialogProps {
  open: boolean;
  onClose: () => void;
  onCreated?: () => void;
}

const initialState = {
  title: '',
  description: '',
  rfpId: '',
  jobType: '',
  startDate: '',
  daysExpected: '',
  company: ''
};

interface JobTypeOption {
  id?: number;
  name: string;
  inputValue?: string;
}

const jobTypeFilter = createFilterOptions<JobTypeOption>();

const CreateJobDialog: React.FC<CreateJobDialogProps> = ({ open, onClose, onCreated }) => {
  const [form, setForm] = useState(initialState);
  const [createJob, { loading, error }] = useMutation(CREATE_JOB, { refetchQueries: [{ query: GET_JOBS }] });
  const { data: jobTypesData } = useQuery(GET_JOB_TYPES);
  const [createJobType] = useMutation(CREATE_JOB_TYPE, { refetchQueries: [{ query: GET_JOB_TYPES }] });

  const jobTypes: JobTypeOption[] = jobTypesData?.jobTypes ?? [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const variables = {
      input: {
        title: form.title,
        description: form.description || null,
        rfpId: form.rfpId ? parseInt(form.rfpId, 10) : null,
        jobType: form.jobType || null,
        startDate: form.startDate || null,
        daysExpected: form.daysExpected ? parseInt(form.daysExpected, 10) : null,
        company: form.company || null,
      }
    };

    try {
      await createJob({ variables });
      setForm(initialState);
      onClose();
      if (onCreated) onCreated();
    } catch (err) {
      console.error('CreateJob mutation variables:', variables);
      console.error('CreateJob mutation error:', err);
      throw err;
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Create Job</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField autoFocus margin="dense" label="Title" name="title" value={form.title} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid size={12}>
              <TextField margin="dense" label="Description" name="description" value={form.description} onChange={handleChange} fullWidth multiline rows={3} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                margin="dense"
                label="RFP ID (optional)"
                name="rfpId"
                value={form.rfpId}
                onChange={handleChange}
                fullWidth
                placeholder="Leave blank for no RFP"
                helperText="Leave empty if this job is not tied to an RFP"
              />
            </Grid>
            <Box sx={{ width: '100%', mt: 2 }}>
              <Autocomplete
                sx={{ width: '100%' }}
                value={jobTypes.find((jt) => jt.name === form.jobType) ?? (form.jobType ? { name: form.jobType } : null)}
                onChange={async (_event, newValue) => {
                  if (typeof newValue === 'string') {
                    setForm((f) => ({ ...f, jobType: newValue }));
                  } else if (newValue && newValue.inputValue) {
                    try {
                      await createJobType({ variables: { name: newValue.inputValue } });
                      setForm((f) => ({ ...f, jobType: newValue.inputValue! }));
                    } catch (err) {
                      console.error('Failed to create job type', err);
                    }
                  } else if (newValue) {
                    setForm((f) => ({ ...f, jobType: newValue.name }));
                  } else {
                    setForm((f) => ({ ...f, jobType: '' }));
                  }
                }}
                filterOptions={(options, params) => {
                  const filtered = jobTypeFilter(options, params);
                  const { inputValue } = params;
                  const isExisting = options.some((option) => inputValue.toLowerCase() === option.name.toLowerCase());
                  if (inputValue !== '' && !isExisting) {
                    filtered.push({ inputValue, name: `Create "${inputValue}"` });
                  }
                  return filtered;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                options={jobTypes}
                getOptionLabel={(option) => {
                  if (typeof option === 'string') return option;
                  if (option.inputValue) return option.inputValue;
                  return option.name;
                }}
                renderOption={(props, option) => {
                  const { key, ...rest } = props as any;
                  return <li key={key} {...rest}>{option.name}</li>;
                }}
                freeSolo
                renderInput={(params) => <TextField {...params} margin="dense" label="Job Type" fullWidth />}
              />
            </Box>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField margin="dense" label="Start Date" name="startDate" type="date" value={form.startDate} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField margin="dense" label="Days Expected" name="daysExpected" value={form.daysExpected} onChange={handleChange} fullWidth />
            </Grid>
            <Grid size={12}>
              <TextField margin="dense" label="Company" name="company" value={form.company} onChange={handleChange} fullWidth />
            </Grid>
          </Grid>
          {error && <div style={{ color: 'red', marginTop: 8 }}>{(error as any).message}</div>}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={loading}>Create</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateJobDialog;
