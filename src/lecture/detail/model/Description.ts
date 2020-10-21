import Instructor from './Instructor';

export default interface Description {
  instructor: Instructor;
  goal: string;
  applicants: string;
  description: string;
  completionTerms: string;
  guide: string;
}
