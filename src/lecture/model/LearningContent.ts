import { LearningContentType } from './LearningContentType';
import { LearningContentChildren } from './LearningContentChildren';
import { PolyglotString } from 'shared/viewmodel/PolyglotString';
export interface LearningContent {
  contentId: string;
  name: PolyglotString | null;
  parentId: string | null;
  learningContentType: LearningContentType;
  chapter: boolean;
  description: PolyglotString;
  children: LearningContentChildren[];
}
