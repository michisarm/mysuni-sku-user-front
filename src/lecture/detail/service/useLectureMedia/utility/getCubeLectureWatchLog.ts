/* eslint-disable consistent-return */
import { setLectureWatchLogs } from '../../../store/LectureWatchLogsStore';
import { PatronKey } from '../../../../../shared/model';
import { findWatchLogList } from '../../../api/mWatchlogApi';
import { getWatchLogItem } from './getWatchLogItemMapFromCube';
import { getLectureParams } from '../../../store/LectureParamsStore';
import { findCubeDetailCache } from '../../../api/cubeApi';

export async function getCubeLectureWatchLog(): Promise<void> {
  const params = getLectureParams();
  if (params?.cubeId !== undefined) {
    const cubeDetail = await findCubeDetailCache(params.cubeId);
    if (cubeDetail !== undefined) {
      const watchLogList = await findWatchLogList(
        new PatronKey().keyString,
        params.cubeId
      );

      if (watchLogList.length > 0) {
        setLectureWatchLogs(await getWatchLogItem(watchLogList));
      }
    }
  }
}
