import ExpertPage from './ui/page/ExpertPage';
import InstructorService from './present/logic/IntructorService';

export const expertStores = {
  expert: {
    instructorService: InstructorService.instance,
  },
};


export {
  ExpertPage,
  InstructorService,
};
