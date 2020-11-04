/* eslint-disable consistent-return */

import { reactAlert } from '@nara.platform/accent';
import { useEffect, useRef, useState } from 'react';
import { addInMyLecture, removeInMyLecture } from '../../api/mytrainingApi';
import {
  getInMyLectureCdo,
  getLectureCubeSummary,
  onLectureCubeSummary,
  setLectureCubeSummary,
} from '../../store/LectureOverviewStore';
import LectureCubeSummary from '../../viewModel/LectureOverview/LectureCubeSummary';

type Value = LectureCubeSummary | undefined;

export function toggleCubeBookmark() {
  const lectureSummary = getLectureCubeSummary();
  if (lectureSummary !== undefined) {
    if (lectureSummary.mytrainingId === undefined) {
      const inMyLectureCdo = getInMyLectureCdo();
      if (inMyLectureCdo !== undefined) {
        addInMyLecture(inMyLectureCdo).then(mytrainingId => {
          setLectureCubeSummary({ ...lectureSummary, mytrainingId });
          reactAlert({
            title: '알림',
            message: '본 과정이 관심목록에 추가되었습니다.',
          });
        });
      }
    } else {
      removeInMyLecture(lectureSummary.mytrainingId).then(() => {
        setLectureCubeSummary({ ...lectureSummary, mytrainingId: undefined });
        reactAlert({
          title: '알림',
          message: '본 과정이 관심목록에서 제외되었습니다.',
        });
      });
    }
  }
}

export function useLectureCubeSummary(): [Value] {
  const subscriberIdRef = useRef<number>(0);
  const [subscriberId, setSubscriberId] = useState<string>();
  const [value, setValue] = useState<Value>();

  useEffect(() => {
    const next = `useLectureCubeSummary-${++subscriberIdRef.current}`;
    setSubscriberId(next);
  }, []);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureCubeSummary(next => {
      setValue(next);
    }, subscriberId);
  }, [subscriberId]);

  return [value];
}
