/* eslint-disable consistent-return */
// report
// http://localhost:3000/api/personalCube/cubeintros/bb028da0-361e-4439-86cf-b544e642215

import {
  findPersonalCube,
} from 'lecture/detail/api/mPersonalCubeApi';

import { setLectureTaskCreateBoardId } from 'lecture/detail/store/LectureTaskCreateStore';

export async function getTaskBoardId(personalCubeId: string) {
  const personalCube = await findPersonalCube(personalCubeId);
  setLectureTaskCreateBoardId(personalCube.contents.contents.id)
}
