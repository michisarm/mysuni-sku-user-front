import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Form, Icon, Image, TextArea } from 'semantic-ui-react';
import {
  getLectureNoteWriteState,
  getLectureOriginNoteItem,
  setLectureNoteItem,
  setLectureNoteTab,
  setLectureNoteWriteState,
} from '../../../store/LectureNoteStore';
import { playVideo, seekTo } from '@sku/skuniv-ui-video-player';
import { LectureNote, noteItem } from '../../../viewModel/LectureNote';
import { reactAlert } from '@nara.platform/accent';
import moment from 'moment';
import { getPanoptoEmbedPlayerState } from '@sku/skuniv-ui-video-player';
import { getAudioEmbedApi } from '../../../store/AudioEmbedStore';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';

interface Props {
  addNote: any;
  noteItem: LectureNote;
  cubeType: any;
  noteType: string;
  onChange: (args: any) => void;
  onChangeEdit: (args: any) => void;
  onSave: (id: string) => void;
  onDelete: (id: string) => void;
}

const LectureNoteList: React.FC<Props> = function LectureNoteList({
  addNote,
  noteItem,
  cubeType,
  noteType,
  onChangeEdit,
  onSave,
  onDelete,
}) {
  const [clicks, setClicks] = useState(0);
  const [selectedNoteId, setSelectedNoteId] = useState<string>();
  const noteInput = useRef<any>();

  useEffect(() => {
    let singleClickTimer: any;
    if (clicks === 1) {
      singleClickTimer = setTimeout(() => {
        handelSingleClick();
        setClicks(0);
      }, 250);
    } else if (clicks === 2) {
      handelDoubleClick();
      setClicks(0);
    }
    return () => clearTimeout(singleClickTimer);
  }, [clicks]);

  const handelSingleClick = useCallback(() => {
    noteItem.results.map((item) => {
      if (item.note.id === selectedNoteId) {
        if (item.note.type === 'expand') {
          const state = getLectureNoteWriteState();
          if (state) {
            reactAlert({
              title: '',
              message: getPolyglotText(
                '작성 중인 Note 내용을 저장해주세요',
                'note-popup-리스트저장'
              ),
            });
            return false;
          } else {
            item.note.type = 'edit';
            setLectureNoteWriteState(true);
            setLectureNoteTab(true);
            setTimeout(() => {
              noteInput.current && noteInput.current.focus();
            }, 100);
          }
        } else if (item.note.type === 'edit') {
          reactAlert({
            title: '',
            message: getPolyglotText(
              '작성 중인 Note 내용을 저장해주세요',
              'note-popup-리스트저장'
            ),
          });
          return false;
        } else {
          item.note.type = 'expand';
        }
      }
    });

    setLectureNoteItem({ ...noteItem });
  }, [selectedNoteId, noteItem]);

  const handelDoubleClick = useCallback(() => {
    noteItem.results.map((item) => {
      if (item.note.id === selectedNoteId) {
        const state = getLectureNoteWriteState();
        if (state) {
          reactAlert({
            title: '',
            message: getPolyglotText(
              '작성 중인 Note 내용을 저장해주세요',
              'note-popup-리스트저장'
            ),
          });
          return false;
        } else {
          item.note.type = 'edit';
          setLectureNoteWriteState(true);
          setLectureNoteTab(true);
          setTimeout(() => {
            noteInput.current && noteInput.current.focus();
          }, 100);
        }
      } else if (item.note.type === 'edit') {
        reactAlert({
          title: '',
          message: getPolyglotText(
            '작성 중인 Note 내용을 저장해주세요',
            'note-popup-리스트저장'
          ),
        });
        return false;
      } else {
        item.note.type = 'default';
      }
    });
    setLectureNoteItem({ ...noteItem });
  }, [selectedNoteId, noteItem]);

  const handelNoteClick = useCallback(
    (id: string) => {
      setSelectedNoteId(id);
      setClicks(clicks + 1);
    },
    [clicks]
  );

  const handelCancelButton = useCallback(
    (id: string) => {
      noteItem.results.map((item) => {
        if (item.note.id === id) {
          //expand 상태면 edit 로
          item.note.type = 'default';
          setLectureNoteWriteState(false);
          setLectureNoteTab(false);
        }
      });
      const originNoteItem = getLectureOriginNoteItem();

      if (originNoteItem) {
        setLectureNoteItem(JSON.parse(JSON.stringify(originNoteItem)));
      }
      // setLectureOriginNoteItem({...noteItem})
    },
    [selectedNoteId]
  );

  //파놉토 플레이어 재생
  const panoptoPlay = useCallback((currentTime: number) => {
    if (noteType === 'default') {
      if (cubeType === 'Video') {
        playVideo();
        setTimeout(() => {
          seekTo(currentTime);
          // stopVideo()
        }, 1000);
      } else {
        const audioapi = getAudioEmbedApi();
        audioapi!.loadVideo();
        audioapi!.playVideo();
        // audioapi!.stopVideo();
        setTimeout(() => {
          audioapi!.seekTo(currentTime);
        }, 500);
      }
    } else if (noteType === 'popup') {
      if (window.opener.document.getElementById('handleSeekTo')) {
        window.opener.document.getElementById(
          'handleSeekTo'
        ).innerText = currentTime;
        window.opener.document.getElementById('handleSeekTo').click();
      }
    }
  }, []);

  const handelTextarea = useCallback(
    (e: any, id: string) => {
      onChangeEdit({
        value: e.target.value,
        name: e.target.name,
        id,
      });
    },
    [noteItem]
  );

  const handleTimeClick = useCallback((event, time) => {
    event.stopPropagation();
    if (time === 0) {
      return;
    }
    panoptoPlay(time);
  }, []);

  const timeReset = useCallback(
    (id) => {
      if (noteType === 'default') {
        if (cubeType === 'Video') {
          const panoptoState = getPanoptoEmbedPlayerState();
          if (panoptoState) {
            onChangeEdit({
              value: panoptoState!.currentTime
                ? Math.floor(panoptoState!.currentTime)
                : 0,
              name: 'playTime',
              id,
            });
          }
        } else if (cubeType === 'Audio') {
          const audioapi = getAudioEmbedApi();
          const audioCurrentTime = audioapi?.getCurrentTime();
          onChangeEdit({
            value: audioCurrentTime ? Math.floor(audioCurrentTime) : 0,
            name: 'playTime',
            id,
          });
        }
      } else if (noteType === 'popup') {
        window.opener.document.getElementById('handlePlayTime').click();
        const playTime = window.opener.document.getElementById('handlePlayTime')
          .innerText;
        onChangeEdit({
          value: playTime ? Math.floor(playTime) : 0,
          name: 'playTime',
          id,
        });
      }
    },
    [addNote, noteItem]
  );

  const timeToString = useCallback((time) => {
    if (String(time).length === 1) {
      time = '0' + time;
    }
    return time;
  }, []);

  const convertTime = useCallback((playTime) => {
    const hour = timeToString(Math.floor(Number(playTime) / 3600));
    const min = timeToString(Math.floor(Number(playTime % 3600) / 60));
    const sec = timeToString(Math.floor(Number(playTime) % 60));
    return hour + ':' + min + ':' + sec;
  }, []);

  const nonNotePlayTimeCnt = noteItem.results.filter(
    (n) => n.note.playSecond === 0
  ).length;

  return (
    <>
      <div className={noteType === 'popup' ? '' : 'note_scroll'}>
        <div className="note_list">
          {noteItem.results.map((item, key: number) => {
            if (item.note.type !== 'edit') {
              return (
                <div
                  className={
                    item.type === 'expand' ? 'mynote' : 'mynote mynote_short'
                  }
                  onClick={() => handelNoteClick(item.note.id)}
                  key={key}
                >
                  <div className="note_info">
                    {(cubeType === 'Video' || cubeType === 'Audio') && (
                      <span
                        style={
                          item.note.playTime === 0
                            ? { cursor: 'default' }
                            : { cursor: 'pointer' }
                        }
                        className="time"
                        onClick={(event) =>
                          handleTimeClick(event, item.note.playTime)
                        }
                      >
                        <Icon>
                          <Image
                            src={
                              item.note.playTime === 0
                                ? `${process.env.PUBLIC_URL}/images/all/btn-lms-note-14-px.svg`
                                : `${process.env.PUBLIC_URL}/images/all/icon-card-time-16-px-green.svg`
                            }
                            alt="시계이미지"
                          />
                        </Icon>
                        {item.note.playTime === 0
                          ? `Note ${
                              noteItem.results.length - nonNotePlayTimeCnt - key
                            }`
                          : convertTime(item.note.playTime)}
                        {item.note.playTime !== 0 && (
                          <Icon className="icongo">
                            <Image
                              src={`${process.env.PUBLIC_URL}/images/all/icon-go-a.svg`}
                            />
                          </Icon>
                        )}
                      </span>
                    )}
                    {cubeType !== 'Video' && cubeType !== 'Audio' && (
                      <span className="time">
                        <Icon>
                          <Image
                            src={`${process.env.PUBLIC_URL}/images/all/btn-lms-note-14-px.svg`}
                            alt="노트이미지"
                          />
                        </Icon>
                        Note{' '}
                        {noteItem.results.length - nonNotePlayTimeCnt - key}
                      </span>
                    )}
                    <span className="date">
                      {item.note.modifiedTime === 0
                        ? moment(item.note.registeredTime).format(
                            getPolyglotText(
                              'YYYY.MM.DD 작성',
                              'note-popup-작성시간'
                            )
                          )
                        : moment(item.note.modifiedTime).format(
                            getPolyglotText(
                              'YYYY.MM.DD 편집',
                              'note-popup-편집시간'
                            )
                          )}
                    </span>
                  </div>
                  <p
                    className="note"
                    dangerouslySetInnerHTML={{
                      __html: `${item.convertContent}`,
                    }}
                  />
                </div>
              );
            } else if (item.note.type === 'edit') {
              return (
                <div className="mynote mynote_edit" key={key}>
                  <div className="note_info">
                    {(cubeType === 'Video' || cubeType === 'Audio') && (
                      <span className="time">
                        <Icon>
                          <Image
                            src={`${process.env.PUBLIC_URL}/images/all/icon-card-time-16-px-green.svg`}
                            alt="시계이미지"
                          />
                        </Icon>
                        {convertTime(item.note.playTime)}
                        <span
                          className="iconrefresh"
                          onClick={() => timeReset(item.note.id)}
                        >
                          <Image
                            src={`${process.env.PUBLIC_URL}/images/all/btn-time-refresh.svg`}
                            alt="새로고침"
                          />
                        </span>
                      </span>
                    )}
                    {cubeType !== 'Video' && cubeType !== 'Audio' && (
                      <span className="time">
                        <Icon>
                          <Image
                            src={`${process.env.PUBLIC_URL}/images/all/btn-lms-note-14-px.svg`}
                            alt="노트이미지"
                          />
                        </Icon>
                        Note{' '}
                        {noteItem.results.length - nonNotePlayTimeCnt - key}
                      </span>
                    )}
                    <span className="date">
                      {item.note.modifiedTime === 0
                        ? moment(item.note.registeredTime).format(
                            getPolyglotText(
                              'YYYY.MM.DD 작성',
                              'note-popup-작성시간'
                            )
                          )
                        : moment(item.note.modifiedTime).format(
                            getPolyglotText(
                              'YYYY.MM.DD 편집',
                              'note-popup-편집시간'
                            )
                          )}
                    </span>
                  </div>
                  <Form>
                    {/* <div ref={focusDiv}></div> */}
                    <textarea
                      placeholder={getPolyglotText(
                        'Note 내용을 입력해주세요.',
                        'note-popup-내용입력'
                      )}
                      value={item.note.content}
                      name="content"
                      ref={noteInput}
                      onChange={(e) => {
                        if (e.target.value.length < 1000) {
                          handelTextarea(e, item.note.id);
                        }
                      }}
                    />
                  </Form>
                  <div className="note_btn">
                    <Button
                      className="delete"
                      onClick={() => onDelete(item.note.id)}
                    >
                      <Image
                        src={`${process.env.PUBLIC_URL}/images/all/icon-note-delete-24-px.svg`}
                        alt="삭제"
                      />
                    </Button>
                    <Button
                      className="cancel"
                      onClick={() => handelCancelButton(item.note.id)}
                    >
                      <PolyglotText
                        defaultString="취소"
                        id="note-popup-취소버튼1"
                      />
                    </Button>
                    <Button
                      className="save"
                      onClick={() => onSave(item.note.id)}
                    >
                      <PolyglotText
                        defaultString="저장"
                        id="note-popup-저장버튼1"
                      />
                    </Button>
                    <span className="txt_cnt">
                      <span className="txt_now">
                        {item.note.content.length}
                      </span>
                      /<span>1000</span>
                    </span>
                  </div>
                </div>
              );
            }
          })}
          {noteItem.results?.length === 0 && (
            <div className="note_nodata">
              <Icon>
                <Image
                  src={`${process.env.PUBLIC_URL}/images/all/icon-comment-nonenote-80-px.svg`}
                />
              </Icon>
              <p
                className="txt"
                dangerouslySetInnerHTML={{
                  __html: getPolyglotText(
                    `작성된 노트가 없습니다.<span><br />학습 내용을 기록해보세요!</span>`,
                    'note-popup-노트null'
                  ),
                }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LectureNoteList;
