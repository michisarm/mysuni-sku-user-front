/* eslint-disable consistent-return */

import { useCallback, useEffect } from 'react';
import { useLectureParams } from '../../store/LectureParamsStore';
import { useLectureTest } from './useLectureTest';
import { getCourseLectureTestAnswer } from './utility/getCourseLectureTest';
import { getCubeLectureTestAnswer } from './utility/getCubeLectureTest';

export function useLectureRequestTestAnswer() {
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
}
