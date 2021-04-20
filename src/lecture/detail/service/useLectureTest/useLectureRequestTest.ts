/* eslint-disable consistent-return */

import { useCallback, useEffect, useState } from 'react';
import {
  getLectureParams,
  useLectureParams,
} from '../../store/LectureParamsStore';
import { LectureTestItem } from '../../viewModel/LectureTest';
import { getCourseLectureTest } from './utility/getCourseLectureTest';
import { getCubeLectureTest } from './utility/getCubeLectureTest';

type TestValue = LectureTestItem | undefined;

export function useLectureRequestTest() {
  const params = useLectureParams();

  const getCubeTestItem = useCallback(() => {
    const params = getLectureParams();
    if (params !== undefined) {
      getCubeLectureTest(params);
    }
  }, []);

  const getCourseTestItem = useCallback(() => {
    const params = getLectureParams();
    if (params !== undefined) {
      getCourseLectureTest(params);
    }
  }, []);

  useEffect(() => {
    if (params?.cardId === undefined) {
      return;
    }
    if (params.cubeId !== undefined) {
      getCubeTestItem();
    } else {
      getCourseTestItem();
    }
  }, [params?.cardId, params?.cubeId]);
}
