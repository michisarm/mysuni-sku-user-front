/* eslint-disable consistent-return */

import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import {
  onLectureStructure,
  setLectureStructure,
} from '../../store/LectureStructureStore';
import LectureParams from '../../viewModel/LectureParams';
import { LectureStructure } from '../../viewModel/LectureStructure';
import { getCourseLectureStructure } from './utility/getCourseLectureStructure';
import { getCubeLectureStructure } from './utility/getCubeLectureStructure';

type Value = LectureStructure | undefined;

// side effect call by ref
function mergeActivated(lectureStructure: LectureStructure, pathname: string) {
  if (lectureStructure.cube !== undefined) {
    if (lectureStructure.cube.path === pathname) {
      lectureStructure.cube.activated = true;
    }
    if (
      lectureStructure.cube.test !== undefined &&
      lectureStructure.cube.test.path === pathname
    ) {
      lectureStructure.cube.test.activated = true;
    }
    if (
      lectureStructure.cube.survey !== undefined &&
      lectureStructure.cube.survey.path === pathname
    ) {
      lectureStructure.cube.survey.activated = true;
    }
    if (
      lectureStructure.cube.report !== undefined &&
      lectureStructure.cube.report.path === pathname
    ) {
      lectureStructure.cube.report.activated = true;
    }
  }
  if (lectureStructure.course !== undefined) {
    if (lectureStructure.course.path === pathname) {
      lectureStructure.course.activated = true;
    }
  }
  if (
    lectureStructure.test !== undefined &&
    lectureStructure.test.path === pathname
  ) {
    lectureStructure.test.activated = true;
  }
  if (
    lectureStructure.survey !== undefined &&
    lectureStructure.survey.path === pathname
  ) {
    lectureStructure.survey.activated = true;
  }
  if (
    lectureStructure.report !== undefined &&
    lectureStructure.report.path === pathname
  ) {
    lectureStructure.report.activated = true;
  }

  lectureStructure.cubes.forEach(cube => {
    if (cube.path === pathname) {
      cube.activated = true;
    }
    if (cube.test !== undefined && cube.test.path === pathname) {
      cube.test.activated = true;
    }
    if (cube.survey !== undefined && cube.survey.path === pathname) {
      cube.survey.activated = true;
    }
    if (cube.report !== undefined && cube.report.path === pathname) {
      cube.report.activated = true;
    }
  });
  lectureStructure.courses.forEach(course => {
    if (course.path === pathname) {
      course.activated = true;
    }
    if (course.test !== undefined && course.test.path === pathname) {
      course.test.activated = true;
    }
    if (course.survey !== undefined && course.survey.path === pathname) {
      course.survey.activated = true;
    }
    if (course.report !== undefined && course.report.path === pathname) {
      course.report.activated = true;
    }
    if (course.cubes !== undefined) {
      course.cubes.forEach(cube => {
        if (cube.path === pathname) {
          cube.activated = true;
        }
        if (cube.test !== undefined && cube.test.path === pathname) {
          cube.test.activated = true;
        }
        if (cube.survey !== undefined && cube.survey.path === pathname) {
          cube.survey.activated = true;
        }
        if (cube.report !== undefined && cube.report.path === pathname) {
          cube.report.activated = true;
        }
      });
    }
  });
}

export function useLectureStructure(): [Value] {
  const subscriberIdRef = useRef<number>(0);
  const [subscriberId, setSubscriberId] = useState<string>();
  const [value, setValue] = useState<Value>();
  const params = useParams<LectureParams>();
  const { pathname } = useLocation();
  const getCubeItem = useCallback((params: LectureParams, pathname: string) => {
    getCubeLectureStructure(params).then(lectureStructure => {
      mergeActivated(lectureStructure, pathname);
      setLectureStructure(lectureStructure);
    });
  }, []);

  const getCourseItem = useCallback(
    (params: LectureParams, pathname: string) => {
      getCourseLectureStructure(params).then(lectureStructure => {
        mergeActivated(lectureStructure, pathname);
        setLectureStructure(lectureStructure);
      });
    },
    []
  );

  useEffect(() => {
    const { lectureType, contentId, lectureId, ...structParams } = params;
    if (params.cubeId !== undefined) {
      getCubeItem(structParams, pathname);
    } else {
      getCourseItem(structParams, pathname);
    }
  }, [params, pathname]);

  useEffect(() => {
    const next = `useLectureStructure-${++subscriberIdRef.current}`;
    setSubscriberId(next);
  }, []);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureStructure(next => {
      setValue(next);
    }, subscriberId);
  }, [subscriberId]);

  return [value];
}
