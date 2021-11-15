import { LangSupport } from '../../../../packages/polyglot/LangSupport';
import { PolyglotString } from '../../../../packages/polyglot/PolyglotString';

export interface Banner {
  language: number;
  name: string;
  imageUrl: PolyglotString | null;
  imageAlt: PolyglotString | null;
  target: string;
  registrantName: PolyglotString | null;
  registeredTime: number;
  imageVersion: number;
  targetUrl: string;
  version: number;
  langSupports: LangSupport[];
}
