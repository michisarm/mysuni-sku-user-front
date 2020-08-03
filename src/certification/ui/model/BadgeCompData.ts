import BadgeCourseData from './BadgeCourseData';
import BadgeCubeData from './BadgeCubeData';

class BadgeCompData {
  //
  compType: string = ''; // 'COURSE' | 'CUBE'

  // 공통
  id: string = '';
  patronKeyString: string = '';

  // Course Data
  course: BadgeCourseData | null = null;

  // Cube Data
  cube: BadgeCubeData | null = null;

  constructor(data?: BadgeCompData | null) {
    //
    if (data) {
      Object.assign(this, data);
    }
  }
}

export default BadgeCompData;
