import React from 'react';

import './style/css/main.css';

import Store from './Store';
import Routes from './Routes';

function App() {
  return (
    <Store>
      <Routes />
    </Store>
  );
}

export default App;
