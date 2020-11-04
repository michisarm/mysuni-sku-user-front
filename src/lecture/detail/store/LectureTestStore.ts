import {
  LectureTestItem,
  LectureTestAnswerItem,
  LectureTestStudentItem,
} from '../viewModel/LectureTest';
import { createStore } from './Store';

const [setLectureTestItem, onLectureTestItem, getLectureTestItem] = createStore<
  LectureTestItem
>();

const [
  setLectureTestAnswerItem,
  onLectureTestAnswerItem,
  getLectureTestAnswerItem,
] = createStore<LectureTestAnswerItem>();

const [
  setLectureTestStudentItem,
  onLectureTestStudentItem,
  getLectureTestStudentItem,
] = createStore<LectureTestStudentItem>();

export {
  setLectureTestItem,
  onLectureTestItem,
  getLectureTestItem,
  setLectureTestAnswerItem,
  onLectureTestAnswerItem,
  getLectureTestAnswerItem,
  setLectureTestStudentItem,
  onLectureTestStudentItem,
  getLectureTestStudentItem,
};
