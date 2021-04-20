import { LearningContentType } from './LearningContentType';
import { LearningContentChildren } from './LearningContentChildren';
export interface LearningContent {
  contentId: string;
  name: string | null;
  parentId: string | null;
  learningContentType: LearningContentType;
  chapter: boolean;
  description: string;
  children: LearningContentChildren[];
}
