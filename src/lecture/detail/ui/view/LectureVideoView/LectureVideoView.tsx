/*eslint-disable*/

import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  reactAlert,
  getCookie,
  setCookie,
  deleteCookie,
} from '@nara.platform/accent';
import { getLectureTranscripts } from 'lecture/detail/store/LectureTranscriptStore';
import {
  getLectureMedia,
  onLectureMedia,
} from 'lecture/detail/store/LectureMediaStore';
import { patronInfo } from '@nara.platform/dock';
import { TIMEOUT } from 'dns';
import { useLectureWatchLog } from 'lecture/detail/service/useLectureMedia/useLectureWatchLog';
import { useLectureRouterParams } from 'lecture/detail/service/useLectureRouterParams';
import WatchLog from 'lecture/detail/model/Watchlog';
import { getLectureWatchLogs } from 'lecture/detail/store/LectureWatchLogsStore';
import { getLectureWatchLogSumViewCount } from 'lecture/detail/store/LectureWatchLogSumViewCountStore';
import {
  setLectureConfirmProgress,
  getLectureConfirmProgress,
} from 'lecture/detail/store/LectureConfirmProgressStore';
import LectureRouterParams from 'lecture/detail/viewModel/LectureRouterParams';
import moment from 'moment';
import { getLectureStructure } from 'lecture/detail/store/LectureStructureStore';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { getPublicUrl } from 'shared/helper/envHelper';
import LectureParams from '../../../viewModel/LectureParams';
import { requestLectureStructure } from '../../logic/LectureStructureContainer';
import {
  setLectureState,
  getLectureState,
} from 'lecture/detail/store/LectureStateStore';
import {
  LectureStructureCourseItem,
  LectureStructureCubeItem,
  LectureStructureDiscussionItem,
} from 'lecture/detail/viewModel/LectureStructure';
import MyTrainingService from '../../../../../myTraining/present/logic/MyTrainingService';

const playerBtn = `${getPublicUrl()}/images/all/btn-player-next.png`;

//샘플 페이지 : http://local.mysuni.sk.com:3000/lecture/cineroom/ne1-m2-c2/college/CLG00003/cube/CUBE-2jy/lecture-card/LECTURE-CARD-274
//             http://local.mysuni.sk.com:3000/lecture/cineroom/ne1-m2-c2/college/CLG00003/cube/CUBE-2ka/lecture-card/LECTURE-CARD-27z
//             http://local.mysuni.sk.com:3000/lecture/cineroom/ne1-m2-c2/college/CLG00001/cube/CUBE-2kh/lecture-card/LECTURE-CARD-283
// http://ma.mysuni.sk.com/suni-main/lecture/cineroom/ne1-m2-c2/college/CLG00001/course-plan/COURSE-PLAN-f6/Course/C-LECTURE-8j/cube/CUBE-2ni/LECTURE-CARD-9zu
interface LectureVideoViewProps {
  params: LectureRouterParams | undefined;
  checkStudent: (params: LectureRouterParams) => void;
}

