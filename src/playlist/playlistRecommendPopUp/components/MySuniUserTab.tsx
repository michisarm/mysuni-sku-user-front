import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Checkbox, Icon, Tab } from 'semantic-ui-react';
import { useIntersectionObserver } from 'shared/helper/useIntersectionObserver';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';
import {
  onAllCheckedMySuniMember,
  onCheckMySuniUser,
  onScrollMySuniUser,
  onSearchMySuniUser,
} from '../playlistRecommendPopUp.events';
import {
  setMySuniUsers,
  useCheckedMemberList,
  useMySuniUsers,
  useMySuniUserTotalCount,
} from '../playlistRecommendPopUp.store';
import { OrganizationChartTree } from './OrganizationChartTree';
import { ProfileComponent } from './ProfileComponent';

export function MySuniUserTab() {
  const mySuniUser = useMySuniUsers();
  const mySuniUserTotalCount = useMySuniUserTotalCount();
  const checkedMemberList = useCheckedMemberList();
  const [isSearchAfter, setIsSearchAfter] = useState(false); // 검색 전인지 후인지 확인하는 상태 값
  const [searchText, setSearchText] = useState('');
  const [searchTextResult, setSearchTextResult] = useState('');
  const [offset, setOffset] = useState(0);

  // const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
  //   if (isIntersecting && mySuniUserTotalCount > mySuniUser.length) {
  //     onScrollMySuniUser(searchText, offset);
  //     setOffset(offset + 1);
  //   }
  // };

  // const { setTarget } = useIntersectionObserver({
  //   threshold: 0.7,
  //   onIntersect,
  // });

  useEffect(() => {
    return () => {
      setMySuniUsers([]);
    };
  }, []);

  const checkedMemberIds = useMemo(
    () => checkedMemberList.map((member) => member.id),
    [checkedMemberList]
  );

  const isAllChecked = useMemo(() => {
    // 체크된 멤버 정보를 가진 배열에서 Mysuni 멤버만 필터
    const filteredMySuniUser = mySuniUser.filter((follow) =>
      checkedMemberIds.includes(follow.id)
    );

    if (filteredMySuniUser.length === 0) {
      return false;
    }

    return mySuniUser.length === filteredMySuniUser.length;
  }, [checkedMemberIds, mySuniUser]);

  const onChangeSearchText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const text = e.target.value;
      setSearchText(text);
    },
    []
  );

  const onSearch = useCallback(() => {
    onSearchMySuniUser(searchText)?.then(() => {
      setIsSearchAfter(true);
      setSearchTextResult(searchText);
    });
  }, [searchText]);

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
          {!isSearchAfter && (
            <div className="no-cont-wrap">
              <Icon className="search50" />
              <span className="blind">검색전</span>
              <strong className="no-tit">
                <PolyglotText
                  defaultString="mySUNI 사용자 검색하기"
                  id="playlist-popup-검색하기"
                />
              </strong>
              <div
                className="text"
                dangerouslySetInnerHTML={{
                  __html: getPolyglotText(
                    `Playlist를 추천할<br/>mySUNI 사용자 이름 또는 이메일을 검색해보세요!`,
                    'playlist-popup-검색설명'
                  ),
                }}
              />
            </div>
          )}
          {isSearchAfter && mySuniUser.length === 0 ? (
            <div className="no-cont-wrap">
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
            </div>
          ) : (
            isSearchAfter && (
              <div className="sh-left-slct">
                <div className="sh-sl-top">
                  <Checkbox
                    className="base"
                    label={getPolyglotText(
                      '전체 선택 ',
                      'playlist-popup-전체선택'
                    )}
                    checked={isAllChecked}
                    onClick={onAllCheckedMySuniMember}
                  />
                </div>
                <div className="sh-user-list">
                  {mySuniUser.map((member) => (
                    <div className="user-prf" id={member.id}>
                      <div className="user-check">
                        <Checkbox
                          className="base"
                          value={member.id}
                          checked={checkedMemberIds.includes(member.id)}
                          onClick={onCheckMySuniUser}
                        />
                      </div>
                      <ProfileComponent {...member} />
                    </div>
                  ))}
                </div>
                <div />
              </div>
            )
          )}
        </div>
      </div>
    </Tab.Pane>
  );
}
