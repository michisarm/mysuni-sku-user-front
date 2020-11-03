import {
  getLectureTaskOffset,
  getLectureTaskTab,
  onLectureTaskItem,
  onLectureTaskOffset,
  onLectureTaskViewType,
  setLectureTaskItem,
  setLectureTaskOffset,
  setLectureTaskViewType,
} from 'lecture/detail/store/LectureTaskStore';
import {
  LectureTask,
  // LectureTaskParams,
} from 'lecture/detail/viewModel/LectureTask';
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

type TaskValue = LectureTask | undefined;
export function useLectureTask(): [TaskValue] {
  const subscriberIdRef = useRef<number>(0);
  const [subscriberId, setSubscriberId] = useState<string>();
  const [taskValue, setTaskValue] = useState<TaskValue>();
  const [limit, setLimit] = useState<number>(2);
  const params = useParams<
    LectureStructureCourseItemParams & LectureStructureCubeItemParams
  >();
  const [viewFlag, setViewFlag] = useState<string>('list');
  const param = useLectureRouterParams();
  const tab = getLectureTaskTab();

  useEffect(() => {
    if (param && param.contentId !== undefined) {
      setLectureTaskItem({
        items: [],
        totalCount: 0,
        empty: false,
        offset: 0,
        limit: 2,
      });
      setLectureTaskViewType('list');
      setLectureTaskOffset(0);
    }
  }, [params]);

  useEffect(() => {
    const next = `useLectureTask-${++subscriberIdRef.current}`;
    setSubscriberId(next);
  }, []);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureTaskItem(next => {
      setTaskValue(next);
    }, subscriberId);
  }, [subscriberId]);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureTaskOffset(next => {
      let contentId = '';
      let lectureId = '';
      if (param) {
        contentId = param.contentId;
        lectureId = param.lectureId;
      }
      getCubeLectureTask(
        contentId,
        lectureId,
        getLectureTaskOffset() || 0,
        limit
      );
    }, subscriberId);
  }, [subscriberId]);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureTaskViewType(next => {
      // console.log('postId', postId);
      console.log('next', next);
      setViewFlag(next!);
      getCubeLectureTaskDetail(next!);
    }, subscriberId);
  }, [subscriberId]);

  useEffect(() => {
    if (param !== undefined) {
      console.log('tab', tab);
    }
  }, [tab]);

  return [taskValue];
}
