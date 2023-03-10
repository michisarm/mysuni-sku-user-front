import React, { useCallback, useState } from 'react';
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
import { Area } from 'tracker/model';
import { CommunityMemberApprovedType } from 'community/model/CommunityMember';
import CommunityProfileModal from '../view/CommunityProfileModal';
import { findCommunityProfile } from '../../api/profileApi';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';

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

const MenuItemView: React.FC<CommunityMenu & MenuItemViewProps> =
  function MenuItemView({
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
      case 'ANODISCUSSION':
        icon = discussionIcon;
        path = 'anodiscussion';
        break;
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
                .map((menu) => (
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
        `(???????????? ????????????)-${name}`
      );
    };
    return (
      <>
        <li onClick={gaEvent}>
          <Link to={`/community/${communityId}/${path}/${menuId}`}>
            <img src={icon} />
            {name}{' '}
            {addNewBadge(lastPostTime) && (
              <span className="new-label">NEW</span>
            )}
          </Link>
        </li>
        {subMenus.length > 0 && (
          <ul>
            {subMenus
              .sort((a, b) => a.order - b.order)
              .map((menu) => (
                <SubMenuItemView key={menu.menuId} {...menu} />
              ))}
          </ul>
        )}
      </>
    );
  };

const ReadonlyMenuItemView: React.FC<MenuItemViewProps & ApprovedProps> =
  function MenuItemView({
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
      case 'ANODISCUSSION':
        icon = discussionIcon;
        path = 'anodiscussion';
        break;
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
          title: '??????',
          message: '??????????????? ?????????????????????????',
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
                title: '??????',
                message: '??????????????? ????????? ?????????????????????.',
              });
            }
          },
        });
      } else if (approved === 'WAITING') {
        reactAlert({
          title: '??????',
          message: '?????? ?????? ????????? ???????????? ????????????.',
        });
      }
    }, [approved]);

    return (
      <>
        <li>
          <button onClick={Alert}>
            <img src={nextIcon} />
            {name}{' '}
            {addNewBadge(lastPostTime) && (
              <span className="new-label">NEW</span>
            )}
          </button>
        </li>
        {subMenus.length > 0 && (
          <ul>
            {subMenus
              .sort((a, b) => a.order - b.order)
              .map((menu) => (
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
    case 'ANODISCUSSION':
      icon = discussionIcon;
      path = 'anodiscussion';
      break;
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
        title: '??????',
        message: '??????????????? ?????????????????????????',
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
        title: '??????',
        message: '?????? ?????? ????????? ???????????? ????????????.',
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
    case 'ANODISCUSSION':
      icon = discussionIcon;
      path = 'anodiscussion';
      break;
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
            title: '??????',
            message:
              'Course ??? ????????? ????????? ???????????? ??? Community ????????? ???????????????.',
          });
        } else {
          reactConfirm({
            title: '??????',
            message:
              'Course ??? ????????? ????????? ???????????? ??? Community ????????? ???????????????.<div className="">\n</div>Course??? ?????????????????????????',
            onOk: () => {
              history.push(linkUrl);
            },
          });
        }
        return;
      }
    }
    reactConfirm({
      title: '??????',
      message: '??????????????? ?????????????????????????',
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
            title: '??????',
            message: '??????????????? ????????? ?????????????????????.',
          });
        }
      },
    });
  }, [history]);

  return (
    <button className="ui button fix line" onClick={join}>
      ????????????
    </button>
  );
}

function WaitView() {
  return (
    <button className="ui button fix line" style={{ cursor: 'default' }}>
      ????????????
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
      ????????????
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
      <span className="community-info">??????</span>
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
      ???????????? ??????
    </Link>
  );
}

interface profileParams {
  id: string;
  profileImg: string;
  introduce: string;
  nickName: string;
  creatorName: string;
}

