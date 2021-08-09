import { UserIdentity } from 'shared/model/UserIdentity';
import { Instructor } from './Instructor';

export interface InstructorWithIdentity {
  instructor: Instructor;
  userIdentity: UserIdentity;
}
