
/** Service */
import CollegeService from './present/logic/CollegeService';
import SubsidiaryService from './present/logic/SubsidiaryService';


export const collegeStores = {
  collegeService: CollegeService.instance,
  subsidiaryService: SubsidiaryService.instance,
};

export {
  CollegeService,
  SubsidiaryService,
};

/** Model */
export { CollegeModel } from './model/CollegeModel';
export { default as ChannelModel } from './model/ChannelModel';
