import React, { useState, useCallback, useEffect } from 'react';
import { Segment, Accordion, Image, Menu, Table, Select, Button, Label, Icon, Form, TextArea, DropdownDivider, DropdownProps } from 'semantic-ui-react';
import Calendar from './Calendar';
import { Link } from 'react-router-dom';
import { OffsetElementList } from '@nara.platform/accent';
import Note from '../../model/Note';
import { requestNoteList, requestColleges, requestNoteExcelList, requestCubeList } from '../../service/useNote/requestNote';
import { SearchBox } from '../../model/SearchBox';
import { setSearchBox } from '../../store/SearchBoxStore';
import NoteListItem, { getNoteListItem } from '../../viewModel/NoteListItem';
import moment from 'moment';
import Folder from '../../model/Folder';
import NoteCdoItem, { getNoteCdoItem } from '../../viewModel/NoteCdoItem';
import NoteCdo, { convertNoteToNoteCdo } from '../../model/NoteCdo';
import { saveNote } from '../../service/useNote/saveNote';
import NoteUdoItem, { getNoteUdoItem } from '../../viewModel/NoteUdoItem';
import NoteUdo from '../../model/NoteUdo';
import { deleteNoteById } from '../../service/useNote/deleteNote';
import classNames from 'classnames';
import { CollegeModel } from '../../../college/model/CollegeModel';
import XLSX from 'xlsx';
import { convertNoteToNoteXlsxModel, NoteXlsxModel } from '../../viewModel/NoteXlsxModel';

interface NoteHeaderViewProps {
  searchBox: SearchBox;
  colleges: Promise<CollegeModel[] | undefined>;
  noteCount: number;
  folder: Folder | undefined;
}

