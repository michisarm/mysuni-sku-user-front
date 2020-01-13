import { decorate, observable } from 'mobx';
import { EventType } from './EventType';

export class EventSummaryModel {
  //
  eventId: string = '';
  eventType: EventType = EventType.Card;
  title: string = '';
  episode: number = 0;
  startDay: Date = new Date();

  constructor(summary?: EventSummaryModel) {
    if (summary) {
      Object.assign(this, { ...summary });
    }
  }

}

decorate(EventSummaryModel, {
  eventId: observable,
  eventType: observable,
  title: observable,
  episode: observable,
  startDay: observable,
});
