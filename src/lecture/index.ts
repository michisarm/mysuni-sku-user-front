
/** Service */
import LectureCardService from './shared/present/logic/LectureCardService';
import LectureService from './shared/present/logic/LectureService';
import ProgramLectureService from './shared/present/logic/ProgramLectureService';
import CourseLectureService from './shared/present/logic/CourseLectureService';
import RollBookService from './shared/present/logic/RollBookService';
import StudentService from './shared/present/logic/StudentService';
import CollegeLectureCountService from './shared/present/logic/CollegeLectureCountService';

import LectureCountService from './category/present/logic/LectureCountService';


export const lectureCardStores = {
  lecture: {
    lectureCardService: LectureCardService.instance,
    lectureService: LectureService.instance,
    programLectureService: ProgramLectureService.instance,
    courseLectureService: CourseLectureService.instance,
    rollBookService: RollBookService.instance,
    studentService: StudentService.instance,
    collegeLectureCountService: CollegeLectureCountService.instance,
    lectureCountService: LectureCountService.instance,
  },
};

export {
  LectureCardService,
  LectureService,
  ProgramLectureService,
  CourseLectureService,
  RollBookService,
  StudentService,
  CollegeLectureCountService,
  LectureCountService,
};

/** Model */
export { default as LectureCardModel } from './shared/model/LectureCardModel';
export { default as LectureModel } from './shared/model/LectureModel';
export { default as LectureServiceType } from './shared/model/LectureServiceType';
export { default as ProgramLectureModel } from './shared/model/ProgramLectureModel';
export { default as CourseLectureModel } from './shared/model/CourseLectureModel';
export { default as LectureViewModel } from './shared/model/LectureViewModel';
export { default as RollBookModel } from './shared/model/RollBookModel';
export { default as StudentCdoModel } from './shared/model/StudentCdoModel';
export { default as StudentJoinRdoModel } from './shared/model/StudentJoinRdoModel';
export { default as StudentCountRdoModel } from './shared/model/StudentCountRdoModel';
export { default as RecommendLectureRdo } from './shared/model/RecommendLectureRdo';
export { default as CollegeLectureCountRdo } from './shared/model/CollegeLectureCountRdo';

/** Component */
export { default as CollegeLecturesPage } from './category/ui/page/CollegeLecturesPage';
export { default as ChannelLecturesPage } from './category/ui/page/ChannelLecturesPage';
export { default as CoursePage } from './category/ui/page/CoursePage';
export { default as LectureCardPage } from './category/ui/page/LectureCardPage';

export { default as LectureContentHeader } from './shared/LectureContentHeader';
export { default as LectureSubInfo } from './shared/LectureSubInfo';
export { default as Lecture } from './shared/Lecture';
export { default as ChannelFilterModal } from './shared/ChannelFilterModal';

export { default as ChannelsLecturesPage } from './recommend/ui/page/ChannelsPage';
export { default as RecommendChannelLecturesPage } from './recommend/ui/page/ChannelLecturesPage';
export { default as ChannelLecturesLine } from './recommend/ui/logic/ChannelLecturesLineContainer';

