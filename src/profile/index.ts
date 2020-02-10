
import SkProfileService from './present/logic/SkProfileService';

export const profileStores = {
  profile: {
    skProfileService: SkProfileService.instance,
  },
};

export {
  SkProfileService,
};

export { default as SkProfileModel } from './model/SkProfileModel';
export { default as EmployeeModel } from './model/EmployeeModel';
export { default as StudySummaryModel } from './model/StudySummaryModel';

