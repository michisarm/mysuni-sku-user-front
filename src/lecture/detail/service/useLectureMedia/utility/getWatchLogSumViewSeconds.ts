/* eslint-disable consistent-return */
import { PatronKey } from 'shared/model/PatronKey';
import { patronInfo } from '@nara.platform/dock';
import { setLectureWatchLogSumViewCount } from '../../../store/LectureWatchLogSumViewCountStore';
import {
  findSumViewSeconds,
  multiVideoOverlap,
} from '../../../api/mWatchlogApi';
import { getLectureParams } from '../../../store/LectureParamsStore';
import { findCubeDetailCache } from '../../../api/cubeApi';
import { start, stop } from '../../../api/panoptoApi';

export async function getWatchLogSumViewSeconds(): Promise<void> {
  const params = getLectureParams();
  if (params?.cubeId !== undefined) {
    const cubeDetail = await findCubeDetailCache(params.cubeId);
    if (cubeDetail !== undefined) {
      setLectureWatchLogSumViewCount(
        await findSumViewSeconds(new PatronKey().keyString, params.cubeId)
      );
    }
  }
}

export async function getMultiVideoOverlap(
  viewState: string,
  usid: string
): Promise<string> {
  // alert(patronInfo.getPatronId());
  // const rtn = await multiVideoOverlap(
  //   patronInfo.getPatronId(),
  //   viewState,
  //   usid
  // );
  // return rtn;

  return viewState === 'start' ? start(usid) : stop(usid);
}
