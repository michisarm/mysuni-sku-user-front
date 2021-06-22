import React from 'react';
import Header from '../../Header';
import Footer from '../../Footer';
import QuickNav from '../../QuickNav';
import { useRequestProfile } from '../../../../profile/hooks/useRequestProfile';
import { isExternalInstructor } from '../../../../shared/helper/findUserRole';

interface AppLayoutContainerProps {
  children: React.ReactChild;
}

export function AppLayoutContainer({ children }: AppLayoutContainerProps) {
  useRequestProfile();

  const isExternal = isExternalInstructor();
  return (
    <>
      <Header />
      {children}
      {!isExternal && <QuickNav />}
      <Footer />
    </>
  );
}
