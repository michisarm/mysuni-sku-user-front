import TranscriptCountModel  from '../model/TranscriptCountModel';
import { createStore } from './Store';

const [
  setTranscriptCount,
  onTranscriptCount,
  getTranscriptCount,
] = createStore<TranscriptCountModel>();

export { setTranscriptCount, onTranscriptCount, getTranscriptCount };
