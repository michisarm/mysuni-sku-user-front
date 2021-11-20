import React, { useState, useEffect, useRef } from 'react';
import { Select, Icon, Button, Popup } from 'semantic-ui-react';

// Store
import { getLectureMedia } from 'lecture/detail/store/LectureMediaStore';

// Service
import { downloadTranscript } from '../../service/useTranscript/utility/useTranscript';
import { findTranscript } from '../../service/useTranscript/utility/useTranscript';
import LectureCubeSummary from 'lecture/detail/viewModel/LectureOverview/LectureCubeSummary';
import { PlayerState, seekTo } from '@sku/skuniv-ui-video-player';
import { usePanoptoEmbedPlayerState } from '@sku/skuniv-ui-video-player';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';
import { reactAlert } from '@nara.platform/accent';

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
  // trascriptScrollMove: () => void;
}

const LectureTranscriptContainer: React.FC<LectureTranscriptContainerProps> =
  function LectureTranscriptContainer({
                                        transLangVal,
                                        setTransLangVal,
                                        lectureSummary,
                                        // trascriptScrollMove
                                      }) {
    const selectTransLangObj = [
      { key: 'ko', value: 'ko', text: 'KR' },
      { key: 'eng', value: 'en', text: 'ENG' },
      { key: 'chn', value: 'cn', text: 'CHN' },
    ];

    const ERROR_RANGE = 1.5; // getCurrentTime으로 동영상 시간을 받을 때 0.n초의 오차가 발생 할 때가 있어서 오차 범위 지정

    const [transcriptList, setTranScriptList] = useState<any>();
    const [panoptoSessionId, setPanoptoSessionId] = useState<
      string | undefined
      >(getLectureMedia()?.mediaContents.internalMedias[0].panoptoSessionId);

    const [autoHighlight, setAutoHighlight] = useState<boolean>();
    const intervalTranscript: any = useRef<any>(null);
    const [transciptHighlight, setTransciptHighlight] = useState<string>();

    const panoptoEmbedPlayerState = usePanoptoEmbedPlayerState();

    // 특정 위치로 재생 위치 이동
    const seekByIndex = (startIndex: number, endIndex: number) => {
      if (startIndex >= 0) {
        // jz - 무슨 의미?
        // if (getEmbed().isPaused === false) {
        //   seekTo(startIndex);
        // }
        if (panoptoEmbedPlayerState?.playerState === PlayerState.Playing) {
          seekTo(startIndex);
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
      if (panoptoEmbedPlayerState?.playerState === PlayerState.Playing) {
        setAutoHighlight(true);
      }
    }, [panoptoEmbedPlayerState?.playerState]);

    // 대본 선택 관련 초기화
    const initialize = () => {
      //자동 하이라이트 기능
      if (panoptoEmbedPlayerState?.playerState === PlayerState.Playing) {
        setAutoHighlight(true);
      }
      clearInterval(intervalTranscript.current);
    };

    useEffect(() => {
      return () => {
        clearInterval(intervalTranscript.current);
        setAutoHighlight(false);
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
        // trascriptScrollMove();
      };

      getTranScriptsFunc();
    }, [transLangVal, panoptoSessionId]);

    useEffect(() => {
      clearInterval(intervalTranscript.current);

      if (autoHighlight) {
        if (panoptoEmbedPlayerState?.playerState === PlayerState.Paused) {
          setAutoHighlight(false);
          clearInterval(intervalTranscript);
        } else {
          if (transcriptList !== undefined) {
            //시간 2 초마다 체크해서 자막 스크롤 이동 및 하이라이트 넣기
            transcriptList.map((item: any, key: number) => {
              if (
                convertStringTimeToNumber(item.startTime) <
                (panoptoEmbedPlayerState?.currentTime || 0)
              ) {
                if (
                  (panoptoEmbedPlayerState?.currentTime || 0) <
                  convertStringTimeToNumber(item.endTime)
                ) {
                  setTransciptHighlight(item.idx);
                }
              }
            });
          }
        }
      }
      // return () => {
      //   clearInterval(intervalTranscript);
      // };
    }, [
      panoptoEmbedPlayerState?.playerState,
      panoptoEmbedPlayerState?.currentTime,
      autoHighlight,
      transcriptList,
    ]);

    useEffect(() => {
      // 하드코딩하여 적용... 추후 필요시 체크해서 하는 부분이 필요할 듯
      const cont = document.getElementById('panopto-embed-player');
      if (cont) {
        window.scrollTo(0, 800);
      }
    }, [transcriptList]);

    const highlight = (id: string) => {
      if (transciptHighlight === id) {
        return 'transcript-active';
      } else {
        return 'transcript-hover';
      }
    };

    const onClickDownloadTranScript = () => {
      reactAlert({
        title: getPolyglotText(
          `본 Transcript 파일은 학습의 목적으로 사내 한하여 활용 부탁드리며, <strong>외부 공유를 제한</strong>합니다.`,
          'cube-transcript-안내'
        ),
        message: getPolyglotText(
          `본 Transcript 파일은 학습의 목적으로 사내 한하여 활용 부탁드리며,<br/><strong>외부 공유를 제한</strong>합니다.`,
          'cube-transcript-내용'
        ),
        onClose: onClickOkInModal,
      });
    };

    const onClickOkInModal = () => {
      //
      if (transcriptList?.length > 0) {
        const langText =
          selectTransLangObj.find((lang) => lang.value === transLangVal)
            ?.text || '';
        downloadTranscript(
          transcriptList,
          (lectureSummary?.name || 'transcript').concat('_', langText)
        );
      }
    };

    return (
      <>
        <div className="transcript-box" id="tanscript-scroll">
          <div className="transcript-top trans-lang">
            <Select
              placeholder={getPolyglotText(
                '분류를 선택해주세요',
                'cube-Contents-분류를 선택해주세요'
              )}
              className="ui small-border dropdown m0"
              defaultValue={transLangVal}
              options={selectTransLangObj}
              onChange={(e: any, data: any) => {
                setTransLangVal(data.value);
              }}
            />
            <div>
              <button
                className="ui icon button left post delete-kr"
                onClick={() => onClickDownloadTranScript()}
              >
                <Icon className="icon-down-type5" />
                <PolyglotText
                  defaultString="Download"
                  id="cube-Contents-Download"
                />
              </button>
              <Popup
                trigger={<Button icon="tooltip" />}
                style={style}
                position="bottom center"
                wide
              >
                <p
                  dangerouslySetInnerHTML={{
                    __html: getPolyglotText(
                      `현재 선택된 언어의 Transcript를 <br /> txt 파일로 다운로드 받으실 수 있습니다.`,
                      'cube-Contents-다운로드'
                    ),
                  }}
                />
              </Popup>
            </div>
          </div>
          {transcriptList?.length > 0 ? (
            transcriptList?.map((lectureTranscript: any) => {
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
            })
          ) : (
            <span>
              <PolyglotText
                defaultString="저장 된 대본이 없습니다."
                id="cube-Contents-대본없음"
              />
            </span>
          )}
        </div>
      </>
    );
  };

export default LectureTranscriptContainer;
