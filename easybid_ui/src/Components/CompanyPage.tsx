import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, Divider, TextField, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from './AuthProvider';
import { useQuery, useMutation } from '@apollo/client/react';
import { GET_EMAIL_GROUPS } from '../graphql/emailGroups';
import { CREATE_EMAIL_GROUP } from '../graphql/createEmailGroup';
import { UPDATE_EMAIL_GROUP } from '../graphql/updateEmailGroup';
import { DELETE_EMAIL_GROUP } from '../graphql/deleteEmailGroup';
import { useTheme } from '@mui/material/styles';

type UserItem = { id: number; email: string };
type JobType = string;

const CompanyPage: React.FC = () => {
  const { user, token } = useAuth();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const cardBg = isDark ? '#1A3348' : '#f5f5f7';
  const [users, setUsers] = useState<UserItem[]>([]);
  const [jobTypes, setJobTypes] = useState<JobType[]>([]);
  const [companyData, setCompanyData] = useState<{ name?: string; type?: string; typeOfWork?: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const companyId = user?.companyId;
  const companyNameFallback = (user as any)?.company;
  const companyVar = companyId ? String(companyId) : undefined;

  const { data: emailGroupsData, refetch: refetchEmailGroups } = useQuery(GET_EMAIL_GROUPS, {
    variables: { company: companyVar },
    skip: !companyVar
  });

  const [createEmailGroup] = useMutation(CREATE_EMAIL_GROUP);
  const [updateEmailGroup] = useMutation(UPDATE_EMAIL_GROUP as any);
  const [deleteEmailGroup] = useMutation(DELETE_EMAIL_GROUP as any);

  const [newGroupName, setNewGroupName] = React.useState('');
  const [newGroupEmails, setNewGroupEmails] = React.useState('');
  const [editingGroupId, setEditingGroupId] = React.useState<number | null>(null);
  const [editingName, setEditingName] = React.useState('');
  const [editingEmails, setEditingEmails] = React.useState('');

  useEffect(() => {
    if (!companyId && !companyNameFallback) return;
    setLoading(true);
    setError(null);
    const url = companyId ? `/api/company/${encodeURIComponent(String(companyId))}` : `/api/company/by-name/${encodeURIComponent(String(companyNameFallback))}`;
    console.debug('CompanyPage: fetching company', { url, companyId, companyNameFallback, hasToken: !!token });
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    fetch(url, { headers })
      .then((r) => {
        if (!r.ok) throw new Error('Failed to load company data');
        return r.json();
      })
      .then((data) => {
        // If backend didn't return a company row but we have a name fallback, use it so UI isn't empty
        if (!data.company && companyNameFallback) {
          setCompanyData({ name: String(companyNameFallback) });
        } else {
          setCompanyData(data.company || null);
        }
        setUsers(data.users || []);
      })
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  }, [companyId, companyNameFallback]);

  // No data fetching for types/company type — using static placeholders

  return (
    <Box sx={{ width: '95%', maxWidth: '95vw', mx: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h5">Company Information</Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ backgroundColor: cardBg, borderRadius: 2, p: 2 }}>
          <Typography variant="h6">General Information</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mt: 1 }}>
            <Box>
              <Typography sx={{ fontWeight: 600, mb: 1 }}>Company Name</Typography>
              <Typography>{companyData?.name ?? 'Unknown'}</Typography>

              <Typography sx={{ fontWeight: 600, mt: 2, mb: 1 }}>Company Type</Typography>
              <Typography>{companyData?.type ?? 'Unknown'}</Typography>
            </Box>

            <Box>
              <Typography sx={{ fontWeight: 600, mb: 1 }}>Employees</Typography>
              {loading ? (
                <Typography>Loading...</Typography>
              ) : error ? (
                <Typography color="error">{error}</Typography>
              ) : (
                <List dense>
                  {users.map((u) => (
                    <ListItem key={u.id}>{u.email}</ListItem>
                  ))}
                </List>
              )}
            </Box>
          </Box>
        </Box>

        <Box sx={{ backgroundColor: cardBg, borderRadius: 2, p: 2 }}>
          <Typography variant="h6">Financial Information</Typography>
          <Typography variant="body2">No financial data available yet.</Typography>
        </Box>

        <Box sx={{ backgroundColor: cardBg, borderRadius: 2, p: 2 }}>
          <Typography variant="h6">Email Groups</Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>Create and manage email groups for your company.</Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 1, flexDirection: { xs: 'column', sm: 'row' } }}>
            <TextField label="Group Name" value={newGroupName} onChange={(e) => setNewGroupName(e.target.value)} size="small" />
            <TextField label="Emails (comma separated)" value={newGroupEmails} onChange={(e) => setNewGroupEmails(e.target.value)} size="small" sx={{ flex: 1 }} />
            <Button variant="contained" onClick={async () => {
              const name = (newGroupName || '').trim();
              if (!name) return alert('Please provide a group name');
              const emails = (newGroupEmails || '').split(',').map(s => s.trim()).filter(Boolean);
              try {
                await createEmailGroup({ variables: { input: { name, company: companyVar, emails } } });
                setNewGroupName('');
                setNewGroupEmails('');
                refetchEmailGroups && (await refetchEmailGroups());
              } catch (e: any) {
                alert(`Failed to create group: ${e.message || e}`);
              }
            }}>Create</Button>
          </Box>

          <Divider />
          <List dense>
            {emailGroupsData?.emailGroups?.length === 0 && (
              <ListItem>No groups yet</ListItem>
            )}
            {emailGroupsData?.emailGroups?.map((g: any) => (
              <ListItem key={g.id} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: 1 }}>
                {editingGroupId === g.id ? (
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
                    <TextField size="small" label="Name" value={editingName} onChange={(e) => setEditingName(e.target.value)} />
                    <TextField size="small" label="Emails (comma separated)" value={editingEmails} onChange={(e) => setEditingEmails(e.target.value)} sx={{ minWidth: 240 }} />
                    <Button variant="contained" size="small" onClick={async () => {
                      const name = (editingName || '').trim();
                      const emails = (editingEmails || '').split(',').map((s) => s.trim()).filter(Boolean);
                      if (!name) return alert('Group name required');
                      try {
                        await updateEmailGroup({ variables: { id: g.id, input: { name, company: companyVar, emails } } });
                        setEditingGroupId(null);
                        await refetchEmailGroups?.();
                      } catch (e: any) {
                        alert(`Update failed: ${e.message || e}`);
                      }
                    }}>Save</Button>
                    <Button variant="outlined" size="small" onClick={() => setEditingGroupId(null)}>Cancel</Button>
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                    <Box>
                      <Typography sx={{ fontWeight: 600 }}>{g.name}</Typography>
                      <Typography variant="body2">{(g.emails || []).join(', ')}</Typography>
                    </Box>
                    <Box>
                      <IconButton size="small" onClick={() => { setEditingGroupId(g.id); setEditingName(g.name || ''); setEditingEmails((g.emails || []).join(', ')); }}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" onClick={async () => {
                        if (!confirm(`Delete group "${g.name}"?`)) return;
                        try {
                          await deleteEmailGroup({ variables: { id: g.id } });
                          await refetchEmailGroups?.();
                        } catch (e: any) {
                          alert(`Delete failed: ${e.message || e}`);
                        }
                      }}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                )}
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default CompanyPage;
