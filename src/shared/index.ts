
import sharedService, { SharedService } from './present/logic/sharedService';
import PageModel from './present/model/PageModel';
import withSplitting from './helper/withSplitting';

import actionHandler from './present/logic/actionHandler';


export { default as UserApp } from './layout/UserApp';
export {
  sharedService,
  SharedService,
  PageModel,

  withSplitting,
  actionHandler,
};
