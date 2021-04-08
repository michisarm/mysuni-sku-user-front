import { DifficultyLevel } from '../../model/DifficultyLevel';

export interface CardRdo {
  channelIds?: string;
  collegeIds?: string;
  difficultyLevels?: DifficultyLevel;
  hasStamp?: boolean;
  limit: number;
  offset: number;
  orderBy?: string;
  name?: string;
  numberOneIfHasStamp?: number;
  required?: boolean;
}
