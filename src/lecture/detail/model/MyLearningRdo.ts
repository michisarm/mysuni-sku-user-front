export interface MyLearningRdo {
  learningGoalHour: number;
  obtainedStampCount: number;
  totalStampCount: number;
}

export function initMyLearningRdo() {
  return {
    learningGoalHour: 0,
    obtainedStampCount: 0,
    totalStampCount: 0,
  };
}