const NoteHeaderView: React.FC<NoteHeaderViewProps> = function NoteHeaderView({ searchBox, colleges, noteCount, folder }) {

  const PUBLIC_URL = process.env.PUBLIC_URL;

  const [activeIndex, setActiveIndex] = useState(9999);
  const [subNoteList, setSubNoteList] = useState<NoteListItem[]>();
  const [noteCdoItem, setNoteCdoItem] = useState<NoteCdoItem>();
  const [noteUdoItem, setNoteUdoItem] = useState<NoteUdoItem>();
  const [folderOptions, setFolderOptions] = useState<{ key: number, value: string, text: string }[]>([{ key: 0, value: '폴더 미지정', text: '폴더 미지정' }]);
  const [collegeList, setCollegeList] = useState<CollegeModel[]>();

  const [collegeOptions, setCollegeOptions] = useState<{ key: string, value: string, text: string }[]>([{ key: '', value: '', text: '전체' }]);
  const [channelOptions, setChannelOptions] = useState<{ key: string, value: string, text: string }[]>([{ key: '', value: '', text: '전체' }]);
  const [college, setCollege] = useState<string>('');
  const [channel, setChannel] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');
  const [searchType, setSearchType] = useState<string>('');


  const selectCollege = useCallback((colleges: CollegeModel[]) => {
    const collegesSelect: any = [];
    if (colleges) {
      collegesSelect.push({ key: '', text: '전체', value: '' });
      colleges.map((field, index) => {
        if (field.collegeType === 'University') {
          collegesSelect.push({
            key: index + 1,
            text: field.name,
            value: field.id,
          });
        }
      });
    }

    return collegesSelect;
  }, [colleges]);

  useEffect(() => {
    colleges.then(async result => {
      result && setCollegeOptions(selectCollege(result));
      setCollegeList(result);
    })
  }, [colleges]);

  const changeColleges = useCallback(async (data: DropdownProps) => {
    if (collegeList) {
      collegeList.map(f => { if (f.collegeId === data.value) { return f.channels } })

      const channelSelect: any = [];
      if (colleges) {
        channelSelect.push({ key: '', text: '전체', value: '' });
        collegeList.map((field, index) => {
          if (field.id === data.value) {
            field.channels.map((channel, i) => {
              channelSelect.push({
                key: i + 1,
                text: channel.name,
                value: channel.id,
              });
            });
          }
        });
      }
      setChannelOptions(channelSelect);
      setCollege(data.value as string);
      setChannel('');
    }
  }, [collegeList])


  const changeChannel = useCallback(async (data: DropdownProps) => {
    setChannel(data.value as string);
  }, [channelOptions])

  const SearchOptions = [
    { key: 'all', value: 'all', text: '전체' },
    { key: 'name', value: 'name', text: '과정명' },
    { key: 'content', value: 'content', text: '내용' },
  ]

  const handleSubmitClick = useCallback(
    async () => {
      // getMembers(communityId);
      // setActivePage(1);

      if (searchType === 'name') {
        setSearchBox({ ...searchBox, name: searchText, content: '' })
      } else if (searchType === 'content') {
        setSearchBox({ ...searchBox, name: '', content: searchText })
      } else if (searchType === 'content') {
        setSearchBox({ ...searchBox, name: '', content: '' })
      }

      setSearchBox({ ...searchBox, collegeId: college, channelId: channel });

      await requestCubeList();
    },
    [searchBox, searchText, searchType, college, channel]
  );

  const excelDownload = useCallback(
    async () => {
      requestNoteExcelList().then(async result => {
        if (result) {
          const noteXlsxModel: NoteXlsxModel[] = result.results.map((m, index) => {
            return convertNoteToNoteXlsxModel(m, index, folder, collegeList);
          })
          writeExcelFile(noteXlsxModel, '노트 엑셀');
        }
      });
    },
    [folder, collegeList]
  );

  const writeExcelFile = (xlsxList: NoteXlsxModel[], filename: string) => {
    const excel = XLSX.utils.json_to_sheet(xlsxList);
    const temp = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(temp, excel, filename);
    XLSX.writeFile(temp, `${filename}.xlsx`);
  };

  return (
    <div>
      <div className="cont-inner">
        <Menu className="note-tab">
          <Menu.Item
            name="NoteAll"
            active={true}
            // onClick={this.handleItemClick}
            as={Link}
            to="/my-training/my-page/EarnedNoteList/pages/1"
          >
            모아보기
          </Menu.Item>
          <Menu.Item
            name="NoteFolder"
            active={false}
            // onClick={this.handleItemClick}
            as={Link}
            to="/my-training/my-page/EarnedNoteList/pages/2"
          >
            폴더보기
          </Menu.Item>

        </Menu>
      </div>

      <Segment className="full">
        {/* 노트 검색 */}
        <div className="search_box">
          <Table>

            <Table.Body>
              <Table.Row>
                <Table.HeaderCell>가입일자</Table.HeaderCell>
                <Table.Cell>
                  <Calendar searchBox={searchBox} />
                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.HeaderCell>Category</Table.HeaderCell>
                <Table.Cell>
                  <div className="option_box">
                    <Select placeholder="전체" options={collegeOptions} onChange={(e, data) => changeColleges(data)} />
                  </div>
                  <div className="option_box">
                    <Select className="option_detail" placeholder="전체" options={channelOptions} value={channel} onChange={(e, data) => changeChannel(data)} />
                  </div>
                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.HeaderCell>검색어</Table.HeaderCell>
                <Table.Cell>
                  <div className="option_box">
                    <Select placeholder="전체" options={SearchOptions} onChange={(e, data) => { setSearchType(data.value as string) }} />
                  </div>
                  <div
                    className={classNames("ui input note_input", {
                    })}
                  >
                    <input
                      type="text"
                      placeholder="검색어를 입력해주세요."
                      value={searchText}
                      onKeyPress={e => e.key === 'Enter' && handleSubmitClick()}
                      onChange={(e: any) => setSearchText(e.target.value)}
                    />
                    <Button className="note_btn" onClick={() => handleSubmitClick()}>검색</Button>
                  </div>

                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>

        <div className="total_box">
          <span>총 <strong>{noteCount}개의 Note</strong></span>
          <Button className="btn_download" onClick={(e, data) => excelDownload()}><Image src={`${PUBLIC_URL}/images/all/icon-excel-24-px.svg`} alt="엑셀아이콘" />전체 Note 다운로드</Button>
        </div>

      </Segment >
    </div >
  )
};

export default NoteHeaderView;
