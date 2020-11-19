/* eslint-disable consistent-return */
import { findAllTranscript, findMedia } from '../../../api/mPersonalCubeApi';
import { findPersonalCube } from '../../../api/mPersonalCubeApi';
import PersonalCube from '../../../model/PersonalCube';
import { getTranscriptItem } from './getTranscriptItemMapFromCube';
import {
  setLectureTranscripts,
} from 'lecture/detail/store/LectureTranscriptStore';
import LectureRouterParams from 'lecture/detail/viewModel/LectureRouterParams';
import { setLectureMedia } from 'lecture/detail/store/LectureMediaStore';
import { getMediaItem } from './getMediaItemMapFromCube';

function getPersonalCubeByParams(
  params: LectureRouterParams
): Promise<PersonalCube> {
  const { contentId } = params;
  return findPersonalCube(contentId!);
}

export async function getCubeLectureMedia(
  params: LectureRouterParams
): Promise<void> {
  const personalCube = await getPersonalCubeByParams(params);
  if (personalCube !== undefined) {
    if (
      personalCube.contents.type == 'Audio' ||
      personalCube.contents.type == 'Video'
    ) {

      //TODO :   contentType: ContentType;contentId: string; lectureId: string; 를 이용하여 deliveryId 조회
      // deliveryId => panoptoSessionId 로 수정 필요함
      const mediaId = personalCube.contents.contents.id;
      const media = await findMedia(mediaId);
      //TODO : 0번 배열 조회가 항상 맞는지 확인 필요함
      if(media.mediaType == 'InternalMedia' || media.mediaType == 'InternalMediaUpload'){
        const panoptoSessionId =
        media.mediaContents.internalMedias[0].panoptoSessionId;

        //스크립트 api 조회: http://localhost:8090/api/personalCube/transcripts/0b24e458-bd52-408d-a18c-abd50023dde9/ko
        const transcript = await findAllTranscript(panoptoSessionId, 'ko');
        //조회 결과 viewmodel setting
        setLectureTranscripts(await getTranscriptItem(transcript));
      }
      setLectureMedia(await getMediaItem(media));
    }
  }
}
