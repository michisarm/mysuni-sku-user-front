import InstructorPage from './ui/page/InstructorPage';
import InstructorService from './present/logic/InstructorService';

export const expertStores = {
  expert: {
    instructorService: InstructorService.instance,
  },
};


export {
  InstructorPage,
  InstructorService,
};
