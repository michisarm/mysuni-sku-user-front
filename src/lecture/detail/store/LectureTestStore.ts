import {
  LectureTestItem,
  LectureTestAnswerItem,
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

export {
  setLectureTestItem,
  onLectureTestItem,
  getLectureTestItem,
  setLectureTestAnswerItem,
  onLectureTestAnswerItem,
  getLectureTestAnswerItem,
};
