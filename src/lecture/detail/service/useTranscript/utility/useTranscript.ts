import { onTranscriptCount } from '../../../store/TranscriptCountStore';
import TranscriptCountModel from '../../../model/TranscriptCountModel';
/* eslint-disable consistent-return */

import { useEffect, useState } from 'react';

type Value = TranscriptCountModel | undefined;

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
    return onTranscriptCount(next => {
      setValue(next);
    }, subscriberId);
  }, [subscriberId]);

  return [value];
}
