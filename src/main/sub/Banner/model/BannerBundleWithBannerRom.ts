import { GroupBasedAccessRule } from '../../../../lecture/model/GroupBasedAccessRule';
import { Banner } from './Banner';

export interface BannerBundleWithBannerRom {
  id: string;
  language: number;
  area: number;
  intervalTime: number;
  time: number;
  name: string;
  creatorName: string;
  modifierName: string;
  groupBasedAccessRule: GroupBasedAccessRule;
  startDate: number;
  endDate: number;
  modifiedTime: number;
  top: boolean;
  // topBgColor: string;
  banners: Banner[];
}
