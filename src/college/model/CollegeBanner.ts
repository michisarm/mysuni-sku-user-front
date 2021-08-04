import { PolyglotString } from '../../shared/viewmodel/PolyglotString';

export interface CollegeBanner {
  collegeBannerContents: {
    collegeBannerOrder: number;
    imageUrl: PolyglotString;
    linkUrl: PolyglotString;
    useLink: number;
    visible: number;
  }[];
  collegeId: string;
  viewType: string;
}
