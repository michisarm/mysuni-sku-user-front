import Student from '../model/Student';
import { createStore } from './Store';

const [
  setLectureConfirmProgress,
  onLectureConfirmProgress,
  getLectureConfirmProgress,
] = createStore<Student>();

export {
  setLectureConfirmProgress,
  onLectureConfirmProgress,
  getLectureConfirmProgress,
};
