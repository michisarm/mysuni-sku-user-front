import { PolyglotString } from '../../shared/viewmodel/PolyglotString';
import { LangSupport } from './LangSupport';

export interface ContentsProviderInfo {
  id: string;
  areaType: string;
  name: PolyglotString;
  enabled: boolean;
  phoneNumber: string | null;
  email: string | null;
  url: string | null;
  thumbnailPath: string | null;
  depotId: string | null;
  remark: string | null;
  creator: {
    keyString: string | null;
  };
  link: boolean;
  pisAgree: boolean;
  langSupports: LangSupport[];
}
