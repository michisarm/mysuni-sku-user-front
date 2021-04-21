import { BadgeLevel } from "./BadgeLevel";

export interface MyBadgeRdo {
  level?: BadgeLevel;
  issued?: boolean;
  offset: number;
  limit: number;
}