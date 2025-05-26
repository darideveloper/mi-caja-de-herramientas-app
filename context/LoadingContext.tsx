import React, { createContext, useContext, useState } from 'react';

type LoadingContextType = {
  isCtaLoading: boolean;
  setCtaLoading: (loading: boolean) => void;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isCtaLoading, setCtaLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isCtaLoading, setCtaLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
} 