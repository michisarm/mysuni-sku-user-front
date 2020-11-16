/* eslint-disable consistent-return */
import Media from 'lecture/detail/model/Media';
import { LectureMedia } from 'lecture/detail/viewModel/LectureMedia';

export async function getMediaItem(media: Media): Promise<LectureMedia> {
  const {
    entityVersion,
    id,
    learningPeriod,
    mediaContents,
    mediaType,
    name,
    patronKey,
    time,
  } = media;

  const lectureMedia: LectureMedia = { id, mediaContents, mediaType, name };


  return lectureMedia;
}
