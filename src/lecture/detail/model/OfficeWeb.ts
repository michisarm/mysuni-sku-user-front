import { DatePeriod } from '@nara.platform/accent';
import OfficeWebUrlInfo from './OfficeWebUrlInfo';

export default interface OfficeWeb {
  name: string;
  fileBoxId: string;
  String: string;
  learningPeriod: DatePeriod;
  webUrlInfo: OfficeWebUrlInfo;
  webPageUrl: string;
  time: number;
}
