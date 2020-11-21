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

  transcript.forEach((transcript, key) => {
    const {
      deliveryId,
      locale,
      idx,
      text,
      startTime,
      endTime,
      creatorId,
      createdTime,
      modifierId,
      modifiedTime,
      // intervalTime
    } = transcript;

    const lectureTranscript: LectureTranscript = {
      locale,
      idx : 'transcript'+key,
      text,
      startTime,
      endTime,
    };

    lectureTranscripts.push(lectureTranscript);
  });


  return lectureTranscripts;
}
