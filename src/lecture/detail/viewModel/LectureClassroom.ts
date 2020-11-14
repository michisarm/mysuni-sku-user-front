import { ClassroomModel } from '../../../personalcube/classroom/model';
import RemoteClassroom from '../model/RemoteClassroom';

export interface Classroom {
  id: string;
  round: number;
  applyingStartDate: string;
  applyingEndDate: string;
  learningStartDate: string;
  learningEndDate: string;
  location: string;
  operator: string;
  capacity: number;
}

export default interface LectureClassroom {
  classrooms: Classroom[];
  remote: ClassroomModel[];
}
