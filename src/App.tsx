
import React from 'react';

import StoreProvider from './StoreProvider';
import Routes from './Routes';

function App() {
  return (
    <StoreProvider>
      <Routes />
    </StoreProvider>
  );
}

export default App;
