import React, { useState, useCallback, useEffect } from 'react';
import {
  Segment,
  Image,
  Menu,
  Table,
  Select,
  Button,
  Icon,
  DropdownProps,
} from 'semantic-ui-react';
import Calendar from './Calendar';
import { Link } from 'react-router-dom';
import { OffsetElementList } from '@nara.platform/accent';
import Note from '../../model/Note';
import {
  requestNoteExcelList,
  requestCubeList,
} from '../../service/useNote/requestNote';
import { SearchBox } from '../../model/SearchBox';
import { setSearchBox } from '../../store/SearchBoxStore';
import Folder from '../../model/Folder';
import classNames from 'classnames';
import { CollegeModel } from '../../../college/model';
import XLSX from 'xlsx';
import {
  convertNoteToNoteXlsxModel,
  NoteXlsxModel,
} from '../../viewModel/NoteXlsxModel';
import { PolyglotText, getPolyglotText } from 'shared/ui/logic/PolyglotText';
import { getCollgeName } from '../../../shared/service/useCollege/useRequestCollege';

interface NoteHeaderViewProps {
  noteList: OffsetElementList<Note>;
  searchBox: SearchBox;
  colleges: CollegeModel[];
  noteCount: number;
  folder: Folder | undefined;
}

const NoteHeaderView: React.FC<NoteHeaderViewProps> = function NoteHeaderView({
  noteList,
  searchBox,
  colleges,
  noteCount,
  folder,
}) {
  const PUBLIC_URL = process.env.PUBLIC_URL;

  const [collegeList, setCollegeList] = useState<CollegeModel[]>();

  const [collegeOptions, setCollegeOptions] = useState<
    { key: string; value: string; text: string }[]
  >([
    { key: '', value: '', text: getPolyglotText('전체', 'mypage-note-전체1') },
  ]);
  const [channelOptions, setChannelOptions] = useState<
    { key: string; value: string; text: string }[]
  >([
    { key: '', value: '', text: getPolyglotText('전체', 'mypage-note-전체2') },
  ]);
  const [college, setCollege] = useState<string>('');
  const [channel, setChannel] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');
  const [searchType, setSearchType] = useState<string>('all');

  const selectCollege = useCallback(
    (colleges: CollegeModel[]) => {
      const collegesSelect: any = [];
      if (colleges) {
        collegesSelect.push({
          key: '',
          text: getPolyglotText('전체', 'mypage-note-전체3'),
          value: '',
        });
        colleges.forEach((field, index) => {
          collegesSelect.push({
            key: index + 1,
            text: getCollgeName(field.id),
            value: field.id,
          });
        });
      }

      return collegesSelect;
    },
    [colleges]
  );

  useEffect(() => {
    colleges && setCollegeOptions(selectCollege(colleges));
    setCollegeList(colleges);
  }, [colleges]);

  useEffect(() => {
    // noteList &&
    // requestNoteCount('searchBox').then(async (result) => {
    //   if (result) {
    //     setSubNoteCount(result || 0);
    //   } else {
    //     setSubNoteCount(0);
    //   }
    // });
  }, [noteList]);

  const changeColleges = useCallback(
    async (data: DropdownProps) => {
      if (collegeList) {
        collegeList.map((f) => {
          if (f.collegeId === data.value) {
            return f.channels;
          }
        });

        // const channelSelect: any = [];
        // if (colleges) {
        //   channelSelect.push({
        //     key: '',
        //     text: getPolyglotText('전체', 'mypage-note-전체4'),
        //     value: '',
        //   });
        //   collegeList.map((field, index) => {
        //     if (field.id === data.value) {
        //       field.channels.map((channel, i) => {
        //         channelSelect.push({
        //           key: i + 1,
        //           text: parsePolyglotString(
        //             channel.name,
        //             getDefaultLang(channel.langSupports)
        //           ),
        //           value: channel.id,
        //         });
        //       });
        //     }
        //   });
        // }
        //
        // setChannelOptions(channelSelect);

        setCollege(data.value as string);
        setChannel('');
      }
    },
    [collegeList]
  );

  // const changeChannel = useCallback(
  //   async (data: DropdownProps) => {
  //     setChannel(data.value as string);
  //   },
  //   [channelOptions]
  // );

  const SearchOptions = [
    {
      key: 'all',
      value: 'all',
      text: getPolyglotText('전체', 'mypage-note-전체5'),
    },
    {
      key: 'name',
      value: 'name',
      text: getPolyglotText('과정명', 'mypage-note-과정명'),
    },
    {
      key: 'content',
      value: 'content',
      text: getPolyglotText('Note 내용', 'mypage-note-노트내용'),
    },
  ];

  const handleSubmitClick = useCallback(async () => {
    setSearchBox({ ...searchBox, offset: 0 });
    await requestCubeList();
  }, [searchBox]);

  useEffect(() => {
    if (searchType === 'name') {
      setSearchBox({
        ...searchBox,
        cubeName: searchText,
        content: '',
        collegeId: college,
        // channelId: channel,
      });
    } else if (searchType === 'content') {
      setSearchBox({
        ...searchBox,
        cubeName: '',
        content: searchText,
        collegeId: college,
        // channelId: channel,
      });
    } else if (searchType === 'all') {
      setSearchBox({
        ...searchBox,
        cubeName: '',
        content: '',
        collegeId: college,
        // channelId: channel,
      });
      setSearchText('');
    }
  }, [searchText, searchType, college, channel]);

  const excelDownload = useCallback(async () => {
    requestNoteExcelList().then(async (result) => {
      if (result) {
        const noteXlsxModel: NoteXlsxModel[] = [];
        let index = 0;

        result.results.map((m) => {
          const xlsx = convertNoteToNoteXlsxModel(m, index, folder);
          noteXlsxModel.push(...xlsx);
          index += m.noteContents.length;
        });
        writeExcelFile(noteXlsxModel, '노트 엑셀');
      }
    });
  }, [folder, collegeList]);

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
            <PolyglotText id="mypage-note-모아보기" defaultString="모아보기" />
          </Menu.Item>
          <Menu.Item
            name="NoteFolder"
            active={false}
            // onClick={this.handleItemClick}
            as={Link}
            to="/my-training/my-page/EarnedNoteList/pages/2"
          >
            <PolyglotText id="mypage-note-폴더보기" defaultString="폴더보기" />
          </Menu.Item>
        </Menu>
      </div>

      <Segment className="full">
        {/* 노트 검색 김민준-번역필요 */}
        <div className="search_box">
          <Table>
            <Table.Body>
              <Table.Row>
                <Table.HeaderCell>
                  <PolyglotText
                    id="mypage-note-작성일자"
                    defaultString="Note 작성일자"
                  />
                </Table.HeaderCell>
                <Table.Cell>
                  <Calendar searchBox={searchBox} />
                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.HeaderCell>
                  <PolyglotText
                    id="mypage-note-Category"
                    defaultString="Category"
                  />
                </Table.HeaderCell>
                <Table.Cell>
                  <div className="option_box">
                    <Select
                      placeholder={getPolyglotText('전체', 'mypage-note-전체6')}
                      options={collegeOptions}
                      onChange={(e, data) => changeColleges(data)}
                    />
                  </div>
                  {/*<div className="option_box">*/}
                  {/*  <Select*/}
                  {/*    className="option_detail"*/}
                  {/*    placeholder={getPolyglotText('전체', 'mypage-note-전체7')}*/}
                  {/*    options={channelOptions}*/}
                  {/*    value={channel}*/}
                  {/*    onChange={(e, data) => changeChannel(data)}*/}
                  {/*  />*/}
                  {/*</div>*/}
                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.HeaderCell>
                  <PolyglotText
                    id="mypage-note-검색어"
                    defaultString="검색어"
                  />
                </Table.HeaderCell>
                <Table.Cell>
                  <div className="option_box">
                    <Select
                      placeholder={getPolyglotText('전체', 'mypage-note-전체8')}
                      options={SearchOptions}
                      onChange={(e, data) => {
                        setSearchType(data.value as string);
                      }}
                    />
                  </div>
                  <div className={classNames('ui input note_input', {})}>
                    <input
                      type="text"
                      disabled={searchType === 'all' ? true : false}
                      placeholder={getPolyglotText(
                        '검색어를 입력해주세요.',
                        'mypage-note-검색어입력'
                      )}
                      value={searchText}
                      onKeyPress={(e) =>
                        e.key === 'Enter' && handleSubmitClick()
                      }
                      onChange={(e: any) => setSearchText(e.target.value)}
                    />
                    <Button
                      className="note_btn"
                      onClick={() => handleSubmitClick()}
                    >
                      <PolyglotText
                        id="mypage-note-검색"
                        defaultString="검색"
                      />
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>

        <div className="total_box">
          <span
            className="tit_cnt"
            dangerouslySetInnerHTML={{
              __html: getPolyglotText(
                `총 <strong>{count}개의 학습과정</strong>`,
                'mypage-note-학습과정갯수',
                { count: (noteList.results.length || 0).toString() }
              ),
            }}
          />
          <span
            className="tit_cnt"
            dangerouslySetInnerHTML={{
              __html: getPolyglotText(
                `총 <strong>{count}개의 Note</strong>`,
                'mypage-note-노트갯수',
                { count: (noteCount || 0).toString() }
              ),
            }}
          />
          <Button
            className="btn_download"
            onClick={(e, data) => excelDownload()}
          >
            <Image
              src="https://image.mysuni.sk.com/suni-asset/public/images/all/icon-excel-24-px.svg"
              alt="엑셀아이콘"
            />
            <PolyglotText
              id="mypage-note-노트다운로드"
              defaultString="전체 Note 다운로드"
            />
          </Button>
        </div>

        {noteList && noteList.results.length === 0 && (
          <div className="note_nodata">
            <Icon>
              <Image src={`${PUBLIC_URL}/images/all/no-contents-80-px.svg`} />
            </Icon>
            <p
              className="txt"
              dangerouslySetInnerHTML={{
                __html: getPolyglotText(
                  ` 작성된 Note가 없습니다.
                  <span>원하는 결과의 학습 과정명과 Note 내용을 검색해보세요!</span>`,
                  'mypage-note-노트없음'
                ),
              }}
            />
          </div>
        )}
      </Segment>
    </div>
  );
};

export default NoteHeaderView;
