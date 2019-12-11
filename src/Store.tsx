
import React from 'react';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';

import { stores } from '@sku/learning';
import { sharedService } from './shared';
import { InstructorService } from './expert/index';


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
      instructorService={InstructorService.instance}
    >
      {children}
    </Provider>
  );
}

export default Store;
