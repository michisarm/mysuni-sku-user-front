/* eslint-disable consistent-return */
import { LectureTranscript } from 'lecture/detail/viewModel/LectureTranscript';
import Transcript from 'lecture/detail/model/Transcript';

export async function getTranscriptItem(
  transcript: Transcript[]
): Promise<LectureTranscript[]> {
  const lectureTranscripts: LectureTranscript[] = [];

  if(transcript.forEach === undefined) {
    return [];
  }

  transcript.forEach(transcript => {
    const {
      deliveryId,
      locale,
      idx,
      text,
      creatorId,
      createdTime,
      modifierId,
      modifiedTime,
    } = transcript;

    const lectureTranscript: LectureTranscript = {
      locale,
      idx,
      text,
    };

    lectureTranscripts.push(lectureTranscript);
  });

  console.log('lectureTranscripts', lectureTranscripts);

  return lectureTranscripts;
}
