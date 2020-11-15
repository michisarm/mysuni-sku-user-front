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
import WatchLog from 'lecture/detail/model/Watchlog';
import { confirmProgress } from './utility/confirmProgress';

type WatchLogValues = LectureWatchLog[] | undefined;

let subscriberIdRef = 0;
export function useLectureWatchLog(): [
  WatchLogValues,
  (params: LectureRouterParams) => void,
  (params: LectureRouterParams, watchLog: WatchLog) => void,
  (params: LectureRouterParams) => void,
  (params: LectureRouterParams) => Promise<void>
] {
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

  const LectureConfirmProgress = useCallback((params: LectureRouterParams) => {
    return confirmProgress(params);
  }, []);

  const getWatchLogSumViewCount = useCallback((params: LectureRouterParams) => {
    getWatchLogSumViewSeconds(params);
  }, []);

  useEffect(() => {
    params && getCubeWatchLogItem(params);
  }, [params]);

  useEffect(() => {
    const next = `useLectureWatchLog-${++subscriberIdRef}`;
    setSubscriberId(next);
  }, []);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureWatchLogs(next => {
      setWatchLogValue(next);
    }, subscriberId);
  }, [subscriberId]);

  return [
    watchLogValue,
    getCubeWatchLogItem,
    setWatchLog,
    getWatchLogSumViewCount,
    LectureConfirmProgress,
  ];
}
