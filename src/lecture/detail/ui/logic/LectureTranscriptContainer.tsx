import React, { useState, useEffect, useCallback, useRef } from 'react';
import { getLectureTranscripts } from 'lecture/detail/store/LectureTranscriptStore';
import WatchLog from 'lecture/detail/model/Watchlog';
import LectureParams from '../../viewModel/LectureParams';
import {
  useLocation,
  useParams,
} from 'react-router-dom';
import LectureRouterParams from 'lecture/detail/viewModel/LectureRouterParams';

// LectureTranscriptContainer --> LectureCourseContentView

interface LectureTranscriptContainer {
  params: LectureRouterParams | undefined;
}

const LectureTranscriptContainer: React.FC<LectureTranscriptContainer> = function LectureTranscriptContainer({
  params
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
            const array: any = [];
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

    return(
        <>
            <div className="transcript-box" id="tanscript-scroll">
                <div className="transcript-top">
                  {getLectureTranscripts()?.map((lectureTranscript, index) => {
                    return (
                      <div key={lectureTranscript.idx}>
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
                      </div>      
                    );  
                  })}
                </div>
            </div>   
        </>
    );
}

export default LectureTranscriptContainer;