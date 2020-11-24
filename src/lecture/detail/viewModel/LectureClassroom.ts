import { ClassroomModel } from '../../../personalcube/classroom/model';
import RemoteClassroom from '../model/RemoteClassroom';

export interface Classroom {
  id: string;
  round: number;
  applyingStartDate: string;
  applyingEndDate: string;
  learningStartDate: string;
  learningEndDate: string;
  cancellableStartDate: string;
  cancellableEndDate: string;
  location: string;
  instructor: string;
  siteUrl: string;
  capacity: number;
  freeOfCharge: { approvalProcess: boolean };
}

export default interface LectureClassroom {
  classrooms: Classroom[];
  remote: ClassroomModel[];
}
