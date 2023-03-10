import React, { useCallback, useEffect, useState } from 'react';
import { useIsLoadingState } from '../../store/LectureStructureStore';
import { Button, Segment, Image, Icon } from 'semantic-ui-react';
import { Loadingpanel } from 'shared';
import { requestLectureNote } from '../../service/useLectureNote/useLectureNote';
import LectureNoteList from '../view/LectureNoteView/LectureNoteList';
import { useLocation, useParams } from 'react-router-dom';
import { LectureNoteItem } from '../../viewModel/LectureNote';
import LectureNoteAdd from '../view/LectureNoteView/LectureNoteAdd';
import {
  getLectureNoteWriteState,
  setLectureNoteItem,
  setLectureNotePopupState,
  setLectureNoteTab,
  setLectureNoteWriteState,
  useLectureNoteItem,
  useLectureNotePopupState,
} from '../../store/LectureNoteStore';
import LectureParams from '../../viewModel/LectureParams';
import { findCardCache } from '../../api/cardApi';
import { requestLectureNoteDelete } from '../../service/useLectureNote/useLectureNoteDelete';
import { getLectureCubeSummary } from '../../store/LectureOverviewStore';
import { requestLectureNoteAdd } from '../../service/useLectureNote/useLectureNoteAdd';
import { requestLectureNoteModify } from '../../service/useLectureNote/useLectureNoteModify';
import { timeToHourMinuteFormat } from '../../../../shared/helper/dateTimeHelper';
import LectureNotePopupContainer from './LectureNotePopupContainer';
import { getAudioEmbedApi } from '../../store/AudioEmbedStore';
import { getPanoptoEmbedPlayerState } from '@sku/skuniv-ui-video-player';
import { playVideo, seekTo } from '@sku/skuniv-ui-video-player';
import { reactAlert, reactConfirm } from '@nara.platform/accent';
import { isMobile } from 'react-device-detect';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';

interface LectureNoteContainerProps {
  cubeId: string;
  cardId?: string;
  cubeType: any;
  name: string;
  learningTime: number;
}

