import { PolyglotString } from 'shared/viewmodel/PolyglotString';
import { LangSupport } from 'lecture/model/LangSupport';

export interface Instructor {
  collegeId: string;
  photoFilePath: string;
  internal: boolean;
  organization: PolyglotString | null;
  position: PolyglotString | null;
  lectureField: PolyglotString | null;
  career: PolyglotString | null;
  name: PolyglotString | null;
  langSupports: LangSupport[];
}
