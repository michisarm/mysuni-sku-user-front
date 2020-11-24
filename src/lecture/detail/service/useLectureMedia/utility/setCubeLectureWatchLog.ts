/* eslint-disable consistent-return */
import LectureRouterParams from 'lecture/detail/viewModel/LectureRouterParams';
import LectureWatchLog from 'lecture/detail/viewModel/LectureWatchLog';
import { registerWatchLog } from '../../../api/mWatchlogApi';

export async function setCubeLectureWatchLog(
  params: LectureRouterParams,
  lectureWatchLog: LectureWatchLog
): Promise<void> {
  if (params) {
    await registerWatchLog(lectureWatchLog);
  }
}
