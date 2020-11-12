import React, { useEffect, useState,useRef, useCallback } from 'react';
import { getLectureMedia, onLectureMedia } from 'lecture/detail/store/LectureMediaStore';
import LectureRouterParams from 'lecture/detail/viewModel/LectureRouterParams';
import { useLectureWatchLog } from 'lecture/detail/service/useLectureMedia/useLectureWatchLog';
import WatchLog from 'lecture/detail/model/Watchlog';
import { patronInfo } from '@nara.platform/dock';
import { useLectureState } from 'lecture/detail/service/useLectureState/useLectureState';
import ClassroomModalView from 'lecture/category/ui/view/ClassroomModalView';
import { useLectureClassroom } from 'lecture/detail/service/useLectureClassroom/useLectureClassroom';


interface LectureAudioViewProps {
    params:LectureRouterParams | undefined;
    hookAction: () => void;
  }

// http://local.mysuni.sk.com:3000/lecture/cineroom/ne1-m2-c2/college/CLG0001v/cube/CUBE-2ld/lecture-card/LECTURE-CARD-28y
const LectureAudioView: React.FC<LectureAudioViewProps> = function LectureAudioView({params,hookAction}) {  
  

  const [
    watchLogValue,
    getCubeWatchLogItem,
    setWatchLog,
    getWatchLogSumViewCount,
    confirmProgress,
  ] = useLectureWatchLog();

  // const params = useLectureRouterParams();

  // const [params, setParams] = useState<LectureRouterParams | undefined>(useLectureRouterParams());
  const [watchlogState, setWatchlogState] = useState<WatchLog>();

  // params, watchlog


  useEffect(() => {
    const watchlog: WatchLog = {
      patronKeyString: patronInfo.getDenizenId()||'',
      start: 0,
      end: 0,
      lectureUsid: params?.lectureId || '',
    };
    setWatchlogState(watchlog);
  }, [params]);

  
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const [embedApi, setEmbedApi] = useState({
    pauseVideo: () => {},
    seekTo: (index: number) => {},
    getCurrentTime : () => {},
    getDuration : () => {},
  });


  // hookAction
  useEffect(() => {

    console.log('useEffect - hookAction : ', hookAction);

  }, [hookAction]);


  const onPanoptoStateUpdate = useCallback((state:any) => {
    if (state == 2){
      setIsActive(false);
    }else if (state == 1){
      console.log(hookAction());
      hookAction();
      setIsActive(true);
    }
  }, [hookAction]);

  // const onPanoptoStateUpdate = (state:any) => {
  //   console.log('state',state);

  //   if (state == 2){
  //     setIsActive(false);
  //   }else if (state == 1){
  //     console.log(hookAction());
  //     hookAction();
  //     setIsActive(true);
  //   }

  // };
  
  useEffect(() => {
    let interval:any = null;
    if (isActive && params && watchlogState) {
      interval = setInterval(() => {
        const currentTime = embedApi.getCurrentTime() as unknown as number;
        setWatchlogState({...watchlogState,start:currentTime,end:currentTime+10})
        setSeconds(seconds => seconds + 10);
        setWatchLog(params, watchlogState);
        console.log('confirmProgress');
        confirmProgress(params);


      }, 10000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);
  
  useEffect(()=>{ 
    if (params) {  
      confirmProgress(params);
      console.log('confirmProgress run');
    }
  }, [params]);

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
            "onStateChange": onPanoptoStateUpdate
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
