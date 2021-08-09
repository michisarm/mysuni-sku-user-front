import { Classroom as RemoteClassroom } from '../../model/Classroom';
import { UserIdentity } from 'shared/model/UserIdentity';

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
  instructor: {
    instructorId: string;
    representative: boolean;
    round: number;
    name?: string;
    memberSummary?: {
      department: string;
      email: string;
      name: string;
      photoId: string;
    };
  }[];
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
  operator?: UserIdentity;
}

export default interface LectureClassroom {
  classrooms: Classroom[];
  remote: RemoteClassroom[];
}
