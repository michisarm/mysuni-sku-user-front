import { LectureTranscript } from '../viewModel/LectureTranscript';
import { createStore } from './Store';

const [
  setLectureTranscripts,
  onLectureTranscripts,
  getLectureTranscripts,
] = createStore<LectureTranscript[]>();

export { setLectureTranscripts, onLectureTranscripts, getLectureTranscripts };
