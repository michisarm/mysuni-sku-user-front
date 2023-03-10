import React, { useState, useCallback, useEffect } from 'react';
import {
  Segment,
  Accordion,
  Image,
  Select,
  Button,
  Icon,
  Form,
  TextArea,
} from 'semantic-ui-react';
import { Link, useHistory, useParams } from 'react-router-dom';
import {
  OffsetElementList,
  reactAlert,
  reactConfirm,
} from '@nara.platform/accent';
import Note, { getConvertEnter } from '../../model/Note';
import {
  requestAppendCubeList,
  requestCubeList,
  requestNoteCount,
} from '../../service/useNote/requestNote';
import { SearchBox } from '../../model/SearchBox';
import { setSearchBox } from '../../store/SearchBoxStore';
import moment from 'moment';
import Folder from '../../model/Folder';
import NoteCdoItem, { getNoteCdoItem } from '../../viewModel/NoteCdoItem';
import NoteCdo, { convertNoteToNoteCdo } from '../../model/NoteCdo';
import { saveNote, changeFolderInNote } from '../../service/useNote/saveNote';
import NoteUdoItem, { getNoteUdoItem } from '../../viewModel/NoteUdoItem';
import NoteUdo from '../../model/NoteUdo';
import { deleteNoteById } from '../../service/useNote/deleteNote';
import { CollegeModel } from '../../../college/model/CollegeModel';
import {
  requestCubeListByFolderId,
  requestNoteCountByFolderId,
  requestAppendCubeListByFolderId,
} from '../../service/useFolder/requestFolder';
import { MyPageRouteParams } from '../../../myTraining/model/MyPageRouteParams';
import { setNoteCount, getNoteCount } from '../../store/NoteCountStore';
import CategoryColorType from '../../../shared/model/CategoryColorType';
import { parsePolyglotString } from '../../../shared/viewmodel/PolyglotString';
import { PolyglotText, getPolyglotText } from 'shared/ui/logic/PolyglotText';
import { playSecondToString } from '../logic/NoteHelper';
import { getCollgeName } from '../../../shared/service/useCollege/useRequestCollege';

interface NoteViewProps {
  noteList: OffsetElementList<Note>;
  searchBox: SearchBox;
  folder: Folder | undefined;
  colleges: CollegeModel[];
  search: () => void;
}

