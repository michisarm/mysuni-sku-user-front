import { CardWithCardRealtedCount } from '../../lecture/model/CardWithCardRealtedCount';

type ViewType = 'College' | 'Recommend';

export interface ChannelCards {
  channelId: string;
  count: number;
  viewType: ViewType;
  cardWithRelatedCountRoms: CardWithCardRealtedCount[];
}
