import { CardCategory } from '../../shared/model/CardCategory';
import CubeType from './CubeType';

export interface Cube {
  id: string;
  patronKey: {
    keyString: string;
  };
  name: string;
  type: CubeType;
  enabled: boolean;
  categories: CardCategory[];
  learningTime: number;
  time: number;
  defaultLanguage: null;
  hasTest: boolean;
  reportName: string | null;
  surveyCaseId: string | null;
  sharingCineroomIds: string[];
}

export 