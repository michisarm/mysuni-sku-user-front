
import LectureCountService from './UserApp/present/logic/LectureCountService';
import NotieService from './UserApp/present/logic/NotieService';



export const stores = {
  layout: {
    lectureCountService: LectureCountService.instance,
    notieService: NotieService.instance,
  },
};

export default stores;
