export interface CardRdo {
  channelIds?: string;
  collegeIds?: string;
  difficultyLevels?: string;
  learningTimeRanges?: string;
  hasStamp?: boolean;
  hasBadge?: boolean;
  limit: number;
  offset: number;
  orderBy?: string;
  name?: string;
  numberOneIfHasStamp?: number;
  required?: boolean;
  searchable?: boolean;
  startLearningDate?: string;
  endLearningDate?: string;
}
