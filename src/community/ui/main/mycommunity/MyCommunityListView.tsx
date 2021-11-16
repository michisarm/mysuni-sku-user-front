import { Area } from '../../../../tracker/model/ActionType';
import React, { useMemo } from 'react';
import { Icon, Menu, Select, Image, Button } from 'semantic-ui-react';
import {
  getMainMyCommunityTab,
  useMainMyCommunityTab,
} from './services/mycommunity.services';
import {
  onClickComunityBookmark,
  onClickComunityTab,
  onClickComunityUnBookmark,
  onMyCommunitiesSortChange,
} from './events/mycommnuity.events';
import {
  getEmptyMainMyCommunityTab,
  MainMyCommunitiesItem,
} from './mycommunity.model';
import managerIcon from '../../assets/icon-community-manager.png';
import { Link } from 'react-router-dom';
import { useRequestMainMyCommunityItems } from './services/mycommunity.request.services';

const SORT_OPTIONS = [
  { key: 'lastPostTime', value: 'lastPostTime', text: '최신글순' },
  { key: 'memberCreatedTime', value: 'memberCreatedTime', text: '최근가입순' },
  { key: 'name', value: 'name', text: '가나다순' },
];

function ItemView(props: MainMyCommunitiesItem) {
  const {
    communityId,
    name,
    thumbnailId,
    hasNewPost,
    managerName,
    memberCount,
    isBookMarked,
  } = props;
  console.log(window.location.host, window.location.origin);
  return (
    <div className="community-main-left-contents">
      <div className="thumbnail">
        <img src={thumbnailId} />
      </div>
      <Link
        className="community-main-left-list"
        to="#"
        onClick={() =>
          window.open(
            `${window.location.origin}/suni-community/community/${communityId}`
          )
        }
      >
        <div className="community-main-left-h3">
          {name}
          <span className="count">{`${hasNewPost ? 'N' : ''}`}</span>
        </div>
        <div className="community-main-left-span">
          <span>
            <img src={managerIcon} />
            {managerName}
          </span>
          멤버<span>{memberCount}</span>
        </div>
      </Link>
      <div className="favorites_btn">
        {/* Button 태그의 'on' 클래스 여부에 따라서 즐겨찾기 이미지 변경됩니다 작업시 참고 부탁드립니다 */}
        <Button
          className={`${isBookMarked ? 'on' : ''}`}
          id={communityId}
          onClick={
            isBookMarked ? onClickComunityUnBookmark : onClickComunityBookmark
          }
        >
          <Icon className="favoff">
            <Image
              src="/suni-community/images/all/icon-favorite-off-18-px.svg"
              alt="즐겨찾기 제거"
            />
          </Icon>
          <Icon className="favon">
            <Image
              src="/suni-community/images/all/icon-favorite-on-18-px.svg"
              alt="즐겨찾기 추가"
            />
          </Icon>
        </Button>
      </div>
    </div>
  );
}

export function MyCommunityListView() {
  useRequestMainMyCommunityItems();
  const mainMyCommunityTab =
    useMainMyCommunityTab() || getEmptyMainMyCommunityTab();

  const { selectedTab, AllCount, BookMarkCount, ManagedCount } =
    mainMyCommunityTab;
  const noContentText = useMemo(() => {
    switch (selectedTab) {
      case 'FavoritesList':
        return '즐겨찾기한';
      case 'ManageList':
        return '운영중인';
      default:
        return '가입한';
    }
  }, [selectedTab]);

  return (
    <div
      className="community-left community-main-left community-left-v2"
      data-area={Area.COMMUNITY_MYLIST}
    >
      <div className="sub-info-box">
        <div className="commnuity-left-top scroll">
          <div className="favorites_tab">
            <Menu>
              <Menu.Item
                name="AllList"
                active={selectedTab === 'AllList'}
                onClick={onClickComunityTab}
                as={Link}
                to="#"
              >
                전체 <span className="total">{AllCount}</span>
              </Menu.Item>
              <Menu.Item
                name="FavoritesList"
                active={selectedTab === 'FavoritesList'}
                onClick={onClickComunityTab}
                as={Link}
                to="#"
              >
                즐겨찾기 <span className="total">{BookMarkCount}</span>
              </Menu.Item>
              <Menu.Item
                name="ManageList"
                active={selectedTab === 'ManageList'}
                onClick={onClickComunityTab}
                as={Link}
                to="#"
              >
                운영중 <span className="total">{ManagedCount}</span>
              </Menu.Item>
            </Menu>
          </div>
          <Select
            placeholder="선택해주세요"
            className="dropdown w302 selection"
            options={SORT_OPTIONS}
            value={mainMyCommunityTab?.sort || 'lastPostTime'}
            onChange={onMyCommunitiesSortChange}
          />
        </div>
        <div className="commu-home-scroll">
          <>
            {mainMyCommunityTab === undefined ||
            mainMyCommunityTab.hasItems === false ? (
              <div className="community_nodata">
                <Icon className="no-contents80" />
                <p>
                  {`${noContentText} 커뮤니티가 없습니다.`}
                  {selectedTab === 'FavoritesList' && (
                    <span>관심 있는 커뮤니티를 즐겨찾기 해보세요!</span>
                  )}
                </p>
              </div>
            ) : (
              mainMyCommunityTab.items.map((communityItem) => (
                <ItemView key={communityItem.communityId} {...communityItem} />
              ))
            )}
          </>
        </div>
      </div>
    </div>
  );
}