//FIXME SSO 로그인된 상태가 아니면 동작 안 함.
const LectureVideoView: React.FC<LectureVideoViewProps> = function LectureVideoView({
  params,
  checkStudent,
}) {
  const [isStateUpated, setIsStateUpated] = useState<boolean>(false);
  const [isUnmounted, setIsUnmounted] = useState<boolean>(false);
  const { pathname } = useLocation();
  const playIntervalRef = useRef<any>(0);
  const checkIntervalRef = useRef<any>(0);
  const transcriptIntervalRef = useRef<any>(0);

  useEffect(() => {
    // all cleare interval
    return () => {
      clearInterval(playIntervalRef.current);
      clearInterval(checkIntervalRef.current);
      clearInterval(transcriptIntervalRef.current);
      setPanoptoState(0);
    };
  }, [pathname]);

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
  const [nextContentsPath, setNextContentsPath] = useState<string>();
  const [nextContentsName, setNextContentsName] = useState<string>();
  const [nextContentsView, setNextContentsView] = useState<boolean>(false);
  const [panoptoState, setPanoptoState] = useState<number>(0);
  const [transciptHighlight, setTransciptHighlight] = useState<string>();

  useEffect(() => {
    const watchlog: WatchLog = {
      patronKeyString: patronInfo.getDenizenId() || '',
      start: 0,
      end: 0,
      lectureUsid: params?.lectureId || '',
    };
    setWatchlogState(watchlog);
  }, [params]);

  const [isActive, setIsActive] = useState(false);
  
  const [startTime, setStartTime] = useState(0);

  const [embedApi, setEmbedApi] = useState<any | undefined>({
    pauseVideo: () => {},
    seekTo: (index: number) => {},
    getCurrentTime: () => {},
    getDuration: () => {},
    currentPosition: () => {},
    getPlaybackRate: () => {},
  });

  const [displayTranscript, setDisplayTranscript] = useState<boolean>(false);

  const onPanoptoIframeReady = () => {
    // The iframe is ready and the video is not yet loaded (on the splash screen)
    // Load video will begin playback
    //embedApi.loadVideo();//페이지 로드 시 자동 실행됩니다.
  };

  const onPanoptoLoginShown = () => {
    //로그인 페이지가 안 떠 있는 경우 바로 Clear 시켜서 반복 호출을 막아야 합니다.
    // cleanUpPanoptoIframe();
  };

  const history = useHistory();
  // 멀티 시청 제한
  function onDoLearn(params: LectureRouterParams | undefined): void {
    // 20200717 video 멀티 시청불가~! = return true
    // if (handleMultiVideo(lectureView)) {
    // if (handleMultiVideo(params)) {
    //   reactAlert({
    //     title: '알림',
    //     message:
    //       '현재 다른 과정을 학습하고 있습니다.<br>가급적 기존 학습을 완료한 후 학습해 주시기 바랍니다.'
    //   });
    // }
  }

  function handleMultiVideo(params: LectureRouterParams | undefined) {
    function nvl(str: any, dvalue: any) {
      if (typeof str === 'undefined' || str === null || str === '') {
        str = dvalue;
      }
      return str;
    }
    const lectureCardId = params?.lectureId;
    const liveLectureCardId = getCookie('liveLectureCardId');
    const term = nvl(getCookie('liveLectureCardIdTime'), 0);
    let rtnLive = false;
    const after2Min = new Date();
    after2Min.setMinutes(after2Min.getMinutes() + 2);
    const nowTime = new Date().getTime();

    if (
      nvl(liveLectureCardId, 0) === 0 ||
      liveLectureCardId === lectureCardId ||
      (liveLectureCardId !== lectureCardId && term < nowTime)
    ) {
      deleteCookie('liveLectureCardId');
      deleteCookie('liveLectureCardIdTime');
      setCookie('liveLectureCardId', lectureCardId);
      setCookie('liveLectureCardIdTime', after2Min.getTime().toString());
    } else {
      rtnLive = true;
    }
    return rtnLive;
  }

  const nextContents = useCallback((path: string) => {
    setLectureConfirmProgress();
    setNextContentsView(false);
    history.push(path);
  }, []);

  const onPanoptoStateUpdate = useCallback(
    async (state: number) => {
      setPanoptoState(state);
      setIsActive(false);
      if (state == 1) {
        setIsActive(true);
        setNextContentsView(false);
        if (!isStateUpated) {
          setIsStateUpated(true);
          sessionStorage.removeItem('inProgressTableViews');
          sessionStorage.removeItem('InProgressLearningList');
        }
      } else if (state == 0) {
        // setNextContentsView(true);
      }
    },
    [params, isStateUpated]
  );

  const registCheckStudent = useCallback(
    async (params: LectureRouterParams | undefined) => {
      if (params) {
        await checkStudent(params);
        // useLectureState();
      }
    },
    [params]
  );

  const mediaCheckEvent = useCallback(
    async (params: LectureRouterParams | undefined) => {
      if (params) {
        await confirmProgress(params);
        requestLectureStructure(lectureParams, pathname);
      }
    },
    [params]
  );

  useEffect(() => {
    if (params) {
      setNextContentsView(false);
      //중복 동영상 체크
      onDoLearn(params);
    }
    return () => {
      const liveLectureCardId = getCookie('liveLectureCardId');
      if (params?.lectureId === liveLectureCardId) {
        deleteCookie('liveLectureCardId');
        deleteCookie('liveLectureCardIdTime');
      }
    };
  }, [params]);

  const lectureParams = useParams<LectureParams>();

  useEffect(() => {
    setNextContentsView(false);
    //동영상 종료
    if (panoptoState == 0 || panoptoState == 2) {
      mediaCheckEvent(params);
      if (
        Math.floor((embedApi.getCurrentTime() as unknown) as number) ==
        Math.floor((embedApi.getDuration() as unknown) as number)
      ) {
        setNextContentsView(true);
      }
    }
    //동영상 시작시 student 정보 확인 및 등록
    if (panoptoState == 1) {
      registCheckStudent(params);
      mediaCheckEvent(params);
    }
  }, [panoptoState]);


  useEffect(() => {
    let interval: any = null;
    const currentTime = (embedApi.getCurrentTime() as unknown) as number;
    const duration = (embedApi.getDuration() as unknown) as number;

    if (!startTime) {
      setStartTime(currentTime);
    }
    if (isActive && params && watchlogState) {
      // clearInterval(interval);      
      interval = setInterval(() => {
        const playbackRate = (embedApi.getPlaybackRate() as unknown) as number;

        // end 가 start보다 작은 경우 or start 보다 end가 20 이상 큰 경우(2배속 10초의 경우 20 이라 21 기준으로 변경함)
        const end = (embedApi.getCurrentTime() as unknown) as number;
        const start =
          startTime > end || end - startTime > 21
            ? end - 10 * playbackRate
            : startTime;

        setWatchlogState({
          ...watchlogState,
          start: start < 0 ? 0 : start,
          end: end,
        });

        //TODO : WatchLog 호출시 불필요한 Cube 호출 제거 예정
        setWatchLog(params, watchlogState);
        setStartTime((embedApi.getCurrentTime() as unknown) as number);
        if (
          duration - ((embedApi.getCurrentTime() as unknown) as number) <
          20
        ) {
          setNextContentsView(true);
        }
      }, 10000);
      playIntervalRef.current = interval;
    } else if (!isActive) {
      // sendWatchLog();
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [
    isActive,
    // lectureParams,
    // pathname,
    params,
    embedApi,
    startTime,
    // watchlogState,
  ]);

  useEffect(() => {
    let intervalTranscript: any = null;

    if (isActive && params && watchlogState) {
      clearInterval(intervalTranscript);
      intervalTranscript = setInterval(() => {
        const currentTime = (embedApi.getCurrentTime() as unknown) as number;

        if (!startTime) {
          setStartTime(currentTime);
        }

        //시간 2 초마다 체크해서 자막 스크롤 이동 및 하이라이트 넣기
        let array: any = [];
        getLectureTranscripts()?.map((lectureTranscript, key) => {
          array.push({
            startTime:
              parseInt(lectureTranscript.startTime.substr(0, 2), 10) * 60 * 60 +
              parseInt(lectureTranscript.startTime.substr(2, 2), 10) * 60 +
              parseInt(lectureTranscript.startTime.substr(4, 2), 10),
            endTime:
              parseInt(lectureTranscript.endTime.substr(0, 2), 10) * 60 * 60 +
              parseInt(lectureTranscript.endTime.substr(2, 2), 10) * 60 +
              parseInt(lectureTranscript.endTime.substr(4, 2), 10),
            idx: lectureTranscript.idx,
          });
        });
        array.map((item: any, key: number) => {
          if (item.startTime < currentTime) {
            if (currentTime < item.endTime) {
              const currentScript = document.getElementById(item.idx);
              setTransciptHighlight(item.idx);
              if (currentScript !== null) {
                scrollMove(item.idx);
              }
            }
          }
        });
      }, 2000);
    }else if (!isActive) {
      // sendWatchLog();
      clearInterval(intervalTranscript);
      transcriptIntervalRef.current = intervalTranscript;
    }
    return () => {
      clearInterval(intervalTranscript);
    };
  }, [
    isActive,
    lectureParams,
    pathname,
    params,
    embedApi,
    startTime,
    watchlogState,
  ]);

  useEffect(() => {
    let checkInterval: any = null;
    const duration = (embedApi.getDuration() as unknown) as number;
    let confirmProgressTime = (duration / 20) * 1000;

    if (!confirmProgressTime || confirmProgressTime < 30000) {
      confirmProgressTime = 30000;
    }

    if (isActive && params) {
      // setCheckInterval(setInterval(() => {
      checkInterval = setInterval(() => {
        mediaCheckEvent(params);
        // }, 20000));
      }, confirmProgressTime);
      checkIntervalRef.current = checkInterval;
    } else if (!isActive) {
      clearInterval(checkInterval);
    }
    return () => {
      clearInterval(checkInterval);
    };
  }, [params, isActive]);

  // useEffect(() => {
  //   return () => {
  //     console.log('page out clear Interval ');
  //     clearInterval(watchInterval);
  //     clearInterval(checkInterval);
  //   };
  // }, [checkInterval, watchInterval]);

  useEffect(() => {
    setNextContentsView(false);
    return () => {
      mediaCheckEvent(params);
      setPanoptoState(10);
      setNextContentsPath('');
      setNextContentsName('');
      setIsActive(false);
      setNextContentsView(false);
      setEmbedApi('');
      setLectureConfirmProgress();
    };
  }, []);

  useEffect(() => {
    // TODO : getNextOrderContent API 개발 후 다음 컨텐츠만 조회 해오도록 변경 필요함
    const lectureStructure = getLectureStructure();
    setNextContentsPath('');
    if (lectureStructure) {
      if (lectureStructure.course?.type == 'COURSE') {
        //일반 코스 로직

        lectureStructure.items.map(item => {
          if (item.type === 'CUBE') {
            if (lectureStructure.cubes) {
              const currentCube = lectureStructure.cubes.find(
                cube => cube.cubeId == params?.contentId
              );

              if (currentCube) {
                const nextCubeOrder = currentCube.order + 1;

                const nextCube = lectureStructure.cubes.find(
                  cube => cube.order == nextCubeOrder
                );

                if (nextCube) {
                  setNextContentsPath(nextCube.path);
                  setNextContentsName(nextCube.name);
                }

                //토론하기 항목이 있는 경우
                const nextDiscussion = lectureStructure.discussions.find(
                  discussion => discussion.order == nextCubeOrder
                );

                if (nextDiscussion) {
                  setNextContentsPath(nextDiscussion.path);
                  setNextContentsName('[토론하기]'.concat(nextDiscussion.name));
                }
              }
            }
          }
          return null;
        });
      } else if (lectureStructure.course?.type == 'PROGRAM') {
        lectureStructure.items.map(item => {
          if (item.type === 'COURSE') {
            const course = item as LectureStructureCourseItem;
            if (course.cubes) {
              const currentCube = course.cubes.find(
                cube => cube.cubeId == params?.contentId
              );

              if (currentCube) {
                const nextCubeOrder = currentCube.order + 1;

                const nextCube = course.cubes.find(
                  cube => cube.order == nextCubeOrder
                );
                if (nextCube) {
                  setNextContentsPath(nextCube.path);
                  setNextContentsName(nextCube.name);
                }

                //토론하기 항목이 있는 경우
                const nextDiscussion = course.discussions?.find(
                  discussion => discussion.order == nextCubeOrder
                );

                if (nextDiscussion) {
                  setNextContentsPath(nextDiscussion.path);
                  setNextContentsName('[토론하기]'.concat(nextDiscussion.name));
                }
              }
            }
          }
          if (item.type === 'CUBE') {
            if (lectureStructure.cubes) {
              const currentCube = lectureStructure.cubes.find(
                cube => cube.cubeId == params?.contentId
              );

              if (currentCube) {
                const nextCubeOrder = currentCube.order + 1;

                const nextCube = lectureStructure.cubes.find(
                  cube => cube.order == nextCubeOrder
                );

                if (nextCube) {
                  setNextContentsPath(nextCube.path);
                  setNextContentsName(nextCube.name);
                }

                //토론하기 항목이 있는 경우
                const nextDiscussion = lectureStructure.discussions.find(
                  discussion => discussion.order == nextCubeOrder
                );
                if (nextDiscussion) {
                  setNextContentsPath(nextDiscussion.path);
                  setNextContentsName('[토론하기]'.concat(nextDiscussion.name));
                }
              }
            }
          }
          return null;
        });
      }
    }
  }, [getLectureStructure(), getLectureConfirmProgress(), params]);

  const cleanUpPanoptoIframe = () => {
    let playerEl = document.getElementById('panopto-embed-player');
    if (playerEl) playerEl.innerHTML = '';
  };

  const seekByIndex = (index: number) => {
    if (embedApi && index >= 0) {
      //TODO current state 를 찾아서 Play 이
      embedApi.seekTo(index);
    }
  };

  const scrollMove = (id: any) => {
    const target = document.getElementById(id);
    const parent = document.getElementById('tanscript-scroll');
    //스크롤 높이 더해주면 된다
    const scrollHeight = document.getElementById('tanscript-scroll')?.scrollTop;
    const distanceBetweenParentAndChild =
      target!.getBoundingClientRect().top -
      parent!.getBoundingClientRect().top +
      scrollHeight!;
    document
      .getElementById('tanscript-scroll')!
      .scrollTo(0, distanceBetweenParentAndChild);
  };

  const highlight = (id: string) => {
    if (transciptHighlight === id) {
      return 'l-current';
    } else {
      return '';
    }
  };

  useEffect(() => {
    onLectureMedia(lectureMedia => {
      cleanUpPanoptoIframe(); //기존에 어떤 상태이건 초기화
      if (
        lectureMedia &&
        (lectureMedia.mediaType == 'InternalMedia' ||
          lectureMedia.mediaType == 'InternalMediaUpload')
      ) {
        let currentPaonoptoSessionId =
          lectureMedia.mediaContents.internalMedias[0].panoptoSessionId || '';
        let embedApi = new window.EmbedApi('panopto-embed-player', {
          width: '100%',
          height: '700',
          //This is the URL of your Panopto site
          //https://sku.ap.panopto.com/Panopto/Pages/Auth/Login.aspx?support=true
          // serverName: 'sku.ap.panopto.com/Panopto/Pages/BrowserNotSupported.aspx?ReturnUrl=',
          serverName: 'sku.ap.panopto.com',
          sessionId: currentPaonoptoSessionId,
          // sessionId : "6421c40f-46b6-498a-b715-ac28004cf29e",   //테스트 용 sessionId
          videoParams: {
            // Optional parameters
            //interactivity parameter controls whether the user will see table of contents, discussions, notes, and in-video search
            // "interactivity": "Caption Language",
            interactivity: 'none',
            showtitle: 'false',
            showBrand: 'false',
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

  // IE 조건처리 주석

  // const [detected, setDetected] = useState(false);
  // useEffect(() => {
  //   const userAgent = navigator.userAgent;
  //   if(userAgent.includes('rv:11.0')){
  //     setDetected(true)
  //     console.log(userAgent.includes('rv:11.0'))
  //   }
  // })

  return (
    <div className="course-video">
      <div className="video-container">
        {/* {
          detected && detected ?
          // IE 11 Render
          <iframe style={{width:"100%", height:"700px"}} src="https://sku.ap.panopto.com/Panopto/Pages/BrowserNotSupported.aspx?ReturnUrl=%2fPanopto%2fPages%2fEmbed.aspx%3fid%3dc9304a0b-69a5-4511-8261-ac63007bebda%26remoteEmbed%3dtrue%26remoteHost%3dhttp%253A%252F%252Funiversity.sk.com%26interactivity%3dnone%26showtitle%3dfalse%26showBrand%3dtrue%26offerviewer%3dfalse&continue=true"></iframe>
          :
          // 나머지 브라우저
          <div id="panopto-embed-player"></div>
        }  */}
        <div id="panopto-embed-player"></div>
        {/* video-overlay 에 "none"클래스 추가 시 영역 안보이기 */}
        {nextContentsView &&
          // !isActive &&
          nextContentsPath &&
          getLectureConfirmProgress()?.learningState == 'Passed' && (
            <div id="video-overlay" className="video-overlay">
              <div className="video-overlay-btn">
                <button onClick={() => nextContents(nextContentsPath)}>
                  <img src={playerBtn} />
                </button>
              </div>
              {/* <Link to={nextContentsPath||''} onClick={() => clearState()}> */}
              {/* <Link to={nextContentsPath||''}> */}
              <div className="video-overlay-text">
                <p>다음 학습 이어하기</p>
                <h3>{nextContentsName}</h3>
              </div>
              {/* </Link> */}
            </div>
          )}
      </div>
      {getLectureTranscripts() &&
        getLectureMedia() &&
        (getLectureMedia()?.mediaType == 'InternalMedia' ||
          getLectureMedia()?.mediaType == 'InternalMediaUpload') &&
        (getLectureTranscripts()?.length || 0) > 0 &&
        displayTranscript &&
        false && (
          <>
            <button
              className="ui icon button right btn-blue"
              onClick={() => setDisplayTranscript(false)}
            >
              Close Transcript
              <i aria-hidden="true" className="icon icon morelink" />
            </button>
            <div className="course-video-tanscript" id="tanscript-scroll">
              <div className="course-video-scroll">
                {getLectureTranscripts()?.map(lectureTranscript => {
                  return (
                    <>
                      <strong
                        id={lectureTranscript.idx + ''}
                        style={{ cursor: 'pointer' }}
                        className={highlight(lectureTranscript.idx + '')}
                        onClick={() => {
                          // seekByIndex(lectureTranscript.idx);
                          seekByIndex(
                            parseInt(
                              lectureTranscript.startTime.substr(0, 2),
                              10
                            ) *
                              60 *
                              60 +
                              parseInt(
                                lectureTranscript.startTime.substr(2, 2),
                                10
                              ) *
                                60 +
                              parseInt(
                                lectureTranscript.startTime.substr(4, 2),
                                10
                              )
                          );
                        }}
                      >
                        {lectureTranscript.startTime
                          .substr(0, 2)
                          .concat(':')
                          .concat(lectureTranscript.startTime.substr(2, 2))
                          .concat(':')
                          .concat(lectureTranscript.startTime.substr(4, 2))}
                      </strong>
                      <p>{lectureTranscript.text}</p>
                    </>
                  );
                })}
              </div>
            </div>
          </>
        )}
      {getLectureTranscripts()?.length !== 0 && !displayTranscript && false && (
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
