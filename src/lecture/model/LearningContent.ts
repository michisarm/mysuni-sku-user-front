import { LearningContentType } from './LearningContentType';

export interface LearningContent {
  contentId: string;
  name: string | null;
  parentId: string | null;
  learningContentType: LearningContentType;
  chapter: boolean;
}
