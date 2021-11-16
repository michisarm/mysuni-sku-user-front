import AplService from './present/logic/AplService';
import ApprovalCubeService from './present/logic/ApprovalCubeService';
import InMyLectureService from './present/logic/InMyLectureService';
import MyFeedService from './present/logic/MyFeedService';
import MyLearningSummaryService from './present/logic/MyLearningSummaryService';
import MyStampService from './present/logic/MyStampService';
import MyTrainingService from './present/logic/MyTrainingService';

export default {
  myTraining: {
    myTrainingService: MyTrainingService.instance,
    myStampService: MyStampService.instance,
    // filterCountService: FilterCountService.instance,
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
