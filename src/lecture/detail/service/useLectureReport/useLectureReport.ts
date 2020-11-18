/* eslint-disable consistent-return */

import LectureParams from 'lecture/detail/viewModel/LectureParams';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { onLectureReport } from '../../store/LectureReportStore';
import {
  LectureReport,
} from '../../viewModel/LectureReport';
import { setCubeLectureStudentReport } from './utility/setCubeLectureStudentReport';

type ReportValue = LectureReport | undefined;

let subscriberIdRef = 0;
export function useLectureReport(): [
  ReportValue,
  (reportValue: ReportValue) => void,
  () => void
] {
  const [subscriberId, setSubscriberId] = useState<string>();
  const [reportValue, setReportValue] = useState<ReportValue>();
  const params = useParams<LectureParams>();



  useEffect(() => {
    const next = `useLectureReport-${++subscriberIdRef}`;
    setSubscriberId(next);
  }, []);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureReport(next => {
      setReportValue(next);
    }, subscriberId);
  }, [subscriberId]);

  const setCubeLectureReport = useCallback(() => {
    return setCubeLectureStudentReport(params);
  }, [params]);

  return [reportValue, setReportValue, setCubeLectureReport];
}
