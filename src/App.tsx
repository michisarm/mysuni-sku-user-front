
import React from 'react';
// import { axiosApi, reactAlert } from '@nara.platform/accent';
import { axiosApi } from '@nara.platform/accent';

import StoreProvider from './StoreProvider';
import Routes from './Routes';

if (process.env.NODE_ENV !== 'development') axiosApi.setCatch(401, () => window.location.href = '/login');
axiosApi.setCatch(500, (e: any) => {
  const message = e.response.data['nara-message'];
  // reactAlert({ title: '알림', message: message || '서버 오류입니다.' });
  console.log(message || '서버 오류입니다.');
});

function App() {
  return (
    <StoreProvider>
      <Routes />
    </StoreProvider>
  );
}

export default App;
