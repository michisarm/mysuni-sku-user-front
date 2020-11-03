/* eslint-disable consistent-return */
import { findPersonalCube } from '../../../api/mPersonalCubeApi';
import PersonalCube from '../../../model/PersonalCube';
import LectureRouterParams from 'lecture/detail/viewModel/LectureRouterParams';
import { registerWatchLog } from 'lecture/detail/api/watchLogApi';
import LectureWatchLog from 'lecture/detail/viewModel/LectureWatchLog';

function getPersonalCubeByParams(
  params: LectureRouterParams
): Promise<PersonalCube> {
  const { contentId } = params;
  return findPersonalCube(contentId!);
}

export async function setCubeLectureWatchLog(
  params: LectureRouterParams,
  lectureWatchLog: LectureWatchLog
): Promise<void> {
  const personalCube = await getPersonalCubeByParams(params);
  console.log('personalCube', personalCube);
  if (personalCube !== undefined) {
    await registerWatchLog(lectureWatchLog);
  }
}
