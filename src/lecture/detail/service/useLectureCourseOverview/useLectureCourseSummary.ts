import { reactAlert } from '@nara.platform/accent';
/* eslint-disable consistent-return */

import { useEffect, useRef, useState } from 'react';
import { addInMyLecture, removeInMyLecture } from '../../api/mytrainingApi';
import {
  getInMyLectureCdo,
  getLectureCardSummary,
  onLectureCardSummary,
  setLectureCardSummary,
  setLectureCardSummaryLearningState,
} from '../../store/LectureOverviewStore';
import LectureCardSummary from '../../viewModel/LectureOverview/LectureCardSummary';
import { studentInfoView } from 'lecture/detail/api/lectureApi';
import LectureParams from '../../viewModel/LectureParams';

type Value = LectureCardSummary | undefined;

export function toggleCardBookmark() {
  const lectureSummary = getLectureCardSummary();
  if (lectureSummary !== undefined) {
    if (lectureSummary.mytrainingId === undefined) {
      const inMyLectureCdo = getInMyLectureCdo();
      if (inMyLectureCdo !== undefined) {
        addInMyLecture(inMyLectureCdo).then(mytrainingId => {
          setLectureCardSummary({ ...lectureSummary, mytrainingId });
          reactAlert({
            title: '알림',
            message: '본 과정이 관심목록에 추가되었습니다.',
          });
        });
      }
    } else {
      removeInMyLecture(lectureSummary.mytrainingId).then(() => {
        setLectureCardSummary({ ...lectureSummary, mytrainingId: undefined });
        reactAlert({
          title: '알림',
          message: '본 과정이 관심목록에서 제외되었습니다.',
        });
      });
    }
  }
}

let subscriberIdRef = 0;
export function useLectureCardSummary(): [Value] {
  const [subscriberId, setSubscriberId] = useState<string>();
  const [value, setValue] = useState<Value>();

  useEffect(() => {
    const next = `useLectureCardSummary-${++subscriberIdRef}`;
    setSubscriberId(next);
  }, []);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureCardSummary(next => {
      setValue(next);
    }, subscriberId);
  }, [subscriberId]);

  return [value];
}

// course 학습완료표시 learningState 위한
export async function getCardLectureSummary(
  params: LectureParams
): Promise<void> {
  if (typeof params === 'undefined') return;

  const { cardId } = params;
  const lectureStudentView = await studentInfoView({
    courseLectureIds: [],
    lectureCardIds: [],
    preLectureCardIds: [],
    serviceId: cardId,
  });

  const student: any = lectureStudentView.own;
  setLectureCardSummaryLearningState(student);
}
