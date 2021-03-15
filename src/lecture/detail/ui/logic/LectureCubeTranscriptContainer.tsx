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
    
    const [embedApi, setEmbedApi] = useState<any | undefined>({
        pauseVideo: () => {},
        seekTo: (index: number) => {},
        getCurrentTime: () => {},
        getDuration: () => {},
        currentPosition: () => {},
        getPlaybackRate: () => {},
    });

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

    const seekByIndex = (index: number) => {
        if (embedApi && index >= 0) {
        //TODO current state 를 찾아서 Play 이
        embedApi.seekTo(index);
        }
    };

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

    const selectTransLangObj = [
      { key: "ko", value: "ko", text: "KR" },
      { key: "eng", value: "eng", text: "ENG" },
      { key: "chn", value: "chn", text: "CHN" },
    ];

    const [ transcriptList, setTranScriptList ] = useState<any>();
    const [ deliveryId, setDeliveryId ] = useState<string>('');

    // const transLangSelectBoxClick = (e : any, data : any) => {
    //   setTransLangVal(data.value);

    //   const getTranScriptsFunc = async () => {
    //     const transcript = await findAllTranscript('d4bae4af-7e1a-4957-8e5f-ab89008c2100', data.value);
        
    //     setTranScriptList(transcript);

    //     //조회 결과 viewmodel setting
    //     setLectureTranscripts(await getTranscriptItem(transcript));
    //   };

    //   getTranScriptsFunc();
    // };

    useEffect(() => {
      const getTranScriptsFunc = async () => {
        const lectureMedia = getLectureMedia();

        if(lectureMedia !== undefined) {
            // setDeliveryId(lectureMedia.mediaContents.internalMedias[0].panoptoSessionId || '');
            setDeliveryId('00603301-1681-44b1-a183-ab2b00a0a8ae');
            const transcript = await findAllTranscript(deliveryId, transLangVal);
            setTranScriptList(await getTranscriptItem(transcript));
        }        
      };

      getTranScriptsFunc();     
    }, [transLangVal])
    
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
                     <p className="transcript-active">{lectureTranscript.text}</p>
                   </>      
                 );  
               })}
            </div>   
        </>
    );
}

export default LectureTranscriptContainer;