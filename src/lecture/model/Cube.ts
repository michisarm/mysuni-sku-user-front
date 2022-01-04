import { CardCategory } from '../../shared/model/CardCategory';
import { PolyglotString } from '../../shared/viewmodel/PolyglotString';
import CubeType from './CubeType';
import { LangSupport } from './LangSupport';

export interface Cube {
  langSupports: LangSupport[];
  id: string;
  patronKey: {
    keyString: string;
  };
  name: PolyglotString;
  type: CubeType;
  subType: string;
  enabled: boolean;
  categories: CardCategory[];
  learningTime: number;
  time: number;
  hasTest: boolean;
  reportName: PolyglotString | null;
  surveyCaseId: string | null;
  sharingCineroomIds: string[];
}
