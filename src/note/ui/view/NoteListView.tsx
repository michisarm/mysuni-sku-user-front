import React, { useState, useCallback, useEffect } from 'react';
import { Segment, Accordion, Image, Menu, Table, Select, Button, Label, Icon, Form, TextArea, DropdownDivider, DropdownProps, SemanticCOLORS } from 'semantic-ui-react';
import Calendar from './Calendar';
import { Link, useHistory, useParams } from 'react-router-dom';
import { OffsetElementList, reactAlert, reactConfirm } from '@nara.platform/accent';
import Note from '../../model/Note';
import { requestNoteList, requestColleges, requestNoteCount, requestAppendCubeList, requestCubeList } from '../../service/useNote/requestNote';
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
import { requestCubeListByFolderId, requestNoteCountByFolderId, requestAppendCubeListByFolderId } from '../../service/useFolder/requestFolder';
import { MyPageRouteParams } from '../../../myTraining/model/MyPageRouteParams';
import NoteCategoryColorType from '../../viewModel/NoteCategoryColorType';

interface NoteViewProps {
  noteList: OffsetElementList<Note>;
  searchBox: SearchBox;
  folder: Folder | undefined;
  colleges: CollegeModel[];
  search: () => void;
}

const NoteView: React.FC<NoteViewProps> = function NoteView({ noteList, searchBox, folder, colleges, search }) {

  const PUBLIC_URL = process.env.PUBLIC_URL;

  const [activeIndexList, setActiveIndexList] = useState<number[]>([-1]);
  const [subNoteList, setSubNoteList] = useState<NoteListItem[]>([]);
  const [noteCdoItem, setNoteCdoItem] = useState<NoteCdoItem>();
  const [noteUdoItem, setNoteUdoItem] = useState<NoteUdoItem>();
  const [folderOptions, setFolderOptions] = useState<{ key: number, value: string, text: string }[]>([{ key: 0, value: '0000', text: '폴더미지정' }]);
  const [collegeList, setCollegeList] = useState<CollegeModel[]>();
  const history = useHistory();
  const params = useParams<MyPageRouteParams>();

  useEffect(() => {
    folder && setFolderOptions(selectFolder(folder));
  }, [folder]);

  useEffect(() => {
    //조회시 하위 목록 조회 초기화
    setSubNoteList([]);
    setActiveIndexList([-1]);

    // noteList && noteList.results.map((m, index) => searchNoteByCubeId(index, m.cubeId, m.cardId))

  }, [noteList]);

  const selectFolder = useCallback((folder: Folder) => {
    const folderSelect: any = [];
    folderSelect.push({ key: '0000', text: '폴더미지정', value: '0000' });
    if (folder) {
      folder.folders.idNames.map((field, index) => {
        folderSelect.push({
          key: index + 1,
          text: field.name,
          value: field.id,
        });
      });
    }
    params.pageNo === '1' && folderSelect.push({ key: 'addFolder', text: '+폴더 만들기', value: 'addFolder' });
    return folderSelect;
  }, []);

  useEffect(() => {
    setCollegeList(colleges);
  }, [colleges]);


  const searchNoteByCubeId = useCallback(async (index: number, cubeId: string, cardId?: string) => {
    setSearchBox({
      ...searchBox,
      cardId,
      cubeId,
      limit: 9999,
      offset: 0
    });

    const noteList = await requestNoteList();
    noteList && setSubNoteList(subNoteList?.filter(f => { if (f.index !== index) { return f } }).concat([getNoteListItem(index, noteList)]));
    setNoteUdoItem(undefined);
    setNoteCdoItem(undefined);
  }, [subNoteList, searchBox])

  const writeNote = useCallback(async (index: number, note: Note) => {

    if (noteCdoItem !== undefined || noteUdoItem !== undefined) {
      reactAlert({
        title: '알림',
        message: '작성 중인 노트를 저장해주세요',
      });
      return;
    }

    setNoteCdoItem(getNoteCdoItem(index, convertNoteToNoteCdo(note)));
  }, [noteCdoItem, noteUdoItem])

  const save = useCallback(async (noteCdo: NoteCdo, id: string, index: number) => {

    if (noteCdo.content === null || noteCdo.content === '') {
      reactAlert({
        title: '알림',
        message: '노트 내용을 작성해주세요.',
      });
      return;
    }

    if (noteCdo.cubeType !== null && (noteCdo.cubeType === 'Audio' || noteCdo.cubeType === 'Video')) {
      noteCdo.playTime = '00:00:00'
    }

    await saveNote(noteCdo, id);

    params.pageNo === '2' && await requestCubeListByFolderId();
    params.pageNo === '1' && await requestCubeList();

    // await searchNoteByCubeId(index, noteCdo.cubeId || '', noteCdo.cardId);

    setNoteCdoItem(undefined);
    params.pageNo === '2' && await requestNoteCountByFolderId();
    await requestNoteCount();
  }, [params.pageNo])

  const update = useCallback(async (noteUdo: NoteUdo, id: string, index: number, note: Note) => {
    if (noteUdo.content === null || noteUdo.content === '') {
      reactAlert({
        title: '알림',
        message: '노트 내용을 작성해주세요.',
      });
      return;
    }

    noteUdo.playTime = note.playTime;

    await saveNote(undefined, id, noteUdo);
    params.pageNo === '2' && await requestCubeListByFolderId();
    params.pageNo === '1' && await requestCubeList();
    // await searchNoteByCubeId(index, note.cubeId || '', note.cardId);

    setNoteUdoItem(undefined);
  }, [params.pageNo])

  const updateForm = useCallback(async (index: number, note: Note, cubeId?: string) => {
    if (noteCdoItem !== undefined || noteUdoItem !== undefined) {
      reactAlert({
        title: '알림',
        message: '작성 중인 노트를 저장해주세요',
      });
      return;
    }
    setNoteUdoItem(getNoteUdoItem(index, cubeId, { content: note.content }));
  }, [noteCdoItem, noteUdoItem])

  const deleteNote = useCallback(async (id: string, index: number, note: Note) => {
    reactConfirm({
      title: '알림',
      message: '노트를 삭제하시겠습니까?',
      onCancel: () => { return true },
      onOk: async () => {
        await deleteNoteById(id);
        params.pageNo === '2' && await requestCubeListByFolderId();
        params.pageNo === '1' && await requestCubeList();
        // await searchNoteByCubeId(index, note.cubeId || '', note.cardId);
        params.pageNo === '2' && await requestNoteCountByFolderId();
        await requestNoteCount();
      }
    });
  }, [params.pageNo])

  const handleNote = useCallback((e: any, titleProps: any) => {
    const { index } = titleProps;

    if (activeIndexList?.find(f => f === index) !== undefined) {
      setActiveIndexList(activeIndexList?.filter(f => { if (f !== index) { return f } }));
    } else {
      activeIndexList && setActiveIndexList(activeIndexList.concat(index));
    }

  }, [activeIndexList])

  const appendNoteList = useCallback(
    async () => {
      searchBox && setSearchBox({ ...searchBox, offset: (searchBox.offset || 0) + (searchBox.limit || 10) });
      params.pageNo === '1' && await requestAppendCubeList();
      params.pageNo === '2' && await requestAppendCubeListByFolderId();
    },
    [searchBox]
  );

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

  const submit = useCallback(
    async (playTime: string) => {

      const playTimeArray = playTime.split(':');

      if (playTimeArray.length === 3) {
        const time: number = (+playTimeArray[0]) * 3600 + (+playTimeArray[1]) * 60 + (+playTimeArray[2]);
        sessionStorage.setItem('playTime', String(time));
      } else if (playTimeArray.length === 2) {
        const time: number = (+playTimeArray[0]) * 60 + (+playTimeArray[1]);
        sessionStorage.setItem('playTime', String(time));
      }
    },
    []
  );

  const getColor = useCallback((categoryId: string): SemanticCOLORS => {
    switch (categoryId) {
      case 'CLG00001':
        return NoteCategoryColorType.AI;
      case 'CLG00002':
        return NoteCategoryColorType.DT;
      case 'CLG00006':
        return NoteCategoryColorType.Global;
      case 'CLG00007':
        return NoteCategoryColorType.Leadership;
      case 'CLG00008':
        return NoteCategoryColorType.Management;
      case 'CLG00004':
        return NoteCategoryColorType.SV;
      case 'CLG00003':
        return NoteCategoryColorType.Happiness;
      case 'CLG00019':
        return NoteCategoryColorType.SemicondDesign;
      case 'CLG00005':
        return NoteCategoryColorType.InnovationDesign;
      case 'CLG00020':
        return NoteCategoryColorType.BMDesign;
      case 'CLG0001c':
        return NoteCategoryColorType.EnergySolution;
      default:
        return NoteCategoryColorType.Default;
    }
  },
    []
  );

  return (
    <div>
      <Segment className="full">
        {noteList && noteList.results.map((item, index) => (

          < div className="note_area" key={index}>
            {/* 노트 타이틀 */}
            < div className="note_title" >
              <div className="tit">
                <Label color={getColor(item.collegeId)}>{collegeList && collegeList?.filter(f => { if (f.id === item.collegeId) { return f } }).length > 0 && collegeList?.filter(f => { if (f.id === item.collegeId) { return f } })[0].name}</Label>
                <strong className="header">{item.cardName}</strong>
                <Link className="time" to={`/lecture/card/${item.cardId}/cube/${item.cubeId}/view/${item.cubeType}`}>
                  <p>
                    {item.cubeName}
                  </p>
                </Link>
              </div>

              <div className="option_box">
                <Select placeholder="폴더 미지정" options={folderOptions} value={item.folderId} onChange={(e, data) => changeFolder(item.cardId, item.cubeId, data.value as string)} />
              </div>
            </div>
            {/* 노트 펼치기/숨기기 */}
            <Accordion>
              <Accordion.Title
                active={activeIndexList?.find(f => f === index) !== undefined}

                index={index}
                onClick={(e, title) => {
                  if (activeIndexList?.find(f => f === index) === undefined) {
                    searchNoteByCubeId(index, item.cubeId, item.cardId);
                  }
                  handleNote(e, title);
                }
                }

              >
                <Image src={activeIndexList?.find(f => f === index) === undefined ? `${PUBLIC_URL}/images/all/icon-pboard-close.svg` : `${PUBLIC_URL}/images/all/icon-pboard-open.svg`} alt="더보기" />
              </Accordion.Title>

              <Accordion.Content active={activeIndexList?.find(f => f === index) !== undefined}>

                {/* 노트 보기 및 작성 */}
                {/* <NoteContent1 /> */}
                <div className="note_content">
                  <div className="note_content_total">
                    <strong className="txt">작성한 노트</strong>
                    <span className="cnt">{subNoteList?.map(f => f.index === index && f.noteList.results.length)}개</span>

                    {/* 노트 작성 시작하게되면 폰트 색상 및 아이콘 변경이 있습니다.  active 클래스 추가될 경우 폰트 색상(회색--> 청록색 ) 변경됩니다 */}
                    <Button className="btn_write" onClick={() => writeNote(index, item)}><Icon /><span>Note</span></Button>
                  </div>
                  {noteCdoItem && noteCdoItem?.index === index && (
                    <div className="mynote mynote_write">
                      <div className="note_info">
                        <span className="date">{moment().format('YYYY년 MM월 DD일 작성')}</span>
                      </div>
                      <Form>
                        <TextArea placeholder="Note 내용을 입력해주세요." value={noteCdoItem.noteCdo?.content} onChange={(e, data) => { (data.value as string).length < 1001 && setNoteCdoItem({ ...noteCdoItem, noteCdo: { ...noteCdoItem.noteCdo, content: data.value as string || '' } }) }} />
                      </Form>
                      <div className="note_btn">
                        {/* <Button className="delete"><Image src={`${PUBLIC_URL}/images/all/icon-list-delete-24-px.svg`} /></Button> */}
                        <Button className="cancel" onClick={(e, data) => setNoteCdoItem(undefined)}>취소</Button>
                        <Button className="save" onClick={(e, data) => noteCdoItem.noteCdo && save(noteCdoItem.noteCdo, item.id, index)}>저장</Button>
                        <span className="txt_cnt">
                          <span className="txt_now">{noteCdoItem.noteCdo?.content?.length || '0'}</span>
                        /<span>1000</span>
                        </span>
                      </div>
                    </div>
                  )
                  }
                  {subNoteList && subNoteList.map((subNoteItem, subIndex) => (
                    subNoteItem.index === index &&
                    subNoteItem.noteList.results.map((subItem, subIndex) => (
                      <div key={subIndex} className={`mynote ${noteUdoItem?.index === subIndex && 'mynote_write'}`} >
                        <div className="note_info">
                          {subItem.playTime && (subItem.cubeType === 'Video' || subItem.cubeType === 'Audio') &&
                            (
                              <Link className="time" to={`/lecture/card/${subItem.cardId}/cube/${subItem.cubeId}/view/${subItem.cubeType}`} onClick={(e) => submit(subItem.playTime)}>
                                <Icon><Image src={`${PUBLIC_URL}/images/all/icon-card-time-16-px-green.svg`} /></Icon>
                                {subItem.playTime}
                                <Icon className="icongo"><Image src={`${PUBLIC_URL}/images/all/icon-go-a.svg`} /></Icon>
                              </Link>
                            )
                          }
                          {(!subItem.playTime || (subItem.cubeType !== 'Video' && subItem.cubeType !== 'Audio')) && <Icon><Image src={`${PUBLIC_URL}/images/all/btn-lms-note-14-px.svg`} alt="노트이미지" /></Icon>}
                          {(!subItem.playTime || (subItem.cubeType !== 'Video' && subItem.cubeType !== 'Audio')) && `Note ${subNoteItem.noteList.results.length - subIndex}`}
                          <span className="date">{
                            subItem.updateDate !== 0 ? moment(subItem.updateDate).format('YYYY년 MM월 DD일 편집') :
                              subItem.createDate && moment(subItem.createDate).format('YYYY년 MM월 DD일 작성')
                          }
                          </span>
                        </div>
                        {(noteUdoItem?.index !== subIndex || noteUdoItem?.cubeId !== item.cubeId) && (
                          <p className="note"
                            onClick={(e) => updateForm(subIndex, subItem, item.cubeId)}
                            dangerouslySetInnerHTML={{
                              __html: `${subItem.content.replace('\n', "<br />")}`
                            }}
                          />
                        )
                        }

                        {noteUdoItem && noteUdoItem?.index === subIndex && noteUdoItem?.cubeId === item.cubeId && (
                          <>
                            <Form>
                              <TextArea placeholder="Note 내용을 입력해주세요." value={noteUdoItem.noteUdo?.content} onChange={(e, data) => (data.value as string).length < 1001 && setNoteUdoItem({ ...noteUdoItem, noteUdo: { ...noteUdoItem.noteUdo, content: data.value as string || '' } })} />
                            </Form>
                            <div className="note_btn">
                              <Button className="delete" onClick={(e, data) => deleteNote(subItem.id, index, item)}><Image src={`${PUBLIC_URL}/images/all/icon-list-delete-24-px.svg`} /></Button>
                              <Button className="cancel" onClick={(e, data) => setNoteUdoItem(undefined)}>취소</Button>
                              <Button className="save" onClick={(e, data) => noteUdoItem.noteUdo && update(noteUdoItem.noteUdo, subItem.id, index, subItem)}>저장</Button>
                              <span className="txt_cnt">
                                <span className="txt_now">{noteUdoItem.noteUdo?.content?.length || '0'}</span>
                        /<span>1000</span>
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    ))
                  ))}
                </div>

              </Accordion.Content>
            </Accordion>
          </div>

        ))
        }

        {/* 차후 API count 변경 후 확인 필요함 */}

        {noteList &&
          searchBox &&
          (searchBox.offset || 0) + (searchBox.limit || 10) < noteList.totalCount && (
            <div className="more-comments">
              <Button className="icon left moreview" onClick={(e, data) => { appendNoteList() }}>
                <Icon aria-hidden="true" className="moreview" />
                list more
              </Button>
            </div>
          )}
      </Segment >
    </div >
  )
};

export default NoteView;
