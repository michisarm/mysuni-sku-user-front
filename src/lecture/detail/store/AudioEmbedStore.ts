import { AudioEmbedApi } from '../model/AudioEmbedApi';
import { createStore } from './Store';

const [
  setAudioEmbedApi,
  onAudioEmbedApi,
  getAudioEmbedApi,
  useAudioEmbedApi,
] = createStore<AudioEmbedApi>();

export {
  setAudioEmbedApi,
  onAudioEmbedApi,
  getAudioEmbedApi,
  useAudioEmbedApi,
};
