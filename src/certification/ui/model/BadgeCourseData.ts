import BadgeCubeData from './BadgeCubeData';

class BadgeCourseData {
  // Course Data
  coursePlanId: string = '';
  isOpened: boolean = false;
  cubeCount: number = 0;
  lectureCardIds: string[] = [];
  cubeData: BadgeCubeData[] = [];

  // TRS for Course
  test: string = '';
  report: string = '';
  survey: string = '';

  constructor(data?: BadgeCourseData) {
    //
    if (data) {
      Object.assign(this, data);
    }
  }
}

export default BadgeCourseData;
