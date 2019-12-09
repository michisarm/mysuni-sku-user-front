
import React from 'react';
import { Provider } from 'mobx-react';

import { sharedService } from './shared';


interface Props {
  children: React.ReactNode,
}

function Store({ children }: Props) {
  return (
    <Provider
      sharedService={sharedService}
    >
      {children}
    </Provider>
  );
}

export default Store;
