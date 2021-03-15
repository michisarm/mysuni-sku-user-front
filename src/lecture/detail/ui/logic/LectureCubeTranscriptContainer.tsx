import React, { useState, useEffect, useCallback, useRef } from 'react';
import { getLectureTranscripts, onLectureTranscripts, setLectureTranscripts } from 'lecture/detail/store/LectureTranscriptStore';
import WatchLog from 'lecture/detail/model/Watchlog';
import LectureParams from '../../viewModel/LectureParams';
import {
  useLocation,
  useParams,
} from 'react-router-dom';
import LectureRouterParams from 'lecture/detail/viewModel/LectureRouterParams';
import { Select, Icon, Button, Popup } from "semantic-ui-react";
import { findAllTranscript } from '../../api/mPersonalCubeApi';
import { getTranscriptItem } from 'lecture/detail/service/useLectureMedia/utility/getTranscriptItemMapFromCube';
import { getLectureMedia } from 'lecture/detail/store/LectureMediaStore';
import { getEmbed } from 'lecture/detail/store/EmbedStore';

// LectureTranscriptContainer --> LectureCourseContentView

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
    const highlight = (id: string) => {
        if (transciptHighlight === id) {
        return 'l-current';
        } else {
        return '';
        }
    };

    const [transciptHighlight, setTransciptHighlight] = useState<string>();
    const [isActive, setIsActive] = useState(false);
    const [startTime, setStartTime] = useState(0);
    const [watchlogState, setWatchlogState] = useState<WatchLog>();
    const transcriptIntervalRef = useRef<any>(0);
    const lectureParams = useParams<LectureParams>();
    const { pathname } = useLocation();

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

    const seekByIndex = (index: number) => {
        if (getEmbed() && index >= 0) {
          //TODO current state 를 찾아서 Play
          getEmbed().seekTo(index);
          getEmbed().playVideo();
        }
    };


    const selectTransLangObj = [
      { key: "ko", value: "ko", text: "KR" },
      { key: "eng", value: "en", text: "ENG" },
      { key: "chn", value: "cn", text: "CHN" },
    ];

    const [ transcriptList, setTranScriptList ] = useState<any>();

    useEffect(() => {
      const getTranScriptsFunc = async () => {
        const lectureMedia = getLectureMedia();

        if(lectureMedia !== undefined) {
          const transcripts = await findAllTranscript('142ab685-27b1-4cda-8b34-ac3e0060cdc0', transLangVal);
          // const transcripts = await findAllTranscript('142ab685-27b1-4cda-8b34-ac3e0060cdc0', transLangVal);
          const transcriptsItem = await getTranscriptItem(transcripts);

            transcriptsItem?.map((item : any) => {
              item.active = false;
            });

            setTranScriptList(transcriptsItem);
        }        
      };

      getTranScriptsFunc();     
    }, [transLangVal]);

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
                  <button className="ui icon button left post delete-kr">
                    <Icon className="icon-down-type5" />
                    Download
                  </button>
                </div>
              </div>
               {transcriptList?.map((lectureTranscript : any) => {
                 
                 return (
                   <>
                    {/* <strong        
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
                    </strong> */}
                      <p id={'tranScriptRow'+lectureTranscript.idx}
                        key={lectureTranscript.idx}
                        className={lectureTranscript.activate ? "transcript-active" : ""}
                        onClick={() => {
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
}

export default LectureTranscriptContainer;