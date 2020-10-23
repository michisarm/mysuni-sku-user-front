/* eslint-disable consistent-return */

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
//import { getCourseLectureStructure } from './utility/getCourseLectureStructure';
import { getCubeLectureTest } from './utility/getCubeLectureTest';

type TestValue = LectureTestItem | undefined;
type AnswerValue = LectureTestAnswerItem | undefined;

export function useLectureTest(): [TestValue, AnswerValue] {
  const subscriberIdRef = useRef<number>(0);
  const [subscriberId, setSubscriberId] = useState<string>();
  const [testValue, setTestValue] = useState<TestValue>();
  const [answerValue, setAnswerValue] = useState<AnswerValue>();
  const params = useParams<
    LectureStructureCourseItemParams & LectureStructureCubeItemParams
  >();

  const getCubeTestItem = useCallback((examId: string) => {
    getCubeLectureTest(examId);
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
    if (params.cubeId !== undefined && params.examId !== undefined) {
      getCubeTestItem(params.examId);
    } else {
      //getCourseItem(params);
    }
  }, [params]);

  useEffect(() => {
    const next = `useLectureTest-${++subscriberIdRef.current}`;
    setSubscriberId(next);
  }, []);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureTestItem(next => {
      setTestValue(next);
      console.log('LectureTestItem', next);
    }, subscriberId);
  }, [subscriberId]);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureTestAnswerItem(next => {
      setAnswerValue(next);
      console.log('LectureTestAnswerItem', next);
    }, subscriberId);
  }, [subscriberId]);

  return [testValue, answerValue];
}
