import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import DescriptionIcon from '@mui/icons-material/Description';
import WorkIcon from '@mui/icons-material/Work';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BarChartIcon from '@mui/icons-material/BarChart';
import BusinessIcon from '@mui/icons-material/Business';
import SettingsIcon from '@mui/icons-material/Settings';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { useAuth } from './AuthProvider';
import JobTable from './JobTable';
import GanttChart from './GanttChart';
import CompanyPage from './CompanyPage';
import AnalyticsPage from './AnalyticsPage';
import EzBidLogo from './EzBidLogo';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useThemeMode } from './ThemeModeContext';
import { useViewSettings } from './ViewSettingsContext';
import UserSettingsPage from './UserSettingsPage';

// Steel blue palette
const STEEL = {
  dark: '#1E3A50',
  main: '#2C5272',
  mid: '#3B6E8F',
  light: '#4A8DB7',
  accent: '#7EB8DA',
  bg: '#F4F7FA',
  divider: 'rgba(255,255,255,0.12)',
  hoverBg: 'rgba(126,184,218,0.12)',
  selectedBg: 'rgba(126,184,218,0.22)',
};

const drawerWidth = 240;

interface Props {
  window?: () => Window;
  children?: React.ReactNode;
}

export default function ResponsiveDrawer(props: Props) {
  const { window, children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [selectedTab, setSelectedTab] = React.useState<string>('RFPS & Bids');
  const { mode, toggleMode } = useThemeMode();
  const isDark = mode === 'dark';
  const { viewSettings } = useViewSettings();

  // Build the visible main nav items based on view settings
  const allMainTabs = ['RFPS & Bids', 'Jobs', 'Schedule', 'Analytics'];
  const visibleMainTabs = allMainTabs.filter((tab) => {
    if (tab === 'RFPS & Bids') return viewSettings.showRFPs || viewSettings.showBids;
    if (tab === 'Jobs') return viewSettings.showJobs;
    if (tab === 'Schedule') return viewSettings.showSchedule;
    if (tab === 'Analytics') return viewSettings.showAnalytics;
    return true;
  });

  // If the currently selected tab is no longer visible, redirect to first available or User Settings
  React.useEffect(() => {
    const allVisibleTabs = [...visibleMainTabs, 'Company', 'User Settings'];
    if (!allVisibleTabs.includes(selectedTab)) {
      setSelectedTab(allVisibleTabs[0] || 'User Settings');
    }
  }, [viewSettings, selectedTab, visibleMainTabs]);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const navIcons: Record<string, React.ReactNode> = {
    'RFPS & Bids': <DescriptionIcon />,
    'Jobs': <WorkIcon />,
    'Schedule': <CalendarMonthIcon />,
    'Analytics': <BarChartIcon />,
    'Company': <BusinessIcon />,
    'User Settings': <SettingsIcon />,
  };

  const drawer = (
    <div style={{ background: STEEL.dark, height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Logo area */}
      <Box sx={{ px: 1.5, py: 2, display: 'flex', alignItems: 'center', minHeight: 64 }}>
        <EzBidLogo size={32} />
      </Box>
      <Divider sx={{ borderColor: STEEL.divider }} />
      <List sx={{ px: 1, pt: 1 }}>
        {visibleMainTabs.map((text) => (
          <ListItem key={text} disablePadding sx={{ mb: 0.3 }}>
            <ListItemButton
              selected={selectedTab === text}
              onClick={() => setSelectedTab(text)}
              sx={{
                borderRadius: '8px',
                color: '#CBD5E1',
                '&.Mui-selected': { bgcolor: STEEL.selectedBg, color: '#FFFFFF' },
                '&:hover': { bgcolor: STEEL.hoverBg },
              }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 36 }}>
                {navIcons[text]}
              </ListItemIcon>
              <ListItemText primary={text} primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 600 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ borderColor: STEEL.divider, mx: 1 }} />
      <List sx={{ px: 1, pt: 1 }}>
        {['Company', 'User Settings'].map((text) => (
          <ListItem key={text} disablePadding sx={{ mb: 0.3 }}>
            <ListItemButton
              onClick={() => setSelectedTab(text)}
              selected={selectedTab === text}
              sx={{
                borderRadius: '8px',
                color: '#CBD5E1',
                '&.Mui-selected': { bgcolor: STEEL.selectedBg, color: '#FFFFFF' },
                '&:hover': { bgcolor: STEEL.hoverBg },
              }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 36 }}>
                {navIcons[text]}
              </ListItemIcon>
              <ListItemText primary={text} primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 600 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: isDark ? '#162A3D' : '#FFFFFF',
          color: isDark ? '#E2E8F0' : STEEL.dark,
          borderBottom: isDark ? '1px solid rgba(226,232,240,0.12)' : '1px solid #E2E8F0',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 700, color: isDark ? '#7EB8DA' : STEEL.main }}>
            {selectedTab}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {/* Dark mode toggle */}
          <Tooltip title={isDark ? 'Light mode' : 'Dark mode'}>
            <IconButton onClick={toggleMode} size="small" sx={{ color: isDark ? '#7EB8DA' : STEEL.mid }}>
              {isDark ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
            </IconButton>
          </Tooltip>
          {/* User avatar / menu */}
          <UserMenu />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, bgcolor: STEEL.dark, borderRight: 'none' },
          }}
          slotProps={{
            root: {
              keepMounted: true,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, bgcolor: STEEL.dark, borderRight: 'none' },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 3,
          pb: 3,
          px: 0,
          width: { xs: '100vw', sm: `calc(100vw - ${drawerWidth}px)` },
          maxWidth: '100vw',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Toolbar />
        <Box sx={{ marginBottom: 2, display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, bgcolor: isDark ? '#0F1F2E' : STEEL.bg }}>
          {selectedTab === 'RFPS & Bids' ? (
            children
          ) : selectedTab === 'Jobs' ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '95%', maxWidth: '95vw', mx: 'auto' }}>
              <Box sx={{ width: '100%' }}>
                <JobTable />
              </Box>
            </Box>
          ) : selectedTab === 'Schedule' ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '95%', maxWidth: '95vw', mx: 'auto' }}>
              <Box sx={{ width: '100%' }}>
                <GanttChart />
              </Box>
            </Box>
          ) : selectedTab === 'Analytics' ? (
            <AnalyticsPage />
          ) : selectedTab === 'Company' ? (
            <CompanyPage />
          ) : selectedTab === 'User Settings' ? (
            <UserSettingsPage />
          ) : (
            <Typography>{selectedTab}</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}

function UserMenu() {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    handleClose();
    logout();
  };

  const initial = (user && user.email && user.email[0]) ? user.email[0].toUpperCase() : '?';

  return (
    <>
      <Tooltip title={user?.email || 'Account'}>
        <IconButton onClick={handleOpen} size="small" sx={{ ml: 2 }} aria-controls={anchorEl ? 'user-menu' : undefined} aria-haspopup="true" aria-expanded={anchorEl ? 'true' : undefined}>
          <Avatar sx={{ width: 36, height: 36, bgcolor: '#2C5272', fontWeight: 700 }}>{initial}</Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="user-menu"
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem disabled>{user?.email}</MenuItem>
        <MenuItem disabled sx={{ pt: 0 }}>
          <Chip
            label={user?.isAdmin ? 'Admin' : 'User'}
            size="small"
            color={user?.isAdmin ? 'primary' : 'default'}
            sx={{ fontWeight: 600 }}
          />
        </MenuItem>
        <MenuItem onClick={handleLogout} sx={{ mt: 1, color: 'error.main' }}>Logout</MenuItem>
      </Menu>
    </>
  );
}
