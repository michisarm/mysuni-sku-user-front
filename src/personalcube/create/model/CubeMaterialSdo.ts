import { MediaType } from '../../../lecture/model/MediaType';
import { MediaContents } from '../../../lecture/model/MediaContents';
import { DatePeriod } from '../../../shared/model/DatePeriod';

export interface CubeMaterialSdo {
  mediaSdo: MediaSdo;
  boardSdo: boardSdo;
  officeWebSdo: officeWebSdo;
}

export interface MediaSdo {
  name?: string;
  mediaType?: MediaType;
  mediaContents?: MediaContents;
}

export interface boardSdo {
  name?: string;
  config?: BoardConfig;
  learningPeriod?: DatePeriod;
  automaticCompletion?: boolean;
  completionCondition?: TaskCubeCompletionCondition;
}

export interface BoardConfig {
  commentForbidden: string;
  anonymousPostAllowed: string;
  anonymousCommentAllowed: string;
  enClosed: string;
  unLimited: string;
}

export interface TaskCubeCompletionCondition {
  postCount: number;
  commentCount: number;
  subCommentCount: number;
}

export interface officeWebSdo {
  name?: string;
  fileBoxId?: string;
  webPageUrl?: string;
  learningPeriod?: DatePeriod;
}
