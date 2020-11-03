/* eslint-disable consistent-return */
import { findPersonalCube } from '../../../api/mPersonalCubeApi';
import PersonalCube from '../../../model/PersonalCube';
import { getWatchLogItem } from './getWatchLogItemMapFromCube';
import LectureRouterParams from 'lecture/detail/viewModel/LectureRouterParams';
import { PatronKey } from 'shared/model/PatronKey';
import { findWatchLogList } from 'lecture/detail/api/watchLogApi';
import { setLectureWatchLogs } from 'lecture/detail/store/LectureWatchLogsStore';

function getPersonalCubeByParams(
  params: LectureRouterParams
): Promise<PersonalCube> {
  const { contentId } = params;
  return findPersonalCube(contentId!);
}

export async function getCubeLectureWatchLog(
  params: LectureRouterParams
): Promise<void> {
  const personalCube = await getPersonalCubeByParams(params);
  console.log('personalCube', personalCube);
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
