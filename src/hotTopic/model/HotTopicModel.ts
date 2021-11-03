import { DifficultyLevel } from 'lecture/model/DifficultyLevel';
import { LangSupport } from 'lecture/model/LangSupport';
import { PermittedCineroom } from 'lecture/model/PermittedCineroom';
import CardType from 'lecture/shared/model/CardType';
import { LearningState } from 'shared/model';
import { CardCategory } from 'shared/model/CardCategory';
import { PolyglotString } from 'shared/viewmodel/PolyglotString';

export interface CardBundleCard {
  badgeCount: number;
  categories: CardCategory[];
  difficultyLevel: DifficultyLevel;
  id: string;
  langSupports: LangSupport[];
  learningState: LearningState;
  learningTime: number;
  name: PolyglotString;
  paid: boolean;
  passedStudentCount: number;
  permittedCinerooms: PermittedCineroom[];
  simpleDescription: PolyglotString;
  starCount: number;
  studentCount: number;
  thumbImagePath: string;
  thumbnailImagePath: string;
  type: CardType;
}
