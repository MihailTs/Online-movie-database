import { createContext, ReactNode, useContext, useState } from 'react';
import { LocalStorageService } from '../services/localStorage';

export type Theme = 'dark' | 'light';

interface Preferences {
  view: 'grid' | 'list';
  theme: Theme;
}

interface ContextValue {
  preferences: Preferences;
  setPreferences: (val: Partial<Preferences>) => void;
}

const Context = createContext<ContextValue | undefined>(undefined);

const storage = new LocalStorageService<Preferences>('board-games-preferences');

export function useUserPreferences() {
  const preferences = useContext(Context);

  if (!preferences) {
    throw new Error(
      'useUserPreferences should only be used within UserPreferencesProvider'
    );
  }

  return preferences;
}

interface UserPreferencesProviderProps {
  children: ReactNode;
}

const defaultValue: Preferences = {
  theme: 'light',
  view: 'list',
};

export function UserPreferencesProvider({
  children,
}: UserPreferencesProviderProps) {
  const [preferences, setPreferences] = useState<Preferences>(() => {
    const stored = storage.get();

    if (!stored) {
      return defaultValue;
    }

    return {
      ...defaultValue,
      ...stored,
    };
  });

  function changePreferences(pref: Partial<Preferences>) {
    const newPreferences = { ...preferences, ...pref };

    storage.set(newPreferences);
    setPreferences(newPreferences);
  }

  return (
    <Context.Provider
      value={{ preferences, setPreferences: changePreferences }}
    >
      {children}
    </Context.Provider>
  );
}
