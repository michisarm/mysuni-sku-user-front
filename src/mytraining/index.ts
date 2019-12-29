
import MyTrainingService from './present/logic/MyTrainingService';
import MyLearningSummaryService from './present/logic/MyLearningSummaryService';
import InMyLectureService from './present/logic/InMyLectureService';

export { default as MyTrainingPage } from './ui/page/MyTrainingPage';
export { default as MyCommunityPage } from './ui/page/MyCommunityPage';

export const myTrainingStores = {
  myTraining: {
    myTrainingService: MyTrainingService.instance,
    myLearningSummaryService: MyLearningSummaryService.instance,
    inMyLectureService: InMyLectureService.instance,
  },
};

export {
  MyTrainingService,
  MyLearningSummaryService,
  InMyLectureService,
};


/** Model */
export { default as MyTrainingModel } from './model/MyTrainingModel';
export { default as InMyLectureModel } from './model/InMyLectureModel';


/** Component */
export { default as MyLearningSummaryModal } from './ui/logic/MyLearningSummaryModal';
