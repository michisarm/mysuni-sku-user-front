import React, { useCallback } from 'react';
import {
  getCommunityHome,
  useCommunityHome,
} from '../../store/CommunityHomeStore';
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
import { Link, useHistory } from 'react-router-dom';
import CommunityMenu from '../../model/CommunityMenu';
import { joinCommunity } from '../../api/communityApi';
import { requestCommunity } from '../../service/useCommunityHome/requestCommunity';
import { reactAlert, reactConfirm } from '@nara.platform/accent';
import CommunityMenuType from '../../model/CommunityMenuType';
import { getEmptyCommunityHome } from '../../viewModel/CommunityHome';
import { checkStudentByCoursePlanId, findlinkUrl } from '../../api/lectureApi';

interface MenuItemViewProps {
  subMenus: CommunityMenu[];
}

interface ApprovedProps {
  type?: CommunityMenuType;
  name: string;
  approved?: boolean | null;
  icon?: string;
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
  if (type === 'CATEGORY') {
    return (
      <>
        <li>
          <span>
            <img src={icon} />
            {name}
          </span>
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

const ReadonlyMenuItemView: React.FC<MenuItemViewProps &
  ApprovedProps> = function MenuItemView({
  type,
  name,
  icon,
  approved,
  subMenus,
}) {
  let path = 'board';
  let nextIcon = icon || boardIcon;
  switch (type) {
    case 'DISCUSSION':
      nextIcon = discussionIcon;
      path = 'discussion';
      break;
    case 'STORE':
      nextIcon = storeIcon;
      path = 'data';
      break;
    case 'SURVEY':
      nextIcon = surveyIcon;
      path = 'poll';
      break;
    case 'LINK':
      nextIcon = linkIcon;
      break;
    case 'HTML':
      nextIcon = htmlIcon;
      path = 'content';
      break;
    default:
      break;
  }

  const Alert = useCallback(() => {
    if (approved === null) {
      reactConfirm({
        title: '알림',
        message: '커뮤니티에 가입하시겠습니까?',
        onOk: async () => {
          const communtyHome = getCommunityHome();
          if (
            communtyHome === undefined ||
            communtyHome.community === undefined
          ) {
            return;
          }
          await joinCommunity(communtyHome.community.communityId);
          requestCommunity(communtyHome.community.communityId);
        },
      });
    } else if (approved === false) {
      reactAlert({
        title: '안내',
        message: '지금 가입 승인을 기다리는 중입니다.',
      });
    }
  }, [approved]);

  return (
    <>
      <li>
        <button onClick={Alert}>
          <img src={nextIcon} />
          {name}
        </button>
      </li>
      {subMenus.length > 0 && (
        <ul>
          {subMenus
            .sort((a, b) => a.order - b.order)
            .map(menu => (
              <ReadonlySubMenuItemView
                key={menu.menuId}
                type={menu.type}
                name={menu.name}
                approved={approved}
              />
            ))}
        </ul>
      )}
    </>
  );
};

const ReadonlySubMenuItemView: React.FC<ApprovedProps> = function MenuItemView({
  type,
  name,
  approved,
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

  const Alert = useCallback(() => {
    if (approved === null) {
      reactConfirm({
        title: '알림',
        message: '커뮤니티에 가입하시겠습니까?',
        onOk: async () => {
          const communtyHome = getCommunityHome();
          if (
            communtyHome === undefined ||
            communtyHome.community === undefined
          ) {
            return;
          }
          await joinCommunity(communtyHome.community.communityId);
          requestCommunity(communtyHome.community.communityId);
        },
      });
    } else if (approved === false) {
      reactAlert({
        title: '안내',
        message: '지금 가입 승인을 기다리는 중입니다.',
      });
    }
  }, [approved]);

  return (
    <li>
      <button onClick={Alert}>
        <img src={subIcon} />
        <img src={icon} />
        {name}
      </button>
    </li>
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
  if (type === 'CATEGORY') {
    return (
      <li>
        <span>
          <img src={subIcon} />
          <img src={icon} />
          {name}
        </span>
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

function JoinView() {
  const history = useHistory();
  const join = useCallback(async () => {
    const community = getCommunityHome()?.community;
    if (community === undefined) {
      return;
    }
    const { courseId } = community;
    if (courseId !== null && courseId !== undefined && courseId !== '') {
      const isStudent = await checkStudentByCoursePlanId(courseId);
      const linkUrl = await findlinkUrl(courseId);
      if (!isStudent) {
        if (linkUrl === undefined) {
          reactAlert({
            title: '알림',
            message: 'Course를 학습하셔야지 참가가 가능합니다.',
          });
        } else {
          reactConfirm({
            title: '알림',
            message: 'Course를 학습하시겠습니까?',
            onOk: () => {
              history.push(linkUrl);
            },
          });
        }
        return;
      }
    }
    reactConfirm({
      title: '알림',
      message: '커뮤니티에 가입하시겠습니까?',
      onOk: async () => {
        const communtyHome = getCommunityHome();
        if (
          communtyHome === undefined ||
          communtyHome.community === undefined
        ) {
          return;
        }
        await joinCommunity(communtyHome.community.communityId);
        requestCommunity(communtyHome.community.communityId);
      },
    });
  }, [history]);

  return (
    <button className="ui button fix line" onClick={join}>
      가입하기
    </button>
  );
}

function WaitView() {
  return (
    <button className="ui button fix line" style={{ cursor: 'default' }}>
      가입대기
    </button>
  );
}

function MemberView() {
  const communtyHome = useCommunityHome();
  if (communtyHome === undefined || communtyHome.community === undefined) {
    return null;
  }

  return (
    <Link
      to={`/community/${communtyHome.community.communityId}/member`}
      className="ui button fix line"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      멤버보기
    </Link>
  );
}

function CommunityHomeTreeContainer() {
  const communtyHome = useCommunityHome();
  const copyUrl = useCallback(() => {
    if (communtyHome === undefined || communtyHome.community === undefined) {
      return;
    }
    const currentUrl = window.location.toString();
    const url = `${currentUrl.split('/community/')[0]}/community/${
      communtyHome.community.communityId
    }`;
    const textarea = document.createElement('textarea');
    textarea.value = url;
    document.body.appendChild(textarea);
    textarea.select();
    textarea.setSelectionRange(0, 9999);
    document.execCommand('copy');
    document.body.removeChild(textarea);
    reactAlert({ title: '알림', message: 'URL이 복사되었습니다.' });
  }, [communtyHome?.community?.communityId]);
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
            <a className="community-share" onClick={copyUrl}>
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
            {communtyHome.community.approved === null && <JoinView />}
            {communtyHome.community.approved === false && <WaitView />}
            {communtyHome.community.approved === true && <MemberView />}
          </div>
        </div>
        <div className="community-home-right-contents">
          {communtyHome.community.approved !== true && (
            <ul>
              <li>
                <Link to={`/community/${communtyHome.community.communityId}`}>
                  <img src={homeIcon} />
                  HOME
                  <img src={homeArrowIcon} className="right-menu-arrow" />
                </Link>
              </li>
              {
                communtyHome.community.communityId === "COMMUNITY-a" ? (
                  null
                ) : (
                  <ReadonlyMenuItemView
                    type="NOTICE"
                    name="전체글"
                    icon={boardIcon}
                    approved={communtyHome.community?.approved}
                    subMenus={[]}
                  />
                )
              }
              <ReadonlyMenuItemView
                type="NOTICE"
                name="공지사항"
                icon={boardIcon}
                approved={communtyHome.community?.approved}
                subMenus={[]}
              />
              {communtyHome.menus
                .filter(c => c.parentId === null)
                .sort((a, b) => a.order - b.order)
                .map(menu => (
                  <ReadonlyMenuItemView
                    key={menu.menuId}
                    {...menu}
                    subMenus={communtyHome.menus.filter(
                      c => c.parentId === menu.id
                    )}
                    approved={communtyHome.community?.approved}
                  />
                ))}
            </ul>
          )}
          {communtyHome.community.approved === true && (
            <ul>
              <li>
                <Link to={`/community/${communtyHome.community.communityId}`}>
                  <img src={homeIcon} />
                  HOME
                  <img src={homeArrowIcon} className="right-menu-arrow" />
                </Link>
              </li>
              { 
                communtyHome.community.communityId === "COMMUNITY-a" ? (
                  null
                ) : (
                  <li>
                    <Link
                      to={`/community/${communtyHome.community.communityId}/all`}
                    >
                      <img src={boardIcon} />
                      전체글
                    </Link>
                  </li>
                )
              }
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
          )}
        </div>
      </div>
    </div>
  );
}

export default CommunityHomeTreeContainer;
