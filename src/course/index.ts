import CoursePlanService from './present/logic/CoursePlanService';
import { CoursePlanModel } from './model/CoursePlanModel';
import LearningCardService from './present/logic/LearningCardService';

export { default as SamplePage } from './ui/page/SamplePage';

export const courseStores = {
  course: {
    learningCardService: LearningCardService.instance,
  },
};

export {
  CoursePlanService,
  CoursePlanModel,
  LearningCardService,
};
