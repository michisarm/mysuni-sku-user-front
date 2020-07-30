import BadgeCubeData from './BadgeCubeData';

class BadgeCourseData {
  // Course Data
  name: string = '';
  cubeCount: number = 0;
  coursePlanId: string = '';
  lectureCardIds: string[] = [];
  cubeData: BadgeCubeData[] = [];
  isOpened: boolean = false;

  // TRS for Course
  test: boolean = true;
  report: boolean = true;
  survey: boolean = true;

  test_name: string = '';
  report_name: string = '';
  survey_name: string = '';

  constructor(data?: BadgeCourseData) {
    //
    if (data) {
      Object.assign(this, data);
    }
  }
}

export default BadgeCourseData;
