import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ViewSettings {
  showRFPs: boolean;
  showBids: boolean;
  showJobs: boolean;
  showSchedule: boolean;
  showAnalytics: boolean;
}

interface ViewSettingsContextType {
  viewSettings: ViewSettings;
  setViewSetting: (key: keyof ViewSettings, value: boolean) => void;
}

const defaultSettings: ViewSettings = {
  showRFPs: true,
  showBids: true,
  showJobs: true,
  showSchedule: true,
  showAnalytics: true,
};

const STORAGE_KEY = 'easybid_view_settings';

function loadSettings(): ViewSettings {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...defaultSettings, ...JSON.parse(stored) };
    }
  } catch {
    // ignore parse errors
  }
  return defaultSettings;
}

const ViewSettingsContext = createContext<ViewSettingsContextType>({
  viewSettings: defaultSettings,
  setViewSetting: () => {},
});

export function ViewSettingsProvider({ children }: { children: React.ReactNode }) {
  const [viewSettings, setViewSettings] = useState<ViewSettings>(loadSettings);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(viewSettings));
  }, [viewSettings]);

  const setViewSetting = (key: keyof ViewSettings, value: boolean) => {
    setViewSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <ViewSettingsContext.Provider value={{ viewSettings, setViewSetting }}>
      {children}
    </ViewSettingsContext.Provider>
  );
}

export function useViewSettings() {
  return useContext(ViewSettingsContext);
}
