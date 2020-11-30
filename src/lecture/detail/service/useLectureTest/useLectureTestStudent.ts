/* eslint-disable consistent-return */

import LectureParams from 'lecture/detail/viewModel/LectureParams';
import { useCallback, useEffect, useState } from 'react';
import { onLectureTestStudentItem } from '../../store/LectureTestStore';
import LectureRouterParams from '../../viewModel/LectureRouterParams';
import { LectureTestStudentItem } from '../../viewModel/LectureTest';
import { useLectureRouterParams } from '../useLectureRouterParams';
import { getCourseLectureTestStudent } from './utility/getCourseLectureTest';
//import { getCourseLectureStructure } from './utility/getCourseLectureStructure';
import { getCubeLectureTestStudent } from './utility/getCubeLectureTest';

type TestStudentValue = LectureTestStudentItem | undefined;

let subscriberIdRef = 0;
export function useLectureTestStudent(): [TestStudentValue] {
  const [subscriberId, setSubscriberId] = useState<string>();
  const [testStudentValue, setTestStudentValue] = useState<TestStudentValue>();
  const params = useLectureRouterParams();

  const getCubeTestStudentItem = useCallback((params: LectureRouterParams) => {
    getCubeLectureTestStudent(params);
  }, []);

  const getCourseTestStudentItem = useCallback(
    (params: LectureRouterParams) => {
      getCourseLectureTestStudent(params);
    },
    []
  );

  useEffect(() => {
    if (params === undefined) {
      return;
    }
    if (params.contentType == 'cube') {
      getCubeTestStudentItem(params);
    } else {
      ///api/lecture/students/flow/studentInfoView 여기 호출
      getCourseTestStudentItem(params);
    }
  }, [params]);

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
