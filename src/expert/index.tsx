import ExpertContainer from './ui/logic/ExpertContainer';
import InstructorService from './present/logic/IntructorService';

export const expertStores = {
  expert: {
    instructorService: InstructorService.instance,
  },
};


export {
  ExpertContainer,
  InstructorService,
};
