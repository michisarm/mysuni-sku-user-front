import StartDay from './StartDay';

export default interface EventSummary {
  eventId: string;
  title: string;
  eventType: EventType;
  episode: number;
  startDay: StartDay;
}
