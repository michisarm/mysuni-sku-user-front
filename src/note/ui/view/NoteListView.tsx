import React, { useState, useCallback, useEffect } from 'react';
import {
  Segment,
  Accordion,
  Image,
  Menu,
  Table,
  Select,
  Button,
  Label,
  Icon,
  Form,
  TextArea,
  DropdownDivider,
  DropdownProps,
  SemanticCOLORS,
} from 'semantic-ui-react';
import Calendar from './Calendar';
import { Link, useHistory, useParams } from 'react-router-dom';
import {
  OffsetElementList,
  reactAlert,
  reactConfirm,
} from '@nara.platform/accent';
import Note, { getConvertEnter } from '../../model/Note';
import {
  requestNoteList,
  requestColleges,
  requestNoteCount,
  requestAppendCubeList,
  requestCubeList,
} from '../../service/useNote/requestNote';
import { SearchBox } from '../../model/SearchBox';
import { setSearchBox, getSearchBox } from '../../store/SearchBoxStore';
import NoteListItem, { getNoteListItem } from '../../viewModel/NoteListItem';
import moment from 'moment';
import Folder from '../../model/Folder';
import NoteCdoItem, { getNoteCdoItem } from '../../viewModel/NoteCdoItem';
import NoteCdo, { convertNoteToNoteCdo } from '../../model/NoteCdo';
import { saveNote, saveFolder } from '../../service/useNote/saveNote';
import NoteUdoItem, { getNoteUdoItem } from '../../viewModel/NoteUdoItem';
import NoteUdo from '../../model/NoteUdo';
import { deleteNoteById } from '../../service/useNote/deleteNote';
import classNames from 'classnames';
import { CollegeModel } from '../../../college/model/CollegeModel';
import {
  requestCubeListByFolderId,
  requestNoteCountByFolderId,
  requestAppendCubeListByFolderId,
} from '../../service/useFolder/requestFolder';
import { MyPageRouteParams } from '../../../myTraining/model/MyPageRouteParams';
import NoteCategoryColorType from '../../viewModel/NoteCategoryColorType';
import NoteWithLectureListItem, {
  getNoteWithLectureListItem,
} from '../../viewModel/NoteWithLectureListItem';
import NoteWithLecture from '../../model/NoteWithLecture';
import { setNoteCount, getNoteCount } from '../../store/NoteCountStore';
import CategoryColorType from '../../../shared/model/CategoryColorType';
import { parsePolyglotString } from '../../../shared/viewmodel/PolyglotString';
import { getDefaultLang } from '../../../lecture/model/LangSupport';
import { PolyglotText, getPolyglotText } from 'shared/ui/logic/PolyglotText';

interface NoteViewProps {
  noteList: OffsetElementList<NoteWithLecture>;
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
  const [subNoteList, setSubNoteList] = useState<NoteWithLectureListItem[]>([]);
  const [noteCdoItem, setNoteCdoItem] = useState<NoteCdoItem>();
  const [noteUdoItem, setNoteUdoItem] = useState<NoteUdoItem>();
  const [folderOptions, setFolderOptions] = useState<
    { key: number; value: string; text: string }[]
  >([
    {
      key: 0,
      value: '0000',
      text: getPolyglotText('폴더미지정', 'mypage-noteList-폴더미지정2'),
    },
  ]);
  const [collegeList, setCollegeList] = useState<CollegeModel[]>();
  const history = useHistory();
  const params = useParams<MyPageRouteParams>();

  useEffect(() => {
    folder && setFolderOptions(selectFolder(folder));
  }, [folder]);

  useEffect(() => {
    //조회시 하위 목록 조회 초기화
    // setSubNoteList([]);
    setActiveIndexList([...activeIndexList]);

    noteList &&
      noteList.results.forEach(async (m, index) => {
        if (activeIndexList.some((target) => target === index)) {
          await searchNoteByCubeId(
            index,
            m.lectureRom.cubeId,
            m.lectureRom.cardId
          );
        }
      });
  }, [noteList]);

