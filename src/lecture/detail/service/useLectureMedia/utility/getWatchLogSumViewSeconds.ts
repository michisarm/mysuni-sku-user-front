/* eslint-disable consistent-return */
import { findPersonalCube } from '../../../api/mPersonalCubeApi';
import PersonalCube from '../../../model/PersonalCube';
import LectureRouterParams from 'lecture/detail/viewModel/LectureRouterParams';
import { PatronKey } from 'shared/model/PatronKey';
import { setLectureWatchLogSumViewCount } from '../../../store/LectureWatchLogSumViewCountStore';
import { findSumViewSeconds } from '../../../api/mWatchlogApi';

function getPersonalCubeByParams(
  params: LectureRouterParams
): Promise<PersonalCube> {
  const { contentId } = params;
  return findPersonalCube(contentId!);
}

export async function getWatchLogSumViewSeconds(
  params: LectureRouterParams
): Promise<void> {
  const personalCube = await getPersonalCubeByParams(params);
  console.log('personalCube', personalCube);
  if (personalCube !== undefined) {
    // const viewCount = await findSumViewSeconds(new PatronKey().keyString, params.lectureId);
    setLectureWatchLogSumViewCount(
      await findSumViewSeconds(new PatronKey().keyString, params.lectureId)
    );
    // return viewCount;
  }
  // return 0;
}
