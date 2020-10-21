type LearningState =
  | 'Progress'
  | 'Waiting'
  | 'TestWaiting'
  | 'HomeworkWaiting'
  | 'Failed'
  | 'TestPassed'
  | 'Passed'
  | 'Missed'
  | 'NoShow';

export default LearningState;
