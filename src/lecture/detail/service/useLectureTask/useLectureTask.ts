import {
  getLectureTaskOffset,
  getLectureTaskTab,
  getLectureTaskOrder,
  onLectureTaskItem,
  onLectureTaskOffset,
  onLectureTaskTab,
  onLectureTaskViewType,
  onLectureTaskOrder,
  setLectureTaskDetail,
  setLectureTaskItem,
  setLectureTaskOffset,
  setLectureTaskTab,
  setLectureTaskOrder,
} from 'lecture/detail/store/LectureTaskStore';
import { LectureTask } from 'lecture/detail/viewModel/LectureTask';
import { useEffect, useState } from 'react';
import { useLectureParams } from '../../store/LectureParamsStore';

import { getCubeLectureTask } from './utility/getCubeLectureTask';
import { getCubeLectureTaskDetail } from './utility/getCubeLectureTaskDetail';

type TaskValue = LectureTask | undefined;

let subscriberIdRef = 0;
const limit = 10;
export function useLectureTask(): [TaskValue] {
  const [subscriberId, setSubscriberId] = useState<string>();
  const [taskValue, setTaskValue] = useState<TaskValue>();

  const params = useLectureParams();
  // const { pathname } = useLocation();

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
    // add
    setLectureTaskOrder('New');
  }, [params?.cubeId]);

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
      if (params?.cubeId === undefined || getLectureTaskTab() === 'Overview') {
        return;
      }
      getCubeLectureTask(
        params?.cubeId,
        getLectureTaskOffset() || 0,
        limit,
        getLectureTaskOrder() === "My" ? 'My' : 'Posts',
        getLectureTaskOrder() || 'New'

      );
    }, subscriberId);
  }, [subscriberId, params?.cubeId]);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureTaskViewType(next => {
      if (next === 'edit') {
        return;
      }
      getCubeLectureTaskDetail(next!);
      if (next === 'create') {
        setLectureTaskDetail();
      }
      if (next === 'list') {
        setLectureTaskItem();
        setLectureTaskOffset(0);
        // add
        setLectureTaskItem();
        setLectureTaskDetail();
        // setLectureTaskOrder('New');
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
      // addd
      setLectureTaskOrder('New');
    }, subscriberId);
  }, [subscriberId]);

  return [taskValue];
}
