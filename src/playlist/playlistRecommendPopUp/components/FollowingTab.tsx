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
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';
import { reactAlert } from '@nara.platform/accent';
import { trim } from 'lodash';

export function FollowingTab() {
  useRequestFollower();

  const followerList = useFollowerList();
  const checkedMemberList = useCheckedMemberList();
  const [searchText, setSearchText] = useState('');
  const [isSearchAfter, setIsSearchAfter] = useState(false); // 검색 전인지 후인지 확인하는 상태 값
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

  const search = useCallback(() => {
    if (trim(searchText).length === 0) {
      reactAlert({
        title: getPolyglotText('구성원 검색하기', 'playlist-popup-구성원검색'),
        message: getPolyglotText(
          '이름 또는 이메일을 입력해주세요.',
          'playlist-popup-구성원입력'
        ),
      });
    } else if (trim(searchText).length < 2) {
      reactAlert({
        title: getPolyglotText('구성원 검색하기', 'playlist-popup-구성원검색'),
        message: getPolyglotText(
          '두 글자 이상 검색해주세요.',
          'playlist-popup-두글자검색'
        ),
      });
    } else {
      const searchResult = onSearchFollower(searchText);
      setSearchTextResult(searchText);
      setIsSearchAfter(true);
      setSearchResult(searchResult);
    }
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
      if (e.key === 'Enter') search();
    },
    [search]
  );

  const onClickSearch = useCallback(() => {
    search();
  }, [search]);

  return (
    <Tab.Pane className="left-inner">
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
          <Icon className="search link" onClick={onClickSearch} />
        </div>
      </div>
      <div className="sh-left-bottom">
        {!searchTextResult && followerList.length === 0 && (
          <div className="no-cont-wrap">
            <Icon className="search50" />
            <span className="blind">검색전</span>
            <strong className="no-tit">
              <PolyglotText
                defaultString="나를 팔로우한 사용자가 없어요!"
                id="playlist-popup-팔로우없음"
              />
            </strong>
            <div
              className="text"
              dangerouslySetInnerHTML={{
                __html: getPolyglotText(
                  `mySUNI에서 다양한 활동을 해보세요.`,
                  'playlist-popup-팔로우설명'
                ),
              }}
            />
          </div>
        )}
        {searchTextResult && searchResult?.length === 0 ? (
          <div className="no-cont-wrap">
            <Icon className="no-contents80" />
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
          </div>
        ) : (
          <div className="sh-left-slct">
            <div className="sh-sl-top">
              <Checkbox
                className="base"
                label={getPolyglotText('전체 선택', 'playlist-popup-전체선택')}
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
    </Tab.Pane>
  );
}
