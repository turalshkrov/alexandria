import React, { useEffect } from 'react';
import { useAppSelector } from '@/hooks/hook';

type ThemeSwitcherComponentProps = {
  children: React.ReactNode
}
export default function ThemeSwitcherComponent ({ children }: ThemeSwitcherComponentProps) {
  const theme = useAppSelector(state => state.ThemeSlice.theme);
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <>
      {children}
    </>
  );
}