import { PolyglotString } from '../../../../shared/viewmodel/PolyglotString';

export interface Banner {
  language: number;
  name: string;
  imageUrl: PolyglotString;
  imageAlt: string;
  target: string;
  creatorName: string;
  creationTime: number;
  imageVersion: number;
  targetUrl: string;
  version: number;
  bgColor: string;
}
