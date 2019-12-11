
import React from 'react';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';

import { stores } from '@sku/learning';
import { sharedService } from './shared';


configure({
  enforceActions: 'observed',
});

interface Props {
  children: React.ReactNode,
}

function Store({ children }: Props) {
  return (
    <Provider
      {...stores}
      sharedService={sharedService}
    >
      {children}
    </Provider>
  );
}

export default Store;
