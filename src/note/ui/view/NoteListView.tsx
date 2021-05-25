import React, { useState, useCallback, useEffect } from 'react';
import { Segment, Accordion, Image, Menu, Table, Select, Button, Label, Icon, Form, TextArea, DropdownDivider, DropdownProps } from 'semantic-ui-react';
import Calendar from './Calendar';
import { Link } from 'react-router-dom';
import { OffsetElementList, reactAlert } from '@nara.platform/accent';
import Note from '../../model/Note';
import { requestNoteList, requestColleges, requestNoteCount, requestAppendCubeList } from '../../service/useNote/requestNote';
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
import { requestCubeListByFolderId } from '../../service/useFolder/requestFolder';

interface NoteViewProps {
  noteList: OffsetElementList<Note>;
  searchBox: SearchBox;
  folder: Folder | undefined;
  colleges: CollegeModel[];
  search: () => void;
}

const NoteView: React.FC<NoteViewProps> = function NoteView({ noteList, searchBox, folder, colleges, search }) {

  const PUBLIC_URL = process.env.PUBLIC_URL;

  const [activeIndex, setActiveIndex] = useState(9999);
  const [subNoteList, setSubNoteList] = useState<NoteListItem[]>();
  const [noteCdoItem, setNoteCdoItem] = useState<NoteCdoItem>();
  const [noteUdoItem, setNoteUdoItem] = useState<NoteUdoItem>();
  const [folderOptions, setFolderOptions] = useState<{ key: number, value: string, text: string }[]>([{ key: 0, value: '폴더 미지정', text: '폴더 미지정' }]);
  const [collegeList, setCollegeList] = useState<CollegeModel[]>();


  useEffect(() => {

    folder && setFolderOptions(selectFolder(folder));

  }, [folder]);


  const selectFolder = useCallback((folder: Folder) => {
    const folderSelect: any = [];
    if (folder) {
      folderSelect.push({ key: '0000', text: '폴더미지정', value: '0000' });
      folder.folders.idNames.map((field, index) => {
        folderSelect.push({
          key: index + 1,
          text: field.name,
          value: field.id,
        });
      });
    }

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
    noteList && setSubNoteList([getNoteListItem(index, noteList)]);
    setNoteUdoItem(undefined);
    setNoteCdoItem(undefined);
  }, [subNoteList, searchBox])

  const writeNote = useCallback(async (index: number, note: Note) => {

    if (noteCdoItem !== undefined || noteUdoItem !== undefined) {
      reactAlert({
        title: '알림',
        message: '편집 중인 Note 내용을 저장해주세요.',
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

    await saveNote(noteCdo, id);
    await searchNoteByCubeId(index, noteCdo.cubeId || '', noteCdo.cardId);

    setNoteCdoItem(undefined);
    await requestNoteCount();
  }, [])

  const update = useCallback(async (noteUdo: NoteUdo, id: string, index: number, note: Note) => {
    if (noteUdo.content === null || noteUdo.content === '') {
      reactAlert({
        title: '알림',
        message: '노트 내용을 작성해주세요.',
      });
      return;
    }
    await saveNote(undefined, id, noteUdo);
    await searchNoteByCubeId(index, note.cubeId || '', note.cardId);

    setNoteUdoItem(undefined);
  }, [])

  const updateForm = useCallback(async (index: number, note: Note) => {
    if (noteCdoItem !== undefined || noteUdoItem !== undefined) {
      reactAlert({
        title: '알림',
        message: '편집 중인 Note 내용을 저장해주세요.',
      });
      return;
    }
    setNoteUdoItem(getNoteUdoItem(index, { content: note.content }));
  }, [noteCdoItem, noteUdoItem])

  const deleteNote = useCallback(async (id: string, index: number, note: Note) => {
    await deleteNoteById(id);
    await searchNoteByCubeId(index, note.cubeId || '', note.cardId);
    await requestNoteCount();
  }, [])

  const handleNote = (e: any, titleProps: any) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  const appendNoteList = useCallback(
    async () => {
      searchBox && setSearchBox({ ...searchBox, offset: (searchBox.offset || 0) + (searchBox.limit || 10) });
      await requestAppendCubeList();
    },
    [searchBox]
  );

  const changeFolder = useCallback(
    async (cardId: string, cubeId: string, folderId: string) => {
      await saveFolder(cardId, cubeId, folderId);
      await search();
    },
    [folder]
  );

  return (
    <div>
      <Segment className="full">
        {noteList && noteList.results.map((item, index) => (

          < div className="note_area" key={index}>
            {/* 노트 타이틀 */}
            < div className="note_title" >
              <div className="tit">
                <Label color="purple">{collegeList && collegeList?.filter(f => { if (f.id === item.collegeId) { return f } }).length > 0 && collegeList?.filter(f => { if (f.id === item.collegeId) { return f } })[0].name}</Label>
                <strong className="header">{item.cardName}</strong>
                <p>{item.cubeName}</p>
              </div>

              <div className="option_box">
                <Select placeholder="폴더 미지정" options={folderOptions} value={item.folderId} onChange={(e, data) => changeFolder(item.cardId, item.cubeId, data.value as string)} />
              </div>
            </div>
            {/* 노트 펼치기/숨기기 */}
            <Accordion>
              <Accordion.Title
                active={activeIndex === index}
                index={index}
                // onClick={handleNote}
                onClick={(e, title) => {
                  if (activeIndex !== index) {
                    searchNoteByCubeId(index, item.cubeId, item.cardId);
                  }
                  handleNote(e, title);
                }
                }

              >
                <Image src={activeIndex !== index ? `${PUBLIC_URL}/images/all/icon-pboard-close.svg` : `${PUBLIC_URL}/images/all/icon-pboard-open.svg`} alt="더보기" />
              </Accordion.Title>

              <Accordion.Content active={activeIndex === index}>

                {/* 노트 보기 및 작성 */}
                {/* <NoteContent1 /> */}
                <div className="note_content">
                  <div className="note_content_total">
                    <strong className="txt">작성한 노트</strong>
                    <span className="cnt">{subNoteList?.map(f => f.index === index && f.noteList.results.length)}개</span>

                    {/* 노트 작성 시작하게되면 폰트 색상 및 아이콘 변경이 있습니다.  active 클래스 추가될 경우 폰트 색상(회색--> 청록색 ) 변경됩니다 */}
                    <Button className="btn_write" onClick={() => writeNote(index, item)}><Icon /><span>Note</span></Button>
                  </div>

                  {subNoteList && subNoteList.map((subItem, subIndex) => (
                    subItem.index === index &&
                    subItem.noteList.results.map((subItem, subIndex) => (
                      <div key={subIndex} className={`mynote ${noteUdoItem?.index === subIndex && 'mynote_write'}`} onClick={(e) => noteUdoItem?.index !== subIndex && updateForm(subIndex, subItem)}>
                        <div className="note_info">
                          <Link className="time" to="">
                            {subItem.playTime && <Icon><Image src={`${PUBLIC_URL}/images/all/icon-card-time-16-px-green.svg`} /></Icon>}
                            {!subItem.playTime && <Icon><Image src={`${PUBLIC_URL}/images/all/btn-lms-note-14-px.svg`} alt="노트이미지" /></Icon>}
                            {subItem.playTime || `note ${subIndex + 1}`}
                            <Icon className="icongo"><Image src={`${PUBLIC_URL}/images/all/icon-go-a.svg`} /></Icon>
                          </Link>
                          <span className="date">{
                            subItem.updateDate !== 0 ? moment(subItem.updateDate).format('YYYY년 MM월 DD일 편집') :
                              subItem.createDate && moment(subItem.createDate).format('YYYY년 MM월 DD일 작성')
                          }
                          </span>
                        </div>
                        {noteUdoItem?.index !== subIndex &&
                          <p className="note">{subItem.content}</p>
                        }

                        {noteUdoItem && noteUdoItem?.index === subIndex && (
                          <>
                            <Form>
                              <TextArea placeholder="내용을 입력하시오" value={noteUdoItem.noteUdo?.content} onChange={(e, data) => setNoteUdoItem({ ...noteUdoItem, noteUdo: { ...noteUdoItem.noteUdo, content: data.value as string || '' } })} />
                              <span className="txt_cnt">
                                <span className="txt_now">{noteUdoItem.noteUdo?.content?.length || '0'}</span>
/<span>1000</span>
                              </span>
                            </Form>
                            <div className="note_btn">
                              <Button className="delete" onClick={(e, data) => deleteNote(subItem.id, index, item)}><Image src={`${PUBLIC_URL}/images/all/icon-list-delete-24-px.svg`} /></Button>
                              <Button className="cancel" onClick={(e, data) => setNoteUdoItem(undefined)}>취소</Button>
                              <Button className="save" onClick={(e, data) => noteUdoItem.noteUdo && update(noteUdoItem.noteUdo, subItem.id, index, item)}>저장</Button>
                            </div>
                          </>
                        )}
                      </div>
                    ))
                  ))}

                  {noteCdoItem && noteCdoItem?.index === index && (
                    <div className="mynote mynote_write">
                      <div className="note_info">
                        <Link className="time" to="">
                          {/* <Icon><Image src={`${PUBLIC_URL}/images/all/icon-card-time-16-px-green.svg`} /></Icon> */}
                          <Icon><Image src={`${PUBLIC_URL}/images/all/btn-lms-note-14-px.svg`} alt="노트이미지" /></Icon>
                          {/* 15:04 */}
                          <Icon className="icongo"><Image src={`${PUBLIC_URL}/images/all/icon-go-a.svg`} /></Icon>
                        </Link>
                        <span className="date">{moment().format('YYYY년 MM월 DD일 작성')}</span>
                      </div>
                      <Form>
                        <TextArea placeholder="내용을 입력하시오" value={noteCdoItem.noteCdo?.content} onChange={(e, data) => setNoteCdoItem({ ...noteCdoItem, noteCdo: { ...noteCdoItem.noteCdo, content: data.value as string || '' } })} />
                        <span className="txt_cnt">
                          <span className="txt_now">{noteCdoItem.noteCdo?.content?.length || '0'}</span>
/<span>1000</span>
                        </span>
                      </Form>
                      <div className="note_btn">
                        {/* <Button className="delete"><Image src={`${PUBLIC_URL}/images/all/icon-list-delete-24-px.svg`} /></Button> */}
                        <Button className="cancel" onClick={(e, data) => setNoteCdoItem(undefined)}>취소</Button>
                        <Button className="save" onClick={(e, data) => noteCdoItem.noteCdo && save(noteCdoItem.noteCdo, item.id, index)}>저장</Button>
                      </div>
                    </div>

                  )
                  }

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
