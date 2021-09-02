import React, { Component, useState } from 'react';
import { reactAutobind, mobxHelper, deleteCookie } from '@nara.platform/accent';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { getAxios } from 'shared/api/Axios';
import findAvailablePageElements from '../../../../../lecture/shared/api/arrangeApi';
import { PageElement } from '../../../../../lecture/shared/model/PageElement';
import { SkProfileService } from 'profile/stores';
import { NotieService } from 'notie/stores';
import myTrainingRoutePaths from 'myTraining/routePaths';
import profileImg from 'style/../../public/images/all/img-profile-56-px.png';
import HeaderAlarmView from '../view/HeaderAlarmView';
import { Area } from 'tracker/model';
import Image from '../../../../../shared/components/Image';
import {
  isExternalInstructor,
  isInternalInstructor,
} from '../../../../../shared/helper/findUserRole';
import { Button, Icon, Input, Popup } from 'semantic-ui-react';
import ProfilePopupView from '../view/ProfilePopupView';
import { PolyglotText } from '../../../../../shared/ui/logic/PolyglotText';
import { LanguageSelectPopupView } from '../view/LanguageSelectPopupView';
import { isCollegeManager } from 'shared/helper/isCollegeManager';
import classNames from 'classnames';
import { getCurrentHistory } from 'shared/store/HistoryStore';
import { SearchHeaderFieldView } from 'search/views/SearchHeaderFieldView';
import { setSearchInSearchInfo } from 'search/search.services';

interface Props extends RouteComponentProps {
  skProfileService?: SkProfileService;
  notieService?: NotieService;
}

interface State {
  balloonShowClass: string;
  menuAuth: PageElement[];
  isOpen: boolean;
  isSearchOpen: boolean;
  write: string;
}

@inject(mobxHelper.injectFrom('profile.skProfileService', 'notie.notieService'))
@reactAutobind
@observer
class ProfileContainer extends Component<Props, State> {
  profileButtonRef: any = React.createRef();

  state = {
    balloonShowClass: '',
    menuAuth: [],
    isOpen: false,
    isSearchOpen: false,
    write: '',
  };

  componentDidMount() {
    const { skProfileService } = this.props;

    if (skProfileService) {
      if (!isExternalInstructor()) {
        skProfileService.findSkProfile();
      } else {
        skProfileService.findCommunityProfile();
      }
    }
    this.findNoReadCount();

    setInterval(() => {
      this.findNoReadCount(); // 5분마다 안 읽은 알림이 있는지 조회
    }, 3000000);

    isExternalInstructor() &&
      document.addEventListener('mousedown', this.handleClickOutside);

    this.avaible();
  }

  componentWillUnmount() {
    isExternalInstructor() &&
      document.removeEventListener('mousedown', this.handleClickOutside);
  }

  async avaible() {
    const response = await findAvailablePageElements();

    if (response) {
      this.setState({
        menuAuth: response,
      });
    }
  }

  handleClickOutside(e: MouseEvent) {
    if (
      this.profileButtonRef &&
      !this.profileButtonRef.current.contains(e.target)
    ) {
      setTimeout(() => this.setState({ balloonShowClass: '' }), 500);
    }
  }

  onTogglePop() {
    const { balloonShowClass } = this.state;
    this.setState({ balloonShowClass: balloonShowClass ? '' : 'show' });
  }

  onLogout() {
    localStorage.clear();

    // localStorage.removeItem('nara.cineroomId');
    // localStorage.removeItem('nara.workspaces');
    // localStorage.removeItem('nara.token');
    // localStorage.removeItem('nara.displayName');
    // localStorage.removeItem('nara.companyCode');
    // localStorage.removeItem('nara.email');

    sessionStorage.clear();
    deleteCookie('nara.isLogin');
    window.location.href = '/api/checkpoint/sso/logout';
    //window.location.href = 'https://proxy.gdisso.sk.com/nsso-authweb/logoff.do?ssosite=mysuni.sk.com&returnURL=https://mysuni.sk.com';
  }

  routeToAlarmBackLink(backLink: string) {
    if (backLink.startsWith('/community')) {
      window.open(
        `${window.location.origin}/suni-community${backLink}`,
        '_blank'
      );
    } else {
      this.props.history.push(backLink);
    }
  }

  handleClickAlarm() {
    const { notieService } = this.props;
    notieService!.findAllMyNotieMentions().then(() => {
      // 알림 목록 화면 오픈시 안읽은 알림 보여주고
      notieService!.readAllMyNotieMentions().then(() => {
        // 보여준 이후에 읽음 처리
        this.findNoReadCount(); // 초기화
      });
    });
  }

  findNoReadCount() {
    const { notieService } = this.props;
    notieService!.findMyNotieNoReadMentionCount(); // 안 읽은 알림이 있는지 조회
  }

