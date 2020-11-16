import { ClassroomModel } from '../../../../../personalcube/classroom/model';
import { findClassrooms } from '../../../api/mPersonalCubeApi';
import { setLectureClassroom } from '../../../store/LectureClassroomStore';
import LectureRouterParams from '../../../viewModel/LectureRouterParams';

export async function getClassroomFromCube(params: LectureRouterParams) {
  const { contentId } = params;
  const classrooms = await findClassrooms(contentId);
  if (classrooms !== null && (classrooms as unknown) !== '') {
    setLectureClassroom({
      classrooms: classrooms.map(
        ({
          id,
          round,
          enrolling: { applyingPeriod, learningPeriod, cancellablePeriod },
          operation: { location, operator },
          capacity,
          freeOfCharge,
        }) => ({
          id,
          round,
          applyingStartDate: applyingPeriod.startDate,
          applyingEndDate: applyingPeriod.endDate,
          learningStartDate: learningPeriod.startDate,
          learningEndDate: learningPeriod.endDate,
          cancellableStartDate: cancellablePeriod.startDate,
          cancellableEndDate: cancellablePeriod.endDate,
          location,
          operator: operator.name,
          capacity,
          freeOfCharge: { approvalProcess: freeOfCharge.approvalProcess },
        })
      ),
      remote: classrooms.map(classroom => new ClassroomModel(classroom)),
    });
  } else {
    setLectureClassroom();
  }
}
