/* eslint-disable consistent-return */

import { getCubeLectureWatchLog } from './utility/getCubeLectureWatchLog';
import { setCubeLectureWatchLog } from './utility/setCubeLectureWatchLog';
import {
  getWatchLogSumViewSeconds,
  getMultiVideoOverlap,
} from './utility/getWatchLogSumViewSeconds';
import WatchLog from 'lecture/detail/model/Watchlog';
import { confirmProgress } from './utility/confirmProgress';

interface GetCubeWatchLogItem {
  (): void;
}
interface SetWatchLog {
  (watchLog: WatchLog): void;
}

interface GetWatchLogSumViewCount {
  (): void;
}

interface LectureConfirmProgress {
  (path: string): Promise<void>;
}

interface RetMultiVideoOverlap {
  (viewState: string, usid: string): Promise<string>;
}

// not used
export const getCubeWatchLogItem: GetCubeWatchLogItem = () => {
  getCubeLectureWatchLog();
};

export const setWatchLog: SetWatchLog = (watchLog: WatchLog) => {
  setCubeLectureWatchLog(watchLog);
};

// not used
export const getWatchLogSumViewCount: GetWatchLogSumViewCount = () => {
  getWatchLogSumViewSeconds();
};

export const lectureConfirmProgress: LectureConfirmProgress = () => {
  return confirmProgress();
};

export const retMultiVideoOverlap: RetMultiVideoOverlap = (
  viewState: string,
  usid: string
) => {
  return getMultiVideoOverlap(viewState, usid);
};
