/* eslint-disable consistent-return */

import LearningState from '../model/LearningState';
import { setLectureDiscussion } from '../store/LectureDiscussionStore';
import {
  getLectureStructure,
  setLectureStructure,
} from '../store/LectureStructureStore';
import { State } from '../viewModel/LectureState';
import {
  LectureStructure,
  LectureStructureCardItem,
  LectureStructureCubeItem,
  LectureStructureItem,
} from '../viewModel/LectureStructure';

// // side effect call by ref
// export function mergeActivated(
//   lectureStructure: LectureStructure,
//   pathname: string
// ) {
//   if (lectureStructure.card !== undefined) {
//     if (lectureStructure.card.path === pathname) {
//       lectureStructure.card.activated = true;
//       lectureStructure.card = { ...lectureStructure.card, activated: true };
//     }
//     if (
//       lectureStructure.card.test !== undefined &&
//       lectureStructure.card.test.path === pathname
//     ) {
//       lectureStructure.card.test.activated = true;
//       lectureStructure.card.test = {
//         ...lectureStructure.card.test,
//         activated: true,
//       };
//     }
//     if (
//       lectureStructure.card.survey !== undefined &&
//       lectureStructure.card.survey.path === pathname
//     ) {
//       lectureStructure.card.survey.activated = true;
//       lectureStructure.card.survey = {
//         ...lectureStructure.card.survey,
//         activated: true,
//       };
//     }
//     if (
//       lectureStructure.card.report !== undefined &&
//       lectureStructure.card.report.path === pathname
//     ) {
//       lectureStructure.card.report.activated = true;
//       lectureStructure.card.report = {
//         ...lectureStructure.card.report,
//         activated: true,
//       };
//     }
//   }

//   lectureStructure.cubes = lectureStructure.cubes.map(cube => {
//     if (pathname.includes(cube.path)) {
//       if (cube.path === pathname) {
//         return { ...cube, activated: true };
//       }
//       if (cube.test !== undefined && cube.test.path === pathname) {
//         return { ...cube, test: { ...cube.test, activated: true } };
//       }
//       if (cube.survey !== undefined && cube.survey.path === pathname) {
//         return { ...cube, survey: { ...cube.survey, activated: true } };
//       }
//       if (cube.report !== undefined && cube.report.path === pathname) {
//         return { ...cube, report: { ...cube.report, activated: true } };
//       }
//       return cube;
//     }
//     return cube;
//   });

//   if (lectureStructure.discussions.length > 0) {
//     lectureStructure.discussions = lectureStructure.discussions.map(
//       discussion => {
//         if (discussion.path === pathname) {
//           setLectureDiscussion({
//             id: discussion.id,
//             name: discussion.name,
//             creator: discussion.creator,
//             creatorAudienceId: discussion.creatorAudienceId,
//           });
//           return { ...discussion, activated: true };
//         }
//         return discussion;
//       }
//     );
//   }

//   if (lectureStructure.chapters.length > 0) {
//     lectureStructure.chapters = lectureStructure.chapters.map(chapter => {
//       if (chapter.path === pathname) {
//         return { ...chapter, activated: true };
//       }
//       return chapter;
//     });
//   }

//   lectureStructure.items = lectureStructure.items.map(item => {
//     if (item.type === 'CHAPTER') {
//       const next = lectureStructure.chapters.find(c => c.path === item.path);
//       if (next !== undefined) {
//         return next;
//       }
//     }
//     if (item.type === 'CUBE') {
//       const next = lectureStructure.cubes.find(c => c.path === item.path);
//       if (next !== undefined) {
//         return next;
//       }
//     }
//     if (item.type === 'DISCUSSION') {
//       const next = lectureStructure.discussions.find(c => c.path === item.path);
//       if (next !== undefined) {
//         return next;
//       }
//     }
//     return item;
//   });
//   setLectureStructure({ ...lectureStructure });
// }

export function getActiveStructureItem(
  pathname: string
): LectureStructureItem | undefined {
  const lectureStructure = getLectureStructure();
  if (lectureStructure !== undefined) {
    if (lectureStructure.card.path === pathname) {
      return lectureStructure.card;
    }
    if (lectureStructure.card.test?.path === pathname) {
      return lectureStructure.card.test;
    }
    if (lectureStructure.card.survey?.path === pathname) {
      return lectureStructure.card.survey;
    }
    if (lectureStructure.card.report?.path === pathname) {
      return lectureStructure.card.report;
    }
    for (let i = 0; i < lectureStructure.cubes.length; i++) {
      const cube = lectureStructure.cubes[i];
      if (cube !== undefined) {
        if (cube.path === pathname) {
          return cube;
        }
        if (cube.test?.path === pathname) {
          return cube.test;
        }
        if (cube.survey?.path === pathname) {
          return cube.survey;
        }
        if (cube.report?.path === pathname) {
          return cube.report;
        }
      }
    }
    for (let i = 0; i < lectureStructure.discussions.length; i++) {
      const discussion = lectureStructure.discussions[i];
      if (discussion !== undefined) {
        if (discussion.path === pathname) {
          return discussion;
        }
      }
    }
    for (let i = 0; i < lectureStructure.chapters.length; i++) {
      const chapter = lectureStructure.chapters[i];
      if (chapter !== undefined) {
        if (chapter.path === pathname) {
          return chapter;
        }
      }
    }
    return lectureStructure.card;
  }
}

export function getActiveCubeStructureItem(
  pathname: string
): LectureStructureCubeItem | undefined {
  const lectureStructure = getLectureStructure();
  if (lectureStructure !== undefined) {
    for (let i = 0; i < lectureStructure.cubes.length; i++) {
      const cube = lectureStructure.cubes[i];
      if (
        cube.path === pathname ||
        cube.test?.path === pathname ||
        cube.report?.path === pathname ||
        cube.survey?.path === pathname
      ) {
        return cube;
      }
    }
  }
}

export function getActiveCourseStructureItem():
  | LectureStructureCardItem
  | undefined {
  const lectureStructure = getLectureStructure();
  return lectureStructure?.card;
}

export function getActiveStructureItemAll(pathname: string) {
  const lectureStructure = getLectureStructure();
  if (lectureStructure === undefined) {
    return;
  }
  for (let i = 0; i < lectureStructure.items.length; i++) {
    const item = lectureStructure.items[i];
    if (item.path === pathname) {
      return item;
    }
  }
  return lectureStructure.card;
}

function findAndUpdate(
  cubeId: string,
  state: State,
  learningState: LearningState,
  cube: LectureStructureCubeItem
): LectureStructureCubeItem {
  if (cubeId === cube.cubeId) {
    return { ...cube, state, learningState };
  }
  return cube;
}

export function updateCubeItemState(
  cubeId: string,
  state: State,
  learningState: LearningState
) {
  const findAndUpdateCurry = (cube: LectureStructureCubeItem) =>
    findAndUpdate(cubeId, state, learningState, cube);
  const lectureStructure = getLectureStructure();
  if (lectureStructure !== undefined) {
    lectureStructure.cubes = lectureStructure.cubes.map(findAndUpdateCurry);
    const next: LectureStructure = { ...lectureStructure };
    setLectureStructure(next);
  }
}
