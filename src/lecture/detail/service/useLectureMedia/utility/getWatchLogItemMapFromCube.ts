/* eslint-disable consistent-return */
import WatchLog from 'lecture/detail/model/Watchlog';
import LectureWatchLog from 'lecture/detail/viewModel/LectureWatchLog';

export async function getWatchLogItem(
  watchLogs: WatchLog[]
): Promise<LectureWatchLog[]> {
  const lectureWatchLogs: LectureWatchLog[] = [];
  watchLogs.forEach(watchLog => {
    const {
      id,
      lectureUsid,
      patronKeyString,
      start,
      end,
      createdTime,
    } = watchLog;
    if (id !== null) {
      const lectureWatchLog: LectureWatchLog = {
        id,
        lectureUsid,
        patronKeyString,
        start,
        end,
        createdTime,
      };
      lectureWatchLogs.push(lectureWatchLog);
    }
  });

  return lectureWatchLogs;
}
