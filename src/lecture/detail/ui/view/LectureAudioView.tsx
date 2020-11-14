import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  getLectureMedia,
  onLectureMedia,
} from 'lecture/detail/store/LectureMediaStore';
import LectureRouterParams from 'lecture/detail/viewModel/LectureRouterParams';
import { useLectureWatchLog } from 'lecture/detail/service/useLectureMedia/useLectureWatchLog';
import WatchLog from 'lecture/detail/model/Watchlog';
import { patronInfo } from '@nara.platform/dock';
import { useLectureState } from 'lecture/detail/service/useLectureState/useLectureState';
import ClassroomModalView from 'lecture/category/ui/view/ClassroomModalView';
import { useLectureClassroom } from 'lecture/detail/service/useLectureClassroom/useLectureClassroom';
import { requestLectureStructure } from '../logic/LectureStructureContainer';
import LectureParams from '../../viewModel/LectureParams';
import { useLocation, useParams } from 'react-router-dom';
import { getPublicUrl } from 'shared/helper/envHelper';
import { getLectureStructure } from 'lecture/detail/store/LectureStructureStore';
import { getLectureConfirmProgress, setLectureConfirmProgress } from 'lecture/detail/store/LectureConfirmProgressStore';
import { useHistory } from 'react-router-dom';


interface LectureAudioViewProps {
  params: LectureRouterParams | undefined;
  hookAction: () => void;
}

