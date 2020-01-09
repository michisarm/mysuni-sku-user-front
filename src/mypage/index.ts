
import MyTrainingService from './present/logic/MyTrainingService';
import MyLearningSummaryService from './present/logic/MyLearningSummaryService';
import InMyLectureService from './present/logic/InMyLectureService';
import MyFeedService from './present/logic/MyFeedService';

export { default as MyPage } from './ui/page/MyPage';
export { default as MyTrainingPage } from './ui/page/MyTrainingPage';
export { default as MyCommunityPage } from './ui/page/MyCommunityPage';

export const myTrainingStores = {
  myTraining: {
    myTrainingService: MyTrainingService.instance,
    myLearningSummaryService: MyLearningSummaryService.instance,
    inMyLectureService: InMyLectureService.instance,
    myFeedService: MyFeedService.instance,
  },
};

export {
  MyTrainingService,
  MyLearningSummaryService,
  InMyLectureService,
  MyFeedService,
};


/** Model */
export { default as MyTrainingModel } from './model/MyTrainingModel';
export { default as InMyLectureModel } from './model/InMyLectureModel';
export { default as InMyLectureCdoModel } from './model/InMyLectureCdoModel';
export { default as MyFeedModel } from './model/MyFeedModel';


/** Component */
export { default as MyLearningSummaryModal } from './ui/logic/MyLearningSummaryModal';
export { default as MyFeed} from './ui/logic/MyFeedContainer';
