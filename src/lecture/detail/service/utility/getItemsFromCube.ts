import {
  LectureListCourseItemUrl,
  LectureListReportItem,
  LectureListSurveyItem,
  LectureListTestItem,
} from '../../store/LectureListStore';
import PersonalCube from '../../model/PersonalCube';
import StudentJoin from '../../model/StudentJoin';

function isEmpty(value?: string) {
  if (value === undefined || typeof value !== 'string' || value === '') {
    return true;
  }
  return false;
}

interface LectureListItem {
  test?: LectureListTestItem;
  survey?: LectureListSurveyItem;
  report?: LectureListReportItem;
}

function getLectureListTestItem(
  personalCube: PersonalCube,
  studentJoins: StudentJoin[]
) {
  const id = personalCube.contents.examId;
}

// Report
// http://localhost:3000/api/personalCube/cubeintros/a9ab592a-b83c-467e-9e90-655c3b381273

export function getItemsFromCube(
  personalCube: PersonalCube,
  studentJoins: StudentJoin[],
  url: LectureListCourseItemUrl
) {
  const lectureListItem: LectureListItem = {};
  if (!isEmpty(personalCube.contents.examId)) {
  }
  if (!isEmpty(personalCube.contents.surveyId)) {
  }
}
