/* eslint-disable consistent-return */
import { cacheableFindPersonalCube } from '../../../api/mPersonalCubeApi';
import PersonalCube from '../../../model/PersonalCube';
import LectureRouterParams from 'lecture/detail/viewModel/LectureRouterParams';
import { PatronKey } from 'shared/model/PatronKey';
import { patronInfo } from '@nara.platform/dock';
import { setLectureWatchLogSumViewCount } from '../../../store/LectureWatchLogSumViewCountStore';
import {
  findSumViewSeconds,
  multiVideoOverlap,
} from '../../../api/mWatchlogApi';

function getPersonalCubeByParams(
  params: LectureRouterParams
): Promise<PersonalCube> {
  const { contentId } = params;
  return cacheableFindPersonalCube(contentId!);
}

export async function getWatchLogSumViewSeconds(
  params: LectureRouterParams
): Promise<void> {
  const personalCube = await getPersonalCubeByParams(params);
  if (personalCube !== undefined) {
    // const viewCount = await findSumViewSeconds(new PatronKey().keyString, params.lectureId);
    setLectureWatchLogSumViewCount(
      await findSumViewSeconds(new PatronKey().keyString, params.lectureId)
    );
    // return viewCount;
  }
  // return 0;
}

export async function getMultiVideoOverlap(
  viewState: String,
  usid: String
): Promise<string> {
  // alert(patronInfo.getPatronId());
  const rtn = await multiVideoOverlap(
    patronInfo.getPatronId(),
    viewState,
    usid
  );
  return rtn;
}