const LectureNoteContainer: React.FC<LectureNoteContainerProps> = ({
  cubeId,
  cubeType,
  name,
  learningTime,
  cardId,
}) => {
  const loadingState = useIsLoadingState();
  const { pathname } = useLocation();
  const [addNote, setAddNote] = useState<LectureNoteItem>({
    cardId: '',
    channelId: '',
    collegeId: '',
    id: '',
    patronKey: {},
    cubeId: '',
    folderId: '',
    registeredTime: 0,
    content: '',
    playTime: '',
    modifiedTime: 0,
    type: '',
  });
  const noteItem = useLectureNoteItem();
  const lectureNotePopupState = useLectureNotePopupState();
  const [editorVisibleFlag, setEditorVisibleFlag] = useState<boolean>(false);
  const urlParams = useParams<LectureParams>();
  let popupWindow: any;

  useEffect(() => {
    requestLectureNote(cubeId);
    return () => {
      setLectureNoteTab(false);
      setLectureNoteWriteState(false);
    };
  }, [urlParams]);

  useEffect(() => {
    if (popupWindow) {
      popupWindow.addEventListener('beforeunload');
    }
  }, [popupWindow]);

  const openEditWindow = useCallback(() => {
    const writeState = getLectureNoteWriteState();
    if (writeState) {
      reactAlert({
        title: '',
        message: getPolyglotText(
          '?????? ?????? Note ????????? ??????????????????',
          'note-popup-??????'
        ),
      });
      return;
    }
    const cube = getLectureCubeSummary();
    if (cube) {
      window.sessionStorage.setItem('noteCubeName', cube.name);
      popupWindow = window.open(
        encodeURI(
          `/suni-main/lecture/card/${cardId}/cube/${cubeId}/cubeType/${cubeType}/learningTime/${learningTime}/view/new`
          // `/lecture/card/${cardId}/cube/${cubeId}/cubeType/${cubeType}/learningTime/${learningTime}/view/new`
        ),
        'notePopup',
        'width=350px, height=800, scrollbars=1'
      );

      //?????? ?????? ??????
      setLectureNotePopupState(true);

      setTimeout(() => {
        if (popupWindow) {
          popupWindow.addEventListener('beforeunload', () => {
            setLectureNotePopupState(false);
            const splitUrl = document.location.href.split('/');
            let cardId = '';
            let cubeId = '';
            splitUrl.map((item: string, index: number) => {
              if (item === 'card') {
                cardId = splitUrl[index + 1];
              } else if (item === 'cube') {
                cubeId = splitUrl[index + 1];
              }
            });
            requestLectureNote(cubeId);
          });
        }
      }, 1000);
    }
  }, [cubeId, cardId]);

  const onChangeEdit = useCallback(
    (args: { name: string; value: string; id: string }) => {
      setAddNote({ ...addNote, [args.name]: args.value });
      if (noteItem) {
        noteItem.results.map((item: any) => {
          if (item.note.id === args.id) {
            item.note[args.name] = args.value;
          }
        });
        setLectureNoteItem({ ...noteItem });
      }
    },
    [noteItem, addNote]
  );

  const onChange = useCallback(
    (args: { name: string; value: string }) => {
      setAddNote({ ...addNote, [args.name]: args.value });
    },
    [addNote]
  );

  const onChangeTime = useCallback(
    (value: any) => {
      setAddNote({ ...addNote, playTime: value });
    },
    [addNote]
  );

  const handleEditorVisibleFlag = useCallback((value: boolean) => {
    setEditorVisibleFlag(value);
  }, []);

  const onDelete = useCallback((id: string) => {
    reactConfirm({
      title: getPolyglotText('??????', 'note-popup-??????'),
      message: getPolyglotText('????????? ?????????????????????????', 'note-popup-??????'),
      onOk: () => {
        const params = {
          noteId: id,
          cubeId,
        };
        requestLectureNoteDelete(params).then(() => {
          //????????? ??????
          requestLectureNote(cubeId);
          //???????????? ?????? ?????????
          setAddNote({
            cardId: '',
            channelId: '',
            collegeId: '',
            id: '',
            patronKey: {},
            cubeId: '',
            folderId: '',
            registeredTime: 0,
            content: '',
            playTime: '',
            modifiedTime: 0,
            type: '',
          });
          setLectureNoteWriteState(false);
          setEditorVisibleFlag(false);
          setLectureNoteTab(false);
        });
      },
    });
  }, []);

  const onSave = useCallback(() => {
    let playSecond = 0;
    if (cubeType === 'Audio' || cubeType === 'Video') {
      playSecond = Math.floor(Number(addNote.playTime));
    }

    if (addNote.content === '') {
      reactAlert({
        title: getPolyglotText('??????', 'note-popup-??????'),
        message: getPolyglotText(
          '?????? ????????? ??????????????????.',
          'note-popup-??????'
        ),
      });
      return false;
    }

    findCardCache(urlParams.cardId).then((result) => {
      const cube = getLectureCubeSummary();
      if (result && result.card) {
        const param = {
          cardId: urlParams.cardId,
          cardName: result.card.name,
          cubeId,
          cubeName: cube?.name,
          cubeType,
          content: addNote.content,
          folderId:
            noteItem!.results.length === 0
              ? null
              : noteItem!.results[0].note.folderId,
          playSecond,
        };
        requestLectureNoteAdd(param).then(() => {
          //????????? ??????
          requestLectureNote(cubeId);
          //???????????? ?????? ?????????
          setAddNote({
            cardId: '',
            channelId: '',
            collegeId: '',
            id: '',
            patronKey: {},
            cubeId: '',
            folderId: '',
            registeredTime: 0,
            content: '',
            playTime: '',
            modifiedTime: 0,
            type: '',
          });
          setLectureNoteWriteState(false);
          setEditorVisibleFlag(false);
          setLectureNoteTab(false);
        });
      }
    });
  }, [addNote, urlParams, noteItem]);

  const onEdit = useCallback(
    (id: string) => {
      let content = '';
      let playSecond = 0;

      if (cubeType === 'Audio' || cubeType === 'Video') {
        noteItem?.results.map((item) => {
          if (item.note.id === id) {
            content = item.note.content;
            playSecond = Math.floor(Number(item.note.playTime));
            // console.log(item.note.playTime);
          }
        });
      } else {
        noteItem?.results.map((item: any) => {
          if (item.note.id === id) {
            content = item.note.content;
          }
        });
      }

      const param = {
        content,
        playSecond,
      };

      if (param.content === '') {
        reactAlert({
          title: getPolyglotText('??????', 'note-popup-??????'),
          message: getPolyglotText(
            '?????? ????????? ??????????????????.',
            'note-popup-??????'
          ),
        });
        return;
      }
      requestLectureNoteModify(id, param).then(() => {
        //????????? ??????
        requestLectureNote(cubeId);
        //???????????? ?????? ?????????
        setAddNote({
          cardId: '',
          channelId: '',
          collegeId: '',
          id: '',
          patronKey: {},
          cubeId: '',
          folderId: '',
          registeredTime: 0,
          content: '',
          playTime: '',
          modifiedTime: 0,
          type: '',
        });
        setLectureNoteWriteState(false);
        setEditorVisibleFlag(false);
        setLectureNoteTab(false);
      });
    },
    [noteItem, addNote, urlParams]
  );

  const getPlayTime = useCallback(() => {
    const handlePlayTime = document.getElementById(
      'handlePlayTime'
    ) as HTMLElement;

    if (cubeType === 'Audio') {
      const audioapi = getAudioEmbedApi();
      const audioCurrentTime = audioapi?.getCurrentTime();

      if (audioCurrentTime) {
        handlePlayTime.innerText = audioCurrentTime;
      }
    } else if (cubeType === 'Video') {
      const panoptoState = getPanoptoEmbedPlayerState();
      if (panoptoState) {
        handlePlayTime.innerText = panoptoState!.currentTime
          ? String(panoptoState!.currentTime)
          : '0';
      }
    }
  }, []);

  const handleSeekTo = useCallback(() => {
    const SeekTo = document.getElementById('handleSeekTo') as HTMLElement;
    const seekToTime = Number(SeekTo.innerText);

    if (cubeType === 'Audio') {
      const audioapi = getAudioEmbedApi();
      audioapi!.loadVideo();
      audioapi!.playVideo();
      setTimeout(() => {
        audioapi!.seekTo(seekToTime);
      }, 500);
    } else if (cubeType === 'Video') {
      playVideo();
      setTimeout(() => {
        seekTo(seekToTime);
      }, 500);
    }
  }, []);

  const timeToString = useCallback((time) => {
    if (String(time).length === 1) {
      time = '0' + time;
    }
    return time;
  }, []);

  return (
    <>
      {loadingState?.isLoading ? (
        <Segment
          style={{
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 0,
            paddingRight: 0,
            height: 550,
            boxShadow: '0 0 0 0',
            border: 0,
          }}
        >
          <Loadingpanel loading={loadingState?.isLoading} color="#ffffff" />
        </Segment>
      ) : (
        <>
          <span
            id="handlePlayTime"
            style={{ display: 'none' }}
            onClick={getPlayTime}
          />
          <span
            id="handleSeekTo"
            style={{ display: 'none' }}
            onClick={handleSeekTo}
          />
          <>
            {pathname.indexOf('new') === -1 && (
              <>
                <div className="learning_note_area">
                  <div className="cube_title">
                    <strong>{name}</strong>
                    <div className="cube_info">
                      <span>{cubeType}</span>
                      <span>{timeToHourMinuteFormat(learningTime)}</span>
                      {/* {
                          noteItem.results.length !== 0 && (
                            <span>?????? ?????????</span>
                          )
                        } */}
                    </div>
                  </div>
                  {lectureNotePopupState && (
                    <div className="note_notice">
                      <Icon className="i_note">
                        <Image
                          src={`${process.env.PUBLIC_URL}/images/all/icon-comment-nonenote-80-px.svg`}
                        />
                      </Icon>
                      <p
                        className="txt"
                        dangerouslySetInnerHTML={{
                          __html: getPolyglotText(
                            `??? ????????? Note??? ?????? ????????????.<span>??? ????????? ?????? ?????? Note??? ?????????<br />?????? ??????????????? Note??? ???????????? ??? ????????????.</span>`,
                            'note-popup-?????????'
                          ),
                        }}
                      />
                    </div>
                  )}
                  {!lectureNotePopupState && (
                    <>
                      <div className="note_header">
                        <div className="note_inner">
                          <strong className="title">
                            <PolyglotText
                              defaultString="????????? ??????"
                              id="note-popup-????????????"
                            />
                          </strong>
                          <span
                            className="count"
                            dangerouslySetInnerHTML={{
                              __html: getPolyglotText(
                                `{totalCount}???`,
                                'note-popup-???',
                                {
                                  totalCount: (
                                    noteItem?.totalCount || 0
                                  ).toString(),
                                }
                              ),
                            }}
                          />

                          {!isMobile && (
                            <Button
                              id="handlePopup"
                              className="btn_new"
                              onClick={openEditWindow}
                            >
                              <Image
                                src={`${process.env.PUBLIC_URL}/images/all/btn-new-write.svg`}
                                alt="????????????"
                              />
                            </Button>
                          )}
                        </div>
                      </div>
                      <div
                        className={
                          editorVisibleFlag ? 'note_body ing' : 'note_body'
                        }
                      >
                        <LectureNoteAdd
                          addNote={addNote}
                          editorVisibleFlag={editorVisibleFlag}
                          cubeType={cubeType}
                          noteType="default"
                          onChange={onChange}
                          onSave={onSave}
                          onChangeTime={onChangeTime}
                          handleEditorVisibleFlag={handleEditorVisibleFlag}
                        />
                        {noteItem && (
                          <LectureNoteList
                            addNote={addNote}
                            noteItem={noteItem}
                            cubeType={cubeType}
                            noteType="default"
                            onChange={onChange}
                            onChangeEdit={onChangeEdit}
                            onSave={onEdit}
                            onDelete={onDelete}
                          />
                        )}
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
            {noteItem && pathname.indexOf('new') !== -1 && (
              <>
                <LectureNotePopupContainer />
              </>
            )}
          </>
        </>
      )}
    </>
  );
};

export default LectureNoteContainer;
