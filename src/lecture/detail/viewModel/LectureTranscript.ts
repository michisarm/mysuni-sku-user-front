export interface LectureTranscript {
  deliveryId: string;
  locale: string;
  idx: number | string;
  text: string;
  startTime: string;
  endTime: string;
  active : boolean;
}
