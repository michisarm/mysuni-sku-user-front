import BadgeCubeData from './BadgeCubeData';


class BadgeCourseData {
  // Course Data
  cineroomId: string = '';
  serviceId: string = '';
  collegeId: string = '';

  name: string = '';
  cubeCount: number = 0;
  coursePlanId: string = '';
  lectureCardIds: string[] = [];
  cubeData: BadgeCubeData[] = [];
  isOpened: boolean = false;
  learningState: string = '';
  serviceType: string = '';

  // TRS for Course
  test: boolean = false;
  report: boolean = false;
  survey: boolean = false;

  constructor(data?: BadgeCourseData) {
    //
    if (data) {
      Object.assign(this, data);
    }
  }
}

export default BadgeCourseData;
