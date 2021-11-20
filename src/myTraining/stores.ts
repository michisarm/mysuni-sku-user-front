import AplService from './present/logic/AplService';
import ApprovalCubeService from './present/logic/ApprovalCubeService';
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
  MyFeedService,
  ApprovalCubeService,
  AplService,
};
