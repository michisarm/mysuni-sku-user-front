import { MenuItem } from 'community/viewModel/CommunityAdminMenu';
import React, { useState, useCallback, useEffect } from 'react';
import { Button, DropdownItemProps, Radio, Select } from 'semantic-ui-react';
import ReactQuill from 'react-quill';
import CommunitySurveyModalContainer from 'community/ui/logic/CommunitySurveyModalContainer';
import { SearchBox } from 'community/model/SearchBox';
import { useSearchBox } from 'community/store/SearchBoxStore';
import { getCommunitySurvey } from 'community/service/useCommunityMenu/requestCommunity';
import AdminDiscussionCreateView from '../CommunityAdmin/AdminDiscussionCreateView';
import { CommunityDiscussion } from '../../../model/CommunityDiscussion';

interface CommunityAdminMenuDetailViewProps {
  addMenuFlag: boolean;
  communityAdminGroups: any;
  selectedRow?: MenuItem;
  discussRow?: CommunityDiscussion;
  onChangeValue: (data: any, name: string) => void;
  onChangeDiscussValue: (
    value: string | boolean,
    type: string,
    currentIndex?: number
  ) => void;
  onAddUrlsList: () => void;
  onDeleteUrlsList: (currentIndex: number) => void;
  onAddFileBoxId: (fileBoxId: string) => void;
}

