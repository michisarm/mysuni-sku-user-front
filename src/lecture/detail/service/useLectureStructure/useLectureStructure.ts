/* eslint-disable consistent-return */

import { useEffect, useState } from 'react';
import { setLectureDiscussion } from '../../store/LectureDiscussionStore';
import {
  getLectureStructure,
  onLectureStructure,
  setLectureStructure,
} from '../../store/LectureStructureStore';
import { LectureStructure } from '../../viewModel/LectureStructure';

type Value = LectureStructure | undefined;

// side effect call by ref
export function mergeActivated(
  lectureStructure: LectureStructure,
  pathname: string
) {
  if (lectureStructure.cube !== undefined) {
    if (lectureStructure.cube.path === pathname) {
      lectureStructure.cube = { ...lectureStructure.cube, activated: true };
    }
    if (
      lectureStructure.cube.test !== undefined &&
      lectureStructure.cube.test.path === pathname
    ) {
      lectureStructure.cube.test.activated = true;
      lectureStructure.cube.test = {
        ...lectureStructure.cube.test,
        activated: true,
      };
    }
    if (
      lectureStructure.cube.survey !== undefined &&
      lectureStructure.cube.survey.path === pathname
    ) {
      lectureStructure.cube.survey.activated = true;
      lectureStructure.cube.survey = {
        ...lectureStructure.cube.survey,
        activated: true,
      };
    }
    if (
      lectureStructure.cube.report !== undefined &&
      lectureStructure.cube.report.path === pathname
    ) {
      lectureStructure.cube.report.activated = true;
      lectureStructure.cube.report = {
        ...lectureStructure.cube.report,
        activated: true,
      };
    }
  }
  if (lectureStructure.course !== undefined) {
    if (lectureStructure.course.path === pathname) {
      lectureStructure.course.activated = true;
      lectureStructure.course = { ...lectureStructure.course, activated: true };
    }
    if (
      lectureStructure.course.test !== undefined &&
      lectureStructure.course.test.path === pathname
    ) {
      lectureStructure.course.test.activated = true;
      lectureStructure.course.test = {
        ...lectureStructure.course.test,
        activated: true,
      };
    }
    if (
      lectureStructure.course.survey !== undefined &&
      lectureStructure.course.survey.path === pathname
    ) {
      lectureStructure.course.survey.activated = true;
      lectureStructure.course.survey = {
        ...lectureStructure.course.survey,
        activated: true,
      };
    }
    if (
      lectureStructure.course.report !== undefined &&
      lectureStructure.course.report.path === pathname
    ) {
      lectureStructure.course.report.activated = true;
      lectureStructure.course.report = {
        ...lectureStructure.course.report,
        activated: true,
      };
    }
  }

  lectureStructure.cubes = lectureStructure.cubes.map(cube => {
    if (pathname.includes(cube.path)) {
      if (cube.path === pathname) {
        return { ...cube, activated: true };
      }
      if (cube.test !== undefined && cube.test.path === pathname) {
        return { ...cube, test: { ...cube.test, activated: true } };
      }
      if (cube.survey !== undefined && cube.survey.path === pathname) {
        return { ...cube, survey: { ...cube.survey, activated: true } };
      }
      if (cube.report !== undefined && cube.report.path === pathname) {
        return { ...cube, report: { ...cube.report, activated: true } };
      }
      return cube;
    }
    return cube;
  });

  lectureStructure.courses = lectureStructure.courses.map(course => {
    if (pathname.includes(course.path)) {
      if (course.path === pathname) {
        return { ...course, activated: true };
      }
      if (course.test !== undefined && course.test.path === pathname) {
        return { ...course, test: { ...course.test, activated: true } };
      }
      if (course.survey !== undefined && course.survey.path === pathname) {
        return { ...course, survey: { ...course.survey, activated: true } };
      }
      if (course.report !== undefined && course.report.path === pathname) {
        return { ...course, report: { ...course.report, activated: true } };
      }
      if (course.discussions !== undefined) {
        return {
          ...course,
          discussions: course.discussions.map(discussion => {
            if (discussion.path === pathname) {
              setLectureDiscussion({
                id: discussion.id,
                name: discussion.name,
                time: discussion.time,
                creator: discussion.creator,
                creatorAudienceId: discussion.creatorAudienceId,
              });
              return { ...discussion, activated: true };
            }
            return discussion;
          }),
        };
      }
    }
    if (course.cubes !== undefined) {
      return {
        ...course,
        cubes: course.cubes.map(cube => {
          if (pathname.includes(cube.path)) {
            if (cube.path === pathname) {
              return { ...cube, activated: true };
            }
            if (cube.test !== undefined && cube.test.path === pathname) {
              return { ...cube, test: { ...cube.test, activated: true } };
            }
            if (cube.survey !== undefined && cube.survey.path === pathname) {
              return { ...cube, survey: { ...cube.survey, activated: true } };
            }
            if (cube.report !== undefined && cube.report.path === pathname) {
              return { ...cube, report: { ...cube.report, activated: true } };
            }
            return cube;
          }
          return cube;
        }),
      };
    }
    return course;
  });

  if (lectureStructure.discussions.length > 0) {
    lectureStructure.discussions = lectureStructure.discussions.map(
      discussion => {
        if (discussion.path === pathname) {
          setLectureDiscussion({
            id: discussion.id,
            name: discussion.name,
            time: discussion.time,
            creator: discussion.creator,
            creatorAudienceId: discussion.creatorAudienceId,
          });
          return { ...discussion, activated: true };
        }
        return discussion;
      }
    );
  }

  lectureStructure.items = lectureStructure.items.map(item => {
    if (item.type === 'COURSE') {
      const next = lectureStructure.courses.find(c => c.path === item.path);
      if (next !== undefined) {
        return next;
      }
    }
    if (item.type === 'CUBE') {
      const next = lectureStructure.cubes.find(c => c.path === item.path);
      if (next !== undefined) {
        return next;
      }
    }
    if (item.type === 'DISCUSSION') {
      const next = lectureStructure.discussions.find(c => c.path === item.path);
      if (next !== undefined) {
        return next;
      }
    }
    return item;
  });
  setLectureStructure({ ...lectureStructure });
}

