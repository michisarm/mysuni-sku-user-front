/* eslint-disable consistent-return */
import { findAllTranscript, findMedia } from '../../../api/mPersonalCubeApi';
import PersonalCube from '../../../model/PersonalCube';
import { getTranscriptItem } from './getTranscriptItemMapFromCube';
import { setLectureTranscripts } from 'lecture/detail/store/LectureTranscriptStore';
import { setLectureMedia } from 'lecture/detail/store/LectureMediaStore';
import { getMediaItem } from './getMediaItemMapFromCube';
import LectureParams from '../../../viewModel/LectureParams';
import { findCubeDetailCache } from '../../../api/cubeApi';

export async function getCubeLectureMedia(
  params: LectureParams
): Promise<void> {
  const { cubeId, cubeType } = params;
  if (cubeId === undefined || cubeType === undefined) {
    return;
  }
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
        const transcript = await findAllTranscript(panoptoSessionId, 'ko');
        setLectureTranscripts(await getTranscriptItem(transcript));
      }
      setLectureMedia(await getMediaItem(media));
    }
  }
}
