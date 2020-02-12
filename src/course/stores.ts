
/** Service */
import CoursePlanService from './present/logic/CoursePlanService';
import LearningCardService from './present/logic/LearningCardService';


export default {
  course: {
    coursePlanService: CoursePlanService.instance,
    learningCardService: LearningCardService.instance,
  },
};

export {
  CoursePlanService,
  LearningCardService,
};
