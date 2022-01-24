import React, { useCallback, useMemo, useState } from 'react';
import { Checkbox, Icon, Tab } from 'semantic-ui-react';
import { onSearchFollower } from '../playlistRecommendPopUp.events';
import { useRequestFollower } from '../playlistRecommendPopUp.request';
import {
  MemberList,
  useCheckedMemberList,
  useFollowerList,
} from '../playlistRecommendPopUp.store';
import { ProfileComponent } from './ProfileComponent';
import {
  onCheckFollower,
  onAllCheckedFollower,
} from '../playlistRecommendPopUp.events';
import { OrganizationChartTree } from './OrganizationChartTree';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';

export function FollowingTab() {
  useRequestFollower();

  const followerList = useFollowerList();
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
    const filteredFollowingList = followerList.filter((follow) =>
      checkedMemberIds.includes(follow.id)
    );

    if (filteredFollowingList.length === 0) {
      return false;
    }

    return followerList.length === filteredFollowingList.length;
  }, [checkedMemberIds, followerList]);

  const onSearch = useCallback(() => {
    const searchResult = onSearchFollower(searchText);
    setSearchTextResult(searchText);
    setSearchResult(searchResult);
  }, [searchText]);

  const onChangeSearchText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const text = e.target.value;
      setSearchText(text);
    },
    []
  );

  const onEnterSearch = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        onSearch();
      }
    },
    [onSearch]
  );

  return (
    <Tab.Pane className="left-inner">
      <OrganizationChartTree isDisabled />
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
            />
            <Icon className="search link" onClick={onSearch} />
          </div>
        </div>
        <div className="sh-left-slct-wrap">
          {searchTextResult && searchResult?.length === 0 ? (
            <div className="no-cont-wrap">
              {followerList.length === 0 ? (
                <>
                  <Icon className="no-contents50" />
                  <strong className="no-tit">
                    {getPolyglotText(
                      '나를 팔로우한 사용자가 없어요!',
                      'playlist-popup-팔로우없음'
                    )}
                  </strong>
                  <div className="text">
                    {getPolyglotText(
                      'mySUNI에서 다양한 활동을 해보세요.',
                      'playlist-popup-팔로우설명'
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Icon className="no-contents50" />
                  <span className="blind">콘텐츠 없음</span>
                  <div
                    className="text"
                    dangerouslySetInnerHTML={{
                      __html: getPolyglotText(
                        ` <strong className="s-word">{text}</strong>에 대한 검색결과가 없어요! <br /> Playlist를 추천할 다른 학습자를 검색해주세요.`,
                        'playlist-popup-학습자검색',
                        { text: searchTextResult }
                      ),
                    }}
                  />
                </>
              )}
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
                  onClick={onAllCheckedFollower}
                  checked={isAllChecked}
                />
              </div>
              <div className="sh-user-list">
                {(searchResult || followerList).map((member) => (
                  <div className="user-prf" id={member.id}>
                    <div className="user-check">
                      <Checkbox
                        className="base"
                        value={member.id}
                        onClick={onCheckFollower}
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
      </div>
    </Tab.Pane>
  );
}
