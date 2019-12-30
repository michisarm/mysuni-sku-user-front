
/** Service */
import CoursePlanService from './present/logic/CoursePlanService';
import LearningCardService from './present/logic/LearningCardService';


export const courseStores = {
  course: {
    coursePlanService: CoursePlanService.instance,
    learningCardService: LearningCardService.instance,
  },
};

export {
  CoursePlanService,
  LearningCardService,
};

/** Model */
export { CoursePlanModel } from './model/CoursePlanModel';
export { CourseSetType } from './model/CourseSetType';
export { CourseSetModel } from './model/CourseSetModel';
