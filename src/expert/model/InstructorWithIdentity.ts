import { UserIdentity } from 'shared/model/UserIdentity';
import { Instructor } from './Instructor';
import { LangSupport } from 'lecture/model/LangSupport';

export interface InstructorWithIdentity {
  instructor: Instructor | null;
  userIdentity: UserIdentity | null;
}
