import { PolyglotString } from '../../shared/viewmodel/PolyglotString';

export default interface ReportFileBox {
  report: boolean;
  fileBoxId: string;
  // reportName: string;
  reportName: PolyglotString;
  reportQuestion: PolyglotString;
}
