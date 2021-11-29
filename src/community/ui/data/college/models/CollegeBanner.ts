import { PolyglotString } from '../../../../packages/polyglot/PolyglotString';

export interface CollegeBanner {
  collegeBannerContents: {
    collegeBannerOrder: number;
    imageUrl: PolyglotString | null;
    linkUrl: PolyglotString | null;
    useLink: number;
    visible: number;
  }[];
  collegeId: string;
  viewType: string;
}
