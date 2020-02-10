
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
