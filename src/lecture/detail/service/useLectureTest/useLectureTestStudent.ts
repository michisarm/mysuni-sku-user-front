/* eslint-disable consistent-return */

import LectureParams from 'lecture/detail/viewModel/LectureParams';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { onLectureTestStudentItem } from '../../store/LectureTestStore';
import { LectureTestStudentItem } from '../../viewModel/LectureTest';
import { getCourseLectureTestStudent } from './utility/getCourseLectureTest';
//import { getCourseLectureStructure } from './utility/getCourseLectureStructure';
import { getCubeLectureTestStudent } from './utility/getCubeLectureTest';

type TestStudentValue = LectureTestStudentItem | undefined;

export function useLectureTestStudent(): [TestStudentValue] {
  const subscriberIdRef = useRef<number>(0);
  const [subscriberId, setSubscriberId] = useState<string>();
  const [testStudentValue, setTestStudentValue] = useState<TestStudentValue>();
  const params = useParams<LectureParams>();

  const getCubeTestStudentItem = useCallback((params: LectureParams) => {
    getCubeLectureTestStudent(params.lectureId!);
  }, []);

  const getCourseTestStudentItem = useCallback((params: LectureParams) => {
    getCourseLectureTestStudent(params);
  }, []);

  useEffect(() => {
    if (params.cubeId !== undefined) {
      getCubeTestStudentItem(params);
    } else {
      ///api/lecture/students/flow/studentInfoView 여기 호출
      getCourseTestStudentItem(params);
    }
  }, [params]);

  useEffect(() => {
    const next = `useLectureTestStudent-${++subscriberIdRef.current}`;
    setSubscriberId(next);
  }, []);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureTestStudentItem(next => {
      setTestStudentValue(next);
      console.log('LectureTestStudentItem', next);
    }, subscriberId);
  }, [subscriberId]);

  return [testStudentValue];
}
