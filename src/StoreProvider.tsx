
import React from 'react';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';

import { stores } from '@sku/learning';
import { sharedService } from './shared';
import { InstructorService } from './expert/index';
import { CubeService } from './create/index';


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
      sharedService={sharedService}
      instructorService={InstructorService.instance}
      cubeService={CubeService.instance}
    >
      {children}
    </Provider>
  );
}

export default StoreProvider;
