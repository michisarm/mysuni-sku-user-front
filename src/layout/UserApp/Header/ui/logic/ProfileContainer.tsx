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
import {
  getPolyglotText,
  PolyglotText,
} from '../../../../../shared/ui/logic/PolyglotText';
import { LanguageSelectPopupView } from '../view/LanguageSelectPopupView';
import { LearningMenuView } from '../view/HeaderElementsView';

interface Props extends RouteComponentProps {
  skProfileService?: SkProfileService;
  notieService?: NotieService;
  onClickMenu: (menuName: string) => void;
}

interface State {
  balloonShowClass: string;
  menuAuth: PageElement[];
  isOpen: boolean;
  isSearchOpen: boolean;
  // write: string;
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
    // write: '',
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
    const { skProfile } = SkProfileService.instance;
    const { myNotieMentions, myNotieNoReadMentionCount } =
      NotieService.instance;
    const { balloonShowClass } = this.state;
    const { menuAuth } = this.state;
    const isExternal = isExternalInstructor();
    const isInstructor = isExternalInstructor() || isInternalInstructor();
    const baseUrl = `${window.location.protocol}//${window.location.host}/suni-instructor`;
    const { isOpen, isSearchOpen } = this.state;

    const setOpen = () => {
      this.setState({ isOpen: !isOpen });
      document.getElementById('btnProFile')?.click();
    };

    const PUBLIC_URL = process.env.PUBLIC_URL;

    return (
      <div className="g-info-new" data-area={Area.HEADER_GNB}>
        <LearningMenuView onClickMenu={this.props.onClickMenu} />
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
              className="ui button user_btn"
              onClick={this.onTogglePop}
              ref={this.profileButtonRef}
            >
              <img
                src="data:image/svg+xml;charset=utf-8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMzBweCIgaGVpZ2h0PSIzMHB4IiB2aWV3Qm94PSIwIDAgMzAgMzAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+MjdGN0RBRTctMUZBNC00MzU0LTlGNkUtQzI2MzJDMTA2OEYwPC90aXRsZT4KICAgIDxnIGlkPSLstZzsooXrs7giIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJOZXdfTWFpbl8wMSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE0OTAuMDAwMDAwLCAtMTA1LjAwMDAwMCkiIHN0cm9rZT0iIzIyMjIyMiI+CiAgICAgICAgICAgIDxnIGlkPSJbK10tR05CIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAwMDAwMCwgODIuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0iYnRuX2duYl9teXByb2ZpbGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE0OTAuMDAwMDAwLCAyMy4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICA8Y2lyY2xlIGlkPSJPdmFsIiBjeD0iMTUiIGN5PSIxMC41IiByPSI1LjUiPjwvY2lyY2xlPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0yNSwyNSBDMjUsMTcuMTQyODU3MSAxOS45NjQzNTczLDE2IDE1LDE2IEMxMC4wMzU2NDI3LDE2IDUsMTcuMTQyODU3MSA1LDI1IiBpZD0iT3ZhbC1Db3B5IiBzdHJva2UtbGluZWNhcD0icm91bmQiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"
                alt="프로필"
                className="ui image"
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
              <Button id="btnProFile" className="user_btn">
                <img
                  src="data:image/svg+xml;charset=utf-8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMzBweCIgaGVpZ2h0PSIzMHB4IiB2aWV3Qm94PSIwIDAgMzAgMzAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+MjdGN0RBRTctMUZBNC00MzU0LTlGNkUtQzI2MzJDMTA2OEYwPC90aXRsZT4KICAgIDxnIGlkPSLstZzsooXrs7giIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJOZXdfTWFpbl8wMSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE0OTAuMDAwMDAwLCAtMTA1LjAwMDAwMCkiIHN0cm9rZT0iIzIyMjIyMiI+CiAgICAgICAgICAgIDxnIGlkPSJbK10tR05CIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAwMDAwMCwgODIuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0iYnRuX2duYl9teXByb2ZpbGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE0OTAuMDAwMDAwLCAyMy4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICA8Y2lyY2xlIGlkPSJPdmFsIiBjeD0iMTUiIGN5PSIxMC41IiByPSI1LjUiPjwvY2lyY2xlPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0yNSwyNSBDMjUsMTcuMTQyODU3MSAxOS45NjQzNTczLDE2IDE1LDE2IEMxMC4wMzU2NDI3LDE2IDUsMTcuMTQyODU3MSA1LDI1IiBpZD0iT3ZhbC1Db3B5IiBzdHJva2UtbGluZWNhcD0icm91bmQiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"
                  alt="프로필"
                  className="ui image"
                />
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

        <LanguageSelectPopupView />
      </div>
    );
  }
}

export default withRouter(ProfileContainer);