export function getActiveStructureItem() {
  const lectureStructure = getLectureStructure();
  if (lectureStructure !== undefined) {
    if (lectureStructure.course !== undefined) {
      if (lectureStructure.course.activated) {
        return lectureStructure.course;
      }
      if (lectureStructure.course.test?.activated) {
        return lectureStructure.course;
      }
      if (lectureStructure.course.survey?.activated) {
        return lectureStructure.course;
      }
      if (lectureStructure.course.report?.activated) {
        return lectureStructure.course;
      }
    }
    if (lectureStructure.cube !== undefined) {
      if (lectureStructure.cube.activated) {
        return lectureStructure.cube;
      }
      if (lectureStructure.cube.test?.activated) {
        return lectureStructure.cube;
      }
      if (lectureStructure.cube.survey?.activated) {
        return lectureStructure.cube;
      }
      if (lectureStructure.cube.report?.activated) {
        return lectureStructure.cube;
      }
    }
    for (let i = 0; i < lectureStructure.courses.length; i++) {
      const course = lectureStructure.courses[i];
      if (course !== undefined) {
        if (course.activated) {
          return course;
        }
        if (course.test?.activated) {
          return course;
        }
        if (course.survey?.activated) {
          return course;
        }
        if (course.report?.activated) {
          return course;
        }
      }
      if (course.cubes !== undefined && course.cubes.length > 0) {
        for (let j = 0; j < course.cubes.length; j++) {
          const cube = course.cubes[j];
          if (cube !== undefined) {
            if (cube.activated) {
              return cube;
            }
            if (cube.test?.activated) {
              return cube;
            }
            if (cube.survey?.activated) {
              return cube;
            }
            if (cube.report?.activated) {
              return cube;
            }
          }
        }
      }
    }
    for (let i = 0; i < lectureStructure.cubes.length; i++) {
      const cube = lectureStructure.cubes[i];
      if (cube !== undefined) {
        if (cube.activated) {
          return cube;
        }
        if (cube.test?.activated) {
          return cube;
        }
        if (cube.survey?.activated) {
          return cube;
        }
        if (cube.report?.activated) {
          return cube;
        }
      }
    }
    for (let i = 0; i < lectureStructure.discussions.length; i++) {
      const discussion = lectureStructure.discussions[i];
      if (discussion !== undefined) {
        if (discussion.activated) {
          return lectureStructure.course;
        }
      }
    }
  }
}

