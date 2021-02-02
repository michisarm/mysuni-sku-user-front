import React, { useEffect, useState } from 'react';
import './VideoGridView.css';

interface VideoGridViewProps {}

function initializeEmbedApiPlayer(containerId: string, sessionId: string) {
  /* eslint-disable no-new */
  new window.EmbedApi(containerId, {
    width: '100%',
    height: '100%',
    serverName: 'sku-demo.ap.panopto.com',
    sessionId,
    videoParams: {
      interactivity: 'none',
      showtitle: 'false',
      showBrand: 'false',
      offerviewer: 'false',
    },
  });
}

function VideoGridView(props: VideoGridViewProps) {
  const [waitingTime, setWaitingTime] = useState<number>(0);

  const [javascriptLoaded, setJavascriptLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window.EmbedApi === 'function') {
      setJavascriptLoaded(true);
      return;
    }
    setTimeout(() => {
      setWaitingTime(waitingTime + 1);
    }, 1000);
  }, [waitingTime]);

  useEffect(() => {
    if (!javascriptLoaded) {
      return;
    }
    initializeEmbedApiPlayer(
      'panopto-embed-player-1',
      '465baa6b-2990-4057-8d06-acbf005e75c7'
    );
    initializeEmbedApiPlayer(
      'panopto-embed-player-2',
      '439f5ad0-00b6-46e8-ba8d-acbf003ed34e'
    );
    initializeEmbedApiPlayer(
      'panopto-embed-player-3',
      '86f69b24-ca11-41e0-b80d-acbf00392b50'
    );
    initializeEmbedApiPlayer(
      'panopto-embed-player-4',
      'caca85c9-2d44-499e-a2a5-acbf0029596b'
    );
    initializeEmbedApiPlayer(
      'panopto-embed-player-5',
      'e48465de-30ba-4ba6-902d-acbc00c4fa51'
    );
    initializeEmbedApiPlayer(
      'panopto-embed-player-6',
      '51c53e32-80e1-47ef-a024-acbc008dcb9a'
    );
    initializeEmbedApiPlayer(
      'panopto-embed-player-7',
      '8e3d3c08-0f81-496b-ba79-acbc0032aa44'
    );
    initializeEmbedApiPlayer(
      'panopto-embed-player-8',
      '4f27e551-4e32-477e-a0c5-acbc0032a9e3'
    );
    initializeEmbedApiPlayer(
      'panopto-embed-player-9',
      'fa546947-dd1a-4cf3-84e2-acbc0032aa0c'
    );
  }, [javascriptLoaded]);

  return (
    <div className="video-gridview-container">
      <div className="video-gridview-row">
        <div className="video-gridview-cell">
          <div className="panopto-embed-player" id="panopto-embed-player-1" />
        </div>
        <div className="video-gridview-cell">
          <div className="panopto-embed-player" id="panopto-embed-player-2" />
        </div>
        <div className="video-gridview-cell">
          <div className="panopto-embed-player" id="panopto-embed-player-3" />
        </div>
      </div>
      <div className="video-gridview-row">
        <div className="video-gridview-cell">
          <div className="panopto-embed-player" id="panopto-embed-player-4" />
        </div>
        <div className="video-gridview-cell">
          <div className="panopto-embed-player" id="panopto-embed-player-5" />
        </div>
        <div className="video-gridview-cell">
          <div className="panopto-embed-player" id="panopto-embed-player-6" />
        </div>
      </div>
      <div className="video-gridview-row">
        <div className="video-gridview-cell">
          <div className="panopto-embed-player" id="panopto-embed-player-7" />
        </div>
        <div className="video-gridview-cell">
          <div className="panopto-embed-player" id="panopto-embed-player-8" />
        </div>
        <div className="video-gridview-cell">
          <div className="panopto-embed-player" id="panopto-embed-player-9" />
        </div>
      </div>
    </div>
  );
}

export default VideoGridView;