  render() {
    //
    // const { skProfileService } = this.props;
    const { skProfile } = SkProfileService.instance;
    const {
      myNotieMentions,
      myNotieNoReadMentionCount,
    } = NotieService.instance;
    // const { member } = skProfile;
    const { balloonShowClass } = this.state;
    const { menuAuth } = this.state;
    const isExternal = isExternalInstructor();
    const isInstructor = isExternalInstructor() || isInternalInstructor();
    const baseUrl = `${window.location.protocol}//${window.location.host}/suni-instructor`;
    const { isOpen, isSearchOpen } = this.state;

    const setOpen = () => {
      //this.profileButtonRef.current.click();
      this.setState({ isOpen: !isOpen });
      document.getElementById('btnProFile')?.click();
    };
    const setSearchOpen = () => {
      setWrite('');
      this.setState({ isSearchOpen: !isSearchOpen });
      document.getElementById('btnSearchPopup')?.click();
      setSearchInSearchInfo({
        checkSearchInSearch: false,
        parentSearchValue: '',
        searchValue: '',
      }); // 초기화
    };
    const setWrite = (searchValue: string) => {
      this.setState({ write: searchValue });
    };

    const PUBLIC_URL = process.env.PUBLIC_URL;

    return (
      <div className="g-info g-info2 g-ab3">
        {!isExternal && (
          <>
            <Popup
              className="popup_gsearch type_b"
              trigger={
                <Button className="btn_gsearch" id="btnSearchPopup">
                  <img
                    src={`${PUBLIC_URL}/images/all/icon-gnb-search-36-px.png`}
                    className="btn_search b_search"
                    alt="검색버튼"
                  />
                </Button>
              }
              position="bottom right"
              on="click"
              //open={isOpen}
              onOpen={setSearchOpen}
            >
              <Popup.Header className="gsearch_header">
                <strong className="h_tit">검색</strong>
                <div className="close_wrapper">
                  <Button className="close" Icon onClick={setSearchOpen} />
                </div>
              </Popup.Header>
              <Popup.Content>
                <div className="gsearch_inner">
                  <div className="search_input">
                    {/* 검색어 입력필드 */}
                    <div
                      className={classNames('search show_text', {
                        focus: 'focus',
                        write: 'write',
                        on: isOpen === true, //input이 popup에 맞춰서 모양이 변경됨
                      })}
                    >
                      <Input
                        type="text"
                        placeholder="검색어를 입력하세요."
                        value={this.state.write}
                        onChange={(e) => setWrite(e.target.value)}
                        onKeyDown={(e: any) => {
                          if (e.key === 'Enter') {
                            setSearchOpen();
                            const history = getCurrentHistory();
                            history?.push(`/search?query=${this.state.write}`);
                          }
                        }}
                      />
                      <Icon
                        className="clear link"
                        onClick={() => setWrite('')}
                      />
                      {/* <Icon className="search_i"/> */}
                      <Button className="btn_sch">
                        <Icon className="search_i" />
                      </Button>
                    </div>
                  </div>
                  <SearchHeaderFieldView callback={setSearchOpen} />
                </div>
              </Popup.Content>
            </Popup>
          </>
        )}
        <LanguageSelectPopupView />
        {!isExternal && (
          <HeaderAlarmView
            myNotieMentions={myNotieMentions}
            myNotieNoReadMentionCount={myNotieNoReadMentionCount}
            routeToAlarmBackLink={this.routeToAlarmBackLink}
            handleClickAlarm={this.handleClickAlarm}
          />
        )}
        {isExternal ? (
          <>
            <button
              className="ui user image label"
              onClick={this.onTogglePop}
              ref={this.profileButtonRef}
            >
              <span className="name">{skProfile.name}</span>
              <span className="affiliation">
                {skProfile.companyName} {skProfile.departmentName}
              </span>
              <Image
                src={skProfile.photoFilePath || profileImg}
                alt="profile"
              />
            </button>
            <div
              className={`balloon-pop ${balloonShowClass}`}
              data-area={Area.HEADER_PROFILE}
            >
              <ul>
                <li>
                  <a
                    href={`${window.location.origin}/suni-instructor/`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i aria-hidden="true" className="balloon mypage icon" />
                    <span>
                      <PolyglotText
                        defaultString="강사 서비스"
                        id="home-mapg-강사서비스"
                      />
                    </span>
                  </a>
                </li>
                <li>
                  <button type="button" onClick={this.onLogout}>
                    <i aria-hidden="true" className="balloon logout icon" />
                    <span>
                      <PolyglotText
                        defaultString="Logout"
                        id="home-mapg-lgot"
                      />
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <Popup
            className="pop_profile"
            trigger={
              <Button id="btnProFile" className="user image label btn_user">
                <span>
                  <Image
                    src={skProfile.photoFilePath || profileImg}
                    alt="profile"
                  />
                </span>
              </Button>
            }
            position="bottom right"
            on="click"
            //open={isOpen}
            onOpen={setOpen}
          >
            <Popup.Content>
              <ProfilePopupView setOpen={setOpen} isInstructor={isInstructor} />
              {/*프로필사진 셋팅전 */}
            </Popup.Content>
          </Popup>
        )}
      </div>
    );
  }
}

export default withRouter(ProfileContainer);
