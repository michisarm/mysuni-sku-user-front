import { PatronKey } from '@nara.platform/accent';
import { LangSupport } from 'lecture/model/LangSupport';
import { PolyglotString } from 'shared/viewmodel/PolyglotString';

export interface BadgeCategory {
  id: string;
  name: PolyglotString;
  registrantName: PolyglotString;
  // iconUrl: string;
  displayOrder: number;
  time: number;
  themeColor: string;
  iconPath: string;
  backgroundImagePath: string;
  patronKey: PatronKey;
  topImagePath: string;
  langSupports: LangSupport[];
}
