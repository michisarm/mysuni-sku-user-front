import { createStore } from './Store';

const [
  setLectureWatchLogSumViewCount,
  onLectureWatchLogSumViewCount,
  getLectureWatchLogSumViewCount,
] = createStore<number>();

export {
  setLectureWatchLogSumViewCount,
  onLectureWatchLogSumViewCount,
  getLectureWatchLogSumViewCount,
};
