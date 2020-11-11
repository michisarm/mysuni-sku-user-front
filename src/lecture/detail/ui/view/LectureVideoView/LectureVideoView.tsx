/*eslint-disable*/

import React, { useCallback, useEffect, useState } from 'react';
import { getLectureTranscripts } from 'lecture/detail/store/LectureTranscriptStore';
import { getLectureMedia, onLectureMedia } from 'lecture/detail/store/LectureMediaStore';
import SkuVideoPlayer from 'lecture/detail/service/useLectureMedia/components/SkuPlayer/SkuVideoPlayer';
import { patronInfo } from '@nara.platform/dock';

//샘플 페이지 : http://localhost:3000/lecture/cineroom/ne1-m2-c2/college/CLG00003/cube/CUBE-2jy/lecture-card/LECTURE-CARD-274
//             http://localhost:3000/lecture/cineroom/ne1-m2-c2/college/CLG00003/cube/CUBE-2ka/lecture-card/LECTURE-CARD-27z
//             http://localhost:3000/lecture/cineroom/ne1-m2-c2/college/CLG00001/cube/CUBE-2kh/lecture-card/LECTURE-CARD-283

interface LectureVideoViewProps {}

//FIXME SSO 로그인된 상태가 아니면 동작 안 함. 
const LectureVideoView: React.FC<LectureVideoViewProps> = function LectureVideoView({}) {  

  const [embedApi, setEmbedApi] = useState({
    pauseVideo: () => {},
    seekTo: (index: number) => {},
  });

  const toHHMM = useCallback((idx: number) => {
    const time = idx;
    const hours = Math.floor(time / 60);
    const minutes = Math.floor(time - hours * 60);

    let sHours = '';
    let sMinutes = '';
    sHours = String(hours.toString()).padStart(2, '0');
    sMinutes = String(minutes.toString()).padStart(2, '0');    

    return sHours + ':' + sMinutes;
  }, []);

  const [displayTranscript, setDisplayTranscript] = useState<boolean>(true);
  const captionInfos = {
    infos: [
      { lang: 'ko', url: 'test.srt', isDefault: false },
      { lang: 'en', url: 'test_en.srt', isDefault: true },
    ],
  };

  const onPanoptoIframeReady = () => {
    // The iframe is ready and the video is not yet loaded (on the splash screen)
    // Load video will begin playback
    console.log('panopto iframe loaded...');
    //embedApi.loadVideo();//페이지 로드 시 자동 실행됩니다.
  };

  const onPanoptoLoginShown = () => {
    console.log('------로그인이 안 되어 있어요....!!!!!!!!!');
    //로그인 페이지가 안 떠 있는 경우 바로 Clear 시켜서 반복 호출을 막아야 합니다.
    cleanUpPanoptoIframe();
  };

  const cleanUpPanoptoIframe = () => {
    let playerEl = document.getElementById('panopto-embed-player');
    if (playerEl)
      playerEl.innerHTML = '';
  };

  const seekByIndex = (index: number) => {
    console.log('transcript index: ' + index); 
    if (embedApi && index >= 0) {
      //TODO current state 를 찾아서 Play 이 
      embedApi.seekTo(index);
    }
  };

  useEffect(()=>{    
    onLectureMedia(lectureMedia=>{
      cleanUpPanoptoIframe();//기존에 어떤 상태이건 초기화
      if (typeof lectureMedia === 'undefined') {
      }
      else {
        let currentPaonoptoSessionId = lectureMedia.mediaContents.internalMedias[0].panoptoSessionId || '';
        let embedApi = new window.EmbedApi("panopto-embed-player", {
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

              <div className="course-video">
                <div id="panopto-embed-player"></div>
                {getLectureTranscripts() &&
                  getLectureMedia() &&
                  (getLectureMedia()?.mediaType == 'InternalMedia' ||
                    getLectureMedia()?.mediaType == 'InternalMediaUpload') &&
                  (getLectureTranscripts()?.length || 0) > 0 &&
                  displayTranscript && (
                    <>
                      <button
                        className="ui icon button right btn-blue"
                        onClick={() => setDisplayTranscript(false)}
                      >
                        Close Transcript
                        <i aria-hidden="true" className="icon icon morelink" />
                      </button>

                      <div className="course-video-tanscript">
                        <div className="course-video-scroll">
                          {getLectureTranscripts()?.map(lectureTranscript => {
                            return (
                              <>
                                <strong style={{cursor: 'pointer'}} onClick={()=>{seekByIndex(lectureTranscript.idx)}}>{toHHMM(lectureTranscript.idx)}</strong>
                                <p>{lectureTranscript.text}</p>
                              </>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  )}
                {getLectureTranscripts() && !displayTranscript && (
                  <button
                    className="ui icon button right btn-blue"
                    onClick={() => setDisplayTranscript(true)}
                  >
                    View Transcript
                    <i aria-hidden="true" className="icon icon morelink" />
                  </button>
                )}
              </div>

  );
};

export default LectureVideoView;

