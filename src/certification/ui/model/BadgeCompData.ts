class BadgeCompData {
  //
  compType: string = ''; // 'COURSE' | 'CUBE'

  // 공통
  id: string = '';
  patronKeyString: string = '';
  name: string = '';

  // Course Data
  coursePlanId: string = '';
  cubeCount: number = 0;
  lectureCardIds: string[] = [];

  // Cube Data
  cubeId: string = '';
  learningCardId: string = '';
  cubeType: string = '';
  learningTime: number = 0; // 학습시간(분)
  sumViewSeconds: number = 0; // 진행율(%)
  learningState: string = '';

  constructor(data?: BadgeCompData) {
    //
    if (data) {
      Object.assign(this, data);
    }
  }
}

export default BadgeCompData;
