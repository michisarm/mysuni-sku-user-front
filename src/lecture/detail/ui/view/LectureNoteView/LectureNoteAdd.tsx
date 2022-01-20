import { mobxHelper, reactAlert } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Icon, Input, Image, Button, Form } from 'semantic-ui-react';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';
import { BadgeCardService } from '../../../../../certification/stores';
import { getAudioEmbedApi } from '../../../store/AudioEmbedStore';
import {
  getLectureNoteWriteState,
  setLectureNoteTab,
  setLectureNoteWriteState,
} from '../../../store/LectureNoteStore';
import { getPanoptoEmbedPlayerState } from '@sku/skuniv-ui-video-player';
import { LectureNoteItem } from '../../../viewModel/LectureNote';

interface Props {
  addNote: LectureNoteItem;
  editorVisibleFlag: boolean;
  cubeType: any;
  noteType: string;
  onChange: (args: any) => void;
  onSave: () => void;
  onChangeTime: (value: any) => void;
  handleEditorVisibleFlag: (value: boolean) => void;
  badgeCardService?: BadgeCardService;
}

const LectureNoteAdd: React.FC<Props> = function LectureNoteView({
  addNote,
  editorVisibleFlag,
  cubeType,
  noteType,
  onChange,
  onSave,
  onChangeTime,
  handleEditorVisibleFlag,
}) {
  const noteInput = useRef<any>();

  const onClickTextArea = useCallback(() => {
    //기존창인경우
    if (noteType === 'default') {
      if (cubeType === 'Video') {
        const panoptoState = getPanoptoEmbedPlayerState();
        if (panoptoState) {
          onChangeTime(
            panoptoState!.currentTime ? panoptoState!.currentTime : 0
          );
        }
      } else if (cubeType === 'Audio') {
        const audioapi = getAudioEmbedApi();
        const audioCurrentTime = audioapi?.getCurrentTime();
        onChangeTime(audioCurrentTime ? audioCurrentTime : 0);
      }
    } else if (noteType === 'popup') {
      if (window.opener.document.getElementById('handlePlayTime')) {
        window.opener.document.getElementById('handlePlayTime').click();
        const playTime = window.opener.document.getElementById('handlePlayTime')
          .innerText;
        onChangeTime(playTime ? playTime : 0);
      } else {
        onChangeTime(0);
      }
    }
    //새창인경우
    const editorState = getLectureNoteWriteState();
    if (editorState) {
      reactAlert({
        title: '',
        message: getPolyglotText(
          '작성 중인 Note 내용을 저장해주세요',
          'note-popup-추가저장'
        ),
      });
    } else {
      handleEditorVisibleFlag(true);
      setLectureNoteWriteState(true);
      setLectureNoteTab(true);
    }
    setTimeout(() => {
      noteInput.current && noteInput.current.focus();
    }, 100);
  }, []);

  const timeReset = useCallback(() => {
    if (noteType === 'default') {
      if (cubeType === 'Video') {
        const panoptoState = getPanoptoEmbedPlayerState();
        if (panoptoState) {
          onChangeTime(
            panoptoState!.currentTime ? panoptoState!.currentTime : 0
          );
        }
      } else if (cubeType === 'Audio') {
        const audioapi = getAudioEmbedApi();
        const audioCurrentTime = audioapi?.getCurrentTime();
        onChangeTime(audioCurrentTime ? audioCurrentTime : 0);
      }
    } else if (noteType === 'popup') {
      window.opener.document.getElementById('handlePlayTime').click();
      const playTime = window.opener.document.getElementById('handlePlayTime')
        .innerText;
      onChangeTime(playTime ? playTime : 0);
    }
  }, [addNote]);

  const handelTextArea = useCallback(
    (e: any) => {
      onChange({
        value: e.target.value,
        name: e.target.name,
      });
    },
    [addNote]
  );

  const onHandleCancel = useCallback(() => {
    onChange({
      value: '',
      name: 'content',
    });
    handleEditorVisibleFlag(false);
    setLectureNoteWriteState(false);
    setLectureNoteTab(false);
  }, [addNote]);

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

  return (
    <>
      {!editorVisibleFlag && (
        <div className="note_input">
          <Input
            onClick={onClickTextArea}
            placeholder={getPolyglotText(
              '"콘텐츠에 대한 Note를 작성해 보세요.',
              'note-popup-작성기본'
            )}
          />
        </div>
      )}
      {editorVisibleFlag && (
        <>
          <div className="mynote mynote_write">
            <div className="note_info">
              {(cubeType === 'Video' || cubeType === 'Audio') && (
                <span className="time">
                  <Icon>
                    <Image
                      src={`${process.env.PUBLIC_URL}/images/all/icon-card-time-16-px-green.svg`}
                      alt="시계이미지"
                    />
                  </Icon>
                  {convertTime(addNote.playTime)}
                  <span className="iconrefresh" onClick={timeReset}>
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
                  Note
                </span>
              )}
              <span className="date">
                {moment().format(
                  getPolyglotText('YYYY년 MM월 DD일 작성', 'note-popup-날짜')
                )}
              </span>
            </div>
            <Form>
              <textarea
                style={{ width: '100%' }}
                value={addNote && addNote.content}
                name="content"
                ref={noteInput}
                onChange={(e) => {
                  if (e.target.value.length < 1000) {
                    handelTextArea(e);
                  }
                }}
                placeholder={getPolyglotText(
                  'Note 내용을 입력해주세요.',
                  'note-popup-작성기본2'
                )}
              />
            </Form>
            <div className="note_btn">
              <Button className="cancel" onClick={() => onHandleCancel()}>
                <PolyglotText defaultString="취소" id="note-popup-취소버튼" />
              </Button>
              <Button className="save" onClick={() => onSave()}>
                <PolyglotText defaultString="저장" id="note-popup-저장버튼" />
              </Button>
              <span className="txt_cnt">
                <span className="txt_now">{addNote.content.length}</span>/
                <span>1000</span>
              </span>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default inject(mobxHelper.injectFrom('badge.badgeCardService'))(
  observer(LectureNoteAdd)
);
