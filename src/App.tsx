
import React from 'react';
import { axiosApi } from '@nara.platform/accent';

import StoreProvider from './StoreProvider';
import Routes from './Routes';


if (process.env.NODE_ENV === 'development') {
  axiosApi.setDevelopmentMode();
}


function App() {
  return (
    <StoreProvider>
      <Routes />
    </StoreProvider>
  );
}

export default App;
