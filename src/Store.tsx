
import React from 'react';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';

import { stores } from '@sku/learning';
import { sharedService } from './shared';
import { InstructorService } from './expert/index';
import { CollegeService } from './college';
import SkProfileService from './profile/present/logic/SkProfileService';


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
      collegeService={CollegeService.instance}
      skProfileService={SkProfileService.instance}
    >
      {children}
    </Provider>
  );
}

export default Store;
