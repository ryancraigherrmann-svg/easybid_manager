import SideDrawer from "./Components/SideDrawer";
import BidTable from "./Components/BidTable";
import RFPTable from "./Components/RFPTable";
import Box from '@mui/material/Box';
import { AuthProvider, useAuth } from "./Components/AuthProvider";
import AuthScreen from "./Components/AuthScreen";
import VerifyEmail from "./Components/VerifyEmail";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ThemeModeProvider, useThemeMode } from './Components/ThemeModeContext';
import { ViewSettingsProvider, useViewSettings } from './Components/ViewSettingsContext';

const sharedOverrides = {
  typography: {
    fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 700,
          fontSize: '0.85rem',
          letterSpacing: '0.02em',
          textTransform: 'uppercase' as const,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedSecondary: {
          fontWeight: 700,
        },
      },
    },
  },
};

const lightTheme = createTheme({
  ...sharedOverrides,
  palette: {
    mode: 'light',
    primary: {
      dark: '#1E3A50',
      main: '#2C5272',
      light: '#4A8DB7',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#7EB8DA',
      contrastText: '#1E3A50',
    },
    background: {
      default: '#F4F7FA',
      paper: '#FFFFFF',
    },
  },
  components: {
    ...sharedOverrides.components,
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 4px rgba(30,58,80,0.10)',
          border: '1px solid #E2E8F0',
        },
      },
    },
  },
});

const darkTheme = createTheme({
  ...sharedOverrides,
  palette: {
    mode: 'dark',
    primary: {
      dark: '#7EB8DA',
      main: '#4A8DB7',
      light: '#A3D0EA',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#7EB8DA',
      contrastText: '#0F1F2E',
    },
    background: {
      default: '#0F1F2E',
      paper: '#162A3D',
    },
    text: {
      primary: '#E2E8F0',
      secondary: '#94A3B8',
    },
    divider: 'rgba(226,232,240,0.12)',
  },
  components: {
    ...sharedOverrides.components,
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 4px rgba(0,0,0,0.30)',
          border: '1px solid rgba(226,232,240,0.12)',
          backgroundImage: 'none',
        },
      },
    },
  },
});

function InnerApp() {
  const { user } = useAuth();
  const { viewSettings } = useViewSettings();

  // Handle /verify-email?token=... route
  const params = new URLSearchParams(window.location.search);
  const verifyToken = window.location.pathname === '/verify-email' ? params.get('token') : null;

  if (verifyToken) {
    return (
      <VerifyEmail
        token={verifyToken}
        onDone={() => {
          window.history.replaceState({}, '', '/');
          window.location.reload();
        }}
      />
    );
  }

  if (!user) {
    return <AuthScreen />;
  }

  return (
    <SideDrawer>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
        {viewSettings.showRFPs && <RFPTable />}
        {viewSettings.showBids && <BidTable />}
      </Box>
    </SideDrawer>
  );
}

function ThemedApp() {
  const { mode } = useThemeMode();
  return (
    <ThemeProvider theme={mode === 'dark' ? darkTheme : lightTheme}>
      <AuthProvider>
        <InnerApp />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <ViewSettingsProvider>
      <ThemeModeProvider>
        <ThemedApp />
      </ThemeModeProvider>
    </ViewSettingsProvider>
  );
}
