import {
  getEmptyPanoptoEmbedPlayerState,
  getPanoptoEmbedPlayerState,
  PanoptoEmbedPlayerState,
  setPanoptoEmbedPlayerState,
} from '../store/PanoptoEmbedPlayerStore';

export enum PlayerState {
  Paused = 2,
  Playing = 1,
  Ended = 0,
}

interface SetLastActionTime {
  (nextLastActionTime: number): void;
}

export interface OnProgressEventHandler {
  (
    state: PanoptoEmbedPlayerState,
    lastActionTime: number,
    setLastActionTime: SetLastActionTime,
    didAction: boolean
  ): void;
}

function createPanoptoEmbedPlayer() {
  let intervalId: any = 0;
  let embedApi: any | undefined;
  const onProgressEventHandlerMap = new Map<OnProgressEventHandler, number>();
  const onProgressEventHandlerOnceSet = new Set<OnProgressEventHandler>();

  function getContainer() {
    return document.getElementById('panopto-embed-player');
  }

  function onIframeReady() {
    if (embedApi === undefined) {
      return;
    }
    const iframe = document.querySelector('#panopto-embed-player iframe');
    if (iframe !== null) {
      iframe.setAttribute('allowfullscreen', '');
    }

    const state =
      getPanoptoEmbedPlayerState() || getEmptyPanoptoEmbedPlayerState();
    setPanoptoEmbedPlayerState({
      ...state,
      isIframeReadied: true,
    });
  }

  function onStateChange(playerState: PlayerState) {
    console.log('onStateChange', playerState);
    if (embedApi === undefined) {
      return;
    }
    const state =
      getPanoptoEmbedPlayerState() || getEmptyPanoptoEmbedPlayerState();
    const currentTime: number = embedApi.getCurrentTime();
    const duration: number = embedApi.getDuration();
    setPanoptoEmbedPlayerState({
      ...state,
      playerState,
      currentTime,
      duration,
    });
  }

  function onReady() {
    if (embedApi === undefined) {
      return;
    }
    const state =
      getPanoptoEmbedPlayerState() || getEmptyPanoptoEmbedPlayerState();
    setPanoptoEmbedPlayerState({
      ...state,
      isVideoReadied: true,
    });
  }

  function onPlaybackRateChange() {
    if (embedApi === undefined) {
      return;
    }
    const playbackRate: number = embedApi.getPlaybackRate();
    const state =
      getPanoptoEmbedPlayerState() || getEmptyPanoptoEmbedPlayerState();
    setPanoptoEmbedPlayerState({
      ...state,
      playbackRate,
    });
  }

  function onLoginShown() {}

  function onProgress() {
    if (embedApi === undefined) {
      return;
    }
    const isMuted: boolean = embedApi.isMuted();
    const videoUrl: string = embedApi.getVideoUrl();
    const currentTime: number = embedApi.getCurrentTime();
    const duration: number = embedApi.getDuration();
    const playbackRate: number = embedApi.getPlaybackRate();
    const hasCaptions: boolean = embedApi.hasCaptions();
    const captionTracks: string[] = embedApi.getCaptionTracks();
    const selectedCaptionTrack: string = embedApi.getSelectedCaptionTrack();

    const state =
      getPanoptoEmbedPlayerState() || getEmptyPanoptoEmbedPlayerState();
    const next = {
      ...state,
      isMuted,
      videoUrl,
      currentTime,
      duration,
      playbackRate,
      hasCaptions,
      captionTracks,
      selectedCaptionTrack,
    };
    if (JSON.stringify(state) === JSON.stringify(next)) {
      return;
    }
    setPanoptoEmbedPlayerState(next);
    onProgressEventHandlerMap.forEach(
      (lastActionTime, onProgressEventHandler) => {
        const setLastActionTime: SetLastActionTime = function setLastActionTime(
          nextLastActionTime
        ) {
          onProgressEventHandlerMap.set(
            onProgressEventHandler,
            nextLastActionTime
          );
          onProgressEventHandlerOnceSet.add(onProgressEventHandler);
        };
        const didAction = onProgressEventHandlerOnceSet.has(
          onProgressEventHandler
        );
        onProgressEventHandler(
          next,
          lastActionTime,
          setLastActionTime,
          didAction
        );
      }
    );
  }

  function initializePanoptoEmbedPlayer(
    panoptoSessionId: string,
    directConnectionName?: string,
    targetSamlInstanceName?: string,
    serverName?: string
  ) {
    clearInterval(intervalId);
    const container = getContainer();
    if (container === null) {
      return;
    }
    const options: any = {
      width: '100%',
      height: '700',
      //This is the URL of your Panopto site
      //https://sku.ap.panopto.com/Panopto/Pages/Auth/Login.aspx?support=true
      // serverName: 'sku.ap.panopto.com/Panopto/Pages/BrowserNotSupported.aspx?ReturnUrl=',
      serverName: 'sku.ap.panopto.com',
      sessionId: panoptoSessionId,
      videoParams: {
        // Optional parameters
        //interactivity parameter controls whether the user will see table of contents, discussions, notes, and in-video search
        // "interactivity": "Caption Language",
        interactivity: 'search',
        showtitle: 'false',
        showBrand: 'false',
        offerviewer: 'false',
      },
      events: {
        onIframeReady,
        onLoginShown,
        onReady,
        onStateChange,
        onPlaybackRateChange,
      },
    };
    if (
      directConnectionName !== undefined &&
      targetSamlInstanceName !== undefined
    ) {
      options.videoParams[directConnectionName] = targetSamlInstanceName;
      if (serverName !== undefined) {
        options.serverName = serverName;
      }
    }
    embedApi = new window.EmbedApi('panopto-embed-player', options);
    onProgress();
    intervalId = setInterval(onProgress, 500);
  }

  function clearPanoptoEmbedPlayer() {
    onProgressEventHandlerOnceSet.clear();
    clearInterval(intervalId);
    embedApi = undefined;
    setPanoptoEmbedPlayerState();
    const container = getContainer();
    if (container === null) {
      return;
    }
    container.innerHTML = '';
  }

  function addOnProgressEventHandler(
    onProgressEventHandler: OnProgressEventHandler
  ) {
    const dispose = () =>
      onProgressEventHandlerMap.delete(onProgressEventHandler);
    onProgressEventHandlerMap.set(onProgressEventHandler, Date.now());
    return dispose;
  }

  function playVideo() {
    if (embedApi !== undefined) {
      embedApi.playVideo();
    }
  }
  function pauseVideo() {
    if (embedApi !== undefined) {
      embedApi.pauseVideo();
    }
  }
  function stopVideo() {
    if (embedApi !== undefined) {
      embedApi.stopVideo();
    }
  }
  function seekTo(position: number) {
    if (embedApi !== undefined) {
      embedApi.seekTo(position);
    }
  }

  return {
    initializePanoptoEmbedPlayer,
    clearPanoptoEmbedPlayer,
    addOnProgressEventHandler,
    playVideo,
    pauseVideo,
    stopVideo,
    seekTo,
  };
}

export function createOnProgressEventHandler(
  coreHanlder: (state: PanoptoEmbedPlayerState) => void,
  canAction: (
    lastActionTime: number,
    state: PanoptoEmbedPlayerState,
    didAction: boolean
  ) => boolean
) {
  return function onProgressEventHandler(
    state: PanoptoEmbedPlayerState,
    lastActionTime: number,
    setLastActionTime: SetLastActionTime,
    didAction: boolean
  ) {
    if (canAction(lastActionTime, state, didAction)) {
      setLastActionTime(Date.now());
      coreHanlder(state);
    }
  };
}

export const {
  initializePanoptoEmbedPlayer,
  clearPanoptoEmbedPlayer,
  addOnProgressEventHandler,
  playVideo,
  pauseVideo,
  stopVideo,
  seekTo,
} = createPanoptoEmbedPlayer();
