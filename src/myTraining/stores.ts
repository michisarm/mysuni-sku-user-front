import MyTrainingService from './present/logic/MyTrainingService';
import MyLearningSummaryService from './present/logic/MyLearningSummaryService';
import InMyLectureService from './present/logic/InMyLectureService';
import MyFeedService from './present/logic/MyFeedService';
import ApprovalCubeService from './present/logic/ApprovalCubeService';

export default {
  myTraining: {
    myTrainingService: MyTrainingService.instance,
    myLearningSummaryService: MyLearningSummaryService.instance,
    inMyLectureService: InMyLectureService.instance,
    myFeedService: MyFeedService.instance,
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
};