  const selectFolder = useCallback((folder: Folder) => {
    const folderSelect: any = [];
    folderSelect.push({
      key: '0000',
      text: getPolyglotText('폴더미지정', 'mypage-noteList-폴더미지정3'),
      value: '0000',
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
        text: '+' + getPolyglotText('폴더만들기', 'mypage-noteList-폴더만들기'),
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

      const noteList = await requestNoteList();
      console.log(noteList);
      noteList &&
        setSubNoteList(
          subNoteList
            ?.filter((f) => {
              if (f.index !== index) {
                return f;
              }
            })
            .concat([getNoteWithLectureListItem(index, noteList)])
        );
      setNoteUdoItem(undefined);
      setNoteCdoItem(undefined);
    },
    [subNoteList, searchBox]
  );

  const writeNote = useCallback(
    async (index: number, noteWithLecture: NoteWithLecture) => {
      if (noteCdoItem !== undefined || noteUdoItem !== undefined) {
        reactAlert({
          title: getPolyglotText('알림', 'mypage-noteList-알림1'),
          message: getPolyglotText(
            '작성 중인 노트를 저장해주세요',
            'mypage-noteList-노트저장1'
          ),
        });
        return;
      }

      setNoteCdoItem(
        getNoteCdoItem(index, convertNoteToNoteCdo(noteWithLecture.note))
      );
    },
    [noteCdoItem, noteUdoItem]
  );

  const save = useCallback(
    async (noteCdo: NoteCdo, id: string, index: number) => {
      console.log(activeIndexList);
      if (noteCdo.content === null || noteCdo.content === '') {
        reactAlert({
          title: getPolyglotText('알림', 'mypage-noteList-알림2'),
          message: getPolyglotText(
            '노트 내용을 작성해주세요.',
            'mypage-noteList-노트작성1'
          ),
        });
        return;
      }

      // My Page에서 신규 저장 시 cubeType에 관계없이 기본 값 지정
      noteCdo.playTime = '00:00:00';
      if (
        noteCdo.cubeType !== null &&
        (noteCdo.cubeType === 'Audio' || noteCdo.cubeType === 'Video')
      ) {
        noteCdo.playTime = 'Note';
      }

      await saveNote(noteCdo, id);

      params.pageNo === '2' && (await requestCubeListByFolderId());
      params.pageNo === '1' && (await requestCubeList());

      // await searchNoteByCubeId(index, noteCdo.cubeId || '', noteCdo.cardId);

      setNoteCdoItem(undefined);
      params.pageNo === '2' && (await requestNoteCountByFolderId());
      // await requestNoteCount();
      const noteCount = getNoteCount() || 0;
      setNoteCount(noteCount + 1);
      console.log(activeIndexList);
    },
    [params.pageNo]
  );

  const update = useCallback(
    async (noteUdo: NoteUdo, id: string, index: number, note: Note) => {
      if (noteUdo.content === null || noteUdo.content === '') {
        reactAlert({
          title: getPolyglotText('알림', 'mypage-noteList-알림3'),
          message: getPolyglotText(
            '노트 내용을 작성해주세요.',
            'mypage-noteList-노트작성2'
          ),
        });
        return;
      }

      noteUdo.playTime =
        note.playTime.indexOf('Note ') === -1 ? note.playTime : 'Note';

      await saveNote(undefined, id, noteUdo);
      params.pageNo === '2' && (await requestCubeListByFolderId());
      params.pageNo === '1' && (await requestCubeList());
      // await searchNoteByCubeId(index, note.cubeId || '', note.cardId);

      setNoteUdoItem(undefined);
      console.log(activeIndexList);
    },
    [params.pageNo]
  );

  const updateForm = useCallback(
    async (index: number, note: Note, cubeId?: string) => {
      if (noteCdoItem !== undefined || noteUdoItem !== undefined) {
        reactAlert({
          title: getPolyglotText('알림', 'mypage-noteList-알림4'),
          message: getPolyglotText(
            '작성 중인 노트를 저장해주세요',
            'mypage-noteList-노트저장2'
          ),
        });
        return;
      }
      setNoteUdoItem(getNoteUdoItem(index, cubeId, { content: note.content }));
    },
    [noteCdoItem, noteUdoItem]
  );

  const deleteNote = useCallback(
    async (id: string, index: number, note: Note) => {
      reactConfirm({
        title: getPolyglotText('알림', 'mypage-noteList-알림5'),
        message: getPolyglotText(
          '노트를 삭제하시겠습니까?',
          'mypage-noteList-노트삭제'
        ),
        onCancel: () => {
          return true;
        },
        onOk: async () => {
          await deleteNoteById(id);
          params.pageNo === '2' && (await requestCubeListByFolderId());
          params.pageNo === '1' && (await requestCubeList());
          // await searchNoteByCubeId(index, note.cubeId || '', note.cardId);
          params.pageNo === '2' && (await requestNoteCountByFolderId());

          // await requestNoteCount();
          const noteCount = getNoteCount() || 0;
          noteCount > 0 && setNoteCount(noteCount - 1);
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
    async (cardId: string, cubeId: string, folderId: string) => {
      if (folderId === 'addFolder') {
        history.push({
          pathname: `/my-training/my-page/EarnedNoteList/pages/2`,
        });
        return;
      }

      await saveFolder(cardId, cubeId, folderId);
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
              {/* 노트 타이틀 */}
              <div className="note_title">
                <div className="tit">
                  <div
                    className={`ui label ${getColor(
                      item.lectureRom.collegeId
                    )}`}
                  >
                    {collegeList &&
                      collegeList?.filter((f) => {
                        if (f.id === item.lectureRom.collegeId) {
                          return f;
                        }
                      }).length > 0 &&
                      parsePolyglotString(
                        collegeList?.filter((f) => {
                          if (f.id === item.lectureRom.collegeId) {
                            return f;
                          }
                        })[0].name,
                        getDefaultLang(
                          collegeList?.filter((f) => {
                            if (f.id === item.lectureRom.collegeId) {
                              return f;
                            }
                          })[0].langSupports
                        )
                      )}
                  </div>
                  <strong className="header">
                    {parsePolyglotString(item.lectureRom.cardName)}
                  </strong>
                  <Link
                    className="time"
                    to={`/lecture/card/${item.lectureRom.cardId}/cube/${item.lectureRom.cubeId}/view/${item.note.cubeType}`}
                  >
                    <p>{parsePolyglotString(item.lectureRom.cubeName)}</p>
                  </Link>
                </div>

                <div className="option_box">
                  <Select
                    placeholder={getPolyglotText(
                      '폴더 미지정',
                      'mypage-noteList-폴더미지정'
                    )}
                    options={folderOptions}
                    value={item.note.folderId}
                    onChange={(e, data) =>
                      changeFolder(
                        item.note.cardId,
                        item.note.cubeId,
                        data.value as string
                      )
                    }
                  />
                </div>
              </div>
              {/* 노트 펼치기/숨기기 */}
              <Accordion>
                <Accordion.Title
                  active={
                    activeIndexList?.find((f) => f === index) !== undefined
                  }
                  index={index}
                  onClick={(e, title) => {
                    if (
                      activeIndexList?.find((f) => f === index) === undefined
                    ) {
                      searchNoteByCubeId(
                        index,
                        item.note.cubeId,
                        item.note.cardId
                      );
                    }
                    handleNote(e, title);
                  }}
                >
                  <Image
                    src={
                      activeIndexList?.find((f) => f === index) === undefined
                        ? `${PUBLIC_URL}/images/all/icon-pboard-close.svg`
                        : `${PUBLIC_URL}/images/all/icon-pboard-open.svg`
                    }
                    alt="더보기"
                  />
                </Accordion.Title>

                <Accordion.Content
                  active={
                    activeIndexList?.find((f) => f === index) !== undefined
                  }
                >
                  {/* 노트 보기 및 작성 */}
                  {/* <NoteContent1 /> */}
                  <div className="note_content">
                    <div className="note_content_total">
                      {/* <strong className="txt">
                        <PolyglotText
                          id="mypage-noteList-작성노트"
                          defaultString="작성한 노트"
                        />
                      </strong>
                      <span
                        className="cnt"
                        dangerouslySetInnerHTML={{
                          __html: getPolyglotText(
                            '{count}개',
                            'mypage-noteList-노트수',
                            {
                              count: subNoteList
                                .filter((f) => f.index === index)
                                .map(
                                  (f) => f.noteWithLectureList.results.length
                                )
                                .toString(),
                            }
                          ),
                        }}
                      /> */}
                      <div
                        className="note_content_total"
                        dangerouslySetInnerHTML={{
                          __html: getPolyglotText(
                            '<strong className="txt">작성한 노트</strong><span className="cnt"> {count}개</span>',
                            'mypage-noteList-작성노트',
                            {
                              count: subNoteList
                                ?.filter((f) => f.index === index)
                                .map(
                                  (f) => f.noteWithLectureList.results.length
                                )
                                .toString(),
                            }
                          ),
                        }}
                      />
                      {/* 노트 작성 시작하게되면 폰트 색상 및 아이콘 변경이 있습니다.  active 클래스 추가될 경우 폰트 색상(회색--> 청록색 ) 변경됩니다 */}
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
                                'YYYY년 MM월 DD일 작성',
                                'mypage-noteList-date작성1'
                              )
                            )}
                          </span>
                        </div>
                        <Form>
                          <TextArea
                            placeholder={getPolyglotText(
                              'Note 내용을 입력해주세요.',
                              'mypage-noteList-내용입력1'
                            )}
                            value={noteCdoItem.noteCdo?.content}
                            onChange={(e, data) => {
                              (data.value as string).length < 1001 &&
                                setNoteCdoItem({
                                  ...noteCdoItem,
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
                              id="mypage-noteList-취소1"
                              defaultString="취소"
                            />
                          </Button>
                          <Button
                            className="save"
                            onClick={(e, data) =>
                              noteCdoItem.noteCdo &&
                              save(noteCdoItem.noteCdo, item.note.id, index)
                            }
                          >
                            <PolyglotText
                              id="mypage-noteList-저장1"
                              defaultString="저장"
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
                    {subNoteList &&
                      subNoteList.map(
                        (subNoteItem, subIndex) =>
                          subNoteItem.index === index &&
                          subNoteItem.noteWithLectureList.results.map(
                            (subItem, subIndex) => (
                              <div
                                key={subIndex}
                                className={`mynote ${
                                  noteUdoItem?.index === subIndex &&
                                  'mynote_write'
                                }`}
                              >
                                <div className="note_info">
                                  {subItem.note.playTime &&
                                    subItem.note.playTime.indexOf('Note ') ===
                                      -1 &&
                                    (subItem.note.cubeType === 'Video' ||
                                      subItem.note.cubeType === 'Audio') && (
                                      <Link
                                        className="time"
                                        to={`/lecture/card/${subItem.note.cardId}/cube/${subItem.note.cubeId}/view/${subItem.note.cubeType}`}
                                        onClick={(e) =>
                                          submit(subItem.note.playTime)
                                        }
                                      >
                                        <Icon>
                                          <Image
                                            src={`${PUBLIC_URL}/images/all/icon-card-time-16-px-green.svg`}
                                          />
                                        </Icon>
                                        {subItem.note.playTime}
                                        <Icon className="icongo">
                                          <Image
                                            src={`${PUBLIC_URL}/images/all/icon-go-a.svg`}
                                          />
                                        </Icon>
                                      </Link>
                                    )}
                                  {(!subItem.note.playTime ||
                                    subItem.note.playTime.indexOf('Note ') >
                                      -1 ||
                                    (subItem.note.cubeType !== 'Video' &&
                                      subItem.note.cubeType !== 'Audio')) && (
                                    <Icon>
                                      <Image
                                        src={`${PUBLIC_URL}/images/all/btn-lms-note-14-px.svg`}
                                        alt="노트이미지"
                                      />
                                    </Icon>
                                  )}
                                  {(!subItem.note.playTime ||
                                    (subItem.note.cubeType !== 'Video' &&
                                      subItem.note.cubeType !== 'Audio')) &&
                                    `Note ${
                                      subNoteItem.noteWithLectureList.results
                                        .length - subIndex
                                    }`}
                                  {subItem.note.playTime &&
                                    subItem.note.playTime.indexOf('Note ') >
                                      -1 &&
                                    (subItem.note.cubeType === 'Video' ||
                                      subItem.note.cubeType === 'Audio') &&
                                    `${subItem.note.playTime}`}
                                  <span className="date">
                                    {subItem.note.modifiedTime !== 0
                                      ? moment(
                                          subItem.note.modifiedTime
                                        ).format(
                                          getPolyglotText(
                                            'YYYY년 MM월 DD일 편집',
                                            'mypage-noteList-date편집'
                                          )
                                        )
                                      : subItem.note.registeredTime &&
                                        moment(
                                          subItem.note.registeredTime
                                        ).format(
                                          getPolyglotText(
                                            'YYYY년 MM월 DD일 작성',
                                            'mypage-noteList-date작성2'
                                          )
                                        )}
                                  </span>
                                </div>
                                {(noteUdoItem?.index !== subIndex ||
                                  noteUdoItem?.cubeId !== item.note.cubeId) && (
                                  <p
                                    className="note"
                                    onClick={(e) =>
                                      updateForm(
                                        subIndex,
                                        subItem.note,
                                        item.note.cubeId
                                      )
                                    }
                                    dangerouslySetInnerHTML={{
                                      __html: `${getConvertEnter(
                                        subItem.note.content
                                      )}`,
                                    }}
                                  />
                                )}

                                {noteUdoItem &&
                                  noteUdoItem?.index === subIndex &&
                                  noteUdoItem?.cubeId === item.note.cubeId && (
                                    <>
                                      <Form>
                                        <TextArea
                                          placeholder={getPolyglotText(
                                            'Note 내용을 입력해주세요.',
                                            'mypage-noteList-내용입력2'
                                          )}
                                          value={noteUdoItem.noteUdo?.content}
                                          onChange={(e, data) =>
                                            (data.value as string).length <
                                              1001 &&
                                            setNoteUdoItem({
                                              ...noteUdoItem,
                                              noteUdo: {
                                                ...noteUdoItem.noteUdo,
                                                content:
                                                  (data.value as string) || '',
                                              },
                                            })
                                          }
                                        />
                                      </Form>
                                      <div className="note_btn">
                                        <Button
                                          className="delete"
                                          onClick={(e, data) =>
                                            deleteNote(
                                              subItem.note.id,
                                              index,
                                              item.note
                                            )
                                          }
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
                                            id="mypage-noteList-취소2"
                                            defaultString="취소"
                                          />
                                        </Button>
                                        <Button
                                          className="save"
                                          onClick={(e, data) =>
                                            noteUdoItem.noteUdo &&
                                            update(
                                              noteUdoItem.noteUdo,
                                              subItem.note.id,
                                              index,
                                              subItem.note
                                            )
                                          }
                                        >
                                          <PolyglotText
                                            id="mypage-noteList-저장2"
                                            defaultString="저장"
                                          />
                                        </Button>
                                        <span className="txt_cnt">
                                          <span className="txt_now">
                                            {noteUdoItem.noteUdo?.content
                                              ?.length || '0'}
                                          </span>
                                          /<span>1000</span>
                                        </span>
                                      </div>
                                    </>
                                  )}
                              </div>
                            )
                          )
                      )}
                  </div>
                </Accordion.Content>
              </Accordion>
            </div>
          ))}

        {/* 차후 API count 변경 후 확인 필요함 */}

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
