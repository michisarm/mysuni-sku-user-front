import { createStore } from 'restoa';

export interface CollegeLearningTime {
  collegeId: string;
  learningTime: number;
}

export interface TotalLearningTimeRdo {
  accumulatedLearningTime: number;
  myCompanyLearningTime: number;
  collegeLearningTimes: CollegeLearningTime[];
}

function getInitialTotalLearningTimeRdo(): TotalLearningTimeRdo {
  return {
    accumulatedLearningTime: 0,
    myCompanyLearningTime: 0,
    collegeLearningTimes: [],
  };
}

export const [
  useTotalLearningTimeRdo,
  setTotalLearningTimeRdo,
  getTotalLearningTimeRdo,
] = createStore<TotalLearningTimeRdo>(getInitialTotalLearningTimeRdo);
