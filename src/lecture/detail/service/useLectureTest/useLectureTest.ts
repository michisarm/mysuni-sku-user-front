/* eslint-disable consistent-return */

import LectureParams from 'lecture/detail/viewModel/LectureParams';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { onLectureTestItem } from '../../store/LectureTestStore';
import LectureRouterParams from '../../viewModel/LectureRouterParams';
import { LectureTestItem } from '../../viewModel/LectureTest';
import { useLectureRouterParams } from '../useLectureRouterParams';
import { getCourseLectureTest } from './utility/getCourseLectureTest';
//import { getCourseLectureStructure } from './utility/getCourseLectureStructure';
import { getCubeLectureTest } from './utility/getCubeLectureTest';

type TestValue = LectureTestItem | undefined;

let subscriberIdRef = 0;
export function useLectureTest(): [TestValue] {
  const [subscriberId, setSubscriberId] = useState<string>();
  const [testValue, setTestValue] = useState<TestValue>();
  const params = useLectureRouterParams();

  const getCubeTestItem = useCallback((params: LectureRouterParams) => {
    getCubeLectureTest(params);
  }, []);

  const getCourseTestItem = useCallback((params: LectureRouterParams) => {
    getCourseLectureTest(params);
  }, []);

  useEffect(() => {
    if (params === undefined) {
      return;
    }
    if (params.contentType === 'cube') {
      getCubeTestItem(params);
    } else {
      getCourseTestItem(params);
    }
  }, [params]);

  useEffect(() => {
    const next = `useLectureTest-${++subscriberIdRef}`;
    setSubscriberId(next);
  }, []);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureTestItem(next => {
      setTestValue(next);
    }, subscriberId);
  }, [subscriberId]);

  return [testValue];
}
