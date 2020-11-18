/* eslint-disable consistent-return */
import { useCallback, useEffect, useState } from 'react';
import { onLectureTranscripts } from '../../store/LectureTranscriptStore';
import { LectureTranscript } from '../../viewModel/LectureTranscript';
import { LectureMedia } from '../../viewModel/LectureMedia';
import { getCubeLectureMedia } from './utility/getCubeLectureMedia';
import { useLectureRouterParams } from '../useLectureRouterParams';
import { onLectureMedia } from 'lecture/detail/store/LectureMediaStore';
import LectureRouterParams from 'lecture/detail/viewModel/LectureRouterParams';
import { checkStudent } from './utility/checkStudent';

type TranscriptsValue = LectureTranscript[] | undefined;
type MediaValue = LectureMedia | undefined;

let subscriberIdRef = 0;
export function useLectureMedia(): [TranscriptsValue, MediaValue, (params: LectureRouterParams) => void] {
  const [subscriberId, setSubscriberId] = useState<string>();
  const [transcriptsValue, setTranscriptsValue] = useState<TranscriptsValue>();
  const [mediaValue, setMediaValue] = useState<MediaValue>();

  const params = useLectureRouterParams();

  const getCubeMediaItem = useCallback((params: LectureRouterParams) => {
    getCubeLectureMedia(params);
  }, []);

  const registerStudent = useCallback((params: LectureRouterParams) => {
    checkStudent(params);
  }, []);

  useEffect(() => {
    params && getCubeMediaItem(params);
  }, [params]);

  useEffect(() => {
    const next = `useLectureMedia-${++subscriberIdRef}`;
    setSubscriberId(next);
  }, []);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureTranscripts(next => {
      setTranscriptsValue(next);
    }, subscriberId);
  }, [subscriberId]);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureMedia(next => {
      setMediaValue(next);
    }, subscriberId);
  }, [subscriberId]);

  return [transcriptsValue, mediaValue, registerStudent];
}
