import MediaContents from '../model/MediaContents';
import { MediaType } from '../model/MediaType';

export interface LectureMedia {
  id: string;
  mediaType: MediaType;
  name: string;
  mediaContents: MediaContents;
}
