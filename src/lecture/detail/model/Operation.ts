import IdName from './IdName';
import Operator from './Operator';

export default interface Operation {
  operator: Operator;
  location: string;
  phoneNumber: string;
  organizer: IdName;
  etcCp: string;
  siteUrl: string;
}
