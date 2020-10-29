import LearningState from '../model/LearningState';
import {
  getLectureStructure,
  setLectureStructure,
} from '../store/LectureStructureStore';
import { State } from '../viewModel/LectureState';
import {
  LectureStructure,
  LectureStructureCubeItem,
} from '../viewModel/LectureStructure';

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
    if (lectureStructure.cube !== undefined) {
      lectureStructure.cube = findAndUpdateCurry(lectureStructure.cube);
    }
    lectureStructure.cubes = lectureStructure.cubes.map(findAndUpdateCurry);
    if (
      lectureStructure.course !== undefined &&
      lectureStructure.course.cubes !== undefined
    ) {
      lectureStructure.course.cubes = lectureStructure.course.cubes.map(
        findAndUpdateCurry
      );
    }
    lectureStructure.courses.forEach(course => {
      if (course.cubes !== undefined) {
        course.cubes = course.cubes.map(findAndUpdateCurry);
      }
    });
    const next: LectureStructure = { ...lectureStructure };
    setLectureStructure(next);
  }
}
