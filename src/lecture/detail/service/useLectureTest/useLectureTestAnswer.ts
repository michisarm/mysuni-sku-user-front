/* eslint-disable consistent-return */

import LectureParams from 'lecture/detail/viewModel/LectureParams';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { onLectureTestAnswerItem } from '../../store/LectureTestStore';
import {
  LectureStructureCourseItemParams,
  LectureStructureCubeItemParams,
  LectureTestAnswerItem,
} from '../../viewModel/LectureTest';
import { useLectureRouterParams } from '../useLectureRouterParams';
import { getCourseLectureTestAnswer } from './utility/getCourseLectureTest';
//import { getCourseLectureStructure } from './utility/getCourseLectureStructure';
import { getCubeLectureTestAnswer } from './utility/getCubeLectureTest';

type AnswerValue = LectureTestAnswerItem | undefined;

let subscriberIdRef = 0;
export function useLectureTestAnswer(): [AnswerValue] {
  const [subscriberId, setSubscriberId] = useState<string>();
  const [answerValue, setAnswerValue] = useState<AnswerValue>();
  const params = useParams<LectureParams>();

  const getCubeTestAnswerItem = useCallback((params: LectureParams) => {
    getCubeLectureTestAnswer(params);
  }, []);

  const getCourseTestAnswerItem = useCallback((params: LectureParams) => {
    getCourseLectureTestAnswer(params);
  }, []);

  useEffect(() => {
    const { lectureType, contentId, lectureId, ...structParams } = params;
    if (params.cubeId !== undefined) {
      getCubeTestAnswerItem(params);
    } else {
      getCourseTestAnswerItem(params);
    }
  }, [params]);

  useEffect(() => {
    const next = `useLectureTestAnswer-${++subscriberIdRef}`;
    setSubscriberId(next);
  }, []);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureTestAnswerItem(next => {
      setAnswerValue(next);
      console.log('LectureTestAnswerItem', next);
    }, subscriberId);
  }, [subscriberId]);

  return [answerValue];
}
