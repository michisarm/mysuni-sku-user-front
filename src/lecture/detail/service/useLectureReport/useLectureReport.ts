/* eslint-disable consistent-return */

import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  setLectureReport,
  onLectureReport,
  getLectureReport,
} from '../../store/LectureReportStore';
import {
  LectureReport,
  LectureStructureCourseItemParams,
  LectureStructureCubeItemParams,
  LectureReportCubeItemParams
} from '../../viewModel/LectureReport';
//import { getCourseLectureStructure } from './utility/getCourseLectureStructure';
import { getCubeLectureReport } from './utility/getCubeLectureReport';
import { setCubeLectureStudentReport } from './utility/setCubeLectureStudentReport';

type ReportValue = LectureReport | undefined;

export function useLectureReport(): [ReportValue,(reportValue:ReportValue) => void,() => void] {
  const subscriberIdRef = useRef<number>(0);
  const [subscriberId, setSubscriberId] = useState<string>();
  const [reportValue, setReportValue] = useState<ReportValue>();
  const params = useParams<
    LectureStructureCourseItemParams & LectureStructureCubeItemParams & LectureReportCubeItemParams
  >();
 
  const lectureReportCubeItemParams = useParams<
  LectureReportCubeItemParams
>();

  const getCubeReportItem = useCallback((params: LectureStructureCubeItemParams) => {
    getCubeLectureReport(params)
  }, []);

  //const getCourseItem = useCallback(
  //  (params: LectureStructureCourseItemParams) => {
  //    getCourseLectureStructure(params).then(LectureReport => {
  //      setLectureReport(LectureReport);
  //    });
  //  },
  //  []
  //);

  useEffect(() => {
    if (params.cubeId !== undefined) {
      getCubeReportItem(params);
    } else {
      //getCourseReportItem(params);
    }
  }, [params]);

  useEffect(() => {
    const next = `useLectureReport-${++subscriberIdRef.current}`;
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
    setCubeLectureStudentReport(params);
  }, []);



  return [reportValue, setReportValue, setCubeLectureReport];
}
