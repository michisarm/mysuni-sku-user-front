import { CardCategory } from './CardCategory';
import { CardType } from './CardType';
import { DifficultyLevel } from './DifficultyLevel';
import { PermittedCineroom } from './PermittedCineroom';
import { GroupBasedAccessRule } from './GroupBasedAccessRule';
import { CardState } from './CardState';
import { PatronKey } from '../../accent/models/PatronKey';
import { PolyglotString } from '../../../../packages/polyglot/PolyglotString';
import { LangSupport } from '../../../../packages/polyglot/LangSupport';

export interface CardModel {
  id: string;
  name: PolyglotString;
  type: CardType;
  patronKey: PatronKey;
  thumbImagePath: string;
  stampCount: number;
  simpleDescription: PolyglotString;
  difficultyLevel?: DifficultyLevel;
  searchable: boolean;
  tags?: PolyglotString | null;
  categories: CardCategory[];
  permittedCinerooms?: PermittedCineroom[];
  learningTime: number;
  additionalLearningTime: number;
  cardState?: CardState;
  cardStateUpdatedTime: number;
  mainCategory: CardCategory;
  groupBasedAccessRule?: GroupBasedAccessRule;
  langSupports: LangSupport[];
}
