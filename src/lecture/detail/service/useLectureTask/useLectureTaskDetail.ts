import {
  getLectureTaskOffset,
  onLectureTaskDetail,
  onLectureTaskItem,
  onLectureTaskOffset,
  onLectureTaskViewType,
  setLectureTaskItem,
  setLectureTaskOffset,
} from 'lecture/detail/store/LectureTaskStore';
import {
  LectureTask,
  // LectureTaskParams,
} from 'lecture/detail/viewModel/LectureTask';
import { LectureTaskDetail } from 'lecture/detail/viewModel/LectureTaskDetail';
/* eslint-disable consistent-return */

import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  LectureStructureCourseItemParams,
  LectureStructureCubeItemParams,
} from '../../viewModel/LectureTest';
import { useLectureRouterParams } from '../useLectureRouterParams';
//import { getCourseLectureStructure } from './utility/getCourseLectureStructure';
import { getCubeLectureTask } from './utility/getCubeLectureTask';
import { getCubeLectureTaskDetail } from './utility/getCubeLectureTaskDetail';

type TaskDetailValue = LectureTaskDetail | undefined;
export function useLectureTaskDetail(): [TaskDetailValue] {
  const subscriberIdRef = useRef<number>(0);
  const [subscriberId, setSubscriberId] = useState<string>();
  const [taskDetailValue, setTaskDetailValue] = useState<any>();

  useEffect(() => {
    const next = `useLectureTaskDetail-${++subscriberIdRef.current}`;
    setSubscriberId(next);
  }, []);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureTaskItem(next => {
      // setTaskDetailValue();
    }, subscriberId);
  }, [subscriberId]);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureTaskDetail(next => {
      if (next) {
        setTaskDetailValue(next);
      }
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
