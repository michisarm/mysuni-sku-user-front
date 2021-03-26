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

    const [ transcriptList, setTranScriptList ] = useState<any>();
    const [ panoptoSessionId, setPanoptoSessionId ] = useState<string | undefined>(getLectureMedia()?.mediaContents.internalMedias[0].panoptoSessionId);
    const [ isActive, setIsActive ] = useState<boolean>(false);
    const [ selectedRow, setSelectedRow ] = useState<Transcript>();

    const interval = useRef<any>(null);
    const toggleScriptActiveFunc = useRef<any>(null);
    const isValidate = useRef<boolean>(false);

    // 특정 위치로 재생 위치 이동
    const seekByIndex = (index: number) => {
        getEmbed().loadVideo();
        if (getEmbed() && index >= 0) {
          //TODO current state 를 찾아서 Play
          getEmbed().seekTo(index);
          getEmbed().playVideo();        
        }
    };

    // 동영상 플레이어 시간 형식으로 변환
    const convertStringTimeToNumber = (time : string = "0") => {
      return parseInt(time.substr(0, 2), 10) * 60 * 60 + parseInt(time.substr(2, 2), 10) * 60 + parseInt(time.substr(4, 2), 10);
    }


    // interval 안에서 현재 Transcript 객체를 참조 하기 위해서
    toggleScriptActiveFunc.current = () => {
       setTranScriptList(
         transcriptList.map((item : any) => { 
           return selectedRow?.idx === item.idx ? 
             { activate : !item.activate, deliveryId : item.deliveryId, endTime : item.endTime, idx : item.idx, local : item.local, startTime : item.startTime, text : item.text } 
             : 
             { activate : false, deliveryId : item.deliveryId, endTime : item.endTime, idx : item.idx, local : item.local, startTime : item.startTime, text : item.text } 
         })
       );
    }

    const intervalAction = () => {
      interval.current = setInterval(() => {
        if(getEmbed().isPaused === false) {
          if(isActive) {
            if(!isValidate.current) {
              if(getEmbed().getCurrentTime() === convertStringTimeToNumber(selectedRow?.startTime)) {
                isValidate.current = true;
              }
            } else if(getEmbed().getCurrentTime() >= convertStringTimeToNumber(selectedRow?.endTime)) {
              setIsActive(false);
              setSelectedRow(undefined);
              toggleScriptActiveFunc.current();
            
              isValidate.current = false;
              clearInterval(interval.current);
            } 
          } else {
            clearInterval(interval.current);
          }
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

    useEffect(() => {
      return () => {
        setSelectedRow(undefined);
        setIsActive(false);
        setPanoptoSessionId('');        
        clearInterval(interval.current);
        interval.current = null;
        isValidate.current = false;
        setEmbed('');
      }
    }, [])

    useEffect(() => {
      setPanoptoSessionId(getLectureMedia()?.mediaContents.internalMedias[0].panoptoSessionId);
    });

    useEffect(() => {
      clearInterval(interval.current);

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
                       downloadTranscript(transcriptList);  
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
                        className={lectureTranscript.activate ? "transcript-active" : ""}
                        onClick={() => {
                          seekByIndex(convertStringTimeToNumber(lectureTranscript.startTime));

                          // 대본 선택 시 해당 ROW 값 활성화 여부 toggle 및 값 저장
                          if(selectedRow === undefined || selectedRow.idx !== lectureTranscript.idx) {
                            setIsActive(true);
                            setSelectedRow(lectureTranscript);
                          } else if(selectedRow.idx === lectureTranscript.idx) {
                            setIsActive(false);
                            setSelectedRow(undefined);
                          }
                        
                          // 대본 선택 시 해당 ROW CSS 변경
                          setTranScriptList(
                            transcriptList.map((item : any) => { 
                                return lectureTranscript.idx === item.idx ? 
                                  { activate : !item.activate, deliveryId : item.deliveryId, endTime : item.endTime, idx : item.idx, local : item.local, startTime : item.startTime, text : item.text } 
                                  : 
                                  { activate : false, deliveryId : item.deliveryId, endTime : item.endTime, idx : item.idx, local : item.local, startTime : item.startTime, text : item.text } 
                            })
                          );
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