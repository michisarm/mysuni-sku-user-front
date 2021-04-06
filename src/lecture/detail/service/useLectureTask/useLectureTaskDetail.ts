// jz - 여기 코드 정말 이상 시간나면 살펴 보자

import {
  onLectureTaskDetail,
  onLectureTaskItem,
  onLectureTaskViewType,
} from 'lecture/detail/store/LectureTaskStore';
import { LectureTaskDetail } from 'lecture/detail/viewModel/LectureTaskDetail';
import { useEffect, useState } from 'react';
import { getCubeLectureTaskDetail } from './utility/getCubeLectureTaskDetail';

type TaskDetailValue = LectureTaskDetail | undefined;

let subscriberIdRef = 0;
export function useLectureTaskDetail(): [TaskDetailValue] {
  const [subscriberId, setSubscriberId] = useState<string>();
  const [taskDetailValue, setTaskDetailValue] = useState<any>();

  useEffect(() => {
    const next = `useLectureTaskDetail-${++subscriberIdRef}`;
    setSubscriberId(next);
  }, []);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureTaskItem(next => {}, subscriberId);
  }, [subscriberId]);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureTaskDetail(next => {
      setTaskDetailValue(next);
    }, subscriberId);
  }, [subscriberId]);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureTaskViewType(next => {
      getCubeLectureTaskDetail(next!);
    }, subscriberId);
  }, [subscriberId]);

  return [taskDetailValue];
}
