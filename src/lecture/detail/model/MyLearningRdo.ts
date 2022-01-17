export interface MyLearningRdo {
  learningGoalHour: number;
  obtainedStampCountForYear: number;
  totalStampCount: number;
}

export function initMyLearningRdo() {
  return {
    learningGoalHour: 0,
    obtainedStampCountForYear: 0,
    totalStampCount: 0,
  };
}
