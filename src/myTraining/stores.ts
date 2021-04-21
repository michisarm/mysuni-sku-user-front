
import MyTrainingService from './present/logic/MyTrainingService';
import MyLearningSummaryService from './present/logic/MyLearningSummaryService';
import InMyLectureService from './present/logic/InMyLectureService';
import MyFeedService from './present/logic/MyFeedService';
import ApprovalCubeService from './present/logic/ApprovalCubeService';
import AplService from './present/logic/AplService';
import MyStampService from './present/logic/MyStampService';
import FilterCountService from './present/logic/FilterCountService';

export default {
  myTraining: {
    myTrainingService: MyTrainingService.instance,
    myStampService: MyStampService.instance,
    filterCountService: FilterCountService.instance,
    myLearningSummaryService: MyLearningSummaryService.instance,
    inMyLectureService: InMyLectureService.instance,
    myFeedService: MyFeedService.instance,
    aplService: AplService.instance,
  },
  approvalCube: {
    approvalCubeService: ApprovalCubeService.instance,
  },
};

export {
  MyTrainingService,
  MyLearningSummaryService,
  InMyLectureService,
  MyFeedService,
  ApprovalCubeService,
  AplService,
};
