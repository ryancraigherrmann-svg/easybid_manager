import React, { useState, useMemo } from 'react';
import { useQuery } from '@apollo/client/react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import DescriptionIcon from '@mui/icons-material/Description';
import GavelIcon from '@mui/icons-material/Gavel';
import WorkIcon from '@mui/icons-material/Work';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { GET_ACTIVITY_LOGS } from '../graphql/activityLog';

interface ActivityUser {
  id: number;
  firstName: string | null;
  lastName: string | null;
  email: string;
}

interface ActivityLogEntry {
  id: number;
  action: string;
  entityType: string;
  entityId: number;
  metadata: string | null;
  createdAt: string;
  user: ActivityUser;
}

type FilterType = 'ALL' | 'RFP' | 'Bid' | 'Job';

const ACTION_CONFIG: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  RFP_CREATED:        { label: 'created an RFP',        color: '#4caf50', icon: <DescriptionIcon fontSize="small" /> },
  RFP_STATUS_CHANGED: { label: 'changed RFP status',    color: '#ff9800', icon: <TrendingUpIcon fontSize="small" /> },
  RFP_NOTIFIED:       { label: 'sent notifications',    color: '#9c27b0', icon: <NotificationsIcon fontSize="small" /> },
  BID_PLACED:         { label: 'placed a bid',          color: '#2196f3', icon: <GavelIcon fontSize="small" /> },
  BID_APPROVED:       { label: 'approved a bid',        color: '#00bcd4', icon: <CheckCircleIcon fontSize="small" /> },
  JOB_CREATED:        { label: 'created a job',         color: '#3f51b5', icon: <WorkIcon fontSize="small" /> },
  FILE_UPLOADED:      { label: 'uploaded a file',       color: '#607d8b', icon: <AttachFileIcon fontSize="small" /> },
};

function getUserName(user: ActivityUser): string {
  if (user.firstName || user.lastName) {
    return [user.firstName, user.lastName].filter(Boolean).join(' ');
  }
  return user.email;
}

function getInitials(user: ActivityUser): string {
  if (user.firstName && user.lastName) {
    return (user.firstName[0] + user.lastName[0]).toUpperCase();
  }
  if (user.firstName) return user.firstName[0].toUpperCase();
  return user.email[0].toUpperCase();
}

function parseMetadata(metadata: string | null): Record<string, any> {
  if (!metadata) return {};
  try { return JSON.parse(metadata); } catch { return {}; }
}

