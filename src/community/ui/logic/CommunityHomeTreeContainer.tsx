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
import { patronInfo } from '@nara.platform/dock';
import { addNewBadge } from 'community/utility/communityHelper';
import ReactGA from 'react-ga';
import { Type, AreaType } from 'tracker/model';
import { CommunityMemberApprovedType } from 'community/model/CommunityMember';

interface MenuItemViewProps {
  subMenus: CommunityMenu[];
}

interface ApprovedProps {
  type?: CommunityMenuType;
  name: string;
  approved?: CommunityMemberApprovedType;
  icon?: string;
  lastPostTime: number;
}

const MenuItemView: React.FC<CommunityMenu &
  MenuItemViewProps> = function MenuItemView({
  type,
  name,
  communityId,
  menuId,
  url,
  subMenus,
  lastPostTime,
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

  const gaEvent = (): void => {
    ReactGA.pageview(
      `${`/community/${communityId}/${path}/${menuId}`}`,
      [],
      `(커뮤니티 하위메뉴)-${name}`
    );
  };
  return (
    <>
      <li onClick={gaEvent}>
        <Link to={`/community/${communityId}/${path}/${menuId}`}>
          <img src={icon} />
          {name}{' '}
          {addNewBadge(lastPostTime) && <span className="new-label">NEW</span>}
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
  lastPostTime,
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
    if (approved === null || approved === 'DRAW' || approved === 'REJECT') {
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
          if (communtyHome.community.allowSelfJoin === 1) {
            reactAlert({
              title: '알림',
              message: '커뮤니티에 가입이 완료되었습니다.',
            });
          }
        },
      });
    } else if (approved === 'WAITING') {
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
          {name}{' '}
          {addNewBadge(lastPostTime) && <span className="new-label">NEW</span>}
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
                lastPostTime={menu.lastPostTime}
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
  lastPostTime,
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
    if (approved === null || approved === 'DRAW' || approved === 'REJECT') {
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
    } else if (approved === 'WAITING') {
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
        {name}{' '}
        {addNewBadge(lastPostTime) && <span className="new-label">NEW</span>}
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
  lastPostTime,
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
        {name}{' '}
        {addNewBadge(lastPostTime) && <span className="new-label">NEW</span>}
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
            message:
              'Course 내 포함된 학습을 시작하신 후 Community 가입이 가능합니다.',
          });
        } else {
          reactConfirm({
            title: '알림',
            message:
              'Course 내 포함된 학습을 시작하신 후 Community 가입이 가능합니다.<div className="">\n</div>Course를 학습하시겠습니까?',
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
        if (communtyHome.community.allowSelfJoin === 1) {
          reactAlert({
            title: '알림',
            message: '커뮤니티에 가입이 완료되었습니다.',
          });
        }
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

function DetailView() {
  const communtyHome = useCommunityHome();
  if (communtyHome === undefined || communtyHome.community === undefined) {
    return null;
  }

  return (
    <Link to={`/community/${communtyHome.community.communityId}/detail`}>
      <span className="community-info">정보</span>
    </Link>
  );
}

function AdminView() {
  const communtyHome = useCommunityHome();
  if (communtyHome === undefined || communtyHome.community === undefined) {
    return null;
  }

  return (
    <Link
      to={`/community/admin/${communtyHome.community.communityId}/memberManagement/member`}
      className="ui button fix line02"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      커뮤니티 관리
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
  let lastNoticePostTime = 0;
  if (communtyHome.community?.lastNoticePostTime !== null) {
    lastNoticePostTime = communtyHome.community?.lastNoticePostTime;
  }

  const gaEvent = (arg: string): void => {
    if (arg === 'all') {
      ReactGA.pageview(
        `${`/community/${communtyHome?.community?.communityId}/all`}`,
        [],
        `(커뮤니티 하위메뉴)-전체글`
      );
    } else if (arg === 'notic') {
      ReactGA.pageview(
        `${`/community/${communtyHome?.community?.communityId}/notice`}`,
        [],
        `(커뮤니티 하위메뉴)-공지사항`
      );
    } else {
      throw new Error('not arg');
    }
  };

  function deleteAllPostMenu(communityId: string) {
    // 전체글 메뉴 삭제 Func => filteredCommunity 배열에 communityId 추가
    const filteredCommunity = [
      'COMMUNITY-1s',
      'COMMUNITY-1q',
      'COMMUNITY-a',
      'COMMUNITY-25',
      'COMMUNITY-1w',
      'COMMUNITY-2b',
      'COMMUNITY-29',
    ];
    if (
      communityId !== '' &&
      communityId !== null &&
      communityId !== undefined
    ) {
      return filteredCommunity.includes(communityId);
    }
  }

  return (
    <div
      className="community-left community-home-left"
      data-area={AreaType.COMMUNITY_LNB}
      data-type={Type.CLICK}
    >
      <div className="sub-info-box">
        <div className="commnuity-left-top">
          <div className="community-left-header">
            <span className="community-badge blue">
              {communtyHome.community.fieldName}
            </span>
            <div>
              <a className="community-share right10" onClick={copyUrl}>
                <span>공유하기</span>
              </a>
              <DetailView />
            </div>
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
            {communtyHome.community.approved === 'DRAW' && <JoinView />}
            {communtyHome.community.approved === 'REJECT' && <JoinView />}
            {communtyHome.community.approved === 'WAITING' && <WaitView />}
            {communtyHome.community.approved === 'APPROVED' && <MemberView />}
            {communtyHome.community.managerId === patronInfo.getDenizenId() && (
              <AdminView />
            )}
          </div>
        </div>
        <div className="community-home-right-contents">
          {communtyHome.community.approved !== 'APPROVED' && (
            <ul>
              <li>
                <Link to={`/community/${communtyHome.community.communityId}`}>
                  <img src={homeIcon} />
                  HOME
                  <img src={homeArrowIcon} className="right-menu-arrow" />
                </Link>
              </li>
              {communtyHome?.community &&
              deleteAllPostMenu(communtyHome?.community.communityId) ? null : (
                <ReadonlyMenuItemView
                  type="NOTICE"
                  name="전체글"
                  icon={boardIcon}
                  approved={communtyHome.community?.approved}
                  subMenus={[]}
                  lastPostTime={0}
                />
              )}
              <ReadonlyMenuItemView
                type="NOTICE"
                name="공지사항"
                icon={boardIcon}
                approved={communtyHome.community?.approved}
                subMenus={[]}
                lastPostTime={lastNoticePostTime}
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
          {communtyHome.community.approved === 'APPROVED' && (
            <ul>
              <li>
                <Link to={`/community/${communtyHome.community.communityId}`}>
                  <img src={homeIcon} />
                  HOME
                  <img src={homeArrowIcon} className="right-menu-arrow" />
                </Link>
              </li>
              {communtyHome?.community &&
              deleteAllPostMenu(communtyHome?.community.communityId) ? null : (
                <li onClick={() => gaEvent('all')}>
                  <Link
                    to={`/community/${communtyHome.community.communityId}/all`}
                  >
                    <img src={boardIcon} />
                    전체글
                  </Link>
                </li>
              )}
              <li onClick={() => gaEvent('notic')}>
                <Link
                  to={`/community/${communtyHome.community.communityId}/notice`}
                >
                  <img src={boardIcon} />
                  공지사항
                  {addNewBadge(lastNoticePostTime) && (
                    <span className="new-label">NEW</span>
                  )}
                </Link>
              </li>
              {communtyHome.menus
                .filter(c => c.parentId === null)
                .sort((a, b) => a.order - b.order)
                .map(menu => {
                  return (
                    <MenuItemView
                      key={menu.menuId}
                      {...menu}
                      subMenus={communtyHome.menus.filter(
                        c => c.parentId === menu.id
                      )}
                    />
                  );
                })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default CommunityHomeTreeContainer;
