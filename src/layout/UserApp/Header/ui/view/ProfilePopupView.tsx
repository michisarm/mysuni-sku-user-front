/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router';
import myTrainingRoutePaths from 'myTraining/routePaths';
import { useProfilePopupModel } from '../../../store/ProfilePopupStore';
import { Button, Image } from 'semantic-ui-react';
import { getProfilePopup } from '../../../service/ProfilePopupService/getProfilePopup';
import { SkProfileService } from 'profile/stores';
import { reactAlert } from '@nara.platform/accent';
import ProfileImage from '../../../../../../src/shared/components/Image/Image';
import DefaultBgImg from '../../../../../style/media/img-my-profile-card-bg.png';
import DefaultImg from '../../../../../style/media/img-profile-80-px.png';
import { Link } from 'react-router-dom';
import {
  requestFollowersModal,
  requestFollowingsModal,
} from '../../../../../community/service/useFollowModal/utility/requestFollowModalIntro';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';
import { isCommunityAuth } from 'layout/UserApp/store/MenuAuthStore';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { isEmpty } from 'lodash';
import { observer } from 'mobx-react';
import { usePageElements } from 'shared/store/PageElementsStore';
import { getCurrentHistory } from 'shared/store/HistoryStore';
import { patronInfo } from '@nara.platform/dock';
import { Area } from 'tracker/model';
import { isExternalInstructor } from 'shared/helper/findUserRole';

interface Props {
  setOpen: () => void;
  isInstructor: boolean;
}

function goToApproval() {
  const history = getCurrentHistory();
  history?.push('/approval');
}

function onClickAdminSite() {
  // localAdmin by gon
  if (window.location.hostname === 'mysuni.sk.com') {
    window.open('https://star.mysuni.sk.com/star-login');
  } else if (window.location.hostname === 'ma.mysuni.sk.com') {
    window.open('https://ma-star.mysuni.sk.com/star-login');
  } else if (window.location.hostname === 'stg.mysuni.sk.com') {
    window.open('https://stg-star.mysuni.sk.com/star-login');
  } else if (window.location.hostname === 'localhost') {
    window.open('http://localhost:8090');
  } else if (window.location.hostname === 'university.sk.com') {
    window.open('http://university.sk.com/login');
  } else {
    const adminSiteUrl = process.env.REACT_APP_ADMIN_SITE;
    if (adminSiteUrl) {
      window.open(adminSiteUrl);
    }
  }
}

function onInstructor() {
  window.open(`${window.location.origin}/suni-instructor/`);
}

