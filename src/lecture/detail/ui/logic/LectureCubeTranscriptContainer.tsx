import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Select, Icon, Button, Popup } from "semantic-ui-react";

// Store
import { getLectureMedia } from 'lecture/detail/store/LectureMediaStore';
import { getEmbed, setEmbed } from 'lecture/detail/store/EmbedStore';

// Service
import { downloadTranscript } from '../../service/useTranscript/utility/useTranscript';
import { findTranscript } from '../../service/useTranscript/utility/useTranscript';
import Transcript from 'lecture/detail/model/Transcript';
import LectureTimeSummary from 'personalcube/personalcube/model/LectureTimeSummary';

// import WatchLog from 'lecture/detail/model/Watchlog';
// import LectureParams from '../../viewModel/LectureParams';
// import {
//   useLocation,
//   useParams,
// } from 'react-router-dom';

const style = {
    borderRadius: '0.375rem',
    textAlign:'center',
    fontSize:'0.875rem',
    border:'1px solid #aaaaaa',
    color:'#4c4c4c',
}

interface LectureTranscriptContainerProps {
  transLangVal:string,
  setTransLangVal:any
}

const LectureTranscriptContainer:React.FC<LectureTranscriptContainerProps> = function LectureTranscriptContainer({
  transLangVal,
  setTransLangVal
}) {
    
    const selectTransLangObj = [
      { key: "ko", value: "ko", text: "KR" },
      { key: "eng", value: "en", text: "ENG" },
      { key: "chn", value: "cn", text: "CHN" },
    ];

    const ERROR_RANGE = 1.5;  // getCurrentTime으로 동영상 시간을 받을 때 0.n초의 오차가 발생 할 때가 있어서 오차 범위 지정

    const [ transcriptList, setTranScriptList ] = useState<any>();
    const [ panoptoSessionId, setPanoptoSessionId ] = useState<string | undefined>(getLectureMedia()?.mediaContents.internalMedias[0].panoptoSessionId);
    const [ isActive, setIsActive ] = useState<boolean>(false);
    const [ selectedRow, setSelectedRow ] = useState<Transcript>();

    const interval = useRef<any>(null);
    const waitUntilPlayInterval = useRef<any>(null);
    const toggleScriptActiveFunc = useRef<any>(null);
    const isValidate = useRef<boolean>(false);

    // 특정 위치로 재생 위치 이동
    const seekByIndex = (startIndex: number, endIndex: number) => {
        getEmbed().loadVideo();
        if (getEmbed() && startIndex >= 0) {
          //TODO current state 를 찾아서 Play
          getEmbed().playVideo();

          // 동영상 로딩 후 seekTo 하기 위해
          waitUntilPlayInterval.current = setInterval(() => {
            if(getEmbed().isPaused === false) {
              getEmbed().seekTo(startIndex);

              if(
                    getEmbed().getCurrentTime() < startIndex  // 현재 동영상 시간이 대본 시작 시간보다 작은 경우
                ||  (getEmbed().getCurrentTime() > (startIndex + ERROR_RANGE) && getEmbed().getCurrentTime() < endIndex)  // 현재 동영상 시간이 대본 시작 시간이 아닐 때
                ||  getEmbed().getCurrentTime() > endIndex) {   // 현재 동영상 시간이 대본 종료 시간보다 클 때
                  
                // 잘못 된 동영상 시간을 가져오는 경우가 있어서 다시 seekTo
                getEmbed().seekTo(startIndex); 
              } else {
                clearInterval(waitUntilPlayInterval.current); 
              }              
            }
          }, 100);
                            
        }
    };

    // 동영상 플레이어 시간 형식으로 변환
    const convertStringTimeToNumber = (time : string = "0") => {
      return parseInt(time.substr(0, 2), 10) * 60 * 60 + parseInt(time.substr(2, 2), 10) * 60 + parseInt(time.substr(4, 2), 10);
    }


    // 대본 Row highlight toggle
    toggleScriptActiveFunc.current = (scriptObj : any) => {
       setTranScriptList(
         transcriptList.map((item : any) => { 
           return scriptObj?.idx === item.idx ? 
             { activate : !item.activate, deliveryId : item.deliveryId, endTime : item.endTime, idx : item.idx, local : item.local, startTime : item.startTime, text : item.text } 
             : 
             { activate : false, deliveryId : item.deliveryId, endTime : item.endTime, idx : item.idx, local : item.local, startTime : item.startTime, text : item.text } 
         })
       );
    }

    const intervalAction = () => {
      let curVideoTime = 0;
      let curRowStTime = 0;
      let curRowEdTime = 0;

      interval.current = setInterval(() => {
        curVideoTime = getEmbed().getCurrentTime(); // 현재 동영상 초
        curRowStTime = convertStringTimeToNumber(selectedRow?.startTime); // 선택 한 대본 시작 초
        curRowEdTime = convertStringTimeToNumber(selectedRow?.endTime);   // 선택 한 대본 종료 초

        if(isActive) {
          if(!isValidate.current) { // 현재 동영상이 seekTo에 의해 선택 한 대본의 시작 지점으로 왔는지 체크
            if(
                  curVideoTime === curRowStTime
              ||  (curVideoTime <= (curRowStTime + ERROR_RANGE) && curVideoTime >= curRowStTime)) {
              isValidate.current = true;
            }
          } else if(getEmbed().getCurrentTime() >= curRowEdTime) {
            toggleScriptActiveFunc.current(selectedRow);
            initialize();
          } 
        } else {
          initialize();
        }
      }, 200);
    }

    // 동영상 상태 변경 시 callback
    getEmbed().onStateChange = () => {
      clearInterval(interval.current);

      if(getEmbed().isPaused === true) {
        clearInterval(interval.current);
      } else {
        intervalAction();
      }
    }

    // 대본 선택 관련 초기화
    const initialize = () => {
      setSelectedRow(undefined);
      setIsActive(false);
      clearInterval(interval.current);
      clearInterval(waitUntilPlayInterval.current); 
      interval.current = null;
      isValidate.current = false;
    }

    useEffect(() => {
      return () => {
        initialize();
        setPanoptoSessionId(''); 
      }
    }, [])

    useEffect(() => {
      setPanoptoSessionId(getLectureMedia()?.mediaContents.internalMedias[0].panoptoSessionId);
    });

    useEffect(() => {
      // 언어를 바꿨을 때 초기화
      initialize();

      const getTranScriptsFunc = async () => {
        
        if(panoptoSessionId !== undefined) {
          // '0002939c-8307-4dd2-8f5c-abec0022d4fc'
          const transcriptsItem = await findTranscript(panoptoSessionId, transLangVal);          

          transcriptsItem?.map((item) => {
            item.active = false;
          });

          setTranScriptList(transcriptsItem);
        }        
      };

      getTranScriptsFunc();     
    }, [transLangVal, panoptoSessionId]);

    // 대본 선택 여부에 따른 처리
    useEffect(() => {
      clearInterval(interval.current);
      intervalAction();

      return () => clearInterval(interval.current);
    }, [selectedRow]);

    return(
        <>
            <div className="transcript-box" id="tanscript-scroll">
              <div className="transcript-top">
                <Select
                  placeholder="분류를 선택해주세요"
                  className="ui small-border dropdown m0"
                  defaultValue={transLangVal}
                  options={selectTransLangObj}
                  onChange={(e : any, data : any) => {setTransLangVal(data.value)}}
                />
                <div>
                  <Popup
                    trigger={<Button icon="tooltip" />}
                    style={style}
                    position="bottom center"
                    wide
                  >
                      <p>현재 선택된 언어의 Transcript를 <br/> txt 파일로 다운로드 받으실 수 있습니다.</p>
                  </Popup>
                  <button className="ui icon button left post delete-kr"
                    onClick={() => { 
                      if(transcriptList !== undefined) {
                       downloadTranscript(transcriptList, getLectureMedia()?.mediaContents.internalMedias[0].name);  
                      }                      
                    }}
                  >
                    <Icon className="icon-down-type5" />
                    Download
                  </button>
                </div>
              </div>
               {transcriptList?.map((lectureTranscript : any) => {
                 
                 return (
                   <>
                      <p id={'tranScriptRow'+lectureTranscript.idx}
                        key={lectureTranscript.idx}
                        className={lectureTranscript.activate ? "transcript-active" : "transcript-hover"} 
                        onClick={() => {
                          // 대본 선택 시 해당 ROW 값 활성화 여부 toggle 및 값 저장
                          if(selectedRow === undefined || selectedRow.idx !== lectureTranscript.idx) {
                            setIsActive(true);
                            setSelectedRow(lectureTranscript);
                          } else if(selectedRow.idx === lectureTranscript.idx) {
                            setIsActive(false);
                            setSelectedRow(undefined);
                          }

                          seekByIndex(convertStringTimeToNumber(lectureTranscript.startTime), convertStringTimeToNumber(lectureTranscript.endTime));
                          
                          // 대본 선택 시 해당 ROW CSS 변경
                          toggleScriptActiveFunc.current(lectureTranscript);
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        
                        {lectureTranscript.text}
                        
                      </p>
                   </>      
                 );
               })}
            </div>   
        </>
    );



    // const highlight = (id: string) => {
    //     if (transciptHighlight === id) {
    //     return 'l-current';
    //     } else {
    //     return '';
    //     }
    // };

    // const [transciptHighlight, setTransciptHighlight] = useState<string>();
    // const [isActive, setIsActive] = useState(false);
    // const [startTime, setStartTime] = useState(0);
    // const [watchlogState, setWatchlogState] = useState<WatchLog>();
    // const transcriptIntervalRef = useRef<any>(0);
    // const lectureParams = useParams<LectureParams>();
    // const { pathname } = useLocation();
    // const scrollMove = (id: any) => {
    //     const target = document.getElementById(id);
    //     const parent = document.getElementById('tanscript-scroll');
    //     //스크롤 높이 더해주면 된다
    //     const scrollHeight = document.getElementById('tanscript-scroll')?.scrollTop;
    //     const distanceBetweenParentAndChild =
    //     target!.getBoundingClientRect().top -
    //     parent!.getBoundingClientRect().top +
    //     scrollHeight!;
    //     document
    //     .getElementById('tanscript-scroll')!
    //     .scrollTo(0, distanceBetweenParentAndChild);
    // };

    // useEffect(() => {
    //     let intervalTranscript: any = null;

    //     if (isActive && params && watchlogState) {
    //     clearInterval(intervalTranscript);
    //     intervalTranscript = setInterval(() => {
    //         const currentTime = (embedApi.getCurrentTime() as unknown) as number;

    //         if (!startTime) {
    //         setStartTime(currentTime);
    //         }

    //         //시간 2 초마다 체크해서 자막 스크롤 이동 및 하이라이트 넣기
    //         const array: any = [];
    //         getLectureTranscripts()?.map((lectureTranscript, key) => {
    //         array.push({
    //             startTime:
    //             parseInt(lectureTranscript.startTime.substr(0, 2), 10) * 60 * 60 +
    //             parseInt(lectureTranscript.startTime.substr(2, 2), 10) * 60 +
    //             parseInt(lectureTranscript.startTime.substr(4, 2), 10),
    //             endTime:
    //             parseInt(lectureTranscript.endTime.substr(0, 2), 10) * 60 * 60 +
    //             parseInt(lectureTranscript.endTime.substr(2, 2), 10) * 60 +
    //             parseInt(lectureTranscript.endTime.substr(4, 2), 10),
    //             idx: lectureTranscript.idx,
    //         });
    //         });
    //         array.map((item: any, key: number) => {
    //         if (item.startTime < currentTime) {
    //             if (currentTime < item.endTime) {
    //             const currentScript = document.getElementById(item.idx);
    //             setTransciptHighlight(item.idx);
    //             if (currentScript !== null) {
    //                 scrollMove(item.idx);
    //             }
    //             }
    //         }
    //         });
    //     }, 2000);
    //     transcriptIntervalRef.current = intervalTranscript;
    //     }
    //     return () => {
    //     clearInterval(intervalTranscript);
    //     };
    // }, [
    //     isActive,
    //     lectureParams,
    //     pathname,
    //     params,
    //     embedApi,
    //     startTime,
    //     watchlogState,
    // ]);

    // <strong        
    //                    id={lectureTranscript.idx + ''}
    //                    style={{ cursor: 'pointer' }}
    //                    className={highlight(lectureTranscript.idx + '')}
    //                    onClick={() => {
    //                      // seekByIndex(lectureTranscript.idx);
    //                      seekByIndex(
    //                        parseInt(
    //                          lectureTranscript.startTime.substr(0, 2),
    //                          10
    //                        ) *
    //                          60 *
    //                          60 +
    //                          parseInt(
    //                            lectureTranscript.startTime.substr(2, 2),
    //                            10
    //                          ) *
    //                            60 +
    //                          parseInt(
    //                            lectureTranscript.startTime.substr(4, 2),
    //                            10
    //                          )
    //                      );
    //                    }}
    //                  >
    //                    {lectureTranscript.startTime
    //                      .substr(0, 2)
    //                      .concat(':')
    //                      .concat(lectureTranscript.startTime.substr(2, 2))
    //                      .concat(':')
    //                      .concat(lectureTranscript.startTime.substr(4, 2))}
    //                 </strong> 
}

export default LectureTranscriptContainer;