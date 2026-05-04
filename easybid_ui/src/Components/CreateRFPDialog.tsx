import React, { useState } from 'react';
import { useAuth } from './AuthProvider';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import type { RFPAttribute } from './RFPAttributesSection';

import { useMutation, useQuery } from '@apollo/client/react';
import { CREATE_RFP } from '../graphql/createRFP';
import { GET_JOB_TYPES, CREATE_JOB_TYPE } from '../graphql/jobTypes';

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

interface JobTypeOption {
  id?: number;
  name: string;
  inputValue?: string;
}

const jobTypeFilter = createFilterOptions<JobTypeOption>();

/** Suggested attribute presets by job type (lowercase key). */
const JOB_TYPE_PRESETS: Record<string, string[]> = {
  bleachers: ['Rows', 'Seats'],
  'fixed seating': ['Seats'],
  auditorium: ['Seats', 'Rows', 'Sections'],
  stadium: ['Rows', 'Seats', 'Sections', 'Level'],
};

const CreateRFPDialog: React.FC<CreateRFPDialogProps> = ({ open, onClose, onCreated, userName, companyName }) => {
  const { user, token } = useAuth();
  const [form, setForm] = useState(initialState);
  const [attributes, setAttributes] = useState<RFPAttribute[]>([]);
  const [editingField, setEditingField] = useState<string | null>(null);

  const { data: jobTypesData, loading: jobTypesLoading } = useQuery(GET_JOB_TYPES);
  const [createJobType] = useMutation(CREATE_JOB_TYPE, { refetchQueries: [{ query: GET_JOB_TYPES }] });

  const jobTypes: JobTypeOption[] = jobTypesData?.jobTypes ?? [];

  React.useEffect(() => {
    const fillFromAuth = async () => {
      let resolvedCompany = companyName ?? '';
      const companyId = user?.companyId;
      const companyNameFallback = (user as any)?.company;
      if (!resolvedCompany && (companyId || companyNameFallback)) {
        try {
          const url = companyId
            ? `/api/company/${encodeURIComponent(String(companyId))}`
            : `/api/company/by-name/${encodeURIComponent(String(companyNameFallback))}`;
          const headers: Record<string, string> = { 'Content-Type': 'application/json' };
          if (token) headers['Authorization'] = `Bearer ${token}`;
          const res = await fetch(url, { headers });
          if (res.ok) {
            const data = await res.json();
            resolvedCompany = data.company?.name ?? (companyNameFallback ? String(companyNameFallback) : resolvedCompany);
          }
        } catch {
          // ignore, leave resolvedCompany blank
        }
      }

      const resolvedUserName =
        userName ??
        (user
          ? user.email || ''
          : '');
      setForm(() => ({ ...initialState, User: resolvedUserName, originalCompany: resolvedCompany }));
      setAttributes([]);
    };

    if (open) fillFromAuth();
  }, [open, userName, companyName, user, token]);

  const [createRFP, { loading, error }] = useMutation(CREATE_RFP);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const input: any = { ...form };
    // Include non-empty attributes
    const cleaned = attributes.filter((a) => a.name.trim() !== '');
    if (cleaned.length > 0) {
      input.attributes = JSON.stringify(cleaned);
    }
    await createRFP({ variables: { input } });
    setForm(initialState);
    setAttributes([]);
    onClose();
    if (onCreated) onCreated();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3, minHeight: 520 } }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Typography variant="h5" fontWeight={600}>
          Create New RFP
        </Typography>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent dividers sx={{ pt: 3, pb: 3 }}>
          <Stack spacing={3}>
            {/* Row 1: User & Company */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="User"
                name="User"
                value={form.User}
                onChange={handleChange}
                fullWidth
                InputProps={{ readOnly: Boolean(userName) }}
                disabled={Boolean(userName)}
              />
              <TextField
                label="Company"
                name="originalCompany"
                value={form.originalCompany}
                onChange={handleChange}
                fullWidth
                InputProps={{ readOnly: Boolean(companyName) }}
                disabled={Boolean(companyName)}
              />
            </Box>

            {/* Row 2: Title & Job Type side by side */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Title"
                name="title"
                value={form.title}
                onChange={handleChange}
                fullWidth
                required
                sx={{ flex: 1 }}
              />
              <Autocomplete
                sx={{ flex: 1, minWidth: 280 }}
                value={
                  jobTypes.find((jt) => jt.name === form.jobType) ??
                  (form.jobType ? { name: form.jobType } : null)
                }
                onChange={async (_event, newValue) => {
                  if (typeof newValue === 'string') {
                    setForm({ ...form, jobType: newValue });
                  } else if (newValue && newValue.inputValue) {
                    try {
                      await createJobType({ variables: { name: newValue.inputValue } });
                      setForm({ ...form, jobType: newValue.inputValue });
                    } catch (err) {
                      console.error('Failed to create job type', err);
                    }
                  } else if (newValue) {
                    setForm({ ...form, jobType: newValue.name });
                  } else {
                    setForm({ ...form, jobType: '' });
                  }
                }}
                filterOptions={(options, params) => {
                  const filtered = jobTypeFilter(options, params);
                  const { inputValue } = params;
                  const isExisting = options.some(
                    (option) => inputValue.toLowerCase() === option.name.toLowerCase()
                  );
                  if (inputValue !== '' && !isExisting) {
                    filtered.push({ inputValue, name: `Create "${inputValue}"` });
                  }
                  return filtered;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                loading={jobTypesLoading}
                options={jobTypes}
                getOptionLabel={(option) => {
                  if (typeof option === 'string') return option;
                  if (option.inputValue) return option.inputValue;
                  return option.name;
                }}
                renderOption={(props, option) => {
                  const { key, ...rest } = props as any;
                  return (
                    <li key={key} {...rest}>
                      {option.inputValue ? (
                        <Typography sx={{ fontStyle: 'italic' }}>{option.name}</Typography>
                      ) : (
                        option.name
                      )}
                    </li>
                  );
                }}
                freeSolo
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Job Type"
                    placeholder="Select or type to create..."
                    fullWidth
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {jobTypesLoading ? <CircularProgress color="inherit" size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              />
            </Box>

            {/* Row 3: Dates */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Start Date"
                name="startDate"
                type="date"
                value={form.startDate}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Bids Due Date"
                name="bidsDueDate"
                type="date"
                value={form.bidsDueDate}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Box>

            {/* Row 4: Attributes */}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="subtitle2" fontWeight={600}>Attributes</Typography>
                <Tooltip title="Add attribute">
                  <IconButton size="small" onClick={() => setAttributes((prev) => [...prev, { name: '', value: '' }])} color="primary" sx={{ p: 0.25 }}>
                    <AddCircleOutlineIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                </Tooltip>
              </Box>
              {/* Quick-add suggestions */}
              {(() => {
                const jt = form.jobType.toLowerCase().trim();
                const sugs = JOB_TYPE_PRESETS[jt] ?? [];
                const used = new Set(attributes.map((a) => a.name.toLowerCase()));
                const avail = sugs.filter((s) => !used.has(s.toLowerCase()));
                if (avail.length === 0) return null;
                return (
                  <Box sx={{ display: 'flex', gap: 0.5, mb: 0.5, flexWrap: 'wrap', alignItems: 'center' }}>
                    <Typography variant="caption" color="text.secondary">Suggested:</Typography>
                    {avail.map((s) => (
                      <Button key={s} size="small" variant="text" onClick={() => setAttributes((prev) => [...prev, { name: s, value: '' }])} sx={{ fontSize: '0.7rem', py: 0, px: 0.5, minWidth: 0, textTransform: 'none' }}>
                        + {s}
                      </Button>
                    ))}
                  </Box>
                );
              })()}
              {attributes.length > 0 && (
                <Box sx={{ display: 'grid', gridTemplateRows: 'repeat(5, auto)', gridAutoFlow: 'column', gridAutoColumns: '1fr', gap: 0.5 }}>
                  {attributes.map((attr, idx) => {
                    const hasName = attr.name.trim() !== '';
                    const hasValue = String(attr.value).trim() !== '';
                    const nameEditing = editingField === `${idx}-name`;
                    const valueEditing = editingField === `${idx}-value`;
                    return (
                      <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, '&:hover .attr-del': { opacity: 1 } }}>
                        {hasName && !nameEditing ? (
                          <Typography variant="caption" sx={{ fontWeight: 600, minWidth: 60, cursor: 'pointer', lineHeight: 1.4 }}
                            onClick={() => setEditingField(`${idx}-name`)}>{attr.name}</Typography>
                        ) : (
                          <TextField variant="standard" size="small" value={attr.name} placeholder="Name" autoFocus
                            onFocus={() => setEditingField(`${idx}-name`)}
                            onBlur={() => setEditingField(null)}
                            onChange={(e) => { const next = [...attributes]; next[idx] = { ...next[idx], name: e.target.value }; setAttributes(next); }}
                            InputProps={{ disableUnderline: hasName, sx: { fontSize: '0.75rem', py: 0 } }} sx={{ flex: 1, minWidth: 60 }} />
                        )}
                        {hasName && <Typography variant="caption" color="text.secondary">:</Typography>}
                        {hasValue && !valueEditing ? (
                          <Typography variant="caption" sx={{ minWidth: 60, cursor: 'pointer', lineHeight: 1.4 }}
                            onClick={() => setEditingField(`${idx}-value`)}>{String(attr.value)}</Typography>
                        ) : (
                          <TextField variant="standard" size="small" value={String(attr.value)} placeholder="Value"
                            onFocus={() => setEditingField(`${idx}-value`)}
                            onBlur={() => setEditingField(null)}
                            onChange={(e) => {
                              const next = [...attributes]; const val = e.target.value; const num = Number(val);
                              next[idx] = { ...next[idx], value: val !== '' && !isNaN(num) ? num : val }; setAttributes(next);
                            }}
                            InputProps={{ disableUnderline: hasValue, sx: { fontSize: '0.75rem', py: 0 } }} sx={{ flex: 1, minWidth: 60 }} />
                        )}
                        <Box className="attr-del" sx={{ opacity: 0, transition: 'opacity 0.15s', display: 'flex' }}>
                          <IconButton size="small" onClick={() => setAttributes((prev) => prev.filter((_, i) => i !== idx))} sx={{ p: 0.25 }}>
                            <DeleteIcon sx={{ fontSize: 14 }} />
                          </IconButton>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              )}
            </Box>

            {/* Row 5: Description (full width) */}
            <TextField
              label="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
              fullWidth
              required
              multiline
              rows={6}
            />
          </Stack>

          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error.message}
            </Typography>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button type="submit" color="primary" variant="contained" disabled={loading}>
            {loading ? <CircularProgress size={22} color="inherit" /> : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateRFPDialog;
