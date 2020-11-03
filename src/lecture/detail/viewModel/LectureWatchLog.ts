import LearningState from '../model/LearningState';

export default interface LectureWatchLog {
  id: string;
  patronKeyString: string;
  lectureUsid: string;
  start: number;
  end: number;
  createdTime: number;
}

export interface StudentStateMap {
  learningState: LearningState;
  state: State;
  studentId: string;
}

export type State = 'None' | 'Progress' | 'Completed';
