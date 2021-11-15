import { PolyglotString } from '../../../../packages/polyglot/PolyglotString';
import { Banner } from './Banner';

export interface BannerBundleWithBannerRom {
  id: string;
  language: number;
  area: number;
  intervalTime: number;
  time: number;
  name: string;
  registrantName: PolyglotString | null;
  modifierName: PolyglotString | null;
  startDate: number;
  endDate: number;
  modifiedTime: number;
  top: boolean;
  topBgColor: string;
  banners: Banner[];
}
