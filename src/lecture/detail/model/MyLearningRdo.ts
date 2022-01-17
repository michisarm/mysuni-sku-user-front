export interface MyLearningRdo {
  learningGoalHour: number;
  stampCount: number;
  totalStampCount: number;
}

export function initMyLearningRdo() {
  return {
    learningGoalHour: 0,
    stampCount: 0,
    totalStampCount: 0,
  };
}
