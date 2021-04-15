import { findCubeDetailCache } from '../../../api/cubeApi';

const ONE_DAY = 24 * 60 * 60 * 1000;

export async function findApplyingClassroom(cubeId: string) {
  const cubeDetail = await findCubeDetailCache(cubeId);
  if (cubeDetail === undefined || cubeDetail.cubeMaterial.classrooms === null) {
    return;
  }

  const {
    cubeMaterial: { classrooms },
  } = cubeDetail;

  for (let i = 0; i < classrooms.length; i++) {
    const classroom = classrooms[i];
    const {
      enrolling: {
        applyingPeriod: { startDate, endDate },
      },
    } = classroom;
    const startTime = new Date(startDate).getTime();
    const endTime = new Date(endDate).getTime() + ONE_DAY;
    const now = Date.now();
    if (startTime <= now && endTime > now) {
      return classroom;
    }
  }
}
