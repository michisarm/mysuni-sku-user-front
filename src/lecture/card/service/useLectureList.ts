import { Lecture } from 'lecture/shared';
import { Course } from 'lecture/shared/Lecture/Lecture.stories';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  findCoursePlanContents,
  findIsJsonStudentByCube,
  studentInfoView,
} from '../api/lectureApi';
import { findCubeIntro, findPersonalCube } from '../api/mPersonalCubeApi';
import CoursePlanComplex from '../model/CoursePlanComplex';
import LearningState from '../model/LearningState';
import PersonalCube from '../model/PersonalCube';
import {
  LectureList,
  LectureListCourseItem,
  LectureListCubeItem,
  LectureListCubeItemUrl,
} from '../store/LectureListStore';

type Value = LectureList | undefined;

interface CubeParams {
  cubeId: string;
  lectureCardId: string;
}

interface CourseParams {
  coursePlanId: string;
  serviceType: string;
  serviceId: string;
}

function coursePlanComplexToLectureList(
  coursePlanComplex: CoursePlanComplex,
  rootServiceId: string
): Promise<LectureList> {
  const lectureList: LectureList = { courses: [], cubes: [] };
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
        lectureList.courses.push({
          id,
          name,
          url: { coursePlanId, serviceType, serviceId },
          serviceId,
        });
        courseLectureIds.push(serviceId);
      }
      if (cubeId !== null) {
        lectureList.cubes.push({
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
          serviceId,
        });
        lectureCardIds.push(serviceId);
      }
    }
  );
  coursePlanComplex.subLectureViews.forEach(({ lectureId, lectureViews }) => {
    const course = lectureList.courses.find(c => c.id === lectureId);
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
          serviceId,
        };
      });
      (course as LectureListCourseItem).cubes = cubes;
    }
  });

  if (lectureList.courses.length === 0 && lectureList.cubes.length === 0) {
    return Promise.resolve(lectureList);
  }

  return studentInfoView({
    courseLectureIds,
    lectureCardIds,
    preLectureCardIds,
    serviceId: rootServiceId,
  }).then(({ courses, lectures }) => {
    courses.forEach(({ lectures, courseLectureId }) => {
      const course = lectureList.courses.find(
        ({ serviceId }) => serviceId === courseLectureId
      );
      if (course !== undefined && course.cubes !== undefined) {
        course.state = 'Passed';
        course.cubes.forEach(cube => {
          const lecture = lectures.find(
            ({ lectureUsid }) => lectureUsid === cube.serviceId
          );
          if (lecture === undefined) {
            course.state = 'Progress';
            return;
          }
          switch (lecture.learningState) {
            case 'Passed':
              cube.state = 'Passed';
              break;
            case 'Progress':
            case 'TestPassed':
            case 'TestWaiting':
            case 'HomeworkWaiting':
              cube.state = 'Progress';
            default:
              course.state = 'Progress';
              break;
          }
        });
      }
    });
    lectures.forEach(({ lectureUsid, learningState }) => {
      const cube = lectureList.cubes.find(
        ({ serviceId }) => serviceId === lectureUsid
      );
      if (cube === undefined) {
        return;
      }
      cube.learningState = learningState;
      switch (learningState) {
        case 'Passed':
          cube.state = 'Passed';
          break;
        case 'Progress':
        case 'TestPassed':
        case 'TestWaiting':
        case 'HomeworkWaiting':
          cube.state = 'Progress';
        default:
          break;
      }
    });
    return lectureList;
  });
}

async function personalCubeToLectureList(
  personalCube: PersonalCube,
  cubeId: string,
  lectureCardId: string
): Promise<LectureList> {
  const lectureList: LectureList = { courses: [], cubes: [] };
  const courseLectureIds: string[] = [];
  const lectureCardIds: string[] = [];
  const preLectureCardIds: string[] = [];
  const { id, name } = personalCube;
  const cubeType = personalCube.contents.type;
  const url: LectureListCubeItemUrl = { cubeId, lectureCardId };
  const serviceId = lectureCardId;
  const cubeIntroId = personalCube.cubeIntro.id;
  const cubeIntro = await findCubeIntro(cubeIntroId);
  if (cubeIntro !== undefined) {
    const learningTime = cubeIntro.learningTime;
    const studentJoins = await findIsJsonStudentByCube(lectureCardId);
    let learningState: LearningState | undefined;
    let state: LearningState | undefined;
    if (studentJoins.length > 0) {
      learningState = studentJoins[0].learningState;
      if (studentJoins[0].proposalState === 'Approved') {
        state = studentJoins[0].learningState;
      }
    }
    lectureList.cubes.push({
      id,
      name,
      cubeType,
      cubeId,
      learningTime,
      serviceId: lectureCardId,
      url: {
        cubeId,
        lectureCardId,
      },
      state,
      learningState,
    });
  }

  return lectureList;
}

export function useLectureList(): [Value] {
  const [value, setValue] = useState<Value>();
  const params = useParams<CubeParams & CourseParams>();

  const getCubeItem = useCallback((params: CubeParams) => {
    const { cubeId, lectureCardId } = params;
    findPersonalCube(cubeId).then(personalCube => {
      personalCubeToLectureList(personalCube, cubeId, lectureCardId).then(
        console.log
      );
    });
  }, []);

  const getCourseItem = useCallback((params: CourseParams) => {
    findCoursePlanContents(params.coursePlanId, params.serviceId).then(
      coursePlanComplex => {
        coursePlanComplexToLectureList(
          coursePlanComplex,
          params.serviceId
        ).then(console.log);
      }
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
