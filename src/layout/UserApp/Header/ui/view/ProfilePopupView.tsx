/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState, useEffect } from 'react';
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

interface Props {
  setOpen: () => void;
  isInstructor: boolean;
}

function ProfilePopupView(props: Props) {
  const [isNickName, setIsNickName] = useState<boolean>();
  const [isSettingProfile, setIsSettingProfile] = useState<boolean>(true);
  const skProfileService = SkProfileService.instance;
  const { skProfile } = skProfileService;
  const history = useHistory();
  const externalInstructor = localStorage.getItem('nara.externalInstructor');
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

  function onInstructor() {
    window.open(`${window.location.origin}/suni-instructor/`, '_blank');
  }

  return (
    <>
      {skProfile && (
        <div className="profile-contents-area">
          <div className="profile-wrapper">
            <div className="bg-wrapper">
              {<ProfileImage src={skProfile.bgFilePath || DefaultBgImg} />}
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
                    <div className="close-wrapper">
                      <button
                        onClick={() => {
                          props.setOpen();
                        }}
                      >
                        <Image
                          src={`${process.env.PUBLIC_URL}/images/all/icon-profile-close.png`}
                        />
                        <span className="blind">
                          <PolyglotText
                            defaultString="close"
                            id="mypage-popupview-close"
                          />
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="image-area">
                    <ProfileImage src={skProfile.photoFilePath || DefaultImg} />
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
                  {instructorId &&
                  instructorId !== '' &&
                  externalInstructor &&
                  externalInstructor === 'true' ? (
                    <div className="page-bttn-area">
                      <Button className="page-bttn" onClick={onInstructor}>
                        <PolyglotText
                          defaultString="강사 서비스"
                          id="mypage-popupview-강사"
                        />
                      </Button>
                    </div>
                  ) : instructorId &&
                    instructorId !== '' &&
                    externalInstructor &&
                    externalInstructor === 'false' ? (
                    <div className="page-bttn-area type2">
                      <Button
                        className="page-bttn"
                        onClick={() => {
                          props.setOpen();
                          history.push(myTrainingRoutePaths.myPage());
                        }}
                      >
                        <PolyglotText
                          defaultString="My Page"
                          id="mypage-popupview-MyPage"
                        />
                      </Button>
                      <Link to="#" onClick={onInstructor} className="l_to">
                        <PolyglotText
                          defaultString="강사 서비스"
                          id="mypage-popupview-강사2"
                        />
                      </Link>
                    </div>
                  ) : (
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
          <div className="tag-info-area">
            {!isSettingProfile && (
              // 프로필설정이 안되어있는 경우
              <Button
                className="btn-setting"
                onClick={() => {
                  props.setOpen();
                  history.push(myTrainingRoutePaths.myPage());
                }}
              >
                <PolyglotText
                  defaultString="프로필 설정"
                  id="mypage-popupview-프로필설정"
                />
                <i>
                  <Image
                    src={`${process.env.PUBLIC_URL}/images/all/icon-tooltip-w-20-px.svg`}
                  />
                </i>
                <p
                  className="tool-tip-box"
                  dangerouslySetInnerHTML={{
                    __html: getPolyglotText(
                      '프로필을 설정해서 <br />자유롭게 활동해 보세요!',
                      'mypage-popupview-설명'
                    ),
                  }}
                />
              </Button>
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
            <div className="logout-area">
              <Button onClick={onLogout}>
                <PolyglotText
                  defaultString="Logout"
                  id="mypage-popupview-logout"
                />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default observer(ProfilePopupView);
