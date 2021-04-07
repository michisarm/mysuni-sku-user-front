import { CardCategory } from 'shared/model/CardCategory';
import { CardState } from './CardState';
import { DifficultyLevel } from './DifficultyLevel';
import { GroupBasedAccessRule } from './GroupBasedAccessRule';
import { PermittedCineroom } from './PermittedCineroom';
import { PatronKey } from '@nara.platform/accent';

export interface Card {
  id: string;
  name: string;
  patronKey: PatronKey;
  thumbImagePath: string;
  stampCount: number;
  description: string;
  difficultyLevel?: DifficultyLevel;
  searchable: boolean;
  tags?: string[];
  categories: CardCategory[];
  permittedCinerooms?: PermittedCineroom[];
  learningTime: number;
  cardState?: CardState;
  cardStateUpdatedTime: number;
  mainCategory?: CardCategory;
  groupBasedAccessRule?: GroupBasedAccessRule;
}