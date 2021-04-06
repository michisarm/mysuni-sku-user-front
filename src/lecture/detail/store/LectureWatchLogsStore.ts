import WatchLog from '../model/Watchlog';
import { createStore } from './Store';

const [
  setLectureWatchLogs,
  onLectureWatchLogs,
  getLectureWatchLogs,
  useLectureWatchLogs,
] = createStore<WatchLog[]>();

export {
  setLectureWatchLogs,
  onLectureWatchLogs,
  getLectureWatchLogs,
  useLectureWatchLogs,
};
