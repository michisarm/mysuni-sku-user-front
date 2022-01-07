import React, { useCallback, useEffect, useState } from 'react';
import { useIsLoadingState } from '../../store/LectureStructureStore';
import { Button, Segment, Image } from 'semantic-ui-react';
import { Loadingpanel } from 'shared';
import { requestLectureNote } from '../../service/useLectureNote/useLectureNote';
import LectureNoteList from '../view/LectureNoteView/LectureNoteList';
import { useParams } from 'react-router-dom';
import { LectureNoteItem } from '../../viewModel/LectureNote';
import LectureNoteAdd from '../view/LectureNoteView/LectureNoteAdd';
import {
  setLectureNoteItem,
  setLectureNoteTab,
  setLectureNoteWriteState,
  useLectureNoteItem,
} from '../../store/LectureNoteStore';
import LectureParams from '../../viewModel/LectureParams';
import { findCardCache } from '../../api/cardApi';
import { requestLectureNoteDelete } from '../../service/useLectureNote/useLectureNoteDelete';
import { requestLectureNoteAdd } from '../../service/useLectureNote/useLectureNoteAdd';
import { requestLectureNoteModify } from '../../service/useLectureNote/useLectureNoteModify';
import { timeToHourMinuteFormat } from '../../../../shared/helper/dateTimeHelper';
import { reactAlert, reactConfirm } from '@nara.platform/accent';
import { PolyglotText, getPolyglotText } from 'shared/ui/logic/PolyglotText';

const LectureNotePopupContainer: React.FC = ({}) => {
  const loadingState = useIsLoadingState();
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
  const [editorVisibleFlag, setEditorVisibleFlag] = useState<boolean>(false);
  const urlParams = useParams<LectureParams>();

  useEffect(() => {
    if (urlParams.cubeId) {
      document.getElementsByTagName('body')[0].style.minWidth = '0';
      requestLectureNote(urlParams.cubeId);
    }
  }, [urlParams]);

  const onChangeEdit = useCallback(
    (args: { name: string; value: string; id: string }) => {
      setAddNote({ ...addNote, [args.name]: args.value });
      if (noteItem) {
        noteItem.results.map((item) => {
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
      title: getPolyglotText(`알림`, 'note-modal-알림3'),
      message: getPolyglotText('노트를 삭제하시겠습니까?', 'note-modal-삭제'),
      onOk: () => {
        const params = {
          noteId: id,
          cubeid: urlParams.cubeId,
        };
        requestLectureNoteDelete(params).then(() => {
          //리스트 조회
          requestLectureNote(urlParams.cubeId!);
          //작성중인 화면 초기화
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

  const onSave = useCallback(() => {
    let playSecond = 0;
    if (urlParams.cubeType === 'Audio' || urlParams.cubeType === 'Video') {
      playSecond = Math.floor(Number(addNote.playTime));
    }

    if (addNote.content === '') {
      reactAlert({
        title: getPolyglotText(`알림`, 'note-modal-알림1'),
        message: getPolyglotText(
          '노트 내용을 작성해주세요.',
          'note-modal-작성1'
        ),
      });
      return false;
    }

    findCardCache(urlParams.cardId).then((result) => {
      if (result && result.card) {
        const param = {
          cardId: urlParams.cardId,
          cubeId: urlParams.cubeId,
          cubeType: urlParams.cubeType,
          content: addNote.content,
          folderID:
            noteItem!.results.length === 0
              ? null
              : noteItem!.results[0].note.folderId,
          playSecond,
        };

        requestLectureNoteAdd(param).then(() => {
          //리스트 조회
          requestLectureNote(urlParams.cubeId!);
          //작성중인 화면 초기화
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
  }, [addNote, urlParams]);

  const onEdit = useCallback(
    (id: string) => {
      let content = '';
      let playSecond = '';
      noteItem?.results.map((item) => {
        if (item.note.id === id) {
          content = item.note.content;
          playSecond = item.note.playTime;
        }
      });
      const param = {
        content,
        playSecond,
      };

      if (param.content === '') {
        reactAlert({
          title: getPolyglotText(`알림`, 'note-modal-알림2'),
          message: getPolyglotText(
            '노트 내용을 작성해주세요.',
            'note-modal-작성2'
          ),
        });
        return;
      }

      requestLectureNoteModify(id, param).then(() => {
        //리스트 조회
        requestLectureNote(urlParams.cubeId!);
        //작성중인 화면 초기화
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
          {noteItem && (
            <>
              {
                <div className="note_pop">
                  <div className="note_header">
                    <div className="note_inner">
                      <strong className="title">
                        <PolyglotText
                          defaultString="작성한 노트"
                          id="note-modal-작성한노트"
                        />
                      </strong>
                      <span
                        className="count"
                        dangerouslySetInnerHTML={{
                          __html: getPolyglotText(
                            `{totalCount}개`,
                            'note-modal-개',
                            {
                              totalCount: (noteItem?.totalCount).toString(),
                            }
                          ),
                        }}
                      />
                    </div>
                  </div>
                  <div className="note_body">
                    <div className="cube_title">
                      <strong>
                        {window.sessionStorage.getItem('noteCubeName')}
                      </strong>
                      <div className="cube_info">
                        <span>{urlParams.cubeType}</span>
                        <span>
                          {timeToHourMinuteFormat(
                            Number(urlParams.learningTime)
                          )}
                        </span>
                        {/* {
                            noteItem.results.length !== 0 && (
                              <span>노트 작성됨</span>
                            )
                          } */}
                      </div>
                    </div>
                    <LectureNoteAdd
                      addNote={addNote}
                      editorVisibleFlag={editorVisibleFlag}
                      cubeType={urlParams.cubeType}
                      noteType="popup"
                      onChange={onChange}
                      onSave={onSave}
                      onChangeTime={onChangeTime}
                      handleEditorVisibleFlag={handleEditorVisibleFlag}
                    />
                    <LectureNoteList
                      addNote={addNote}
                      noteItem={noteItem}
                      cubeType={urlParams.cubeType}
                      noteType="popup"
                      onChange={onChange}
                      onChangeEdit={onChangeEdit}
                      onSave={onEdit}
                      onDelete={onDelete}
                    />
                  </div>
                </div>
              }
            </>
          )}
        </>
      )}
    </>
  );
};

export default LectureNotePopupContainer;
