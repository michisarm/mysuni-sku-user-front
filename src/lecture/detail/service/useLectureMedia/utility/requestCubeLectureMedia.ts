/* eslint-disable consistent-return */
import { findTranscriptCount, findMedia } from '../../../api/mPersonalCubeApi';
import { setLectureMedia } from 'lecture/detail/store/LectureMediaStore';
import { getMediaItem } from './getMediaItemMapFromCube';
import { findCubeDetailCache } from '../../../api/cubeApi';
import { setTranscriptCount } from 'lecture/detail/store/TranscriptCountStore';
import CubeType from '../../../../model/CubeType';

export async function requestCubeLectureMedia(
  cubeId: string,
  cubeType: CubeType
): Promise<void> {
  const cubeDetail = await findCubeDetailCache(cubeId);
  if (cubeDetail !== undefined && cubeDetail.cubeMaterial.media !== null) {
    const {
      cubeMaterial: { media },
    } = cubeDetail;
    if (cubeType == 'Audio' || cubeType == 'Video') {
      if (
        media.mediaType == 'InternalMedia' ||
        media.mediaType == 'InternalMediaUpload'
      ) {
        const panoptoSessionId =
          media.mediaContents.internalMedias[0].panoptoSessionId;
        // const transcript = await findAllTranscript(panoptoSessionId, 'ko');
        // setLectureTranscripts(await getTranscriptItem(transcript));

        const transcriptCount = await findTranscriptCount(panoptoSessionId);
        setTranscriptCount(transcriptCount);
      }
      setLectureMedia(await getMediaItem(media));
    }
  }
}
