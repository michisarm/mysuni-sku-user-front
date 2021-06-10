import { getCookie } from '@nara.platform/accent';
import MyTrainingService from '../../../../../myTraining/present/logic/MyTrainingService';
import { SkProfileService } from '../../../../../profile/stores';
import { ActionTrackParam } from 'tracker/model/ActionTrackModel';
import { ActionType, Action, Area } from 'tracker/model/ActionType';
import { debounceActionTrack } from '../../../../../tracker/present/logic/ActionTrackService';
import { StudentCdo } from '../../../../model/StudentCdo';
import {
  clearFindMyCardRelatedStudentsCache,
  registerStudent,
} from '../../../api/cardApi';
import { registerWatchLog } from '../../../api/mWatchlogApi';
import { getLectureParams } from '../../../store/LectureParamsStore';
import { PanoptoEmbedPlayerState } from '../../../store/PanoptoEmbedPlayerStore';
import { confirmProgress } from '../../useLectureMedia/utility/confirmProgress';
import { requestLectureState } from '../../useLectureState/utility/requestLectureState';
import { updateCardLectureStructure } from '../../useLectureStructure/utility/updateCardLectureStructure';

export async function fetchAllModelsForStorage() {
  const inProgressTableViews = await MyTrainingService.instance.findAllInProgressStorage();
  if (inProgressTableViews && inProgressTableViews.length) {
    sessionStorage.setItem(
      'inProgressTableViews',
      JSON.stringify(inProgressTableViews)
    );
  }

  const completedTableViews = await MyTrainingService.instance.findAllCompletedStorage();
  if (completedTableViews && completedTableViews.length) {
    sessionStorage.setItem(
      'completedTableViews',
      JSON.stringify(completedTableViews)
    );
  }
}

export function callRegisterWatchLog(
  panoptoEmbedPlayerState: PanoptoEmbedPlayerState
) {
  const params = getLectureParams();
  if (params?.cubeId === undefined) {
    return;
  }
  const { watchLogStart, currentTime, playbackRate } = panoptoEmbedPlayerState;
  const { cubeId } = params;
  const end = currentTime;
  const start =
    watchLogStart > end || end - watchLogStart > 25
      ? end - 10 * playbackRate
      : watchLogStart;
  registerWatchLog({
    lectureUsid: cubeId,
    patronKeyString: SkProfileService.instance.skProfile.id,
    start,
    end,
  });
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

export function callConfirmProgress() {
  confirmProgress();
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
