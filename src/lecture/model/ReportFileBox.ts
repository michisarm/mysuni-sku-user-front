import { PolyglotString } from 'shared/viewmodel/PolyglotString';

export default interface ReportFileBox {
  report: boolean;
  fileBoxId: string;
  reportName: PolyglotString | null;
  reportQuestion: PolyglotString | null;
}
