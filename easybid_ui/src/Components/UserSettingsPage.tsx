import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import DescriptionIcon from '@mui/icons-material/Description';
import GavelIcon from '@mui/icons-material/Gavel';
import WorkIcon from '@mui/icons-material/Work';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BarChartIcon from '@mui/icons-material/BarChart';
import Divider from '@mui/material/Divider';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useViewSettings, ViewSettings } from './ViewSettingsContext';

interface ToggleItem {
  key: keyof ViewSettings;
  label: string;
  description: string;
  icon: React.ReactNode;
}

const toggleItems: ToggleItem[] = [
  {
    key: 'showRFPs',
    label: 'RFPs',
    description: 'Show the RFP table in the RFPS & Bids view',
    icon: <DescriptionIcon />,
  },
  {
    key: 'showBids',
    label: 'Bids',
    description: 'Show the Bid table in the RFPS & Bids view',
    icon: <GavelIcon />,
  },
  {
    key: 'showJobs',
    label: 'Jobs',
    description: 'Show the Jobs tab in the sidebar',
    icon: <WorkIcon />,
  },
  {
    key: 'showSchedule',
    label: 'Schedule',
    description: 'Show the Schedule tab in the sidebar',
    icon: <CalendarMonthIcon />,
  },
  {
    key: 'showAnalytics',
    label: 'Analytics',
    description: 'Show the Analytics tab in the sidebar',
    icon: <BarChartIcon />,
  },
];

export default function UserSettingsPage() {
  const { viewSettings, setViewSetting } = useViewSettings();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '95%', maxWidth: 700, mx: 'auto' }}>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
          <VisibilityIcon color="primary" />
          <Typography variant="h6" fontWeight={700}>
            View Settings
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Toggle which tables and tabs are visible. If both RFPs and Bids are turned off,
          the RFPS &amp; Bids tab will be hidden from the sidebar.
        </Typography>
        <Divider sx={{ mb: 1 }} />
        <List disablePadding>
          {toggleItems.map((item, index) => (
            <ListItem
              key={item.key}
              divider={index < toggleItems.length - 1}
              secondaryAction={
                <Switch
                  edge="end"
                  checked={viewSettings[item.key]}
                  onChange={(_, checked) => setViewSetting(item.key, checked)}
                  inputProps={{ 'aria-label': `Toggle ${item.label}` }}
                />
              }
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                secondary={item.description}
                primaryTypographyProps={{ fontWeight: 600 }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}
