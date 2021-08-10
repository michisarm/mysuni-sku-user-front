import { InstructorWithIdentity } from 'expert/model/InstructorWithIdentity';

export interface Instructor {
  instructorId: string;
  representative: boolean;
  round: Number;
  instructorWithIdentity?: InstructorWithIdentity;
}
