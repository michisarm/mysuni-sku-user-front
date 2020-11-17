/* eslint-disable consistent-return */

import LectureParams from 'lecture/detail/viewModel/LectureParams';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { onLectureReport } from '../../store/LectureReportStore';
import {
  LectureReport,
  LectureStructureCourseItemParams,
  LectureStructureCubeItemParams,
  LectureReportCubeItemParams,
} from '../../viewModel/LectureReport';
import { getCubeLectureReport } from './utility/getCubeLectureReport';
import { getCourseLectureReport } from './utility/getCourseLectureReport';
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
  
  const getCubeReportItem = useCallback((params: LectureParams) => {
    getCubeLectureReport(params);
  }, []);

  const getCourseReportItem = useCallback((params: any) => {
    if (params === undefined) {
      return;
    }
    getCourseLectureReport(params);
  }, [params]);


  useEffect(() => {
    if (params.cubeId !== undefined) {
      getCubeReportItem(params);
    } else {
      getCourseReportItem(params);
    }
  }, [params]);

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
      console.log('LectureReportItem', next);
    }, subscriberId);
  }, [subscriberId]);

  const setCubeLectureReport = useCallback(() => {
    return setCubeLectureStudentReport(params);
  }, []);

  return [reportValue, setReportValue, setCubeLectureReport];
}
