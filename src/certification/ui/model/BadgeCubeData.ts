class BadgeCubeData {
  // Cube Data
  cubeId: string = '';
  learningCardId: string = '';
  name: string = '';
  cubeType: string = '';
  learningTime: number = 0; // 학습시간(분)
  sumViewSeconds: number = 0; // 진행율(%)
  learningState: string = '';

  // TRS for Course
  test: boolean = false;
  report: boolean = false;
  survey: boolean = false;

  test_name: string = '';
  report_name: string = '';
  survey_name: string = '';

  constructor(data?: BadgeCubeData) {
    //
    if (data) {
      Object.assign(this, data);
    }
  }
}

export default BadgeCubeData;
