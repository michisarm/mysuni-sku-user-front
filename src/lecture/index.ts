
/** Service */
import LectureCardService from './shared/present/logic/LectureCardService';

export const lectureCardStores = {
  lectureCardService: LectureCardService.instance,
};

export {
  LectureCardService,
};

/** Model */
export { default as LectureCardModel } from './shared/model/LectureCardModel';

/** Component */
export { default as CategoryLecturesPage } from './category/ui/page/CategoryLecturesPage';