// http://local.mysuni.sk.com:3000/lecture/cineroom/ne1-m2-c2/college/CLG0001v/cube/CUBE-2ld/lecture-card/LECTURE-CARD-28y
const LectureAudioView: React.FC<LectureAudioViewProps> = function LectureAudioView({
  params,
  hookAction,
}) {
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
  const [nextContentsName, setNextContentsName] = useState<string>();
  const [nextContentsPath, setNextContentsPath] = useState<string>();
  const [panoptoState, setPanoptoState] = useState<number>();
  const [nextContentsView, setNextContentsView] = useState<boolean>(false);

  const playerBtn = `${getPublicUrl()}/images/all/btn-player-next.png`;

  // params, watchlog

  // params, watchlog

  useEffect(() => {
    const watchlog: WatchLog = {
      patronKeyString: patronInfo.getDenizenId() || '',
      start: 0,
      end: 0,
      lectureUsid: params?.lectureId || '',
    };
    setWatchlogState(watchlog);
  }, [params]);

  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [action, setAction] = useState<() => void | undefined>();

  const [embedApi, setEmbedApi] = useState({
    pauseVideo: () => {},
    seekTo: (index: number) => {},
    getCurrentTime: () => {},
    getDuration: () => {},
  });

  useEffect(() => {
    setAction(hookAction);
  }, [hookAction]);

  const history = useHistory();

  const nextContents = useCallback((path:string) => {
    setLectureConfirmProgress();
    setPanoptoState(10);
    history.push(path);  
  }, []);


  const onPanoptoStateUpdate = useCallback((state:any) => {
    setPanoptoState(state);

    if (state == 2){
      setIsActive(false);
      setNextContentsView(false)
    }else if (state == 1){
      // console.log('state : ' ,state);
      action && action();
      setIsActive(true);
      setNextContentsView(false)
    }else if(state == 0 && params){
      confirmProgress(params);
      setIsActive(false);
      setNextContentsView(true);
    }
  }, [action,isActive,params]);

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
  const lectureParams = useParams<LectureParams>();
  const { pathname } = useLocation();

  useEffect(() => {
    let interval: any = null;
    let progressInterval: any = null;
    if (isActive && params && watchlogState) {
      interval = setInterval(() => {
        const currentTime = (embedApi.getCurrentTime() as unknown) as number;
        setWatchlogState({
          ...watchlogState,
          start: currentTime,
          end: currentTime + 10,
        });
        setSeconds(seconds => seconds + 10);
        setWatchLog(params, watchlogState);
      }, 10000);
      progressInterval = setInterval(async () => {
        await confirmProgress(params);
        requestLectureStructure(lectureParams, pathname);
      }, 60000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
      clearInterval(progressInterval);
    }
    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [isActive, seconds, lectureParams, pathname]);

  useEffect(() => {
    if (params) {
      confirmProgress(params);
    }
  }, [params]);

  const cleanUpPanoptoIframe = () => {
    const playerEl = document.getElementById('panopto-embed-audio-player'); //audio player 라는 것이 따로 없습니다.
    if (playerEl) {
      playerEl.innerHTML = '';
    }
  };

  const onPanoptoIframeReady = () => {
    // The iframe is ready and the video is not yet loaded (on the splash screen)
    // Load video will begin playback
    //embedApi.loadVideo();//페이지 로드 시 자동 실행됩니다.
    const playerEl = document.getElementById('panopto-embed-audio-player'); //audio player 라는 것이 따로 없습니다.
    if (playerEl) {
      console.log(
        (playerEl.getElementsByTagName('iframe')[0].height = '100px')
      );
    }
  };

  const onPanoptoLoginShown = () => {
  };

  useEffect(() => {
    onLectureMedia(lectureMedia => {
      cleanUpPanoptoIframe(); //기존에 어떤 상태이건 초기화
      if (typeof lectureMedia === 'undefined') {
        //do nothing!
      }
      else {
        const currentPaonoptoSessionId = lectureMedia.mediaContents.internalMedias[0].panoptoSessionId || '';
        const embedApi = new window.EmbedApi("panopto-embed-audio-player", {
          width: "100%",
          height: "100",
          //This is the URL of your Panopto site
          //https://sku.ap.panopto.com/Panopto/Pages/Auth/Login.aspx?support=true
          serverName: 'sku.ap.panopto.com',
          sessionId: currentPaonoptoSessionId,
          videoParams: {
            // Optional parameters
            //interactivity parameter controls whether the user will see table of contents, discussions, notes, and in-video search
            interactivity: 'none',
            showtitle: 'false',
            showBrand: 'true',
            offerviewer: 'false',
          },
          events: {
            onIframeReady: onPanoptoIframeReady,
            onLoginShown: onPanoptoLoginShown,
            //"onReady": onPanoptoVideoReady,
            onStateChange: onPanoptoStateUpdate,
          },
        });
        setEmbedApi(embedApi);
      }
    }, 'LectureVideoView');

    return () => {
      cleanUpPanoptoIframe();
    };
  }, []);

  useEffect(()=>{ 
    
    if(getLectureStructure() && getLectureStructure()?.cubes) {
      const cubeIndex = getLectureStructure()?.cubes.findIndex(cube=> cube.cubeId == params?.contentId)||0;
      const cubesLength = getLectureStructure()?.cubes.length;

      const cubeNextIndex = cubeIndex+1;

      if(getLectureConfirmProgress()?.learningState == 'Passed' && cubeNextIndex && cubesLength && (cubeNextIndex < cubesLength)){
        setNextContentsPath(getLectureStructure()?.cubes[cubeIndex + 1].path);
        setNextContentsName(getLectureStructure()?.cubes[cubeIndex + 1].name);
      }
    }
  }, [getLectureStructure(),getLectureConfirmProgress()]);

  return (
    <div className="audio-container">
      {panoptoState == 0 && !isActive && nextContentsPath && getLectureConfirmProgress()?.learningState == 'Passed' && (      
        <div className="video-overlay">
          <div className="video-overlay-btn">
            <button onClick={() => nextContents(nextContentsPath)}>
              <img src={playerBtn} />
            </button>
          </div>
          <div className="video-overlay-text">
            <p>다음 학습 이어하기</p>
            <h3>{nextContentsName}</h3>
          </div>
        </div>
      )}
      <div id="panopto-embed-audio-player" className="l-audio"/>
    </div>
  );
};

export default LectureAudioView;
