import React, { useCallback, useMemo, useState } from 'react';
import { Checkbox, Icon, Tab } from 'semantic-ui-react';
import {
  useCheckedMemberList,
  useDepartmentMember,
} from '../playlistRecommendPopUp.store';
import { ProfileComponent } from './ProfileComponent';

export function DepartmentMemberTab() {
  const departmentMember = useDepartmentMember();
  const checkedMemberList = useCheckedMemberList();
  const [searchText, setSearchText] = useState('');

  const isAllChecked = useMemo(
    () => checkedMemberList.length === departmentMember.length,
    [checkedMemberList, departmentMember]
  );

  const checkedMemberIds = useMemo(
    () => checkedMemberList.map((member) => member.id),
    [checkedMemberList]
  );

  const onChangeSearchText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const text = e.target.value;
      setSearchText(text);
    },
    []
  );

  return (
    <Tab.Pane className="left-inner">
      <div className="sh-left-top">
        <div className="ui h38 search input">
          <input
            type="text"
            placeholder="이름 또는 이메일을 검색해주세요."
            onChange={onChangeSearchText}
          />
          <Icon className="search link" />
        </div>
      </div>
      <div className="sh-left-bottom">
        {departmentMember.length === 0 ? (
          <div className="no-cont-wrap">
            <Icon className="no-contents80" />
            <span className="blind">콘텐츠 없음</span>
            <div className="text">
              <strong className="s-word">{searchText}</strong>에 대한 검색결과가
              없어요! <br />
               Playlist를 추천할 다른 학습자를 검색해주세요.
            </div>
          </div>
        ) : (
          <div className="sh-left-slct">
            <div className="sh-sl-top">
              <Checkbox
                className="base"
                label="전체 선택"
                checked={isAllChecked}
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
                    />
                  </div>
                  <ProfileComponent {...member} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Tab.Pane>
  );
}
