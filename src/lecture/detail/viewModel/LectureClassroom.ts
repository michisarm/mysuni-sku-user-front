import { Classroom as RemoteClassroom } from '../../model/Classroom';
import { Member } from '../../model/Member';

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
  freeOfCharge: {
    approvalProcess: boolean;
    chargeAmount: number;
    freeOfCharge: boolean;
  };
  enrollingAvailable: boolean;
  capacityClosed: boolean;
  studentCount: number;
  cancellationPenalty: string;
  remote: RemoteClassroom;
  operator: Member;
}

export default interface LectureClassroom {
  classrooms: Classroom[];
  remote: RemoteClassroom[];
}
