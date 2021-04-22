import { createStore } from '../../../shared/store/Store';
import { PlayerState } from '../service/PanoptoEmbedPlayer';

export interface PanoptoEmbedPlayerState {
  playerState: PlayerState;
  isMuted: boolean;
  isVideoReadied: boolean;
  isIframeReadied: boolean;
  videoUrl: string;
  currentTime: number;
  duration: number;
  playbackRate: number;
  hasCaptions: boolean;
  captionTracks: string[];
  selectedCaptionTrack: string;
  watchLogStart: number;
}

export function getEmptyPanoptoEmbedPlayerState(): PanoptoEmbedPlayerState {
  return {
    playerState: PlayerState.Paused,
    isMuted: false,
    isVideoReadied: false,
    isIframeReadied: false,
    videoUrl: '',
    currentTime: 0,
    duration: 0,
    playbackRate: 0,
    hasCaptions: false,
    captionTracks: [],
    selectedCaptionTrack: '',
    watchLogStart: 0,
  };
}

export const [
  setPanoptoEmbedPlayerState,
  onPanoptoEmbedPlayerState,
  getPanoptoEmbedPlayerState,
  usePanoptoEmbedPlayerState,
] = createStore<PanoptoEmbedPlayerState>();
