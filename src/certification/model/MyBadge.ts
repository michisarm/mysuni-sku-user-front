import { BadgeType } from './BadgeType';
import { BadgeLevel } from './BadgeLevel';
import { BadgeIssueState } from './BadgeIssueState';
import { BadgeCategory } from './BadgeCategory';
import { PolyglotString } from 'shared/viewmodel/PolyglotString';
export interface MyBadge {
  id: string;
  name: PolyglotString;
  type: BadgeType;
  level: BadgeLevel;
  categoryId: string;
  cardIds: string[];
  iconUrl: string;
  description: PolyglotString;
  learningTime: number;
  issueAutomatically: boolean;
  badgeStudentId: string;
  badgeIssueState: BadgeIssueState;
  badgeCategory: BadgeCategory;
}

