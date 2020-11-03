import WatchLog from '../model/WatchLog';
import { createStore } from './Store';

const [
  setLectureWatchLogs,
  onLectureWatchLogs,
  getLectureWatchLogs,
] = createStore<WatchLog[]>();

export { setLectureWatchLogs, onLectureWatchLogs, getLectureWatchLogs };
