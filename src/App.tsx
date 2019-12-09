
import React from 'react';

import Store from './Store';
import { UserApp } from './shared';
import Routes from './Routes';


function App() {
  return (
    <Store>
      <UserApp>
        <Routes />
      </UserApp>
    </Store>
  );
}

export default App;
