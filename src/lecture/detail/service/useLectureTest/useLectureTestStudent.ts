/* eslint-disable consistent-return */

import { useCallback, useEffect, useState } from 'react';
import { useLectureParams } from '../../store/LectureParamsStore';
import { onLectureTestStudentItem } from '../../store/LectureTestStore';
import { LectureTestStudentItem } from '../../viewModel/LectureTest';
import { getCourseLectureTestStudent } from './utility/getCourseLectureTest';
import { getCubeLectureTestStudent } from './utility/getCubeLectureTest';

type TestStudentValue = LectureTestStudentItem | undefined;

let subscriberIdRef = 0;
export function useLectureTestStudent(): [TestStudentValue] {
  const [subscriberId, setSubscriberId] = useState<string>();
  const [testStudentValue, setTestStudentValue] = useState<TestStudentValue>();
  const params = useLectureParams();

  const getCubeTestStudentItem = useCallback(() => {
    if (params !== undefined) {
      getCubeLectureTestStudent(params);
    }
  }, [params]);

  const getCourseTestStudentItem = useCallback(() => {
    if (params !== undefined) {
      getCourseLectureTestStudent(params);
    }
  }, [params]);

  useEffect(() => {
    if (params === undefined) {
      return;
    }
    if (params.cubeId !== undefined) {
      getCubeTestStudentItem();
    } else {
      ///api/lecture/students/flow/studentInfoView 여기 호출
      getCourseTestStudentItem();
    }
  }, [params?.cardId, params?.cubeId]);

  useEffect(() => {
    const next = `useLectureTestStudent-${++subscriberIdRef}`;
    setSubscriberId(next);
  }, []);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureTestStudentItem(next => {
      setTestStudentValue(next);
    }, subscriberId);
  }, [subscriberId]);

  return [testStudentValue];
}
