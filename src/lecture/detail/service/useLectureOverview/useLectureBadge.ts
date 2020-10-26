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

export function useLectureBadge(): [Value] {
  const subscriberIdRef = useRef<number>(0);
  const [subscriberId, setSubscriberId] = useState<string>();
  const [value, setValue] = useState<Value>();
  const { lectureId } = useLectureRouterParams();

  useEffect(() => {
    const next = `useLectureBadge-${++subscriberIdRef.current}`;
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
    findByLectureUsid(lectureId).then(badges => setLectureBadge({ badges }));
  }, [lectureId]);

  return [value];
}
