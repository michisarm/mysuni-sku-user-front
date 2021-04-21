/* eslint-disable consistent-return */
import Media from 'lecture/model/Media';
import { LectureMedia } from 'lecture/detail/viewModel/LectureMedia';

export function getMediaItem(media: Media) {
  const { id, mediaContents, mediaType, name } = media;

  const lectureMedia: LectureMedia = { id, mediaContents, mediaType, name };

  return lectureMedia;
}
