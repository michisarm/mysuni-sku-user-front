/* eslint-disable consistent-return */
import { cacheableFindPersonalCube } from '../../../api/mPersonalCubeApi';
import PersonalCube from '../../../model/PersonalCube';
import LectureRouterParams from '../../../viewModel/LectureRouterParams';
import { setLectureWatchLogs } from '../../../store/LectureWatchLogsStore';
import { PatronKey } from '../../../../../shared/model';
import { findWatchLogList } from '../../../api/mWatchlogApi';
import { getWatchLogItem } from './getWatchLogItemMapFromCube';

function getPersonalCubeByParams(
  params: LectureRouterParams
): Promise<PersonalCube> {
  const { contentId } = params;
  return cacheableFindPersonalCube(contentId!);
}

export async function getCubeLectureWatchLog(
  params: LectureRouterParams
): Promise<void> {
  const personalCube = await getPersonalCubeByParams(params);
  if (personalCube !== undefined) {
    const watchLogList = await findWatchLogList(
      new PatronKey().keyString,
      params.lectureId
    );

    if (watchLogList.length > 0) {
      setLectureWatchLogs(await getWatchLogItem(watchLogList));
    }
  }
}
