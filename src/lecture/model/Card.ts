import { CardCategory } from 'shared/model/CardCategory';
import { CardState } from './CardState';
import { DifficultyLevel } from './DifficultyLevel';
import { GroupBasedAccessRule } from './GroupBasedAccessRule';
import { PermittedCineroom } from './PermittedCineroom';
import { PatronKey } from '@nara.platform/accent';
import CardType from '../shared/model/CardType';
export interface Card {
  id: string;
  name: string;
  type: CardType;
  patronKey: PatronKey;
  thumbImagePath: string;
  stampCount: number;
  simpleDescription: string;
  difficultyLevel?: DifficultyLevel;
  searchable: boolean;
  tags?: string[] | null;
  categories: CardCategory[];
  permittedCinerooms?: PermittedCineroom[];
  learningTime: number;
  cardState?: CardState;
  cardStateUpdatedTime: number;
  mainCategory: CardCategory;
  groupBasedAccessRule?: GroupBasedAccessRule;
}
