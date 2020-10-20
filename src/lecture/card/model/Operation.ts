import Operator from './Operator';

export default interface Operation {
  operator: Operator;
  location: string;
  phoneNumber: string;
  organizer: string;
  etcCp: string;
  siteUrl: string;
}
