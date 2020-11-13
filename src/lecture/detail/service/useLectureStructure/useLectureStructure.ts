/* eslint-disable consistent-return */

import { useEffect, useState } from 'react';
import { setLectureDiscussion } from '../../store/LectureDiscussionStore';
import {
  onLectureStructure,
} from '../../store/LectureStructureStore';
import { LectureStructure } from '../../viewModel/LectureStructure';

type Value = LectureStructure | undefined;

// side effect call by ref
export function mergeActivated(lectureStructure: LectureStructure, pathname: string) {
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
  if (
    lectureStructure.discussion !== undefined &&
    lectureStructure.discussion.path === pathname
  ) {
    lectureStructure.discussion.activated = true;
    setLectureDiscussion({
      id: lectureStructure.discussion.id,
      name: lectureStructure.discussion.name,
      time: lectureStructure.discussion.time,
      creator: lectureStructure.discussion.creator,
      creatorAudienceId: lectureStructure.discussion.creatorAudienceId
    });
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
    if (
      course.discussion !== undefined &&
      course.discussion.path === pathname
    ) {
      course.discussion.activated = true;
      setLectureDiscussion({
        id: course.discussion.id,
        name: course.discussion.name,
        time: course.discussion.time,
        creator: course.discussion.creator,
        creatorAudienceId: course.discussion.creatorAudienceId,
      });
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

let subscriberIdRef = 0;
export function useLectureStructure(): [Value] {
  const [subscriberId, setSubscriberId] = useState<string>();
  const [value, setValue] = useState<Value>();


  useEffect(() => {
    const next = `useLectureStructure-${++subscriberIdRef}`;
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
