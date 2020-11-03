/* eslint-disable consistent-return */

import LectureParams from 'lecture/detail/viewModel/LectureParams';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { onLectureTranscripts } from '../../store/LectureTranscriptStore';
import { LectureTranscript } from '../../viewModel/LectureTranscript';
import LectureWatchLog from '../../viewModel/LectureWatchLog';
import { getCubeLectureWatchLog } from './utility/getCubeLectureWatchLog';
import { setCubeLectureWatchLog } from './utility/setCubeLectureWatchLog';
import { useLectureRouterParams } from '../useLectureRouterParams';
import { onLectureWatchLogs } from 'lecture/detail/store/LectureWatchLogsStore';
import LectureRouterParams from 'lecture/detail/viewModel/LectureRouterParams';
import { getWatchLogSumViewSeconds } from './utility/getWatchLogSumViewSeconds';
import WatchLog from 'lecture/detail/model/WatchLog';
import { setLectureWatchLogSumViewCount } from 'lecture/detail/store/LectureWatchLogSumViewCountStore';

type WatchLogValues = LectureWatchLog[] | undefined;

export function useLectureWatchLog(): [
  WatchLogValues,
  (params: LectureRouterParams) => void,
  (params: LectureRouterParams, watchLog: WatchLog) => void,
  (params: LectureRouterParams) => void
] {
  const subscriberIdRef = useRef<number>(0);
  const [subscriberId, setSubscriberId] = useState<string>();
  const [watchLogValue, setWatchLogValue] = useState<WatchLogValues>();

  const params = useLectureRouterParams();

  const getCubeWatchLogItem = useCallback((params: LectureRouterParams) => {
    getCubeLectureWatchLog(params);
  }, []);

  // registerWatchLog(watchlog: WatchLog)
  // export function findSumViewSeconds(

  const setWatchLog = useCallback(
    (params: LectureRouterParams, watchLog: WatchLog) => {
      setCubeLectureWatchLog(params, watchLog);
    },
    []
  );

  const getWatchLogSumViewCount = useCallback((params: LectureRouterParams) => {
    getWatchLogSumViewSeconds(params);
  }, []);

  useEffect(() => {
    console.log('params : ', params);

    params && getCubeWatchLogItem(params);
  }, [params]);

  useEffect(() => {
    const next = `useLectureWatchLog-${++subscriberIdRef.current}`;
    setSubscriberId(next);
  }, []);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureWatchLogs(next => {
      setWatchLogValue(next);
      console.log('LectureWatchLogItem', next);
    }, subscriberId);
  }, [subscriberId]);

  return [
    watchLogValue,
    getCubeWatchLogItem,
    setWatchLog,
    getWatchLogSumViewCount,
  ];
}
