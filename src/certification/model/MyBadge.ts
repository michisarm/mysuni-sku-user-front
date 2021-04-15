import { BadgeType } from './BadgeType';
import { BadgeLevel } from './BadgeLevel';
import { BadgeIssueState } from './BadgeIssueState';
export interface MyBadge {
  id: string;
  name: string;
  type: BadgeType;
  level: BadgeLevel;
  categoryId: string;
  cardIds: string[];
  iconUrl: string;
  description: string;
  learningTime: number;
  issueAutomatically: boolean;
  badgeStudentId: string;
  badgeIssueState: BadgeIssueState;
}
