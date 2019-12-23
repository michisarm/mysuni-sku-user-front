
/** Service */
import LectureCardService from './shared/present/logic/LectureCardService';
import LectureService from './shared/present/logic/LectureService';
import ProgramLectureService from './shared/present/logic/ProgramLectureService';
import CourseLectureService from './shared/present/logic/CourseLectureService';
import LectureCountService from './category/present/logic/LectureCountService';


export const lectureCardStores = {
  lecture: {
    lectureCardService: LectureCardService.instance,
    lectureService: LectureService.instance,
    programLectureService: ProgramLectureService.instance,
    courseLectureService: CourseLectureService.instance,
    lectureCountService: LectureCountService.instance,
  },
};

export {
  LectureCardService,
  LectureService,
  ProgramLectureService,
  CourseLectureService,
};

/** Model */
export { default as LectureCardModel } from './shared/model/LectureCardModel';
export { default as LectureModel } from './shared/model/LectureModel';
export { default as LectureServiceType } from './shared/model/LectureServiceType';
export { default as ProgramLectureModel } from './shared/model/ProgramLectureModel';
export { default as CourseLectureModel } from './shared/model/CourseLectureModel';

/** Component */
export { default as CategoryLecturesPage } from './category/ui/page/CategoryLecturesPage';
export { default as ChannelLecturesPage } from './category/ui/page/ChannelLecturesPage';
export { default as CoursePage } from './category/ui/page/CoursePage';
export { default as LectureCardPage } from './category/ui/page/LectureCardPage';

export { default as ChannelsLecturesPage } from './recommend/ui/page/ChannelsLecturesPage';
export { default as RecommendChannelLecturesPage } from './recommend/ui/page/ChannelLecturesPage';
export { default as RecommendChannelLecturesContainer } from './recommend/ui/logic/ChannelLecturesContainer';

