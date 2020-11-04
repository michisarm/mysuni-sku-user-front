import Enrolling from './Enrolling';
import Operation from './Operation';

export default interface RemoteClassroom {
  id: string;
  round: number;
  enrolling: Enrolling;
  operation: Operation;
}
