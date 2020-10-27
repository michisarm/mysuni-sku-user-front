import { Transcript } from '../viewModel/Transcript';
import { createStore } from './Store';

const [setTranscript, onTranscript, getTranscript] = createStore<Transcript>();

export { setTranscript, onTranscript, getTranscript };
