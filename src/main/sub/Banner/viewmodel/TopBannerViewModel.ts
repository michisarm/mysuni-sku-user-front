import { PolyglotString } from '../../../../shared/viewmodel/PolyglotString';

export interface TopBannerViewModel {
  top: boolean;
  // topBgColor: string;
  target: string;
  linkUrl: string;
  imageUrl: PolyglotString;
  imageAlt: string;
  bdColor: string;
}
