/* eslint-disable consistent-return */
import Media from 'lecture/model/Media';
import { LectureMedia } from 'lecture/detail/viewModel/LectureMedia';

export async function getMediaItem(media: Media): Promise<LectureMedia> {
  const { id, mediaContents, mediaType, name } = media;

  const lectureMedia: LectureMedia = { id, mediaContents, mediaType, name };

  return lectureMedia;
}
