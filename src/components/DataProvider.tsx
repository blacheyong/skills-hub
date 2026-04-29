'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import type { Skill, Folder } from '@/lib/types';
import { loadData } from '@/lib/store';

interface DataContextValue {
  skills: Skill[];
  folders: Folder[];
  loading: boolean;
}

const DataContext = createContext<DataContextValue>({
  skills: [],
  folders: [],
  loading: true,
});

export function DataProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Skip data loading on /login: /api/skills returns 401 there, which would
  // trigger window.location.assign('/login') in the store and create a loop.
  if (pathname === '/login') {
    return (
      <DataContext.Provider value={{ skills: [], folders: [], loading: false }}>
        {children}
      </DataContext.Provider>
    );
  }

  return <AuthenticatedDataProvider>{children}</AuthenticatedDataProvider>;
}

function AuthenticatedDataProvider({ children }: { children: React.ReactNode }) {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    loadData().then((data) => {
      if (cancelled) return;
      setSkills(data.skills);
      setFolders(data.folders);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <DataContext.Provider value={{ skills, folders, loading }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
