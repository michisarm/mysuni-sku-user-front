import { createStudyLog } from '../../api/actionLogCollectorApi';
import { findCubeDetailCache } from '../../api/cubeApi';
import { StudyActions } from '../../model/StudyEvent';
import { parseParamsFromPathname } from '../../utility/lectureRouterParamsHelper';

function studyLog(menu: string, action: StudyActions) {
  const path = window.location.href;
  const email = localStorage.getItem('nara.email') || '';
  const params = parseParamsFromPathname(path);
  if (params === undefined) {
    return;
  }

  const { cardId, cubeId } = params;
  if (cardId === undefined || cubeId === undefined) {
    return;
  }

  findCubeDetailCache(cubeId).then(cubeDetail => {
    if (cubeDetail !== undefined) {
      const {
        cube: { name },
      } = cubeDetail;
      createStudyLog({
        action,
        // 오류 오류
        college: 'collegeId',
        context: {
          logType: 'STUDY',
          menu,
          path,
          poc: 'web',
          email,
        },
        courseName: '',
        coursePlanId: '',
        cubeId,
        cubeName: name,
        lectureCardId: cardId,
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
