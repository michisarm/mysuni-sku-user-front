import React, { useEffect, useState } from 'react';
import { getLectureMedia, onLectureMedia } from 'lecture/detail/store/LectureMediaStore';

// http://local.mysuni.sk.com:3000/lecture/cineroom/ne1-m2-c2/college/CLG0001v/cube/CUBE-2ld/lecture-card/LECTURE-CARD-28y
const LectureAudioView: React.FC = function LectureAudioView() {

  const [embedApi, setEmbedApi] = useState({
    pauseVideo: () => {},
    seekTo: (index: number) => {},
  });//FIXME 선언은 했지만 딱히 아직 쓸 곳은 없습니다.

  const cleanUpPanoptoIframe = () => {
    const playerEl = document.getElementById('panopto-embed-audio-player');//audio player 라는 것이 따로 없습니다.
    if (playerEl) {
      playerEl.innerHTML = '';
    }
  };

  const onPanoptoIframeReady = () => {
    // The iframe is ready and the video is not yet loaded (on the splash screen)
    // Load video will begin playback
    console.log('panopto iframe loaded...');
    //embedApi.loadVideo();//페이지 로드 시 자동 실행됩니다.
    const playerEl = document.getElementById('panopto-embed-audio-player');//audio player 라는 것이 따로 없습니다.
    if (playerEl) {
      console.log(playerEl.getElementsByTagName("iframe")[0].height="100px");
    }    
  };

  const onPanoptoLoginShown = () => {
    console.log('------로그인이 안 되어 있어요....!!!!!!!!!');
  };

  useEffect(()=>{    
    onLectureMedia(lectureMedia=>{
      cleanUpPanoptoIframe();//기존에 어떤 상태이건 초기화
      if (typeof lectureMedia === 'undefined') {
        //do nothing!
      }
      else {
        const currentPaonoptoSessionId = lectureMedia.mediaContents.internalMedias[0].panoptoSessionId || '';
        const embedApi = new window.EmbedApi("panopto-embed-audio-player", {
          width: "750",
          height: "422",
          //This is the URL of your Panopto site
          //https://sku.ap.panopto.com/Panopto/Pages/Auth/Login.aspx?support=true
          serverName: "sku.ap.panopto.com",
          sessionId: currentPaonoptoSessionId,
          videoParams: { // Optional parameters
            //interactivity parameter controls whether the user will see table of contents, discussions, notes, and in-video search
            "interactivity": "none",
            "showtitle": "false",
            "showBrand": "true",
            "offerviewer": "false",
          },
          events: {
            "onIframeReady": onPanoptoIframeReady,
            "onLoginShown": onPanoptoLoginShown,
            //"onReady": onPanoptoVideoReady,
            //"onStateChange": onPanoptoStateUpdate
          }
        });
        setEmbedApi(embedApi);
      }
    
    },'LectureVideoView');

    return () => {
      cleanUpPanoptoIframe();
    };
  }, []);

  return (
    <div style={{width: '100%', maxWidth: 950,height: 184,}}>
      <div id="panopto-embed-audio-player" />
    </div>
  );
};

export default LectureAudioView;
