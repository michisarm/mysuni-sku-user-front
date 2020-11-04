import ContentsProvider from './ContentsProvider';
import { InternalMediaConnection } from './InternalMediaConnection';

export default interface MediaContents {
  contentsProvider: ContentsProvider; // cp사
  internalMedias: InternalMediaConnection[]; // 내부제작 미디어 (Video/Audio : panopto-sessionID)
  internalMediaUpload: InternalMediaConnection[];
  linkMediaUrl: string; // 외부 미디어 link url
}
