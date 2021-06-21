import { BadgeType } from "../../../certification/model/BadgeType";
import { BadgeLevel } from "../../../certification/model/BadgeLevel";
import { BadgeIssueState } from "../../../certification/model/BadgeIssueState";


export interface BadgeModel {
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
  badgeCategory: {
    backgroundImagePath: string;
    creatorName: string;
    displayOrder: number;
    iconPath: string;
    name: string;
    themeColor: string;
    time: string;
    topImagePath: string;
  }
}

export interface BadgesModel {
  badges: BadgeModel[];
  badgesTotalCount: number;
  badgesOffset: number;
}
