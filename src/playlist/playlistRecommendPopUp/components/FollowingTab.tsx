import React, { useCallback, useMemo, useState } from 'react';
import { Checkbox, Icon, Tab } from 'semantic-ui-react';
import { onSearchFollowing } from '../playlistRecommendPopUp.events';
import { useRequestFollowing } from '../playlistRecommendPopUp.request';
import {
  MemberList,
  useCheckedMemberList,
  useFollowingList,
} from '../playlistRecommendPopUp.store';
import { ProfileComponent } from './ProfileComponent';
import {
  onCheckFollowing,
  onAllCheckedFollowing,
} from '../playlistRecommendPopUp.events';

export function FollowingTab() {
  useRequestFollowing();

  const followingList = useFollowingList();
  const checkedMemberList = useCheckedMemberList();
  const [searchText, setSearchText] = useState('');
  const [searchTextResult, setSearchTextResult] = useState('');
  const [searchResult, setSearchResult] = useState<MemberList[] | undefined>(
    undefined
  );

  const checkedMemberIds = useMemo(
    () => checkedMemberList.map((member) => member.id),
    [checkedMemberList]
  );

  const isAllChecked = useMemo(() => {
    // 체크된 멤버 정보를 가진 배열에서 팔로잉 멤버만 필터
    const filteredFollowingList = followingList.filter((follow) =>
      checkedMemberIds.includes(follow.id)
    );

    if (filteredFollowingList.length === 0) {
      return false;
    }

    return followingList.length === filteredFollowingList.length;
  }, [checkedMemberIds, followingList]);

  const onChangeSearchText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const text = e.target.value;
      setSearchText(text);
    },
    []
  );

  const onClickSearch = useCallback(() => {
    const searchResult = onSearchFollowing(searchText);
    setSearchTextResult(searchText);
    setSearchResult(searchResult);
  }, [searchText]);

  return (
    <Tab.Pane className="left-inner">
      <div className="sh-left-top">
        <div className="ui h38 search input">
          <input
            type="text"
            placeholder="이름 또는 이메일을 검색해주세요."
            onChange={onChangeSearchText}
          />
          <Icon className="search link" onClick={onClickSearch} />
        </div>
      </div>
      <div className="sh-left-bottom">
        {searchTextResult && searchResult?.length === 0 ? (
          <div className="no-cont-wrap">
            <Icon className="no-contents80" />
            <span className="blind">콘텐츠 없음</span>
            <div className="text">
              <strong className="s-word">{searchTextResult}</strong>에 대한
              검색결과가 없어요! <br />
              Playlist를 추천할 다른 학습자를 검색해주세요.
            </div>
          </div>
        ) : (
          <div className="sh-left-slct">
            <div className="sh-sl-top">
              <Checkbox
                className="base"
                label="전체 선택"
                onClick={onAllCheckedFollowing}
                checked={isAllChecked}
              />
            </div>
            <div className="sh-user-list">
              {(searchResult || followingList).map((member) => (
                <div className="user-prf" id={member.id}>
                  <div className="user-check">
                    <Checkbox
                      className="base"
                      value={member.id}
                      onClick={onCheckFollowing}
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
