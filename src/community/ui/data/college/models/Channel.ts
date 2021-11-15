import { LangSupport } from '../../../../packages/polyglot/LangSupport';
import { PolyglotString } from '../../../../packages/polyglot/PolyglotString';

export interface Channel {
  id: string;
  name: PolyglotString | null;
  channelId: string;
  iconfileBoxId: string;
  description: PolyglotString | null;
  time: number;
  checked?: boolean;
  active: boolean;
  langSupports: LangSupport[];
}
