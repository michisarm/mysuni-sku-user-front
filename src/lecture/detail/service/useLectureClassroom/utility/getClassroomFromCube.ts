import { findCubeDetailCache } from '../../../api/cubeApi';
import { setLectureClassroom } from '../../../store/LectureClassroomStore';
import LectureParams from '../../../viewModel/LectureParams';

export async function getClassroomFromCube(params: LectureParams) {
  const { cubeId } = params;
  if (cubeId === undefined) {
    return;
  }
  const cubeDetail = await findCubeDetailCache(cubeId);
  if (cubeDetail === undefined) {
    return;
  }
  const {
    cubeContents: { instructors },
    cubeMaterial: { classrooms },
  } = cubeDetail;
  if (classrooms !== null && (classrooms as unknown) !== '') {
    setLectureClassroom({
      classrooms: classrooms.map(remote => {
        const {
          id,
          round,
          enrolling: {
            applyingPeriod,
            learningPeriod,
            cancellablePeriod,
            enrollingAvailable,
            cancellationPenalty,
          },
          operation: { location, siteUrl, operator },
          capacity,
          freeOfCharge,
          capacityClosed,
          waitingCapacity,
        } = remote;
        return {
          id,
          round,
          applyingStartDate: applyingPeriod.startDate,
          applyingEndDate: applyingPeriod.endDate,
          learningStartDate: learningPeriod.startDate,
          learningEndDate: learningPeriod.endDate,
          cancellableStartDate: cancellablePeriod.startDate,
          cancellableEndDate: cancellablePeriod.endDate,
          location,
          siteUrl,
          instructor:
            instructors.find(c => c.round === round)?.instructorId || '',
          capacity,
          freeOfCharge: {
            approvalProcess: freeOfCharge.approvalProcess,
            chargeAmount: freeOfCharge.chargeAmount,
            freeOfCharge: freeOfCharge.freeOfCharge,
          },
          enrollingAvailable,
          capacityClosed,
          studentCount: waitingCapacity,
          cancellationPenalty,
          remote,
          operator,
        };
      }),
      remote: classrooms,
    });
  } else {
    setLectureClassroom();
  }
}
