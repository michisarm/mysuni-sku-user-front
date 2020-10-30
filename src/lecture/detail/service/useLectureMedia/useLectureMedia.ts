/* eslint-disable consistent-return */

import LectureParams from 'lecture/detail/viewModel/LectureParams';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { onLectureTranscripts } from '../../store/LectureTranscriptStore';
import { LectureTranscript } from '../../viewModel/LectureTranscript';
import { LectureMedia } from '../../viewModel/LectureMedia';
import { getCubeLectureMedia } from './utility/getCubeLectureMedia';
// import { getCourseLectureTranscript } from './utility/getCourseLectureTranscript';
// import { setCubeLectureStudentReport } from './utility/setCubeLectureStudentReport';
import { useLectureRouterParams } from '../useLectureRouterParams';
import { onLectureMedia } from 'lecture/detail/store/LectureMediaStore';

type TranscriptsValue = LectureTranscript[] | undefined;
type MediaValue = LectureMedia | undefined;

export function useLectureMedia(): [TranscriptsValue, MediaValue] {
  const subscriberIdRef = useRef<number>(0);
  const [subscriberId, setSubscriberId] = useState<string>();
  const [transcriptsValue, setTranscriptsValue] = useState<TranscriptsValue>();
  const [mediaValue, setMediaValue] = useState<MediaValue>();

  const params = useParams<LectureParams>();

  const getCubeLectureMediaItem = useCallback((params: LectureParams) => {
    getCubeLectureMedia(params);
  }, []);

  // const getCourseReportItem = useCallback((params: LectureRouterParams) => {
  //   getCourseLectureTranscript(params);
  // }, []);

  useEffect(() => {
    //if (params.cubeId !== undefined) {
    getCubeLectureMediaItem(params);
    // } else {
    //   // getCourseReportItem(params);
    // }
  }, [params]);

  useEffect(() => {
    const next = `useLectureMedia-${++subscriberIdRef.current}`;
    setSubscriberId(next);
  }, []);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureTranscripts(next => {
      setTranscriptsValue(next);
      console.log('LectureTranscriptsItem', next);
    }, subscriberId);
  }, [subscriberId]);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureMedia(next => {
      setMediaValue(next);
      console.log('LectureMediaItem', next);
    }, subscriberId);
  }, [subscriberId]);

  return [transcriptsValue, mediaValue];
}
