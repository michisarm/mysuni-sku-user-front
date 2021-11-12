// Store
import { onTranscriptCount } from '../../../store/TranscriptCountStore';

// Model
import TranscriptCountModel from '../../../model/TranscriptCountModel';
import TranscriptCdo from '../../../model/TranscriptCdo';
import { LectureTranscript } from 'lecture/detail/viewModel/LectureTranscript';

// Service
import { getTranscriptItem } from 'lecture/detail/service/useLectureMedia/utility/getTranscriptItemMapFromCube';

// Api
import { findAllTranscript } from '../../../api/mPersonalCubeApi';

import { saveAs } from 'file-saver';
import { useEffect, useState } from 'react';

type Value = TranscriptCountModel | undefined;

// Transcript 업로드 샘플 파일의 양식대로 String 타입으로 변환
const transcriptCdosToString = (transcriptCdo: TranscriptCdo[]): string => {
  let str = '';

  transcriptCdo?.map((item: any, idx) => {
    str += item.text + '\n\n';
  });

  return str;
};

export function useTranscriptCount(): [Value] {
  const [subscriberId, setSubscriberId] = useState<string>();
  const [value, setValue] = useState<Value>();

  useEffect(() => {
    const next = `useTranscriptCount`;
    setSubscriberId(next);
  }, []);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onTranscriptCount((next) => {
      setValue(next);
    }, subscriberId);
  }, [subscriberId]);

  return [value];
}

export function downloadTranscript(
  transcriptCdo: TranscriptCdo[],
  title: string = 'transcript'
) {
  const str = transcriptCdosToString(transcriptCdo);
  const blob = new Blob([str], { type: 'text/plain;charset=utf-8' });
  saveAs(blob, title + '.txt');
}

export async function findTranscript(
  deliveryId: string,
  locale: string
): Promise<LectureTranscript[]> {
  const transcripts = await findAllTranscript(deliveryId, locale);
  const transcriptsItem = await getTranscriptItem(transcripts);

  return transcriptsItem;
}
