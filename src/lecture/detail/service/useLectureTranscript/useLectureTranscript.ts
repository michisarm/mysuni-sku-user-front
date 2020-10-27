/* eslint-disable consistent-return */

import LectureParams from 'lecture/detail/viewModel/LectureParams';
import LectureRouterParams from 'lecture/detail/viewModel/LectureRouterParams';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { onLectureTranscripts } from '../../store/LectureTranscriptStore';
import {
  LectureTranscript,
  // LectureStructureCourseItemParams,
  // LectureStructureCubeItemParams,
  // LectureTranscriptCubeItemParams,
} from '../../viewModel/LectureTranscript';
import { getCubeLectureTranscript } from './utility/getCubeLectureTranscript';
// import { getCourseLectureTranscript } from './utility/getCourseLectureTranscript';
// import { setCubeLectureStudentReport } from './utility/setCubeLectureStudentReport';
import { useLectureRouterParams } from '../useLectureRouterParams';

type TranscriptsValue = LectureTranscript[] | undefined;

export function useLectureTranscript(): [TranscriptsValue] {
  const subscriberIdRef = useRef<number>(0);
  const [subscriberId, setSubscriberId] = useState<string>();
  const [transcriptsValue, setTranscriptsValue] = useState<TranscriptsValue>();
  const params = useLectureRouterParams();

  const getCubeReportItem = useCallback((params: LectureRouterParams) => {
    getCubeLectureTranscript(params);
  }, []);

  // const getCourseReportItem = useCallback((params: LectureRouterParams) => {
  //   getCourseLectureTranscript(params);
  // }, []);

  useEffect(() => {
    const { contentType, contentId, lectureId } = params;
    if (contentType == 'cube') {
      getCubeReportItem(params);
    } else {
      // getCourseReportItem(params);
    }
  }, []);

  useEffect(() => {
    const next = `useLectureTranscript-${++subscriberIdRef.current}`;
    setSubscriberId(next);
  }, []);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureTranscripts(next => {
      setTranscriptsValue(next);
      console.log('LectureTranscriptItem', next);
    }, subscriberId);
  }, [subscriberId]);

  // const setCubeLectureTranscript = useCallback(() => {
  //   setCubeLectureStudentReport(params);
  // }, []);

  return [transcriptsValue];
}
