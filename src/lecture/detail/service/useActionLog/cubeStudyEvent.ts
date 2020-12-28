import { createStudyLog, createViewLog } from '../../api/actionLogCollectorApi';
import { cacheableFindPersonalCube } from '../../api/mPersonalCubeApi';
import { StudyActions } from '../../model/StudyEvent';
import { parseParamsFromPathname } from '../../utility/lectureRouterParamsHelper';

function studyLog(menu: string, action: StudyActions) {
  const path = window.location.href;
  const email = localStorage.getItem('nara.email') || '';
  const params = parseParamsFromPathname(path);
  if (params === undefined) {
    return;
  }

  const { collegeId, cubeId, lectureCardId, contentId, lectureId } = params;
  const _cubeId = contentId || cubeId;
  const _lectureCardId = lectureId || lectureCardId;
  if (_cubeId === undefined || _lectureCardId === undefined) {
    return;
  }

  cacheableFindPersonalCube(_cubeId).then(personalCube => {
    if (personalCube !== undefined) {
      const { name } = personalCube;
      createStudyLog({
        action,
        college: collegeId,
        context: {
          logType: 'STUDY',
          menu,
          path,
          poc: 'web',
          email,
        },
        courseName: '',
        coursePlanId: '',
        cubeId: _cubeId,
        cubeName: name,
        lectureCardId: _lectureCardId,
        serviceType: 'CARD',
      });
    }
  });
}

export function videoStart() {
  studyLog('LearningStart', 'VideoStart');
}

export function videoClose() {
  studyLog('ModalClose', 'VideoClose');
}

export function audioStart() {
  studyLog('LearningStart', 'AudioStart');
}

export function audioClose() {
  studyLog('ModalClose', 'AudioClose');
}

export function cPLinked() {
  studyLog('LearningStart', 'CPLinked');
}

export function documentDownload() {
  studyLog('DownloadClose', 'DocumentDownload');
}

export function webPageLinked() {
  studyLog('LearningStart', 'WebPageLinked');
}

export function elearningLinked() {
  studyLog('LearningStart', 'ElearningLinked');
}

export function experimetial() {
  studyLog('LearningStart', 'Experimetial');
}
