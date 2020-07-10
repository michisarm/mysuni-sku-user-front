
import LectureCountService from './UserApp/present/logic/LectureCountService';
import MainNoticeService from './UserApp/present/logic/MainNoticeService';


export const stores = {
  layout: {
    lectureCountService: LectureCountService.instance,
  },
  notice: {
    mainNoticeService: MainNoticeService.instance,
  }
};

export default stores;
