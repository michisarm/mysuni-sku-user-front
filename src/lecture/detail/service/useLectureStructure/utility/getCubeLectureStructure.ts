/* eslint-disable consistent-return */
import { findIsJsonStudentByCube, findStudent } from '../../../api/lectureApi';
import { findCubeIntro, findMedia, findPersonalCube } from '../../../api/mPersonalCubeApi';
import { MediaType } from '../../../model/MediaType';
import PersonalCube from '../../../model/PersonalCube';
import Student from '../../../model/Student';
import LectureParams, { toPath } from '../../../viewModel/LectureParams';
import LectureRouterParams from '../../../viewModel/LectureRouterParams';
import { State } from '../../../viewModel/LectureState';
import {
  LectureStructure,
  LectureStructureCubeItem,
  LectureStructureDurationableCubeItem,
  StudentStateMap,
} from '../../../viewModel/LectureStructure';
import { getItemMapFromCube } from './getItemMapFromCube';

function getPersonalCubeByParams(params: LectureParams): Promise<PersonalCube> {
  const { cubeId } = params;
  return findPersonalCube(cubeId!);
}

async function getLectureStructureCubeItemByPersonalCube(
  personalCube: PersonalCube,
  params: LectureParams
): Promise<LectureStructureCubeItem | void> {
  const { cubeId, lectureCardId } = params;
  if (cubeId === undefined) {
    return;
  }
  const {
    id,
    name,
    contents: { type, contents: { id: cubeContentsId } },
  } = personalCube;
  if (personalCube === undefined) {
    return;
  }
  if (personalCube.contents === undefined) {
    return;
  }
  const cubeType = personalCube.contents.type;
  const cubeIntroId = personalCube.cubeIntro.id;
  const cubeIntro = await findCubeIntro(cubeIntroId);
  const routerParams: LectureRouterParams = {
    contentType: 'cube',
    contentId: cubeId!,
    lectureId: lectureCardId!,
    pathname: toPath(params),
    lectureParams: params,
  };
  if (cubeIntro !== undefined) {
    const learningTime = cubeIntro.learningTime;
    if (type === 'Video' || type === 'Audio') {

      const lectureStructureDurationableCubeItem: LectureStructureDurationableCubeItem = {
        id,
        cubeContentsId,
        name,
        cubeId,
        cube: personalCube,
        cubeIntro,
        cubeType,
        learningTime,
        params,
        routerParams,
        path: toPath(params),
        serviceId: lectureCardId,
        can: true,
        duration: 0,
        order: 0,
        type: 'CUBE',
      };
      return lectureStructureDurationableCubeItem;
    }
    return {
      id,
      name,
      cubeId,
      cube: personalCube,
      cubeIntro,
      cubeType,
      learningTime,
      params,
      routerParams,
      path: toPath(params),
      serviceId: lectureCardId,
      can: true,
      order: 0,
      type: 'CUBE',
    };
  }
}

export async function getStateMapByParams(
  params: LectureParams
): Promise<StudentStateMap | void> {
  const { lectureCardId } = params;
  if (lectureCardId !== undefined) {
    const studentJoins = await findIsJsonStudentByCube(lectureCardId);
    if (!Array.isArray(studentJoins)) {
      return;
    }
    const sortedStudentJoins = studentJoins.sort(
      (a, b) => b.updateTime - a.updateTime
    );
    if (
      sortedStudentJoins.length > 0 &&
      sortedStudentJoins[0].studentId !== null
    ) {
      const learningState = sortedStudentJoins[0].learningState;
      let state: State = 'None';
      if (sortedStudentJoins[0].proposalState === 'Approved') {
        switch (learningState) {
          case 'Passed':
            state = 'Completed';
            break;
          default:
            state = 'Progress';
            break;
        }
      }
      return {
        state,
        learningState,
        studentId: sortedStudentJoins[0].studentId,
      };
    }
  }
}

export async function getCubeLectureStructure(
  params: LectureParams
): Promise<LectureStructure | undefined> {
  const lectureStructure: LectureStructure = {
    courses: [],
    cubes: [],
    discussions: [],
    type: 'Cube',
    items: [],
  };
  const personalCube = await getPersonalCubeByParams(params);
  const cube = await getLectureStructureCubeItemByPersonalCube(
    personalCube,
    params
  );
  if (cube !== undefined) {
    const stateMap = await getStateMapByParams(params);
    let student: Student;
    if (stateMap !== undefined) {
      cube.state = stateMap.state;
      cube.canSubmit = cube.state !== 'None'
      cube.learningState = stateMap.learningState;
      student = await findStudent(stateMap.studentId);
      cube.student = student;
      if (cube.cubeType === 'Audio' || cube.cubeType === 'Video') {
        const { mediaType } = await findMedia((cube as LectureStructureDurationableCubeItem).cubeContentsId)
        if (mediaType === MediaType.ContentsProviderMedia || mediaType === MediaType.LinkMedia) {
          (cube as LectureStructureDurationableCubeItem).duration = 50;
        } else {
          (cube as LectureStructureDurationableCubeItem).duration = 0;
          if (student !== undefined && student !== null && student.durationViewSeconds !== null) {
            (cube as LectureStructureDurationableCubeItem).duration =
              parseInt(student.durationViewSeconds);
          }
        }
      }

    }
    const cubeIntroId = personalCube.cubeIntro.id;
    const examId = personalCube.contents.examId;
    const surveyId = personalCube.contents.surveyId;
    const surveyCaseId = personalCube.contents.surveyCaseId;
    const cubeIntro = await findCubeIntro(cubeIntroId);
    if (cubeIntro === undefined) {
      return
    }
    const itemMap = await getItemMapFromCube(
      { cubeIntro, examId, surveyId, surveyCaseId },
      params,
      cube.student
    );
    const stateCan = cube.state === 'Progress' || cube.state === 'Completed';
    let order = 0;
    if (itemMap.report !== undefined) {
      cube.report = itemMap.report;
      cube.report.can = stateCan;
      cube.report.order = ++order;
      // stateCan = cube.report.state === 'Completed';
    }
    if (itemMap.survey !== undefined) {
      cube.survey = itemMap.survey;
      cube.survey.can = stateCan;
      cube.survey.order = ++order;
      // stateCan = cube.survey.state === 'Completed';
    }
    if (itemMap.test !== undefined) {
      cube.test = itemMap.test;
      cube.test.can = stateCan;
      // stateCan = cube.test.state === 'Completed';
      cube.test.order = ++order;
    }

    lectureStructure.cube = cube;
  }
  return lectureStructure;
}