function CommunityHomeTreeContainer() {
  const communtyHome = useCommunityHome();

  const [profileOpen, setProfileOpen] = useState<boolean>(false);
  const [profileInfo, setProfileInfo] = useState<profileParams>();

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
    reactAlert({
      title: getPolyglotText('??????', 'cicl-????????????-??????'),
      message: getPolyglotText('URL??? ?????????????????????.', 'mypage-????????????-url'),
    });
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
        `(???????????? ????????????)-?????????`
      );
    } else if (arg === 'notic') {
      ReactGA.pageview(
        `${`/community/${communtyHome?.community?.communityId}/notice`}`,
        [],
        `(???????????? ????????????)-????????????`
      );
    } else {
      throw new Error('not arg');
    }
  };

  function deleteAllPostMenu(communityId: string) {
    // ????????? ?????? ?????? Func => filteredCommunity ????????? communityId ??????
    const filteredCommunity = [
      'COMMUNITY-1s',
      'COMMUNITY-1q',
      'COMMUNITY-a',
      'COMMUNITY-25',
      'COMMUNITY-1w',
    ];
    if (
      communityId !== '' &&
      communityId !== null &&
      communityId !== undefined
    ) {
      return filteredCommunity.includes(communityId);
    }
  }

  function onClickManagerName(params: any) {
    findCommunityProfile(params.managerId).then((result) => {
      setProfileInfo({
        id: result!.id,
        profileImg: result!.profileImg,
        introduce: result!.introduce,
        nickName: result!.nickname,
        creatorName: result!.name,
      });
      setProfileOpen(true);
    });
  }

  return (
    <>
      <div
        className="community-left community-home-left"
        data-area={Area.COMMUNITY_LNB}
      >
        <div className="sub-info-box">
          <div className="commnuity-left-top">
            <div className="community-left-header">
              <span className="community-badge blue">
                {communtyHome.community.fieldName}
              </span>
              <div>
                <a className="community-share right10" onClick={copyUrl}>
                  <span>????????????</span>
                </a>
                <DetailView />
              </div>
            </div>
            <h3>{communtyHome.community.name}</h3>
            <div className="community-home-left-span">
              <div className="community-user-info">
                <span
                  onClick={() => onClickManagerName(communtyHome.community)}
                  style={{ cursor: 'pointer' }}
                >
                  <img src={managerIcon} />
                  <strong>{communtyHome.community.managerNickName}</strong>
                </span>
                <span>
                  ?????? <strong>{communtyHome.community.memberCount}</strong>
                </span>
              </div>
              {communtyHome.community.approved === null && <JoinView />}
              {communtyHome.community.approved === 'DRAW' && <JoinView />}
              {communtyHome.community.approved === 'REJECT' && <JoinView />}
              {communtyHome.community.approved === 'WAITING' && <WaitView />}
              {communtyHome.community.approved === 'APPROVED' && <MemberView />}
              {(communtyHome.community.managerId ===
                patronInfo.getDenizenId() ||
                communtyHome.community.memberType === 'ADMIN') && <AdminView />}
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
                deleteAllPostMenu(
                  communtyHome?.community.communityId
                ) ? null : (
                  <ReadonlyMenuItemView
                    type="NOTICE"
                    name="?????????"
                    icon={boardIcon}
                    approved={communtyHome.community?.approved}
                    subMenus={[]}
                    lastPostTime={0}
                  />
                )}
                <ReadonlyMenuItemView
                  type="NOTICE"
                  name="????????????"
                  icon={boardIcon}
                  approved={communtyHome.community?.approved}
                  subMenus={[]}
                  lastPostTime={lastNoticePostTime}
                />
                {communtyHome.menus
                  .filter((c) => c.parentId === null)
                  .sort((a, b) => a.order - b.order)
                  .map((menu) => (
                    <ReadonlyMenuItemView
                      key={menu.menuId}
                      {...menu}
                      subMenus={communtyHome.menus.filter(
                        (c) => c.parentId === menu.id
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
                deleteAllPostMenu(
                  communtyHome?.community.communityId
                ) ? null : (
                  <li onClick={() => gaEvent('all')}>
                    <Link
                      to={`/community/${communtyHome.community.communityId}/all`}
                    >
                      <img src={boardIcon} />
                      ?????????
                    </Link>
                  </li>
                )}
                <li onClick={() => gaEvent('notic')}>
                  <Link
                    to={`/community/${communtyHome.community.communityId}/notice`}
                  >
                    <img src={boardIcon} />
                    ????????????
                    {addNewBadge(lastNoticePostTime) && (
                      <span className="new-label">NEW</span>
                    )}
                  </Link>
                </li>
                {communtyHome.menus
                  .filter((c) => c.parentId === null)
                  .sort((a, b) => a.order - b.order)
                  .map((menu) => {
                    return (
                      <MenuItemView
                        key={menu.menuId}
                        {...menu}
                        subMenus={communtyHome.menus.filter(
                          (c) => c.parentId === menu.id
                        )}
                      />
                    );
                  })}
              </ul>
            )}
          </div>
        </div>
      </div>
      <CommunityProfileModal
        open={profileOpen}
        setOpen={setProfileOpen}
        userProfile={profileInfo && profileInfo.profileImg}
        memberId={profileInfo && profileInfo.id}
        introduce={profileInfo && profileInfo.introduce}
        nickName={profileInfo && profileInfo.nickName}
        name={profileInfo && profileInfo.creatorName}
      />
    </>
  );
}

export default CommunityHomeTreeContainer;
