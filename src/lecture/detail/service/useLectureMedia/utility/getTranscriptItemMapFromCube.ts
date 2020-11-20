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
    console.log('transcript', transcript)
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

    const intervalTime = startTime+''+endTime
    console.log('intervalTime', intervalTime)

    const lectureTranscript: LectureTranscript = {
      locale,
      idx : 'transcript'+key,
      text,
      startTime,
      endTime,
      // intervalTime: ''
    };

    lectureTranscripts.push(lectureTranscript);
  });


  return lectureTranscripts;
}