export function getActiveCourseStructureItem() {
  const lectureStructure = getLectureStructure();
  if (lectureStructure !== undefined) {
    if (lectureStructure.course !== undefined) {
      if (lectureStructure.course.activated) {
        return lectureStructure.course;
      }
      if (lectureStructure.course.test?.activated) {
        return lectureStructure.course;
      }
      if (lectureStructure.course.survey?.activated) {
        return lectureStructure.course;
      }
      if (lectureStructure.course.report?.activated) {
        return lectureStructure.course;
      }
      if (lectureStructure.course.cubes !== undefined && lectureStructure.course.cubes.length > 0) {
        for (let k = 0; k < lectureStructure.course.cubes.length; k++) {
          const lectureCube = lectureStructure.course.cubes[k];
          if (lectureCube !== undefined) {
            if (lectureCube.activated) {
              return lectureStructure.course;
            }
            if (lectureCube.test?.activated) {
              return lectureStructure.course;
            }
            if (lectureCube.survey?.activated) {
              return lectureStructure.course;
            }
            if (lectureCube.report?.activated) {
              return lectureStructure.course;
            }
          }
        }
      }
    }
    for (let i = 0; i < lectureStructure.courses.length; i++) {
      const course = lectureStructure.courses[i];
      if (course !== undefined) {
        if (course.activated) {
          return course;
        }
        if (course.test?.activated) {
          return course;
        }
        if (course.survey?.activated) {
          return course;
        }
        if (course.report?.activated) {
          return course;
        }
      }
      if (course.cubes !== undefined && course.cubes.length > 0) {
        for (let j = 0; j < course.cubes.length; j++) {
          const courseCube = course.cubes[j];
          if (courseCube !== undefined) {
            if (courseCube.activated) {
              return course;
            }
            if (courseCube.test?.activated) {
              return course;
            }
            if (courseCube.survey?.activated) {
              return course;
            }
            if (courseCube.report?.activated) {
              return course;
            }
          }
        }
      }
    }
    for (let i = 0; i < lectureStructure.cubes.length; i++) {
      const cube = lectureStructure.cubes[i];
      if (cube !== undefined) {
        if (cube.activated) {
          return lectureStructure.course;
        }
        if (cube.test?.activated) {
          return lectureStructure.course;
        }
        if (cube.survey?.activated) {
          return lectureStructure.course;
        }
        if (cube.report?.activated) {
          return lectureStructure.course;
        }
      }
    }
    for (let i = 0; i < lectureStructure.discussions.length; i++) {
      const discussion = lectureStructure.discussions[i];
      if (discussion !== undefined) {
        if (discussion.activated) {
          return lectureStructure.course;
        }
      }
    }
  }
}


export function getActiveStructureItemAll() {
  const lectureStructure = getLectureStructure();
  if (lectureStructure !== undefined) {
    if (lectureStructure.course !== undefined) {
      if (lectureStructure.course.activated) {
        return lectureStructure.course;
      }
      if (lectureStructure.course.test?.activated) {
        return lectureStructure.course.test;
      }
      if (lectureStructure.course.survey?.activated) {
        return lectureStructure.course.survey;
      }
      if (lectureStructure.course.report?.activated) {
        return lectureStructure.course.report;
      }
    }
    if (lectureStructure.cube !== undefined) {
      if (lectureStructure.cube.activated) {
        return lectureStructure.cube;
      }
      if (lectureStructure.cube.test?.activated) {
        return lectureStructure.cube.test;
      }
      if (lectureStructure.cube.survey?.activated) {
        return lectureStructure.cube.survey;
      }
      if (lectureStructure.cube.report?.activated) {
        return lectureStructure.cube.report;
      }
    }
    lectureStructure.courses.forEach(course => {
      if (course !== undefined) {
        if (course.activated) {
          return course;
        }
        if (course.test?.activated) {
          return course.test;
        }
        if (course.survey?.activated) {
          return course.survey;
        }
        if (course.report?.activated) {
          return course.report;
        }
      }
    });
    lectureStructure.cubes.forEach(cube => {
      if (cube !== undefined) {
        if (cube.activated) {
          return cube;
        }
        if (cube.test?.activated) {
          return cube.test;
        }
        if (cube.survey?.activated) {
          return cube.survey;
        }
        if (cube.report?.activated) {
          return cube.report;
        }
      }
    });
    lectureStructure.discussions.forEach(discussion => {
      if (discussion !== undefined) {
        if (discussion.activated) {
          return discussion;
        }
      }
    });
  }
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
