import { LectureTask } from '../viewModel/LectureTask';
import { LectureTaskDetail } from '../viewModel/LectureTaskDetail';
// import {
//   LectureTestItem,
//   LectureTestAnswerItem,
// } from '../viewModel/LectureTest';
import { createStore } from './Store';

const [setLectureTaskItem, onLectureTaskItem, getLectureTaskItem] = createStore<
  LectureTask
>();

const [
  setLectureTaskOffset,
  onLectureTaskOffset,
  getLectureTaskOffset,
] = createStore<number>(0);

const [
  setLectureTaskViewType,
  onLectureTaskViewType,
  getLectureTaskViewType,
] = createStore<string>('list');

const [
  setLectureTaskDetail,
  onLectureTaskDetail,
  getLectureTaskDetail,
] = createStore<LectureTaskDetail>();

export {
  setLectureTaskItem,
  onLectureTaskItem,
  getLectureTaskItem,
  setLectureTaskOffset,
  onLectureTaskOffset,
  getLectureTaskOffset,
  setLectureTaskViewType,
  onLectureTaskViewType,
  getLectureTaskViewType,
  setLectureTaskDetail,
  onLectureTaskDetail,
  getLectureTaskDetail,
};