const CommunityAdminMenuDetailView: React.FC<CommunityAdminMenuDetailViewProps> = function CommunityAdminMenuDetailView({
  addMenuFlag,
  selectedRow,
  discussRow,
  communityAdminGroups,
  onChangeValue,
  onChangeDiscussValue,
  onAddUrlsList,
  onDeleteUrlsList,
  onAddFileBoxId,
}) {
  const searchBox = useSearchBox();
  const [selectedSurvey, setSelectedSurvey] = useState<any>();
  const groupArr:
    | DropdownItemProps[]
    | { key: any; value: any; text: any }[] = [
      // {
      //   key: 0,
      //   value: 0,
      //   text: '선택',
      // },
    ];

  communityAdminGroups!.results.map((data: any, index: number) => {
    groupArr.push({
      key: data.groupId,
      value: data.groupId,
      text: data.name,
    });
  });

  useEffect(() => {
    if (selectedRow && selectedRow.type === 'SURVEY') {
      getCommunitySurvey(selectedRow!.surveyId!).then(result => {
        if (result.data === '') {
          setSelectedSurvey({});
        } else {
          setSelectedSurvey(result.data);
        }
      });
    }
  }, [selectedRow, discussRow]);

  const menuType = [
    { key: 'CATEGORY', value: 'CATEGORY', text: '카테고리' },
    { key: 'BASIC', value: 'BASIC', text: '일반 게시판' },
    { key: 'DISCUSSION', value: 'DISCUSSION', text: '토론 게시판' },
    { key: 'ANONYMOUS', value: 'ANONYMOUS', text: '익명 게시판' },
    { key: 'ANODISCUSSION', value: 'ANODISCUSSION', text: '익명 토론 게시판' },
    { key: 'NOTICE', value: 'NOTICE', text: '공지사항' },
    { key: 'STORE', value: 'STORE', text: '자료실' },
    { key: 'SURVEY', value: 'SURVEY', text: '설문조사' },
    { key: 'LINK', value: 'LINK', text: '링크' },
    { key: 'HTML', value: 'HTML', text: 'HTML' },
  ];

  function changeType(_: any, data: any) {
    if (selectedRow && data) {
      selectedRow.type = data.value;
      onChangeValue(selectedRow, 'type');
      if (selectedRow.type === 'SURVEY') {
        getCommunitySurvey(selectedRow!.surveyId!).then(result => {
          if (result.data) {
            setSelectedSurvey(result.data);
          } else {
            setSelectedSurvey({});
          }
        });
      }
    }
  }

  function changeValue(e: any, targetName?: string, index?: number) {
    if (selectedRow && targetName === 'content') {
      // Editor Value
      selectedRow.content = e;
      onChangeValue(selectedRow, targetName);
      return;
    }

    if (selectedRow) {
      const value = e.target.value;
      if (e.target.name === 'name') {
        selectedRow.name = value;
      } else if (e.target.name === 'discussionTopic') {
        selectedRow.discussionTopic = value;
      } else if (e.target.name === 'surveyInformation') {
        selectedRow.surveyInformation = value;
      } else if (e.target.name === 'url') {
        selectedRow.url = value;
      } else if (e.target.name === 'html') {
        selectedRow.html = value;
      }
      onChangeValue(selectedRow, e.target.name);
    }
  }

  const changeAuth = useCallback((e: any, value: any) => {
    if (selectedRow) {
      if (value === 'community') {
        selectedRow.accessType = 'COMMUNITY_ALL_MEMBER';
        selectedRow.groupId = null;
      } else if (groupArr && groupArr[0]) {
        selectedRow.accessType = 'COMMUNITY_GROUP';
        selectedRow.groupId = groupArr[0].value;
      }
      onChangeDiscussValue(selectedRow.groupId, 'group');
      onChangeDiscussValue(selectedRow.accessType, 'accessType');
      onChangeValue(selectedRow, 'accessType');
      onChangeValue(selectedRow, 'groupId');
    }
  }, [groupArr, selectedRow]);


  function handleChangeGroup(e: any, data: any) {
    if (selectedRow) {
      selectedRow.groupId = data.value;
      onChangeDiscussValue(selectedRow.groupId, 'group');
      onChangeValue(selectedRow, 'groupId');
    }
  }

  function handleChangeHtml(e: any) {
    selectedRow!.html = e.target.value;
    onChangeValue(selectedRow, 'html');
  }

  function handleSurveyModalClose(data: any) {
    setSelectedSurvey(data);
    selectedRow!.surveyId = data.id;
    onChangeValue(selectedRow, 'surveyId');
  }

  console.log("11111111111111", selectedRow?.groupId === null ||
  selectedRow?.groupId === '' ||
  selectedRow?.accessType === 'COMMUNITY_GROUP')
  return (
    <div className="menu_right_contents">
      <table>
        <colgroup>
          <col width="200px" />
          <col />
        </colgroup>
        <tbody>
          <tr>
            <th>메뉴 유형</th>
            <td>
              <Select
                disabled={true}
                placeholder="전체"
                className="ui small-border admin_tab_select"
                value={selectedRow && selectedRow.type}
                options={menuType}
                onChange={changeType}
              />
            </td>
          </tr>
          <tr>
            {selectedRow!.type !== 'CATEGORY' && <th>메뉴명</th>}
            {selectedRow!.type === 'CATEGORY' && <th>카테고리명</th>}
            <td>
              <div
                className="ui right-top-count input admin"
                style={{ width: '100%' }}
              >
                <input
                  className="bg"
                  type="text"
                  placeholder="제목을 입력해주세요."
                  value={(selectedRow && selectedRow.name) || ''}
                  name="name"
                  onChange={changeValue}
                />
              </div>
            </td>
          </tr>
          {(selectedRow!.type === 'DISCUSSION' ||
            selectedRow!.type === 'ANODISCUSSION') && (
              <AdminDiscussionCreateView
                changeValue={changeValue}
                selectedRow={selectedRow}
                discussRow={discussRow}
                onChangeDiscussValue={onChangeDiscussValue}
                onAddUrlsList={onAddUrlsList}
                onDeleteUrlsList={onDeleteUrlsList}
                onAddFileBoxId={onAddFileBoxId}
                onChangeValue={onChangeValue}
              />
            )}
          {selectedRow!.type === 'SURVEY' && (
            <tr>
              <th>설문 안내글</th>
              <td>
                <div className="ui right-top-count input admin">
                  <input
                    type="text"
                    placeholder="안내글을 입력해주세요."
                    value={selectedRow && selectedRow.surveyInformation}
                    name="surveyInformation"
                    onChange={changeValue}
                  />
                </div>
              </td>
            </tr>
          )}
          {selectedRow!.type === 'SURVEY' && searchBox && selectedSurvey && (
            <tr>
              <th className="admin_survey_th">Survey 추가</th>
              <td className="admin_survey_btn">
                <CommunitySurveyModalContainer
                  trigger={
                    <Button icon className="ui button admin_table_button02">
                      Survey 찾기
                    </Button>
                  }
                  defaultSelectedChannel={null}
                  onConfirmChannel={handleSurveyModalClose}
                  searchBox={searchBox}
                />
                {selectedSurvey.titles !== undefined && (
                  <table className="menu_survey">
                    <colgroup>
                      <col />
                      <col width="100px" />
                    </colgroup>
                    <thead>
                      <tr>
                        <th>제목</th>
                        <th>등록자</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          {
                            selectedSurvey.titles.langStringMap[
                            selectedSurvey.titles.defaultLanguage
                            ]
                          }
                        </td>
                        <td>
                          {
                            selectedSurvey.formDesigner.names.langStringMap[
                            selectedSurvey.formDesigner.names.defaultLanguage
                            ]
                          }
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </td>
            </tr>
          )}
          {selectedRow!.type === 'LINK' && (
            <tr>
              <th>URL</th>
              <td>
                <div className="ui right-top-count input admin">
                  <input
                    type="text"
                    placeholder="URL를 입력해주세요."
                    value={selectedRow && selectedRow.url}
                    name="url"
                    onChange={changeValue}
                  />
                </div>
              </td>
            </tr>
          )}
          {selectedRow!.type === 'HTML' && (
            <tr>
              <td colSpan={2}>
                <div>
                  <textarea
                    style={{ height: 548, width: '100%' }}
                    value={selectedRow && selectedRow.html}
                    onChange={e => {
                      handleChangeHtml(e);
                    }}
                  />
                </div>
              </td>
            </tr>
          )}
          <tr className="opinion-option">
            <th>접근 권한</th>
            <td>
              <div className="board-write-radio">
                <Radio
                  className="base"
                  label="커뮤니티 멤버"
                  name="radioGroup"
                  value="community"
                  checked={(
                    selectedRow?.groupId === null ||
                    selectedRow?.groupId === '' ||
                    selectedRow?.accessType !== 'COMMUNITY_GROUP'
                  )}
                  onClick={(e: any, data: any) => {
                    changeAuth(e, data.value);
                  }}
                  onChange={(e: any, data: any) => changeAuth(e, data.value)}
                />
                <Radio
                  className="base"
                  label="그룹지정"
                  name="radioGroup"
                  value="group"
                  checked={(
                      selectedRow?.groupId !== null &&
                      selectedRow?.groupId !== ''
                  )}
                  onChange={(e: any, data: any) => changeAuth(e, data.value)}
                />
              </div>
              <Select
                placeholder="그룹 유형을 선택하세요."
                className="ui small-border admin_tab_select"
                value={selectedRow?.groupId}
                // defaultValue={groupArr[0].value}
                options={groupArr}
                onChange={handleChangeGroup}
                disabled={(
                    selectedRow?.groupId === null ||
                    selectedRow?.groupId === '' ||
                    selectedRow?.accessType !== 'COMMUNITY_GROUP'
                )}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <ul>
        <li>ㆍ 해당 메뉴에 접근할 수 있는 범위를 설정할 수 있습니다.</li>
        <li>
          ㆍ 커뮤니티 멤버 : 해당 커뮤니티에 가입된 멤버들이 접근할 수 있습니다.
        </li>
        <li>
          ㆍ 그룹 지정 : <strong>멤버 관리</strong> 메뉴에서 등록된 그룹만
          접근할 수 있습니다.
        </li>
      </ul>
    </div>
  );
};

export default CommunityAdminMenuDetailView;
