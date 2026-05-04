import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';

export interface RFPAttribute {
  name: string;
  value: string | number;
}

/** Safely parse attributes from the RFP's JSON string / object field. */
export function parseAttributes(raw: any): RFPAttribute[] {
  if (!raw) return [];
  let arr: any[];
  if (Array.isArray(raw)) {
    arr = raw;
  } else if (typeof raw === 'string') {
    try {
      const parsed = JSON.parse(raw);
      arr = Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  } else {
    return [];
  }
  return arr
    .filter((a: any) => a && typeof a === 'object' && typeof a.name === 'string')
    .map((a: any) => ({ name: a.name, value: a.value ?? '' }));
}

/** Suggested attribute presets by job type (lowercase key). */
const JOB_TYPE_PRESETS: Record<string, string[]> = {
  bleachers: ['Rows', 'Seats'],
  'fixed seating': ['Seats'],
  auditorium: ['Seats', 'Rows', 'Sections'],
  stadium: ['Rows', 'Seats', 'Sections', 'Level'],
};

interface RFPAttributesSectionProps {
  rfp: any;
  updateRfp: (opts: { variables: { id: number; input: any } }) => Promise<any>;
  cardBg: string;
  isOwner: boolean;
  onRefetchRFPs?: () => void;
  setSnackbar: (s: { open: boolean; message: string; severity: 'success' | 'error' }) => void;
}

const RFPAttributesSection: React.FC<RFPAttributesSectionProps> = ({
  rfp,
  updateRfp,
  cardBg,
  isOwner,
  onRefetchRFPs,
  setSnackbar,
}) => {
  const [attributes, setAttributes] = useState<RFPAttribute[]>(parseAttributes(rfp?.attributes));
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);

  // Sync when rfp prop changes
  useEffect(() => {
    setAttributes(parseAttributes(rfp?.attributes));
    setDirty(false);
  }, [rfp?.attributes]);

  // Get suggestions based on job type
  const jobType = (rfp?.jobType ?? '').toLowerCase().trim();
  const suggestions = JOB_TYPE_PRESETS[jobType] ?? [];
  // Filter out suggestions that are already added
  const usedNames = new Set(attributes.map((a) => a.name.toLowerCase()));
  const availableSuggestions = suggestions.filter((s) => !usedNames.has(s.toLowerCase()));

  const handleAdd = () => {
    setAttributes((prev) => [...prev, { name: '', value: '' }]);
    setDirty(true);
  };

  const handleAddSuggestion = (name: string) => {
    setAttributes((prev) => [...prev, { name, value: '' }]);
    setDirty(true);
  };

  const handleRemove = (index: number) => {
    setAttributes((prev) => prev.filter((_, i) => i !== index));
    setDirty(true);
  };

  const handleChange = (index: number, field: 'name' | 'value', val: string) => {
    setAttributes((prev) => {
      const next = [...prev];
      if (field === 'value') {
        // Store as number if it looks numeric
        const num = Number(val);
        next[index] = { ...next[index], value: val !== '' && !isNaN(num) ? num : val };
      } else {
        next[index] = { ...next[index], [field]: val };
      }
      return next;
    });
    setDirty(true);
  };

  const handleSave = async () => {
    if (!rfp?.id) return;
    setSaving(true);
    try {
      // Filter out empty-name attributes
      const cleaned = attributes.filter((a) => a.name.trim() !== '');
      await updateRfp({
        variables: { id: rfp.id, input: { attributes: JSON.stringify(cleaned) } },
      });
      setAttributes(cleaned);
      setDirty(false);
      setSnackbar({ open: true, message: 'Attributes saved.', severity: 'success' });
      await onRefetchRFPs?.();
    } catch (e: any) {
      setSnackbar({ open: true, message: `Failed to save attributes: ${e.message || e}`, severity: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const [editingIdx, setEditingIdx] = useState<number | null>(null);

  return (
    <Box sx={{ backgroundColor: cardBg, borderRadius: 2, p: 1.5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography variant="subtitle2">Attributes</Typography>
        {isOwner && (
          <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
            {dirty && (
              <Button size="small" variant="contained" color="primary" onClick={handleSave} disabled={saving} sx={{ fontSize: '0.7rem', py: 0.25, px: 1, minWidth: 0 }}>
                {saving ? 'Saving…' : 'Save'}
              </Button>
            )}
            <Tooltip title="Add attribute">
              <IconButton size="small" onClick={handleAdd} color="primary" sx={{ p: 0.25 }}>
                <AddCircleOutlineIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Box>

      {/* Quick-add suggestions based on job type */}
      {isOwner && availableSuggestions.length > 0 && (
        <Box sx={{ display: 'flex', gap: 0.5, mb: 0.5, flexWrap: 'wrap', alignItems: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            Suggested:
          </Typography>
          {availableSuggestions.map((s) => (
            <Button key={s} size="small" variant="text" onClick={() => handleAddSuggestion(s)} sx={{ fontSize: '0.7rem', py: 0, px: 0.5, minWidth: 0, textTransform: 'none' }}>
              + {s}
            </Button>
          ))}
        </Box>
      )}

      {attributes.length > 0 ? (
        <Box sx={{ display: 'grid', gridTemplateRows: 'repeat(5, auto)', gridAutoFlow: 'column', gridAutoColumns: '1fr', gap: 0.5 }}>
          {attributes.map((attr, idx) => {
            const isEditing = editingIdx === idx;
            const hasName = attr.name.trim() !== '';
            const hasValue = String(attr.value).trim() !== '';

            return (
              <Box
                key={idx}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  py: 0.25,
                  '&:hover .attr-actions': { opacity: 1 },
                }}
              >
                {/* Name */}
                {isOwner && (isEditing || !hasName) ? (
                  <TextField
                    variant="standard"
                    size="small"
                    value={attr.name}
                    placeholder="Name"
                    onChange={(e) => handleChange(idx, 'name', e.target.value)}
                    onFocus={() => setEditingIdx(idx)}
                    onBlur={() => setEditingIdx(null)}
                    InputProps={{ disableUnderline: hasName, sx: { fontSize: '0.75rem', py: 0 } }}
                    sx={{ flex: 1, minWidth: 60 }}
                    autoFocus={!hasName}
                  />
                ) : (
                  <Typography
                    variant="caption"
                    sx={{ flex: 1, minWidth: 60, cursor: isOwner ? 'pointer' : 'default', fontWeight: 600, lineHeight: 1.4 }}
                    onClick={() => isOwner && setEditingIdx(idx)}
                  >
                    {attr.name}
                  </Typography>
                )}

                {/* Separator */}
                {hasName && <Typography variant="caption" color="text.secondary">:</Typography>}

                {/* Value */}
                {isOwner && (isEditing || !hasValue) ? (
                  <TextField
                    variant="standard"
                    size="small"
                    value={String(attr.value)}
                    placeholder="Value"
                    onChange={(e) => handleChange(idx, 'value', e.target.value)}
                    onFocus={() => setEditingIdx(idx)}
                    onBlur={() => setEditingIdx(null)}
                    InputProps={{ disableUnderline: hasValue, sx: { fontSize: '0.75rem', py: 0 } }}
                    sx={{ flex: 1, minWidth: 60 }}
                  />
                ) : (
                  <Typography
                    variant="caption"
                    sx={{ flex: 1, minWidth: 60, cursor: isOwner ? 'pointer' : 'default', lineHeight: 1.4 }}
                    onClick={() => isOwner && setEditingIdx(idx)}
                  >
                    {String(attr.value)}
                  </Typography>
                )}

                {/* Delete */}
                {isOwner && (
                  <Box className="attr-actions" sx={{ opacity: 0, transition: 'opacity 0.15s', display: 'flex' }}>
                    <IconButton size="small" onClick={() => handleRemove(idx)} sx={{ p: 0.25 }}>
                      <DeleteIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                  </Box>
                )}
              </Box>
            );
          })}
        </Box>
      ) : (
        <Typography variant="caption" color="text.secondary">
          No attributes yet.{isOwner ? ' Click + to add.' : ''}
        </Typography>
      )}
    </Box>
  );
};

export default RFPAttributesSection;
