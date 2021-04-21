/* eslint-disable consistent-return */

import { useCallback, useEffect, useRef, useState } from 'react';
import { useLectureParams } from '../../store/LectureParamsStore';
import { onLectureTestAnswerItem } from '../../store/LectureTestStore';
import { LectureTestAnswerItem } from '../../viewModel/LectureTest';
import { useLectureTest } from './useLectureTest';
import { getCourseLectureTestAnswer } from './utility/getCourseLectureTest';
import { getCubeLectureTestAnswer } from './utility/getCubeLectureTest';

type AnswerValue = LectureTestAnswerItem | undefined;

let subscriberIdRef = 0;
export function useLectureTestAnswer(): [AnswerValue] {
  const [subscriberId, setSubscriberId] = useState<string>();
  const [answerValue, setAnswerValue] = useState<AnswerValue>();
  const params = useLectureParams();
  const [testItem] = useLectureTest();

  const getCubeTestAnswerItem = useCallback(() => {
    if (params !== undefined) {
      getCubeLectureTestAnswer(params);
    }
  }, [params]);

  const getCourseTestAnswerItem = useCallback(() => {
    if (params !== undefined) {
      getCourseLectureTestAnswer(params);
    }
  }, [params]);

  useEffect(() => {
    if (params === undefined) {
      return;
    }
    const { cubeId } = params;
    if (cubeId !== undefined) {
      getCubeTestAnswerItem();
    } else {
      getCourseTestAnswerItem();
    }
  }, [params, testItem?.id]);

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
    }, subscriberId);
  }, [subscriberId]);

  return [answerValue];
}
