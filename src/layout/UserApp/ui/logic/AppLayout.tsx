import React from 'react';
import Header from '../../Header';
import Footer from '../../Footer';
import { useRequestProfile } from 'profile/hooks/useRequestProfile';

interface Props {
  children: React.ReactChild;
}

export function AppLayout({ children }: Props) {
  useRequestProfile();
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
