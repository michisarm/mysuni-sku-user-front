import EventSummary from './EventSummary';

export default interface Examination {
  id: string;
  title: string;
  eventSummary: EventSummary;
  examinerId: string;
  examinerName: string;
  examineeCount: number;
  absenteeCount: number;
  average: number;
  questionCount: number;
  takenDate: string;
  finalCopy: string;
  finalCopyKr: string;
  eventTypeKr: string;
  paperId: string;
  successPoint: number;
  examPaperTitle: string;
}
