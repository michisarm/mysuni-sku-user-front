import { MenuItem } from 'community/viewModel/CommunityAdminMenu';
import React,{useState,useCallback,useEffect} from 'react';
import { DropdownItemProps, Radio, Select } from 'semantic-ui-react';

interface RouteParams {
  communityId: string;
}

interface CommunityAdminMenuAddViewProps {
  addMenuFlag?: boolean
  addChildMenuFlag? : boolean
  communityAdminGroups: any
  selectedRow?: MenuItem
  onChangeAddValue: (data: any, name: string) => void
}

const CommunityAdminMenuTest: React.FC<CommunityAdminMenuAddViewProps> = function CommunityAdminMenuDetailView({
  addMenuFlag,
  addChildMenuFlag,
  selectedRow,
  communityAdminGroups,
  onChangeAddValue
}) {

  useEffect(() => {
    console.log('selectedRow', selectedRow)
  }, [selectedRow]);

  const groupArr: DropdownItemProps[] | { key: any; value: any; text: any; }[] = [
    {
      'key': 0,
      'value': 0,
      'text': '선택'
    }
  ]
  communityAdminGroups!.results.map((data:any, index: number) => {
    groupArr.push({
      'key': data.groupId,
      'value': data.groupId,
      'text': data.name
    })
  });

  const menuType = [
    { key: 'CATEGORY', value: 'CATEGORY', text: '카테고리' },
    { key: 'BASIC', value: 'BASIC', text: '일반 게시판' },
    { key: 'DISCUSSION', value: 'DISCUSSION', text: '토론 게시판' },
    { key: 'ANONYMOUS', value: 'ANONYMOUS', text: '익명 게시판' },
    { key: 'NOTICE', value: 'NOTICE', text: '공지사항' },
    { key: 'STORE', value: 'STORE', text: '자료실' },
    { key: 'SURVEY', value: 'SURVEY', text: '설문조사' },
    { key: 'LINK', value: 'LINK', text: '링크' },
    { key: 'HTML', value: 'HTML', text: 'HTML' },
  ];

  function changeType(_: any, data: any) {
    if(selectedRow && data) {
      selectedRow.type = data.value
      onChangeAddValue(selectedRow, 'type');
    }
  }

  function changeValue(e: any) {
    const value = e.target.value;
    if(selectedRow) {
      selectedRow.name = value
      onChangeAddValue(selectedRow, 'name');
    }
  }

  function changeAuth(e: any, value: any) {
    if(selectedRow) {
      if (value === 'community') {
        selectedRow.groupId = null
        selectedRow.accessType = 'COMMUNITY_ALL_MEMBER'
      } else {
        selectedRow.groupId = groupArr[0].value
        selectedRow.accessType = 'COMMUNITY_GROUP'
      }
      onChangeAddValue(selectedRow, 'accessType');
    }
  }

  function onChangeGroup(e: any, data: any) {
    if(selectedRow) {
      selectedRow.groupId = data.value
      // onChangeValue(selectedRow, 'accessType');
      onChangeAddValue(selectedRow, 'groupId');
    }
  }

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
                placeholder="전체"
                className="ui small-border admin_tab_select"
                value={selectedRow && selectedRow.type}
                options={menuType}
                onChange={changeType}
              />
            </td>
          </tr>
          <tr>
            <th>카테고리명</th>
            <td>
              <div className="ui right-top-count input admin">
                <input 
                  type="text"
                  placeholder="제목을 입력해주세요."
                  value={selectedRow && selectedRow.name}
                  onChange={changeValue}
                />
              </div>
            </td>
          </tr>
          <tr>
            <th>접근 권한</th>
            <td>
              {/* 공개, 비공개 */}
              {/* <BoardWriteRadio /> */}
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
                onChange={onChangeGroup}
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
          ㆍ 커뮤니티 멤버 : 해당 커뮤니티에 가입된 멤버들이 접근할 수
          있습니다.
        </li>
        <li>
          ㆍ 그룹 지정 : <strong>멤버 관리</strong> 메뉴에서 등록된 그룹만
          접근할 수 있습니다.
        </li>
      </ul>
    </div>
  )
}

export default CommunityAdminMenuTest;