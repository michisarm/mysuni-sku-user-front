/* eslint-disable consistent-return */

import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { onLectureTestStudentItem } from '../../store/LectureTestStore';
import {
  LectureStructureCourseItemParams,
  LectureStructureCubeItemParams,
  LectureTestStudentItem,
} from '../../viewModel/LectureTest';
import { useLectureRouterParams } from '../useLectureRouterParams';
//import { getCourseLectureStructure } from './utility/getCourseLectureStructure';
import { getCubeLectureTestStudent } from './utility/getCubeLectureTest';

type TestStudentValue = LectureTestStudentItem | undefined;

export function useLectureTestStudent(): [TestStudentValue] {
  const subscriberIdRef = useRef<number>(0);
  const [subscriberId, setSubscriberId] = useState<string>();
  const [testStudentValue, setTestStudentValue] = useState<TestStudentValue>();
  const params = useParams<
    LectureStructureCourseItemParams & LectureStructureCubeItemParams
  >();

  const { lectureId, contentType, contentId } = useLectureRouterParams();

  const getCubeTestStudentItem = useCallback(() => {
    getCubeLectureTestStudent(lectureId);
  }, []);

  useEffect(() => {
    if (lectureId !== undefined) {
      getCubeTestStudentItem();
    } else {
      //getCourseItem(params);
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
