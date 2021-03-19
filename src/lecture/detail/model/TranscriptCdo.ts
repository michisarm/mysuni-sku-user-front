export default interface TranscriptCdoModel {

  id: string;
  audienceKey: string;
  deliveryId: string;
  locale: string;
  idx: number;
  
  text: string;
  state: string;

  creatorId: string;

  startTime: string;
  endTime: string;
}