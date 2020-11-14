/* eslint-disable consistent-return */

import { useEffect, useState } from 'react';
import { setLectureDiscussion } from '../../store/LectureDiscussionStore';
import { onLectureStructure } from '../../store/LectureStructureStore';
import { LectureStructure } from '../../viewModel/LectureStructure';

type Value = LectureStructure | undefined;

// side effect call by ref
export function mergeActivated(
  lectureStructure: LectureStructure,
  pathname: string
) {
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
    if (
      lectureStructure.course.test !== undefined &&
      lectureStructure.course.test.path === pathname
    ) {
      lectureStructure.course.test.activated = true;
    }
    if (
      lectureStructure.course.survey !== undefined &&
      lectureStructure.course.survey.path === pathname
    ) {
      lectureStructure.course.survey.activated = true;
    }
    if (
      lectureStructure.course.report !== undefined &&
      lectureStructure.course.report.path === pathname
    ) {
      lectureStructure.course.report.activated = true;
    }
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
  lectureStructure.discussions.forEach(discussion => {
    if (discussion.path === pathname) {
      discussion.activated = true;
    }
    setLectureDiscussion({
      id: discussion.id,
      name: discussion.name,
      time: discussion.time,
      creator: discussion.creator,
      creatorAudienceId: discussion.creatorAudienceId,
    });
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
