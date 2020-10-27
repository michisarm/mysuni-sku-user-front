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
import { useLectureRouterParams } from '../useLectureRouterParams';
//import { getCourseLectureStructure } from './utility/getCourseLectureStructure';
import { getCubeLectureTest } from './utility/getCubeLectureTest';

type TestValue = LectureTestItem | undefined;

export function useLectureTest(): [TestValue] {
  const subscriberIdRef = useRef<number>(0);
  const [subscriberId, setSubscriberId] = useState<string>();
  const [testValue, setTestValue] = useState<TestValue>();
  const params = useParams<
    LectureStructureCourseItemParams & LectureStructureCubeItemParams
  >();

  const { lectureId, contentType, contentId } = useLectureRouterParams();

  const getCubeTestItem = useCallback(() => {
    getCubeLectureTest(contentId);
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
      getCubeTestItem();
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

  return [testValue];
}
