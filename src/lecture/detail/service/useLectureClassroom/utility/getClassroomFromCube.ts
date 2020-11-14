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
          enrolling: { applyingPeriod, learningPeriod },
          operation: { location, operator },
          capacity,
        }) => ({
          id,
          round,
          applyingStartDate: applyingPeriod.startDate,
          applyingEndDate: applyingPeriod.endDate,
          learningStartDate: learningPeriod.startDate,
          learningEndDate: learningPeriod.endDate,
          location,
          operator: operator.name,
          capacity,
        })
      ),
      remote: classrooms.map(classroom => new ClassroomModel(classroom)),
    });
  } else {
    setLectureClassroom();
  }
}
