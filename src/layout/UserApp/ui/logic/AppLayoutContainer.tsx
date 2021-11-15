import React from 'react';
import Header from '../../Header';
import Footer from '../../Footer';

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
      <Footer />
    </>
  );
}
