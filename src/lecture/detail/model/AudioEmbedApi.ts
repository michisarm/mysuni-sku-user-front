export interface AudioEmbedApi {
  pauseVideo: () => void,
  seekTo: (index: number) => void,
  getCurrentTime: () => void,
  getDuration: () => void,
  currentPosition: () => void,
  getPlaybackRate: () => void,
  loadVideo: () => void,
  playVideo: () => void,
}