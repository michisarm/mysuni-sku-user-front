/* eslint-disable consistent-return */
import { useEffect, useRef, useState } from 'react';
import { useLectureRouterParams } from '../useLectureRouterParams';
import {
  onLectureBadge,
  setLectureBadge,
} from '../../store/LectureOverviewStore';
import LectureBadge from '../../viewModel/LectureOverview/LectureBadge';
import { findByLectureUsid } from '../../api/badgeApi';

type Value = LectureBadge | undefined;

let subscriberIdRef = 0;
export function useLectureBadge(): [Value] {
  const [subscriberId, setSubscriberId] = useState<string>();
  const [value, setValue] = useState<Value>();
  const params = useLectureRouterParams();

  useEffect(() => {
    const next = `useLectureBadge-${++subscriberIdRef}`;
    setSubscriberId(next);
  }, []);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureBadge(next => {
      setValue(next);
    }, subscriberId);
  }, [subscriberId]);

  useEffect(() => {
    if (params === undefined) {
      return;
    }
    findByLectureUsid(params.lectureId).then(badges => {
      if(badges === undefined){
        setLectureBadge()
      } else {
        setLectureBadge({ badges })
      }
    });
  }, [params]);

  return [value];
}
