import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Select, Icon, Button, Popup } from 'semantic-ui-react';

// Store
import { getLectureMedia } from 'lecture/detail/store/LectureMediaStore';
import { getEmbed, setEmbed } from 'lecture/detail/store/EmbedStore';

// Service
import { downloadTranscript } from '../../service/useTranscript/utility/useTranscript';
import { findTranscript } from '../../service/useTranscript/utility/useTranscript';

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
}

const LectureTranscriptContainer: React.FC<LectureTranscriptContainerProps> = function LectureTranscriptContainer({
  transLangVal,
  setTransLangVal,
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
  useWhyDidYouUpdate('LectureTranscriptContainer', {
    transLangVal,
    setTransLangVal,
    transcriptList,
    panoptoSessionId,
    autoHighlight,
    transciptHighlight,
  });

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
      if (getEmbed().isPaused === true) {
        console.log('1');
      } else {
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
      console.log('useEffect 나가기');
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
      }, 1000);
    }
    return () => {
      clearInterval(intervalTranscript);
    };
  }, [autoHighlight, transcriptList]);

  const highlight = (id: string) => {
    if (transciptHighlight === id) {
      return 'transcript-active';
    } else {
      return '';
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
                  downloadTranscript(
                    transcriptList,
                    getLectureMedia()?.mediaContents.internalMedias[0].name
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
                {lectureTranscript.text}
              </span>
            </>
          );
        })}
      </div>
    </>
  );
};

export default LectureTranscriptContainer;

function useWhyDidYouUpdate(name: string, props: any) {
  // Get a mutable ref object where we can store props ...
  // ... for comparison next time this hook runs.
  const previousProps = useRef<any>();

  useEffect(() => {
    if (previousProps.current) {
      // Get all keys from previous and current props
      const allKeys = Object.keys({ ...previousProps.current, ...props });
      // Use this object to keep track of changed props
      const changesObj: any = {};
      // Iterate through keys
      allKeys.forEach(key => {
        // If previous is different from current
        if (previousProps.current[key] !== props[key]) {
          // Add to changesObj
          changesObj[key] = {
            from: previousProps.current[key],
            to: props[key],
          };
        }
      });

      // If changesObj not empty then output to console
      if (Object.keys(changesObj).length) {
        console.log('[why-did-you-update]', name, changesObj);
      }
    }

    // Finally update previousProps with current props for next hook call
    previousProps.current = props;
  });
}
