import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Select, Icon, Button, Popup } from 'semantic-ui-react';

// Store
import { getLectureMedia } from 'lecture/detail/store/LectureMediaStore';
import { getEmbed, setEmbed } from 'lecture/detail/store/EmbedStore';

// Service
import { downloadTranscript } from '../../service/useTranscript/utility/useTranscript';
import { findTranscript } from '../../service/useTranscript/utility/useTranscript';
import LectureCubeSummary from 'lecture/detail/viewModel/LectureOverview/LectureCubeSummary';

const style = {
  borderRadius: '0.375rem',
  textAlign: 'center',
  fontSize: '0.875rem',
  border: '1px solid #aaaaaa',
  color: '#4c4c4c',
};

interface LectureTranscriptContainerProps {
  transLangVal: string;
  setTransLangVal: any;
  lectureSummary?: LectureCubeSummary;
}

const LectureTranscriptContainer: React.FC<LectureTranscriptContainerProps> = function LectureTranscriptContainer({
  transLangVal,
  setTransLangVal,
  lectureSummary,
}) {
  const selectTransLangObj = [
    { key: 'ko', value: 'ko', text: 'KR' },
    { key: 'eng', value: 'en', text: 'ENG' },
    { key: 'chn', value: 'cn', text: 'CHN' },
  ];

  const ERROR_RANGE = 1.5; // getCurrentTime으로 동영상 시간을 받을 때 0.n초의 오차가 발생 할 때가 있어서 오차 범위 지정

  const [transcriptList, setTranScriptList] = useState<any>();
  const [panoptoSessionId, setPanoptoSessionId] = useState<string | undefined>(
    getLectureMedia()?.mediaContents.internalMedias[0].panoptoSessionId
  );

  const [autoHighlight, setAutoHighlight] = useState<boolean>();
  const intervalTranscript: any = useRef<any>(null);
  const [transciptHighlight, setTransciptHighlight] = useState<string>();

  // 특정 위치로 재생 위치 이동
  const seekByIndex = (startIndex: number, endIndex: number) => {
    if (getEmbed() && startIndex >= 0) {
      if (getEmbed().isPaused === false) {
        getEmbed().seekTo(startIndex);
      }
    }
  };

  // 동영상 플레이어 시간 형식으로 변환
  const convertStringTimeToNumber = (time: string = '0') => {
    return (
      parseInt(time.substr(0, 2), 10) * 60 * 60 +
      parseInt(time.substr(2, 2), 10) * 60 +
      parseInt(time.substr(4, 2), 10)
    );
  };

  useEffect(() => {
    // 동영상 상태 변경 시 callback
    getEmbed().onStateChange = () => {
      if (getEmbed().isPaused === false) {
        setAutoHighlight(true);
      }
    };
  }, []);

  // 대본 선택 관련 초기화
  const initialize = () => {
    //자동 하이라이트 기능
    if (getEmbed().isPaused === false) {
      setAutoHighlight(true);
    }
    clearInterval(intervalTranscript);
  };

  useEffect(() => {
    return () => {
      clearInterval(intervalTranscript.current);
      initialize();
      setPanoptoSessionId('');
    };
  }, []);

  useEffect(() => {
    setPanoptoSessionId(
      getLectureMedia()?.mediaContents.internalMedias[0].panoptoSessionId
    );
  });

  useEffect(() => {
    // 언어를 바꿨을 때 초기화
    initialize();

    const getTranScriptsFunc = async () => {
      if (panoptoSessionId !== undefined) {
        // '0002939c-8307-4dd2-8f5c-abec0022d4fc'
        const transcriptsItem = await findTranscript(
          panoptoSessionId,
          transLangVal
        );

        setTranScriptList(transcriptsItem);
      }
    };

    getTranScriptsFunc();
  }, [transLangVal, panoptoSessionId]);

  useEffect(() => {
    if (autoHighlight) {
      intervalTranscript.current = setInterval(() => {
        if (getEmbed().isPaused === true) {
          setAutoHighlight(false);
          clearInterval(intervalTranscript);
        } else {
          if (transcriptList !== undefined) {
            //시간 2 초마다 체크해서 자막 스크롤 이동 및 하이라이트 넣기
            transcriptList.map((item: any, key: number) => {
              if (
                convertStringTimeToNumber(item.startTime) <
                getEmbed().getCurrentTime()
              ) {
                if (
                  getEmbed().getCurrentTime() <
                  convertStringTimeToNumber(item.endTime)
                ) {
                  setTransciptHighlight(item.idx);
                }
              }
            });
          }
        }
      }, 500);
    }
    return () => {
      clearInterval(intervalTranscript);
    };
  }, [autoHighlight, transcriptList]);

  const highlight = (id: string) => {
    if (transciptHighlight === id) {
      return 'transcript-active';
    } else {
      return 'transcript-hover';
    }
  };

  return (
    <>
      <div className="transcript-box" id="tanscript-scroll">
        <div className="transcript-top">
          <Select
            placeholder="분류를 선택해주세요"
            className="ui small-border dropdown m0"
            defaultValue={transLangVal}
            options={selectTransLangObj}
            onChange={(e: any, data: any) => {
              setTransLangVal(data.value);
            }}
          />
          <div>
            <Popup
              trigger={<Button icon="tooltip" />}
              style={style}
              position="bottom center"
              wide
            >
              <p>
                현재 선택된 언어의 Transcript를 <br /> txt 파일로 다운로드
                받으실 수 있습니다.
              </p>
            </Popup>
            <button
              className="ui icon button left post delete-kr"
              onClick={() => {
                if (transcriptList !== undefined) {
                  const langText =
                    selectTransLangObj.find(lang => lang.value === transLangVal)
                      ?.text || '';
                  console.log('lectureSummary', lectureSummary);
                  downloadTranscript(
                    transcriptList,
                    (lectureSummary?.name || 'transcript').concat('_', langText)
                  );
                }
              }}
            >
              <Icon className="icon-down-type5" />
              Download
            </button>
          </div>
        </div>
        {transcriptList?.map((lectureTranscript: any) => {
          return (
            <>
              <span
                id={lectureTranscript.idx + ''}
                key={lectureTranscript.idx}
                className={highlight(lectureTranscript.idx + '')}
                onClick={() => {
                  seekByIndex(
                    convertStringTimeToNumber(lectureTranscript.startTime),
                    convertStringTimeToNumber(lectureTranscript.endTime)
                  );
                }}
                style={{ cursor: 'pointer' }}
              >
                {lectureTranscript.text}&nbsp;
              </span>
            </>
          );
        })}
      </div>
    </>
  );
};

export default LectureTranscriptContainer;
