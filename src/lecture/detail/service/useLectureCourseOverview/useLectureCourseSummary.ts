import { reactAlert } from '@nara.platform/accent';
/* eslint-disable consistent-return */

import { useEffect, useRef, useState } from 'react';
import { addInMyLecture, removeInMyLecture } from '../../api/mytrainingApi';
import {
  getInMyLectureCdo,
  getLectureCourseSummary,
  onLectureCourseSummary,
  setLectureCourseSummary,
} from '../../store/LectureOverviewStore';
import LectureCourseSummary from '../../viewModel/LectureOverview/LectureCourseSummary';

type Value = LectureCourseSummary | undefined;

export function toggleCourseBookmark() {
  const lectureSummary = getLectureCourseSummary();
  if (lectureSummary !== undefined) {
    if (lectureSummary.mytrainingId === undefined) {
      const inMyLectureCdo = getInMyLectureCdo();
      if (inMyLectureCdo !== undefined) {
        addInMyLecture(inMyLectureCdo).then(mytrainingId => {
          setLectureCourseSummary({ ...lectureSummary, mytrainingId });
          reactAlert({
            title: '알림',
            message: '본 과정이 관심목록에 추가되었습니다.',
          });
        });
      }
    } else {
      removeInMyLecture(lectureSummary.mytrainingId).then(() => {
        setLectureCourseSummary({ ...lectureSummary, mytrainingId: undefined });
        reactAlert({
          title: '알림',
          message: '본 과정이 관심목록에서 제외되었습니다.',
        });
      });
    }
  }
}

let subscriberIdRef = 0;
export function useLectureCourseSummary(): [Value] {
  const [subscriberId, setSubscriberId] = useState<string>();
  const [value, setValue] = useState<Value>();

  useEffect(() => {
    const next = `useLectureCourseSummary-${++subscriberIdRef}`;
    setSubscriberId(next);
  }, []);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureCourseSummary(next => {
      setValue(next);
    }, subscriberId);
  }, [subscriberId]);

  return [value];
}
