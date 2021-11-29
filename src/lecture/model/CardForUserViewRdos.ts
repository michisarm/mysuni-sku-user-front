import { LangSupport } from './LangSupport';
import { PolyglotString } from '../../shared/viewmodel/PolyglotString';
import CardType from '../shared/model/CardType';
import { DifficultyLevel } from './DifficultyLevel';

export interface CardForUserViewRdos {
  //
  additionalLearningTime: number;
  badgeCount: number;
  difficultyLevel: DifficultyLevel;
  id: string;
  langSupports: LangSupport[];
  learningState: string;
  learningTime: number;
  mainCollegeId: string;
  modifiedTime: number;
  name: PolyglotString;
  paid: boolean;
  passedStudentCount: number;
  passedTime: number;
  required: boolean;
  simpleDescription: PolyglotString;
  stampCount: number;
  starCount: number;
  studentCount: number;
  thumbImagePath: string;
  thumbnailImagePath: string;
  type: CardType;
}
