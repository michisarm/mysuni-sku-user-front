/* eslint-disable consistent-return */

import { useCallback, useEffect, useState } from 'react';
import { useLectureParams } from '../../store/LectureParamsStore';
import { onLectureTestItem } from '../../store/LectureTestStore';
import { LectureTestItem } from '../../viewModel/LectureTest';
import { getCourseLectureTest } from './utility/getCourseLectureTest';
import { getCubeLectureTest } from './utility/getCubeLectureTest';

type TestValue = LectureTestItem | undefined;

let subscriberIdRef = 0;
export function useLectureTest(): [TestValue] {
  const [subscriberId, setSubscriberId] = useState<string>();
  const [testValue, setTestValue] = useState<TestValue>();
  const params = useLectureParams();

  const getCubeTestItem = useCallback(() => {
    if (params !== undefined) {
      getCubeLectureTest(params);
    }
  }, [params]);

  const getCourseTestItem = useCallback(() => {
    if (params !== undefined) {
      getCourseLectureTest(params);
    }
  }, [params]);

  useEffect(() => {
    if (params === undefined) {
      return;
    }
    if (params.cubeId !== undefined) {
      getCubeTestItem();
    } else {
      getCourseTestItem();
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
