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
import { useEffect, useState } from 'react';
import { useLocation, } from 'react-router-dom';
import { parseLectureParamsFromPathname } from '../../utility/lectureRouterParamsHelper';

import { useLectureRouterParams } from '../useLectureRouterParams';
//import { getCourseLectureStructure } from './utility/getCourseLectureStructure';
import { getCubeLectureTask } from './utility/getCubeLectureTask';
import { getCubeLectureTaskDetail } from './utility/getCubeLectureTaskDetail';

type TaskValue = LectureTask | undefined;

let subscriberIdRef = 0;
export function useLectureTask(): [TaskValue] {
  const [subscriberId, setSubscriberId] = useState<string>();
  const [taskValue, setTaskValue] = useState<TaskValue>();
  const [limit, setLimit] = useState<number>(10);

  const { pathname } = useLocation();
  const [viewFlag, setViewFlag] = useState<string>('list');
  // const [tabFlag, setTabFlag] = useState<string>('Posts');

  const param = useLectureRouterParams();

  useEffect(() => {
    setLectureTaskItem({
      items: [],
      totalCount: 0,
      empty: false,
      offset: 0,
      limit: 10,
    });
    setLectureTaskTab('Overview');
    setLectureTaskOffset(0);
  }, [pathname]);

  useEffect(() => {
    const next = `useLectureTask-${++subscriberIdRef}`;
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
      const params = parseLectureParamsFromPathname(pathname);
      if (params === undefined) {
        return;
      }
      const { contentId, lectureId } = params
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
  }, [subscriberId, pathname]);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureTaskViewType(next => {
      if (next === 'edit') {
        return
      }
      setViewFlag(next!);
      getCubeLectureTaskDetail(next!);
      if (next === 'create') {
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
        return;
      }

      setLectureTaskItem();
      setLectureTaskOffset(0);

    }, subscriberId);
  }, [subscriberId]);

  return [taskValue];
}
