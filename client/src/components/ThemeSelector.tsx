import { useCallback, useEffect, useState } from 'react';
import { RadioGroup, RadioOptions } from './RadioGroup';
import { useUserPreferences } from '../contexts/UserPreferences';

type Theme = 'dark' | 'light';

const OPTIONS: RadioOptions[] = [
  {
    label: 'Light',
    value: 'light',
  },
  {
    label: 'Dark',
    value: 'dark',
  },
];

export function ThemeSelector({ className }: { className?: string }) {
  const { preferences, setPreferences } = useUserPreferences();

  const onChange = useCallback((val: string) => {
    setPreferences({ theme: val as Theme });
  }, []);

  useEffect(() => {
    document.body.classList.remove('light');
    document.body.classList.remove('dark');

    document.body.classList.add(preferences.theme);
  }, [preferences.theme]);

  return (
    <RadioGroup 
      options={OPTIONS}
      value={preferences.theme}
      onChange={onChange}
      className={className} />
  )
}
