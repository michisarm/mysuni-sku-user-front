/* eslint-disable consistent-return */
import { useEffect, useRef, useState } from 'react';
import {
  onLectureBadge,
  setLectureBadge,
} from '../../store/LectureOverviewStore';
import LectureBadge from '../../viewModel/LectureOverview/LectureBadge';
import { findByLectureUsid } from '../../api/badgeApi';
import { useLectureParams } from '../../store/LectureParamsStore';

type Value = LectureBadge | undefined;

let subscriberIdRef = 0;
export function useLectureBadge(): [Value] {
  const [subscriberId, setSubscriberId] = useState<string>();
  const [value, setValue] = useState<Value>();
  const params = useLectureParams();

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
    if (params?.cardId === undefined) {
      return;
    }
    findByLectureUsid(params.cardId).then(badges => {
      if (badges === undefined) {
        setLectureBadge();
      } else {
        setLectureBadge({ badges });
      }
    });
  }, [params?.cardId]);

  return [value];
}
