
import React from 'react';
import { Provider } from 'mobx-react';

import { sharedService } from './shared';
import { InstructorService } from './expert/index';


interface Props {
  children: React.ReactNode,
}

function Store({ children }: Props) {
  return (
    <Provider
      sharedService={sharedService}
      instructorService={InstructorService.instance}
    >
      {children}
    </Provider>
  );
}

export default Store;