function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return 'Just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay === 1) return 'Yesterday';
  if (diffDay < 7) return `${diffDay}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function getDayLabel(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const entryDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diffDays = Math.floor((today.getTime() - entryDate.getTime()) / 86400000);
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}

function getActionDetail(action: string, meta: Record<string, any>): string {
  switch (action) {
    case 'RFP_CREATED':
      return meta.title ? `"${meta.title}"` : '';
    case 'RFP_STATUS_CHANGED':
      return [meta.title ? `"${meta.title}"` : '', meta.oldStatus && meta.newStatus ? `${meta.oldStatus} → ${meta.newStatus}` : ''].filter(Boolean).join(' — ');
    case 'RFP_NOTIFIED':
      return [meta.title ? `"${meta.title}"` : '', meta.recipientCount ? `to ${meta.recipientCount} recipient${meta.recipientCount > 1 ? 's' : ''}` : ''].filter(Boolean).join(' ');
    case 'BID_PLACED':
      return [meta.amount ? `$${Number(meta.amount).toLocaleString()}` : '', meta.rfpTitle ? `on "${meta.rfpTitle}"` : ''].filter(Boolean).join(' ');
    case 'BID_APPROVED':
      return [meta.amount ? `$${Number(meta.amount).toLocaleString()}` : '', meta.bidderCompany ? `from ${meta.bidderCompany}` : '', meta.rfpTitle ? `on "${meta.rfpTitle}"` : ''].filter(Boolean).join(' ');
    case 'JOB_CREATED':
      return [meta.title ? `"${meta.title}"` : '', meta.company ? `for ${meta.company}` : ''].filter(Boolean).join(' ');
    case 'FILE_UPLOADED':
      return meta.fileName || meta.jobTitle ? [meta.fileName, meta.jobTitle ? `on "${meta.jobTitle}"` : ''].filter(Boolean).join(' ') : '';
    default:
      return '';
  }
}

export default function ActivityFeed() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [filter, setFilter] = useState<FilterType>('ALL');
  const [cursor, setCursor] = useState<number | undefined>(undefined);
  const [prevEntries, setPrevEntries] = useState<ActivityLogEntry[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const BATCH = 30;

  const { data, loading, error } = useQuery<{ activityLogs: ActivityLogEntry[] }>(GET_ACTIVITY_LOGS, {
    variables: { limit: BATCH, cursor },
    fetchPolicy: cursor ? 'network-only' : 'cache-and-network',
  });

  const allEntries = useMemo(() => {
    const newEntries = data?.activityLogs || [];
    if (!cursor) {
      // Initial load
      if (newEntries.length > 0 && newEntries.length < BATCH) setHasMore(false);
      return newEntries;
    }
    // Paging: merge
    const ids = new Set(prevEntries.map((e) => e.id));
    const merged = [...prevEntries, ...newEntries.filter((e) => !ids.has(e.id))];
    if (newEntries.length < BATCH) setHasMore(false);
    return merged;
  }, [data, prevEntries, cursor]);

  const filtered = useMemo(() => {
    if (filter === 'ALL') return allEntries;
    return allEntries.filter((e) => e.entityType === filter);
  }, [allEntries, filter]);

  // Group by day
  const grouped = useMemo(() => {
    const groups: { label: string; entries: ActivityLogEntry[] }[] = [];
    let currentLabel = '';
    for (const entry of filtered) {
      const label = getDayLabel(entry.createdAt);
      if (label !== currentLabel) {
        groups.push({ label, entries: [entry] });
        currentLabel = label;
      } else {
        groups[groups.length - 1].entries.push(entry);
      }
    }
    return groups;
  }, [filtered]);

  const handleLoadMore = () => {
    if (allEntries.length > 0) {
      setPrevEntries(allEntries);
      setCursor(allEntries[allEntries.length - 1].id);
    }
  };

  return (
    <Box sx={{ width: '95%', maxWidth: 800, mx: 'auto', py: 2 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Activity
        </Typography>
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Filter</InputLabel>
          <Select
            value={filter}
            label="Filter"
            onChange={(e) => setFilter(e.target.value as FilterType)}
          >
            <MenuItem value="ALL">All Activity</MenuItem>
            <MenuItem value="RFP">RFPs</MenuItem>
            <MenuItem value="Bid">Bids</MenuItem>
            <MenuItem value="Job">Jobs</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Loading state */}
      {loading && allEntries.length === 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Error */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Failed to load activity: {error.message}
        </Alert>
      )}

      {/* Empty state */}
      {!loading && allEntries.length === 0 && !error && (
        <Paper sx={{ p: 6, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
            No activity yet
          </Typography>
          <Typography color="text.secondary">
            Activity from your team will show up here as they create RFPs, place bids, and manage jobs.
          </Typography>
        </Paper>
      )}

      {/* Activity groups */}
      {grouped.map((group) => (
        <Box key={group.label} sx={{ mb: 3 }}>
          <Typography
            variant="overline"
            sx={{
              fontWeight: 700,
              color: 'text.secondary',
              letterSpacing: '0.08em',
              mb: 1,
              display: 'block',
            }}
          >
            {group.label}
          </Typography>
          <Paper sx={{ overflow: 'hidden' }}>
            {group.entries.map((entry, idx) => {
              const config = ACTION_CONFIG[entry.action] || { label: entry.action, color: '#757575', icon: <DescriptionIcon fontSize="small" /> };
              const meta = parseMetadata(entry.metadata);
              const detail = getActionDetail(entry.action, meta);

              return (
                <Box
                  key={entry.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2,
                    px: 2.5,
                    py: 2,
                    borderLeft: `4px solid ${config.color}`,
                    borderBottom: idx < group.entries.length - 1 ? `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : '#f0f0f0'}` : 'none',
                    '&:hover': { bgcolor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)' },
                    transition: 'background 0.15s',
                  }}
                >
                  {/* Avatar */}
                  <Avatar
                    sx={{
                      width: 36,
                      height: 36,
                      bgcolor: config.color,
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      mt: 0.3,
                    }}
                  >
                    {getInitials(entry.user)}
                  </Avatar>

                  {/* Content */}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ flexWrap: 'wrap' }}>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>
                        {getUserName(entry.user)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {config.label}
                      </Typography>
                      <Chip
                        icon={config.icon as React.ReactElement}
                        label={entry.entityType}
                        size="small"
                        sx={{
                          height: 22,
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          bgcolor: isDark ? `${config.color}22` : `${config.color}15`,
                          color: config.color,
                          '& .MuiChip-icon': { color: config.color },
                        }}
                      />
                    </Stack>
                    {detail && (
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {detail}
                      </Typography>
                    )}
                  </Box>

                  {/* Timestamp */}
                  <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: 'nowrap', mt: 0.5 }}>
                    {formatRelativeTime(entry.createdAt)}
                  </Typography>
                </Box>
              );
            })}
          </Paper>
        </Box>
      ))}

      {/* Load more */}
      {hasMore && allEntries.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
          <Button
            variant="outlined"
            onClick={handleLoadMore}
            disabled={loading}
            sx={{ textTransform: 'none', fontWeight: 600 }}
          >
            {loading ? 'Loading...' : 'Load more'}
          </Button>
        </Box>
      )}
    </Box>
  );
}
