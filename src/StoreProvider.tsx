import React from 'react';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';

import stores from './stores';


configure({
  enforceActions: 'observed',
});

interface Props {
  children: React.ReactNode,
}

function StoreProvider({ children }: Props) {
  return (
    <Provider
      {...stores}
    >
      {children}
    </Provider>
  );
}

export default StoreProvider;
