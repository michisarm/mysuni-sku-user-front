import ContentsProvider from './ContentsProvider';
import { InternalMediaConnection } from './InternalMediaConnection';

export interface MediaContents {
  contentsProvider: ContentsProvider; // cp사
  internalMedias: InternalMediaConnection[]; // 내부제작 미디어 (Video/Audio : panopto-sessionID)
  linkMediaUrl: string; // 외부 미디어 link url
}
