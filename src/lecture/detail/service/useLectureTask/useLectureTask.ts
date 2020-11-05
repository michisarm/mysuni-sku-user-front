import {
  getLectureTaskOffset,
  getLectureTaskTab,
  onLectureTaskItem,
  onLectureTaskOffset,
  onLectureTaskTab,
  onLectureTaskViewType,
  setLectureTaskDetail,
  setLectureTaskItem,
  setLectureTaskOffset,
  setLectureTaskTab,
  setLectureTaskViewType,
} from 'lecture/detail/store/LectureTaskStore';
import {
  LectureTask,
  // LectureTaskParams,
} from 'lecture/detail/viewModel/LectureTask';
/* eslint-disable consistent-return */

import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PatronKey } from 'shared/model';
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
  const [limit, setLimit] = useState<number>(10);
  const params = useParams<
    LectureStructureCourseItemParams & LectureStructureCubeItemParams
  >();
  const [viewFlag, setViewFlag] = useState<string>('list');
  // const [tabFlag, setTabFlag] = useState<string>('Posts');

  const param = useLectureRouterParams();

  useEffect(() => {
    console.log('params', params)
    if (param && param.contentId !== undefined) {
      setLectureTaskItem({
        items: [],
        totalCount: 0,
        empty: false,
        offset: 0,
        limit: 10,
      });
      setLectureTaskViewType('list');
      setLectureTaskTab('Posts');
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
      if (getLectureTaskTab() === 'Overview') {
        return;
      }
      getCubeLectureTask(
        contentId,
        lectureId,
        getLectureTaskOffset() || 0,
        limit,
        getLectureTaskTab() || 'post'
      );
    }, subscriberId);
  }, [subscriberId]);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureTaskViewType(next => {
      setViewFlag(next!);
      getCubeLectureTaskDetail(next!);
      if (next === 'create' || 'reply') {
        setLectureTaskDetail();
      }
      if (next === 'list') {
        setLectureTaskItem();
        setLectureTaskOffset(0);
      }
    }, subscriberId);
  }, [subscriberId]);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureTaskTab(next => {
      if (next === 'Overview') {
        setLectureTaskViewType('Overview');
        return;
      }

      setLectureTaskItem();
      setLectureTaskOffset(0);

    }, subscriberId);
  }, [subscriberId]);

  return [taskValue];
}