const NoteView: React.FC<NoteViewProps> = function NoteView({
  noteList,
  searchBox,
  folder,
  colleges,
  search,
}) {
  const PUBLIC_URL = process.env.PUBLIC_URL;

  const [activeIndexList, setActiveIndexList] = useState<number[]>([-1]);
  const [noteCdoItem, setNoteCdoItem] = useState<NoteCdoItem>();
  const [noteUdoItem, setNoteUdoItem] = useState<NoteUdoItem>();
  const [folderOptions, setFolderOptions] = useState<
    { key: number; value: string; text: string }[]
  >([
    {
      key: 0,
      value: '',
      text: getPolyglotText('???????????????', 'mypage-noteList-???????????????2'),
    },
  ]);
  const [collegeList, setCollegeList] = useState<CollegeModel[]>();
  const history = useHistory();
  const params = useParams<MyPageRouteParams>();

  useEffect(() => {
    folder && setFolderOptions(selectFolder(folder));
  }, [folder]);

  useEffect(() => {
    //????????? ?????? ?????? ?????? ?????????
    // setSubNoteList([]);
    setActiveIndexList([...activeIndexList]);

    // noteList &&
    //   noteList.results.forEach(async (m, index) => {
    //     if (activeIndexList.some((target) => target === index)) {
    //       await searchNoteByCubeId(index, m.cubeId, m.cardId);
    //     }
    //   });
  }, [noteList]);

  const selectFolder = useCallback((folder: Folder) => {
    const folderSelect: any = [];
    folderSelect.push({
      key: '',
      text: getPolyglotText('???????????????', 'mypage-noteList-???????????????3'),
      value: '',
    });
    if (folder) {
      folder.folders.idNames.map((field, index) => {
        folderSelect.push({
          key: index + 1,
          text: field.name,
          value: field.id,
        });
      });
    }
    params.pageNo === '1' &&
      folderSelect.push({
        key: 'addFolder',
        text: '+' + getPolyglotText('???????????????', 'mypage-noteList-???????????????'),
        value: 'addFolder',
      });
    return folderSelect;
  }, []);

  useEffect(() => {
    setCollegeList(colleges);
  }, [colleges]);

  const searchNoteByCubeId = useCallback(
    async (index: number, cubeId: string, cardId?: string) => {
      setSearchBox({
        ...searchBox,
        cardId,
        cubeId,
        limit: 9999,
        offset: 0,
      });

      setNoteUdoItem(undefined);
      setNoteCdoItem(undefined);
    },
    [searchBox]
  );

  const writeNote = useCallback(
    async (index: number, note: Note) => {
      if (noteCdoItem !== undefined || noteUdoItem !== undefined) {
        reactAlert({
          title: getPolyglotText('??????', 'mypage-noteList-??????1'),
          message: getPolyglotText(
            '?????? ?????? ????????? ??????????????????',
            'mypage-noteList-????????????1'
          ),
        });
        return;
      }

      setNoteCdoItem(getNoteCdoItem(index, convertNoteToNoteCdo(note)));
    },
    [noteCdoItem, noteUdoItem]
  );

  const save = useCallback(
    async (noteCdo: NoteCdo, id: string, index: number) => {
      if (noteCdo.content === null || noteCdo.content === '') {
        reactAlert({
          title: getPolyglotText('??????', 'mypage-noteList-??????2'),
          message: getPolyglotText(
            '?????? ????????? ??????????????????.',
            'mypage-noteList-????????????1'
          ),
        });
        return;
      }

      // My Page?????? ?????? ?????? ??? cubeType??? ???????????? ?????? ??? ??????
      await saveNote(noteCdo, id);

      params.pageNo === '2' && (await requestCubeListByFolderId());
      params.pageNo === '1' && (await requestCubeList());

      setNoteCdoItem(undefined);
      params.pageNo === '2' && (await requestNoteCountByFolderId());

      const noteCount = getNoteCount() || 0;
      setNoteCount(noteCount + 1);
    },
    [params.pageNo]
  );

  const update = useCallback(
    async (noteUdo: NoteUdo, id: string, index: number, note: Note) => {
      if (noteUdo.content === null || noteUdo.content === '') {
        reactAlert({
          title: getPolyglotText('??????', 'mypage-noteList-??????3'),
          message: getPolyglotText(
            '?????? ????????? ??????????????????.',
            'mypage-noteList-????????????2'
          ),
        });
        return;
      }

      noteUdo.playSecond = note.noteContents[index].playSecond || 0;

      await saveNote(undefined, id, noteUdo);
      params.pageNo === '2' && (await requestCubeListByFolderId());
      params.pageNo === '1' && (await requestCubeList());
      // await searchNoteByCubeId(index, note.cubeId || '', note.cardId);

      setNoteUdoItem(undefined);
    },
    [params.pageNo]
  );

  const updateForm = useCallback(
    async (index: number, note: Note, cubeId?: string) => {
      if (noteCdoItem !== undefined || noteUdoItem !== undefined) {
        reactAlert({
          title: getPolyglotText('??????', 'mypage-noteList-??????4'),
          message: getPolyglotText(
            '?????? ?????? ????????? ??????????????????',
            'mypage-noteList-????????????2'
          ),
        });
        return;
      }
      setNoteUdoItem(
        getNoteUdoItem(index, cubeId, {
          content: note.noteContents[index].content,
          playSecond: note.noteContents[index].playSecond || 0,
        })
      );
    },
    [noteCdoItem, noteUdoItem]
  );

  const deleteNote = useCallback(
    async (id: string) => {
      reactConfirm({
        title: getPolyglotText('??????', 'mypage-noteList-??????5'),
        message: getPolyglotText(
          '????????? ?????????????????????????',
          'mypage-noteList-????????????'
        ),
        onCancel: () => {
          return true;
        },
        onOk: async () => {
          await deleteNoteById(id);

          params.pageNo === '1' && (await requestCubeList());
          params.pageNo === '1' && (await requestNoteCount());

          params.pageNo === '2' && (await requestCubeListByFolderId());
          params.pageNo === '2' && (await requestNoteCountByFolderId());
          // await searchNoteByCubeId(index, note.cubeId || '', note.cardId);

          // await requestNoteCount();
          // const noteCount = getNoteCount() || 0;
          // noteCount > 0 && setNoteCount(noteCount - 1);

          setNoteUdoItem(undefined);
        },
      });
    },
    [params.pageNo]
  );

  const handleNote = useCallback(
    (e: any, titleProps: any) => {
      const { index } = titleProps;

      if (activeIndexList?.find((f) => f === index) !== undefined) {
        setActiveIndexList(
          activeIndexList?.filter((f) => {
            if (f !== index) {
              return f;
            }
          })
        );
      } else {
        activeIndexList && setActiveIndexList(activeIndexList.concat(index));
      }
    },
    [activeIndexList]
  );

  const appendNoteList = useCallback(async () => {
    searchBox &&
      setSearchBox({
        ...searchBox,
        offset: (searchBox.offset || 0) + (searchBox.limit || 10),
      });
    params.pageNo === '1' && (await requestAppendCubeList());
    params.pageNo === '2' && (await requestAppendCubeListByFolderId());
  }, [searchBox]);

  const changeFolder = useCallback(
    async (noteId: string, folderId: string) => {
      if (folderId === 'addFolder') {
        history.push({
          pathname: `/my-training/my-page/EarnedNoteList/pages/2`,
        });
        return;
      }

      await changeFolderInNote(noteId, folderId);
      await search();
    },
    [folder]
  );

  const submit = useCallback(async (playTime: string) => {
    const playTimeArray = playTime.split(':');

    if (playTimeArray.length === 3) {
      const time: number =
        +playTimeArray[0] * 3600 + +playTimeArray[1] * 60 + +playTimeArray[2];
      sessionStorage.setItem('playTime', String(time));
    } else if (playTimeArray.length === 2) {
      const time: number = +playTimeArray[0] * 60 + +playTimeArray[1];
      sessionStorage.setItem('playTime', String(time));
    }
  }, []);

  const getColor = useCallback((categoryId: string): string => {
    let color = CategoryColorType.Default;

    switch (categoryId) {
      case 'CLG00001':
        color = CategoryColorType.AI;
        break;
      case 'CLG00002':
        color = CategoryColorType.DT;
        break;
      case 'CLG00006':
        color = CategoryColorType.Global;
        break;
      case 'CLG00007':
        color = CategoryColorType.Leadership;
        break;
      case 'CLG00008':
        color = CategoryColorType.Management;
        break;
      case 'CLG00004':
        color = CategoryColorType.SV;
        break;
      case 'CLG00003':
        color = CategoryColorType.Happiness;
        break;
      case 'CLG00019':
        color = CategoryColorType.SemicondDesign;
        break;
      case 'CLG00005':
        color = CategoryColorType.InnovationDesign;
        break;
      case 'CLG00020':
        color = CategoryColorType.BMDesign;
        break;
      case 'CLG0001c':
        color = CategoryColorType.EnergySolution;
    }
    return color;
  }, []);

  return (
    <div>
      <Segment className="full">
        {noteList &&
          noteList.results.map((item, index) => (
            <div className="note_area" key={index}>
              {/* ?????? ????????? */}
              <div className="note_title">
                <div className="tit">
                  <div className={`ui label ${getColor(item.collegeId)}`}>
                    {getCollgeName(item.collegeId)}
                  </div>
                  <strong className="header">
                    {parsePolyglotString(item.cardName)}
                  </strong>
                  <Link
                    className="time"
                    to={`/lecture/card/${item.cardId}/cube/${item.cubeId}/view/${item.cubeType}`}
                  >
                    <p>{parsePolyglotString(item.cubeName)}</p>
                  </Link>
                </div>

                <div className="option_box">
                  <Select
                    placeholder={getPolyglotText(
                      '?????? ?????????',
                      'mypage-noteList-???????????????'
                    )}
                    options={folderOptions}
                    value={item.folderId}
                    onChange={(e, data) =>
                      changeFolder(item.id, data.value as string)
                    }
                  />
                </div>
              </div>
              {/* ?????? ?????????/????????? */}
              <Accordion>
                <Accordion.Title
                  active={
                    activeIndexList?.find((f) => f === index) !== undefined
                  }
                  index={index}
                  onClick={(e, title) => {
                    handleNote(e, title);
                  }}
                >
                  <Image
                    src={
                      activeIndexList?.find((f) => f === index) === undefined
                        ? `${PUBLIC_URL}/images/all/icon-pboard-close.svg`
                        : `${PUBLIC_URL}/images/all/icon-pboard-open.svg`
                    }
                    alt="?????????"
                  />
                </Accordion.Title>

                <Accordion.Content
                  active={
                    activeIndexList?.find((f) => f === index) !== undefined
                  }
                >
                  <div className="note_content">
                    <div className="note_content_total">
                      <div
                        className="note_content_total"
                        dangerouslySetInnerHTML={{
                          __html: getPolyglotText(
                            '<strong className="txt">????????? ??????</strong><span className="cnt"> {count}???</span>',
                            'mypage-noteList-????????????',
                            {
                              count:
                                (item.noteContents &&
                                  item.noteContents.length.toString()) ||
                                '0',
                            }
                          ),
                        }}
                      />
                      {/* ?????? ?????? ?????????????????? ?????? ?????? ??? ????????? ????????? ????????????.  active ????????? ????????? ?????? ?????? ??????(??????--> ????????? ) ??????????????? */}
                      <Button
                        className="btn_write"
                        onClick={() => writeNote(index, item)}
                      >
                        <Icon />
                        <span>Note</span>
                      </Button>
                    </div>
                    {noteCdoItem && noteCdoItem?.index === index && (
                      <div className="mynote mynote_write">
                        <div className="note_info">
                          <span className="date">
                            {moment().format(
                              getPolyglotText(
                                'YYYY??? MM??? DD??? ??????',
                                'mypage-noteList-date??????1'
                              )
                            )}
                          </span>
                        </div>
                        <Form>
                          <TextArea
                            placeholder={getPolyglotText(
                              'Note ????????? ??????????????????.',
                              'mypage-noteList-????????????1'
                            )}
                            value={noteCdoItem.noteCdo?.content}
                            onChange={(e, data) => {
                              (data.value as string).length < 1001 &&
                                setNoteCdoItem({
                                  ...noteCdoItem,
                                  index,
                                  noteCdo: {
                                    ...noteCdoItem.noteCdo,
                                    content: (data.value as string) || '',
                                  },
                                });
                            }}
                          />
                        </Form>
                        <div className="note_btn">
                          {/* <Button className="delete"><Image src={`${PUBLIC_URL}/images/all/icon-list-delete-24-px.svg`} /></Button> */}
                          <Button
                            className="cancel"
                            onClick={(e, data) => setNoteCdoItem(undefined)}
                          >
                            <PolyglotText
                              id="mypage-noteList-??????1"
                              defaultString="??????"
                            />
                          </Button>
                          <Button
                            className="save"
                            onClick={(e, data) =>
                              noteCdoItem.noteCdo &&
                              save(noteCdoItem.noteCdo, item.id, index)
                            }
                          >
                            <PolyglotText
                              id="mypage-noteList-??????1"
                              defaultString="??????"
                            />
                          </Button>
                          <span className="txt_cnt">
                            <span className="txt_now">
                              {noteCdoItem.noteCdo?.content?.length || '0'}
                            </span>
                            /<span>1000</span>
                          </span>
                        </div>
                      </div>
                    )}
                    {item.noteContents &&
                      item.noteContents.map((content, subIndex) => (
                        <div
                          key={subIndex}
                          className={`mynote ${
                            noteUdoItem?.index === subIndex && 'mynote_write'
                          }`}
                        >
                          <div className="note_info">
                            {playSecondToString(content.playSecond) ===
                            '00:00:00' ? (
                              <>
                                <Icon>
                                  <Image
                                    src={`${PUBLIC_URL}/images/all/btn-lms-note-14-px.svg`}
                                    alt="???????????????"
                                  />
                                </Icon>
                                {`Note ${
                                  (item.noteContents.length || 0) - subIndex
                                }`}
                              </>
                            ) : (
                              <Link
                                className="time"
                                to={`/lecture/card/${item.cardId}/cube/${item.cubeId}/view/${item.cubeType}`}
                                onClick={(e) =>
                                  submit(
                                    (content.playSecond &&
                                      playSecondToString(content.playSecond)) ||
                                      ''
                                  )
                                }
                              >
                                <Icon>
                                  <Image
                                    src={`${PUBLIC_URL}/images/all/icon-card-time-16-px-green.svg`}
                                  />
                                </Icon>
                                {playSecondToString(content.playSecond)}
                                <Icon className="icongo">
                                  <Image
                                    src={`${PUBLIC_URL}/images/all/icon-go-a.svg`}
                                  />
                                </Icon>
                              </Link>
                            )}

                            <span className="date">
                              {content.modifiedTime !== 0
                                ? moment(content.modifiedTime).format(
                                    getPolyglotText(
                                      'YYYY??? MM??? DD??? ??????',
                                      'mypage-noteList-date??????'
                                    )
                                  )
                                : content.registeredTime &&
                                  moment(content.registeredTime).format(
                                    getPolyglotText(
                                      'YYYY??? MM??? DD??? ??????',
                                      'mypage-noteList-date??????2'
                                    )
                                  )}
                            </span>
                          </div>
                          {(noteUdoItem?.index !== subIndex ||
                            noteUdoItem?.cubeId !== item.cubeId) && (
                            <p
                              className="note"
                              onClick={(e) =>
                                updateForm(subIndex, item, item.cubeId)
                              }
                              dangerouslySetInnerHTML={{
                                __html: `${getConvertEnter(content.content)}`,
                              }}
                            />
                          )}

                          {noteUdoItem &&
                            noteUdoItem?.index === subIndex &&
                            noteUdoItem?.cubeId === item.cubeId && (
                              <>
                                <Form>
                                  <TextArea
                                    placeholder={getPolyglotText(
                                      'Note ????????? ??????????????????.',
                                      'mypage-noteList-????????????2'
                                    )}
                                    value={noteUdoItem.noteUdo?.content}
                                    onChange={(e, data) =>
                                      (data.value as string).length < 1001 &&
                                      setNoteUdoItem({
                                        ...noteUdoItem,
                                        noteUdo: {
                                          ...noteUdoItem.noteUdo,
                                          content: (data.value as string) || '',
                                          playSecond:
                                            noteUdoItem.noteUdo?.playSecond ||
                                            0,
                                        },
                                      })
                                    }
                                  />
                                </Form>
                                <div className="note_btn">
                                  <Button
                                    className="delete"
                                    onClick={() => deleteNote(content.id)}
                                  >
                                    <Image
                                      src={`${PUBLIC_URL}/images/all/icon-list-delete-24-px.svg`}
                                    />
                                  </Button>
                                  <Button
                                    className="cancel"
                                    onClick={(e, data) =>
                                      setNoteUdoItem(undefined)
                                    }
                                  >
                                    <PolyglotText
                                      id="mypage-noteList-??????2"
                                      defaultString="??????"
                                    />
                                  </Button>
                                  <Button
                                    className="save"
                                    onClick={(e, data) =>
                                      noteUdoItem.noteUdo &&
                                      update(
                                        noteUdoItem.noteUdo,
                                        content.id,
                                        subIndex,
                                        item
                                      )
                                    }
                                  >
                                    <PolyglotText
                                      id="mypage-noteList-??????2"
                                      defaultString="??????"
                                    />
                                  </Button>
                                  <span className="txt_cnt">
                                    <span className="txt_now">
                                      {noteUdoItem.noteUdo?.content?.length ||
                                        '0'}
                                    </span>
                                    /<span>1000</span>
                                  </span>
                                </div>
                              </>
                            )}
                        </div>
                      ))}
                  </div>
                </Accordion.Content>
              </Accordion>
            </div>
          ))}

        {/* ?????? API count ?????? ??? ?????? ????????? */}

        {noteList &&
          searchBox &&
          (searchBox.offset || 0) + (searchBox.limit || 10) <
            noteList.totalCount && (
            <div className="more-comments">
              <Button
                className="icon left moreview"
                onClick={(e, data) => {
                  appendNoteList();
                }}
              >
                <Icon aria-hidden="true" className="moreview" />
                <PolyglotText
                  id="mypage-noteList-more"
                  defaultString="list more"
                />
              </Button>
            </div>
          )}
      </Segment>
    </div>
  );
};

export default NoteView;
