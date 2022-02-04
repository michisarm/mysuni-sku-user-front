import { getCookie } from '@nara.platform/accent';
import { ActionTrackParam } from 'tracker/model/ActionTrackModel';
import { ActionType, Action, Area } from 'tracker/model';
import { debounceActionTrack } from '../../../../../tracker/present/logic/ActionTrackService';
import { StudentCdo } from '../../../../model/StudentCdo';
import {
  clearFindMyCardRelatedStudentsCache,
  registerStudent,
} from '../../../api/cardApi';
import { getLectureParams } from '../../../store/LectureParamsStore';
import { PanoptoEmbedPlayerState } from '@sku/skuniv-ui-video-player';
import { confirmProgress } from '../../useLectureMedia/utility/confirmProgress';
import { requestLectureState } from '../../useLectureState/utility/requestLectureState';
import { updateCardLectureStructure } from '../../useLectureStructure/utility/updateCardLectureStructure';
import { findByCubeIds, savePlayTime } from '../../../api/panoptoApi';
import PlayTimeSdo from 'lecture/detail/model/PlayTimeSdo';
import ReplayTimeSdo from '../../../model/ReplayTimeSdo';
import { findCubesByIdsCache } from '../../../api/cubeApi';
import { getMainCategory } from '../../../../../shared/model/CardCategory';

export async function callRegisterWatchLog(
  panoptoEmbedPlayerState: PanoptoEmbedPlayerState
) {
  const params = getLectureParams();
  if (params?.cubeId === undefined) {
    return;
  }
  const {
    watchLogStart,
    currentTime = 0,
    playbackRate = 0,
  } = panoptoEmbedPlayerState;
  const { cubeId } = params;
  const end = currentTime;
  const start =
    watchLogStart > end || end - watchLogStart > 25
      ? end - 10 * playbackRate
      : watchLogStart;
  // registerWatchLog({
  //   lectureUsid: cubeId,
  //   patronKeyString: SkProfileService.instance.skProfile.id,
  //   start,
  //   end,
  // });
  const playTimeSdo: PlayTimeSdo = {
    cubeId,
    duration: panoptoEmbedPlayerState.duration || 0,
    start,
    end,
  };
  const duration = await savePlayTime(playTimeSdo);
}

export async function checkStudent() {
  const params = getLectureParams();
  if (params === undefined) {
    return;
  }
  const { cardId, cubeId, cubeType } = params;
  if (cubeId !== undefined && cubeType !== undefined) {
    const studentCdo: StudentCdo = {
      cardId,
      cubeId,
      round: 1,
    };
    const studentId = await registerStudent(studentCdo);
    if (studentId !== undefined) {
      clearFindMyCardRelatedStudentsCache();
      await confirmProgress();
      return;
    }
    clearFindMyCardRelatedStudentsCache();
    updateCardLectureStructure(cardId);
    requestLectureState(cardId, cubeId, cubeType);
  }
}

export function callConfirmProgress(
  state?: PanoptoEmbedPlayerState,
  syncPlayTime: boolean = false
) {
  confirmProgress(syncPlayTime || false);
}

export function callDebounceActionTrack() {
  debounceActionTrack({
    email:
      (window.sessionStorage.getItem('email') as string) ||
      (window.localStorage.getItem('nara.email') as string) ||
      getCookie('tryingLoginId'),
    path: window.location.pathname,
    search: window.location.search,
    area: Area.CUBE_PLAY,
    actionType: ActionType.STUDY,
    action: Action.CLICK,
    actionName: '학습버튼 클릭',
  } as ActionTrackParam);
}

export async function callRegisterReplayWatchLog(
  panoptoEmbedPlayerState: PanoptoEmbedPlayerState
) {
  const params = getLectureParams();
  if (params?.cubeId === undefined) {
    return;
  }
  const {
    watchLogStart,
    currentTime = 0,
    playbackRate = 0,
  } = panoptoEmbedPlayerState;
  const { cubeId } = params;
  console.log('안녕하세요');

  findCubesByIdsCache([cubeId]).then((cubes) => {
    //
    if (cubes === undefined) return;

    const cube = cubes[0];

    const collegeId = getMainCategory(cube.categories)?.collegeId || '';
    const end = currentTime;
    const start =
      watchLogStart > end || end - watchLogStart > 25
        ? end - 10 * playbackRate
        : watchLogStart;
    // const replayTimeSdo: ReplayTimeSdo = {
    //   collegeId,
    //   cubeId,
    //   // duration: panoptoEmbedPlayerState.duration || 0,
    //   replayLearningSeconds: 0,
    //   start,
    //   end,
    // };
  });
}
