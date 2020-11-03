import WatchLog from '../model/Watchlog';
import { createStore } from './Store';

const [
  setLectureWatchLogs,
  onLectureWatchLogs,
  getLectureWatchLogs,
] = createStore<WatchLog[]>();

export { setLectureWatchLogs, onLectureWatchLogs, getLectureWatchLogs };
