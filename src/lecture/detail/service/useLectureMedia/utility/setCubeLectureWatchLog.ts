/* eslint-disable consistent-return */
import LectureWatchLog from 'lecture/detail/viewModel/LectureWatchLog';
import { registerWatchLog } from '../../../api/mWatchlogApi';
import LectureParams from '../../../viewModel/LectureParams';

export async function setCubeLectureWatchLog(
  lectureWatchLog: LectureWatchLog
): Promise<void> {
  await registerWatchLog(lectureWatchLog);
}
