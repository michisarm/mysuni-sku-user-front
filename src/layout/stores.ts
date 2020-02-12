
import LectureCountService from './UserApp/present/logic/LectureCountService';


export const stores = {
  layout: {
    lectureCountService: LectureCountService.instance,
  },
};

export default stores;
