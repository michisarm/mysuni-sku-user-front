import LearningState from '../../model/LearningState';
import { findIsJsonStudentByCube } from '../../api/lectureApi';
import { findCubeIntro, findPersonalCube } from '../../api/mPersonalCubeApi';
import PersonalCube from '../../model/PersonalCube';
import {
  LectureList,
  LectureListCubeItemUrl,
} from '../../store/LectureListStore';
import { CubeParams } from '../useLectureList';

async function getLectureListByPersonalCube(
  personalCube: PersonalCube,
  params: CubeParams
): Promise<LectureList> {
  const lectureList: LectureList = { courses: [], cubes: [] };
  const { cubeId, lectureCardId } = params;
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
      serviceId,
      url,
      state,
      learningState,
    });
  }

  return lectureList;
}

function getPersonalCubeByParams(params: CubeParams): Promise<PersonalCube> {
  const { cubeId } = params;
  return findPersonalCube(cubeId);
}

export async function getLectureListFromCube(
  params: CubeParams
): Promise<LectureList> {
  const personalCube = await getPersonalCubeByParams(params);
  const lectureList = await getLectureListByPersonalCube(personalCube, params);
  return lectureList;
}
