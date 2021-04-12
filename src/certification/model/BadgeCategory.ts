import { PatronKey } from '@nara.platform/accent';

export interface BadgeCategory {
  id: string;
  name: string;
  iconUrl: string;
  displayOrder: number;
  creatorName: string;
  time: number;
  themeColor: string;
  iconPath: string;
  backgroundImagePath: string;
  patronKey: PatronKey;
}
