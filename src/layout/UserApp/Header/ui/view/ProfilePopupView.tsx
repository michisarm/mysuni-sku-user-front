import React, { useCallback, useState, useEffect, Component } from 'react';
import { useHistory } from 'react-router';
import myTrainingRoutePaths from 'myTraining/routePaths';
import {
  useProfilePopupModel,
  getProfilePopupModel,
} from '../../../store/ProfilePopupStore';
import { Button, Image } from 'semantic-ui-react';
import { getProfilePopup } from '../../../service/ProfilePopupService/getProfilePopup';
import { SkProfileService } from 'profile/stores';
import SkProfileUdo from '../../../../../../src/profile/model/SkProfileUdo';
import { reactAlert } from '@nara.platform/accent';
import ProfileImage from '../../../../../../src/shared/components/Image/Image';
import DefaultBgImg from '../../../../../style/media/img-my-profile-card-bg.png';
import DefaultImg from '../../../../../style/media/img-profile-80-px.png';
import { Link } from 'react-router-dom';
import {
  requestFollowersModal,
  requestFollowingsModal,
} from '../../../../../community/service/useFollowModal/utility/requestFollowModalIntro';
import {
  useFollowersModal,
  useFollowingsModal,
} from '../../../../../community/store/CommunityFollowModalStore';

interface Props {
  setOpen: () => void;
  isInstructor: boolean;
}

function ProfilePopupView(props: Props) {
  //const profileInfo = useProfilePopupModel()
  const [isNickName, setIsNickName] = useState<boolean>();
  const [isSettingProfile, setIsSettingProfile] = useState<boolean>(true);
  const skProfileService = SkProfileService.instance;
  const { skProfile, modifySkProfile } = skProfileService;
  const history = useHistory();
  const externalInstructor = localStorage.getItem('nara.externalInstructor');
  const instructorId = localStorage.getItem('nara.instructorId');
  const followersList = useFollowersModal();
  const followingsList = useFollowingsModal();
  const [saveFlag, setSaveFlag] = useState<boolean>(true);

  useEffect(() => {
    requestFollowersModal();
    requestFollowingsModal();
  }, []);

  useEffect(() => {
    if (
      (skProfile.nickName === null || skProfile.nickName === '') &&
      (skProfile.introduce === null || skProfile.introduce === '')
    ) {
      setIsSettingProfile(false);
    } else {
      setIsSettingProfile(true);
    }
  }, [skProfile.nickName, skProfile.introduce]);

  useEffect(() => {
    if (skProfile.nameFlag === 'R') {
      setIsNickName(false);
    } else {
      setIsNickName(true);
    }
  }, [skProfile]);

  const onClickToggle = useCallback(async (useNickName) => {
    if (
      !SkProfileService.instance.skProfile.id ||
      !skProfile.nickName ||
      skProfile.nickName === ''
    ) {
      reactAlert({
        title: '안내',
        message: '닉네임을 등록해주세요.',
      });
      return;
    }

    if (saveFlag) {
      setSaveFlag(false);

      const skProfileUdo: SkProfileUdo = new SkProfileUdo(
        skProfile.member.currentJobGroup,
        skProfile.member.favoriteJobGroup,
        skProfile.pisAgreement
      );

      if (useNickName) {
        setIsNickName(useNickName);
        skProfileUdo.nameFlag = 'N';
      } else {
        setIsNickName(useNickName);
        skProfileUdo.nameFlag = 'R';
      }

      await modifySkProfile(skProfileUdo);
      skProfileService!.findSkProfile().then((skProfile) => {
        //
        setSaveFlag(true);
      });
    }
    //getProfilePopup();
  }, []);

  //hobby를 ',' 기준으로 구분한다.
  function getTagHtml() {
    let tagList = new Array();
    let tagHtml = '';

    if (skProfile && skProfile.introduce !== null) {
      tagList = skProfile ? skProfile.introduce.split(',') : [''];
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
                        실명
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
                        닉네임
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
                        <span className="blind">close</span>
                      </button>
                    </div>
                  </div>

                  <div className="image-area">
                    <ProfileImage src={skProfile.photoFilePath || DefaultImg} />
                  </div>
                  <div className="profile-info ">
                    <span className="prof-tit">
                      {isNickName ? skProfile.nickName : skProfile.member.name}
                    </span>
                    <div className="foll-info">
                      <span>{followersList?.followers.length}</span>
                      &nbsp;Followers
                      <span>{followingsList?.followings.length}</span>
                      &nbsp;Following
                    </div>
                  </div>
                  {instructorId &&
                  instructorId !== '' &&
                  externalInstructor &&
                  externalInstructor === 'true' ? (
                    <div className="page-bttn-area">
                      <Button className="page-bttn" onClick={onInstructor}>
                        강사 서비스
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
                        My Page
                      </Button>
                      <Link to="#" onClick={onInstructor} className="l_to">
                        강사 서비스
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
                        My Page
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
                프로필 설정
                <i>
                  <Image
                    src={`${process.env.PUBLIC_URL}/images/all/icon-tooltip-w-20-px.svg`}
                  />
                </i>
                <p className="tool-tip-box">
                  프로필을 설정해서
                  <br />
                  자유롭게 활동해 보세요!
                </p>
              </Button>
            )}
            {isSettingProfile && (
              // 프로필설정이 되어있는 경우
              <>
                <div className="info-area">
                  <span className="prof-name">
                    {isNickName ? skProfile.member.name : skProfile.nickName}
                  </span>
                  <span className="comp-name">{skProfile.member.company}</span>
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
              <Button onClick={onLogout}>Logout</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfilePopupView;
