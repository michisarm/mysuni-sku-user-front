import React from 'react';
import { useCommunityHome } from '../../store/CommunityHomeStore';
import managerIcon from '../../../style/media/icon-community-manager.png';
import boardIcon from '../../../style/media/icon-communtiy-menu-board.png';
import discussionIcon from '../../../style/media/icon-communtiy-menu-discussion.png';
import htmlIcon from '../../../style/media/icon-community-menu-html.png';
import storeIcon from '../../../style/media/icon-communtiy-menu-download.png';
import surveyIcon from '../../../style/media/icon-communtiy-menu-survey.png';
import linkIcon from '../../../style/media/icon-community-menu-link.png';
import homeIcon from '../../../style/media/icon-communtiy-menu-home-on.png';
import homeArrowIcon from '../../../style/media/icon-community-menu-open.png';
import subIcon from '../../../style/media/icon-reply-16-px.png';
import { Link } from 'react-router-dom';
import CommunityMenu from '../../model/CommunityMenu';

interface MenuItemViewProps {
  subMenus: CommunityMenu[];
}

const MenuItemView: React.FC<CommunityMenu &
  MenuItemViewProps> = function MenuItemView({
  type,
  name,
  communityId,
  menuId,
  url,
  subMenus,
}) {
  let path = 'board';
  let icon = boardIcon;
  switch (type) {
    case 'DISCUSSION':
      icon = discussionIcon;
      path = 'discussion';
      break;
    case 'STORE':
      icon = storeIcon;
      path = 'data';
      break;
    case 'SURVEY':
      icon = surveyIcon;
      path = 'poll';
      break;
    case 'LINK':
      icon = linkIcon;
      break;
    case 'HTML':
      icon = htmlIcon;
      path = 'content';
      break;
    default:
      break;
  }
  if (type === 'LINK') {
    return (
      <li>
        <a href={url} target="_blank">
          <img src={icon} />
          {name}
        </a>
      </li>
    );
  }
  return (
    <>
      <li>
        <Link to={`/community/${communityId}/${path}/${menuId}`}>
          <img src={icon} />
          {name}
        </Link>
      </li>
      {subMenus.length > 0 && (
        <ul>
          {subMenus
            .sort((a, b) => a.order - b.order)
            .map(menu => (
              <SubMenuItemView key={menu.menuId} {...menu} />
            ))}
        </ul>
      )}
    </>
  );
};

const SubMenuItemView: React.FC<CommunityMenu> = function MenuItemView({
  type,
  name,
  communityId,
  menuId,
  url,
}) {
  let path = 'board';
  let icon = boardIcon;
  switch (type) {
    case 'DISCUSSION':
      icon = discussionIcon;
      path = 'discussion';
      break;
    case 'STORE':
      icon = storeIcon;
      path = 'data';
      break;
    case 'SURVEY':
      icon = surveyIcon;
      path = 'poll';
      break;
    case 'LINK':
      icon = linkIcon;
      break;
    case 'HTML':
      icon = htmlIcon;
      path = 'content';
      break;
    default:
      break;
  }
  if (type === 'LINK') {
    return (
      <li>
        <a href={url} target="_blank">
          <img src={subIcon} />
          <img src={icon} />
          {name}
        </a>
      </li>
    );
  }
  return (
    <li>
      <Link to={`/community/${communityId}/${path}/${menuId}`}>
        <img src={subIcon} />
        <img src={icon} />
        {name}
      </Link>
    </li>
  );
};

function CommunityHomeTreeContainer() {
  const communtyHome = useCommunityHome();
  if (communtyHome === undefined || communtyHome.community === undefined) {
    return null;
  }
  return (
    <div className="community-left community-home-left">
      <div className="sub-info-box">
        <div className="commnuity-left-top">
          <div className="community-left-header">
            <span className="community-badge blue">
              {communtyHome.community.fieldName}
            </span>
            <a className="community-share">
              <span>공유하기</span>
            </a>
          </div>
          <h3>{communtyHome.community.name}</h3>
          <div className="community-home-left-span">
            <div className="community-user-info">
              <span>
                <img src={managerIcon} />
                <strong>{communtyHome.community.managerName}</strong>
              </span>
              <span>
                멤버 <strong>{communtyHome.community.memberCount}</strong>
              </span>
            </div>
            {/* <button className="ui button fix line">가입하기</button> */}
          </div>
        </div>
        <div className="community-home-right-contents">
          <ul>
            <li>
              <Link to={`/community/${communtyHome.community.communityId}`}>
                <img src={homeIcon} />
                HOME
                <img src={homeArrowIcon} className="right-menu-arrow" />
              </Link>
            </li>
            <li>
              <Link to={`/community/${communtyHome.community.communityId}/all`}>
                <img src={boardIcon} />
                전체글
              </Link>
            </li>
            <li>
              <Link
                to={`/community/${communtyHome.community.communityId}/notice`}
              >
                <img src={boardIcon} />
                공지사항
              </Link>
            </li>
            {communtyHome.menus
              .filter(c => c.parentId === null)
              .sort((a, b) => a.order - b.order)
              .map(menu => (
                <MenuItemView
                  key={menu.menuId}
                  {...menu}
                  subMenus={communtyHome.menus.filter(
                    c => c.parentId === menu.id
                  )}
                />
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CommunityHomeTreeContainer;
