/* eslint-disable consistent-return */

import ExamQuestion from 'lecture/detail/model/ExamQuestion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  onLectureTestItem,
  onLectureTestAnswerItem,
} from '../../store/LectureTestStore';
import {
  LectureStructureCourseItemParams,
  LectureStructureCubeItemParams,
  LectureTestItem,
  LectureTestAnswerItem,
} from '../../viewModel/LectureTest';
import { useLectureRouterParams } from '../useLectureRouterParams';
import { useLectureTest } from './useLectureTest';
//import { getCourseLectureStructure } from './utility/getCourseLectureStructure';
import { getCubeLectureTest } from './utility/getCubeLectureTest';
import { getCubeLectureTestAnswer } from './utility/getCubeLectureTest';

type AnswerValue = LectureTestAnswerItem | undefined;

export function useLectureTestAnswer(): [AnswerValue] {
  const subscriberIdRef = useRef<number>(0);
  const [subscriberId, setSubscriberId] = useState<string>();
  const [answerValue, setAnswerValue] = useState<AnswerValue>();
  const params = useParams<
    LectureStructureCourseItemParams & LectureStructureCubeItemParams
  >();

  const { lectureId, contentType, contentId } = useLectureRouterParams();

  const getCubeTestAnswerItem = useCallback(() => {
    getCubeLectureTestAnswer(contentId);
  }, []);

  //const getCourseItem = useCallback(
  //  (params: LectureStructureCourseItemParams) => {
  //    getCourseLectureStructure(params).then(lectureTest => {
  //      setLectureTest(lectureTest);
  //    });
  //  },
  //  []
  //);

  useEffect(() => {
    if (contentId !== undefined) {
      getCubeTestAnswerItem();
    } else {
      //getCourseItem(params);
    }
  }, [params]);

  useEffect(() => {
    const next = `useLectureTestAnswer-${++subscriberIdRef.current}`;
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
