import { Course } from 'lecture/shared/Lecture/Lecture.stories';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { findCoursePlanContents } from '../api/cardCubeApi';
import CoursePlanComplex from '../model/CoursePlanComplex';
import {
  LectureListCourseItem,
  LectureListCubeItem,
} from '../store/LectureListStore';

type Value = LectureListCourseItem[];

interface CubeParams {
  cubeId: string;
  lectureCardId: string;
}

interface CourseParams {
  coursePlanId: string;
  serviceType: string;
  serviceId: string;
}

function coursePlanComplexToLectureListCourseItemArray(
  coursePlanComplex: CoursePlanComplex,
  rootServiceId: string
): (LectureListCourseItem | LectureListCubeItem)[] {
  const list: (LectureListCourseItem | LectureListCubeItem)[] = [];
  const courseLectureIds: string[] = [];
  const lectureCardIds: string[] = [];
  const preLectureCardIds: string[] = [];
  coursePlanComplex.lectureViews.forEach(
    ({
      id,
      name,
      coursePlanId,
      cubeId,
      cubeType,
      learningTime,
      serviceType,
      serviceId,
    }) => {
      if (coursePlanId !== null) {
        list.push({ id, name, url: { coursePlanId, serviceType, serviceId } });
        courseLectureIds.push(serviceId);
      }
      if (cubeId !== null) {
        list.push({
          id,
          name,
          cubeId,
          cubeType,
          learningTime,
          url: {
            cubeId,
            programLectureUsid: rootServiceId,
            lectureCardId: serviceId,
          },
        });
        lectureCardIds.push(serviceId);
      }
    }
  );
  coursePlanComplex.subLectureViews.forEach(({ lectureId, lectureViews }) => {
    const course = list.find(c => c.id === lectureId);
    if (course !== undefined) {
      const cubes: LectureListCubeItem[] = lectureViews.map<
        LectureListCubeItem
      >(({ id, name, cubeId, cubeType, learningTime, serviceId }) => {
        return {
          id,
          name,
          cubeId,
          cubeType,
          learningTime,
          url: {
            cubeId,
            lectureCardId: serviceId,
            programLectureUsid: rootServiceId,
          },
        };
      });
      (course as LectureListCourseItem).cubes = cubes;
    }
  });

  return list;
}

export function useLectureList(): [Value] {
  const [value, setValue] = useState<Value>([]);
  const params = useParams<CubeParams & CourseParams>();

  const getCubeItem = useCallback((params: CubeParams) => {}, []);

  const getCourseItem = useCallback((params: CourseParams) => {
    findCoursePlanContents(params.coursePlanId, params.serviceId).then(
      console.log
    );
  }, []);

  useEffect(() => {
    if (params.cubeId !== undefined) {
      getCubeItem(params);
    } else {
      getCourseItem(params);
    }
  }, [params]);

  return [value];
}