function ProfilePopupView(props: Props) {
  const [isNickName, setIsNickName] = useState<boolean>();
  const [isSettingProfile, setIsSettingProfile] = useState<boolean>(true);
  const skProfileService = SkProfileService.instance;
  const { skProfile } = skProfileService;
  const history = useHistory();
  const externalInstructor = isExternalInstructor();
  const instructorId = localStorage.getItem('nara.instructorId');
  const [saveFlag, setSaveFlag] = useState<boolean>(true);
  const profileInfo = useProfilePopupModel();

  useEffect(() => {
    getProfilePopup();
    // requestFollowersModal();
    // requestFollowingsModal();
  }, []);

  useEffect(() => {
    if (
      (skProfile.nickname === null || skProfile.nickname === '') &&
      (skProfile.selfIntroduction === null || skProfile.selfIntroduction === '')
    ) {
      setIsSettingProfile(false);
    } else {
      setIsSettingProfile(true);
    }
  }, [skProfile.nickname, skProfile.selfIntroduction]);

  useEffect(() => {
    setIsNickName(skProfile.displayNicknameFirst);
  }, [skProfile]);

  const onClickToggle = useCallback(async (useNickName) => {
    if (
      !SkProfileService.instance.skProfile.id ||
      !skProfile.nickname ||
      skProfile.nickname === ''
    ) {
      reactAlert({
        title: getPolyglotText('안내', 'mypage-popupview-안내'),
        message: getPolyglotText(
          '닉네임을 등록해주세요.',
          'mypage-popupview-닉네임등록'
        ),
      });
      return;
    }

    if (saveFlag) {
      setSaveFlag(false);

      const params = {
        nameValues: [
          {
            name: 'displayNicknameFirst',
            value: JSON.stringify(useNickName),
          },
        ],
      };

      await skProfileService.modifySkProfile(params);
      skProfileService!.findSkProfile().then(() => {
        setSaveFlag(true);
      });
    }
  }, []);

  //hobby를 ',' 기준으로 구분한다.
  function getTagHtml() {
    let tagList = [];
    let tagHtml = '';

    if (skProfile && skProfile.selfIntroduction !== null) {
      tagList = skProfile ? skProfile.selfIntroduction.split(',') : [''];
      tagList.map((tag, index) => {
        if (tag !== '') {
          tagHtml += '<span>#' + tag + '</span>';
        }
      });
    }

    return tagHtml;
  }

  function onLogout() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/api/checkpoint/sso/logout';
  }

  const pageElements = usePageElements();

  const hasAdminRole = useMemo<boolean>(
    () =>
      patronInfo.hasPavilionRole(
        'SuperManager',
        'CollegeManager',
        'CompanyManager'
      ),
    []
  );

  return (
    <>
      {skProfile && (
        <div className="profile-contents-area" data-area={Area.HEADER_PROFILE}>
          <div className="profile-wrapper">
            <div className="bg-wrapper">
              {
                <ProfileImage
                  src={
                    (skProfile.backgroundImagePath && skProfile.bgFilePath) ||
                    DefaultBgImg
                  }
                />
              }
              <div className="profile-info-wrapper">
                <div className="profile-info-area">
                  <div className="header-bttn-area">
                    <div className="name-chng-area">
                      {/* 실명/닉네임 class 이름 chng-active*/}
                      {/* <Button className={`name-chng-bttn ${(profileInfo.nameFlag === 'R' && !isNickName) ? 'chng-active' : ''}`} onClick={() => onClickToggle(false)}>실명</Button>
                      <Button className={`name-chng-bttn ${(profileInfo.nameFlag === 'N' && isNickName) ? 'chng-active' : ''}`} onClick={() => onClickToggle(true)}>닉네임</Button> */}
                      <Button
                        className={`name-chng-bttn ${
                          isNickName !== undefined && !isNickName
                            ? 'chng-active'
                            : ''
                        }`}
                        onClick={() => {
                          saveFlag && isNickName && onClickToggle(false);
                        }}
                      >
                        <PolyglotText
                          defaultString="실명"
                          id="mypage-popupview-실명"
                        />
                      </Button>
                      <Button
                        className={`name-chng-bttn ${
                          isNickName !== undefined && isNickName
                            ? 'chng-active'
                            : ''
                        }`}
                        onClick={() => {
                          saveFlag && !isNickName && onClickToggle(true);
                        }}
                      >
                        <PolyglotText
                          defaultString="닉네임"
                          id="mypage-popupview-닉네임"
                        />
                      </Button>
                    </div>
                    <div className="top-right-area">
                      <button className="ui button lg-out" onClick={onLogout}>
                        Logout
                      </button>
                    </div>
                  </div>

                  <div className="image-area">
                    <ProfileImage
                      src={
                        (skProfile.photoImagePath && skProfile.photoFilePath) ||
                        DefaultImg
                      }
                    />
                  </div>
                  <div className="profile-info ">
                    <span className="prof-tit">
                      {isNickName
                        ? skProfile.nickname
                        : parsePolyglotString(skProfile.name)}
                    </span>
                    {isCommunityAuth() && (
                      <div className="foll-info">
                        <span>{profileInfo?.followerCount || 0}</span>
                        <PolyglotText
                          defaultString="&nbsp;Followers"
                          id="mypage-popupview-Followers"
                        />
                        <span>{profileInfo?.followingCount || 0}</span>
                        <PolyglotText
                          defaultString="&nbsp;Following"
                          id="mypage-popupview-Following"
                        />
                      </div>
                    )}
                  </div>
                  {!externalInstructor && (
                    <div className="page-bttn-area">
                      <Button
                        className="page-bttn"
                        onClick={() => {
                          props.setOpen();
                          history.push(myTrainingRoutePaths.myPage());
                        }}
                      >
                        <PolyglotText
                          defaultString="My Page"
                          id="mypage-popupview-MyPage2"
                        />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="tag-info-area sty2">
            {!isSettingProfile && (
              <div className="prf-setting-area">
                <p
                  dangerouslySetInnerHTML={{
                    __html: getPolyglotText(
                      '프로필 설정으로<br />{name} 님을 표현해 보세요!',
                      'profilemodal-nodata',
                      {
                        name: SkProfileService.instance.profileMemberName,
                      }
                    ),
                  }}
                />
                <button
                  onClick={() => {
                    props.setOpen();
                    history.push(myTrainingRoutePaths.myPage());
                  }}
                  className="ui button setting-bttn"
                >
                  <PolyglotText
                    defaultString="프로필 설정하기"
                    id="profilemodal-edit"
                  />
                </button>
              </div>
            )}
            {isSettingProfile && (
              // 프로필설정이 되어있는 경우
              <>
                <div className="info-area">
                  <span className="prof-name">
                    {isNickName
                      ? parsePolyglotString(skProfile.name)
                      : skProfile.nickname}
                  </span>
                  <span className="comp-name">
                    {parsePolyglotString(skProfile.companyName)}
                  </span>
                </div>
                <div className="tag-area">
                  <div
                    className="belt"
                    dangerouslySetInnerHTML={{ __html: getTagHtml() }}
                  />
                </div>
              </>
            )}
          </div>
          <div className="bottom-bttn-area">
            <ul>
              {instructorId !== '' && (
                <li>
                  <button
                    className="ui button b-menu"
                    onClick={() => {
                      props.setOpen();
                      onInstructor();
                    }}
                  >
                    <PolyglotText
                      defaultString="강사 서비스"
                      id="mypage-popupview-강사"
                    />
                  </button>
                </li>
              )}
              {pageElements.some(
                (c) => c.position === 'FloatingMenu' && c.type === 'Approval'
              ) && (
                <li>
                  <button
                    className="ui button b-menu"
                    onClick={() => {
                      props.setOpen();
                      goToApproval();
                    }}
                  >
                    {getPolyglotText('승인관리', 'home-플버튼-승인관리')}
                  </button>
                </li>
              )}
              {hasAdminRole && (
                <li>
                  <button
                    className="ui button b-menu"
                    onClick={() => {
                      props.setOpen();
                      onClickAdminSite();
                    }}
                  >
                    Admin
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default observer(ProfilePopupView);
