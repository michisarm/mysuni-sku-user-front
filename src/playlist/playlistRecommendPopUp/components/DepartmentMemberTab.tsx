import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Checkbox, Icon, Tab } from 'semantic-ui-react';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';
import {
  onAllCheckDepartmentMember,
  onCheckDepartmentMember,
  onSearchDepartmentMember,
} from '../playlistRecommendPopUp.events';
import { useRequestDepartMentUser } from '../playlistRecommendPopUp.request';
import {
  useCheckedMemberList,
  useDepartmentMembers,
  useSelcetedDepartmentCode,
} from '../playlistRecommendPopUp.store';
import { OrganizationChartTree } from './OrganizationChartTree';
import { ProfileComponent } from './ProfileComponent';

export function DepartmentMemberTab() {
  useRequestDepartMentUser();

  const departmentMember = useDepartmentMembers();
  const checkedMemberList = useCheckedMemberList();
  const selectedDepartmentCode = useSelcetedDepartmentCode();
  const [searchText, setSearchText] = useState('');
  const [searchTextResult, setSearchTextResult] = useState('');

  useEffect(() => {
    setSearchTextResult('');
    setSearchText('');
  }, [selectedDepartmentCode]);

  const checkedMemberIds = useMemo(
    () => checkedMemberList.map((member) => member.id),
    [checkedMemberList]
  );

  const isAllChecked = useMemo(() => {
    // 체크된 멤버 정보를 가진 배열에서 소속 부서 구성원만 필터
    const filteredFollowingList = departmentMember.filter((follow) =>
      checkedMemberIds.includes(follow.id)
    );

    return departmentMember.length === filteredFollowingList.length;
  }, [checkedMemberIds, departmentMember]);

  const onChangeSearchText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const text = e.target.value;
      setSearchText(text);
    },
    []
  );

  const onSearch = useCallback(() => {
    onSearchDepartmentMember(searchText);
    setSearchTextResult(searchText);
  }, [searchText]);

  const onEnterSearch = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        onSearch();
      }
    },
    [onSearch]
  );

  const noContentText = useMemo(() => {
    if (searchTextResult.length > 0) {
      getPolyglotText(
        `<strong className="s-word">{text}</strong>에 대한 검색결과가 없어요! <br /> Playlist를 추천할 다른 학습자를 검색해주세요.`,
        'playlist-popup-학습자검색',
        { text: searchTextResult }
      );
    }

    return '검색결과가 없어요! <br /> Playlist를 추천할 다른 학습자를 검색해주세요.';
  }, [searchTextResult]);

  return (
    <Tab.Pane className="left-inner">
      <OrganizationChartTree isDisabled={false} />
      <div className="sh-left-list">
        <div className="sh-left-top">
          <div className="ui h38 search input">
            <input
              type="text"
              placeholder={getPolyglotText(
                '이름 또는 이메일을 검색해주세요.',
                'playlist-popup-이름이메일'
              )}
              onChange={onChangeSearchText}
              onKeyUp={onEnterSearch}
              value={searchText}
            />
            <Icon className="search link" onClick={onSearch} />
          </div>
        </div>
        <div className="sh-left-slct-wrap">
          {departmentMember.length === 0 ? (
            <div className="no-cont-wrap">
              <Icon className="no-contents50" />
              <span className="blind">콘텐츠 없음</span>
              <div
                className="text"
                dangerouslySetInnerHTML={{
                  __html: noContentText,
                }}
              />
            </div>
          ) : (
            <div className="sh-left-slct">
              <div className="sh-sl-top">
                <Checkbox
                  className="base"
                  label={getPolyglotText(
                    '전체 선택 ',
                    'playlist-popup-전체선택'
                  )}
                  checked={isAllChecked}
                  onClick={onAllCheckDepartmentMember}
                />
              </div>
              <div className="sh-user-list">
                {departmentMember.map((member) => (
                  <div className="user-prf" id={member.id}>
                    <div className="user-check">
                      <Checkbox
                        className="base"
                        value={member.id}
                        checked={checkedMemberIds.includes(member.id)}
                        onClick={onCheckDepartmentMember}
                      />
                    </div>
                    <ProfileComponent {...member} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Tab.Pane>
  );
}
