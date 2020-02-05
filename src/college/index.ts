
/** Service */
import CollegeService from './present/logic/CollegeService';
import SubsidiaryService from './present/logic/SubsidiaryService';
import ContentsProviderService from './present/logic/ContentsProviderService';
import JobGroupService from './present/logic/JobGroupService';


export const collegeStores = {
  college: {
    collegeService: CollegeService.instance,
    subsidiaryService: SubsidiaryService.instance,
    contentsProviderService: ContentsProviderService.instance,
    jobGroupService: JobGroupService.instance,
  },
};

export {
  CollegeService,
  SubsidiaryService,
  ContentsProviderService,
  JobGroupService,
};

/** Model */
export { CollegeModel } from './model/CollegeModel';
export { default as ChannelModel } from './model/ChannelModel';
export { CollegeType } from './model/CollegeType';
export { default as CollegeColors } from './model/CollegeColors';
