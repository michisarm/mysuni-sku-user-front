import StartDay from './StartDay';

export default interface EventSummary {
  eventId: string;
  title: string;
  episode: number;
  startDay: StartDay;
}
