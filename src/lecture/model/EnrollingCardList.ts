import { CardWithCardRealtedCount } from './CardWithCardRealtedCount';
import { UpcomingClassroomInfo } from './UpcomingClassroomInfo';

export interface EnrollingCardList extends CardWithCardRealtedCount {
  upcomingClassroomInfo: UpcomingClassroomInfo;
}
