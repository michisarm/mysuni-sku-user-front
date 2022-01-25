import React from 'react';
import Header from '../../Header';
import Footer from '../../Footer';
import { useRequestProfile } from 'profile/hooks/useRequestProfile';

interface Props {
  children: React.ReactChild;
}

export function AppLayout({ children }: Props) {
  // TODO :: 상위 컴포넌트에서 처리하도록 수정
  useRequestProfile();
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
