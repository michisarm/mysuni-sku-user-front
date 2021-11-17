import React, { useCallback, useState, useEffect, useRef } from 'react';
import { Image } from '../components/Image';
import { Button, Popup } from 'semantic-ui-react';
import {
  onCloseHeaderUserProfileInfoProfileCardPopup,
  onOpenHeaderUserProfileInfoProfileCardPopup,
} from './userProfileInfo.events';
import ImgProfile from '../assets/img-profile-80-px.png';
import { checkExternalInstructor, checkInstructor } from '../app.services';
import { Link, useHistory } from 'react-router-dom';
import { showAlert } from '../../packages/alert/Alert';
import { useOpenHeaderUserProfileInfoProfileCardPopup } from './userProfileInfo.services';
import { requestProfile } from '../app/services/app.request';
import { useAppProfile } from '../app/services/app.services';
import { Area } from '../../../tracker/model';
import {
  modifyAdditionalInfo,
  modifyProfile,
} from '../data/community/apis/profilesApi';
import { NameValue } from '../data/accent/models/NameValue';
import { StorageModel } from '@nara.platform/accent';

function onLogout() {
  const searchRecents =
    JSON.parse(localStorage.getItem('nara.searchRecents') || '[]') || [];
  localStorage.clear();
  new StorageModel('localStorage', 'searchRecents').save(searchRecents);
  sessionStorage.clear();
  window.location.href = '/api/checkpoint/sso/logout';
}

function UserProfileInfoProfileCardPopupContent() {
  const [isNickName, setIsNickName] = useState<boolean>();
  const [saveFlag, setSaveFlag] = useState<boolean>(true);
  const [isSettingProfile, setIsSettingProfile] = useState<boolean>(true);

  const profileInfo = useAppProfile();

  //introduce를 ',' 기준으로 구분한다.
  const getTagHtml = useCallback(() => {
    if (profileInfo === undefined) {
      return null;
    }

    let tagList = [];
    let tagHtml = '';

    tagList = profileInfo.selfIntroduction
      ? profileInfo.selfIntroduction.split(',')
      : [''];

    tagList.forEach((tag) => {
      if (tag !== '') {
        tagHtml += '<span>#' + tag + '</span>';
      }
    });

    return tagHtml;
  }, [profileInfo]);

  useEffect(() => {
    if (
      (profileInfo?.profileNickName === null ||
        profileInfo?.profileNickName === '') &&
      (profileInfo.selfIntroduction === null ||
        profileInfo.selfIntroduction === '')
    ) {
      setIsSettingProfile(false);
    } else {
      setIsSettingProfile(true);
    }
  }, [profileInfo?.profileNickName, profileInfo?.selfIntroduction]);

  useEffect(() => {
    // if (profileInfo?.displayNicknameFirst) {
    //   setIsNickName(false);
    // } else {
    //   setIsNickName(true);
    // }
    setIsNickName(profileInfo?.displayNicknameFirst);
  }, [profileInfo]);

  const onInstructor = useCallback(() => {
    window.open(`${window.location.origin}/suni-instructor/`, '_blank');
  }, []);

  const onClickToggle = useCallback(
    async (useNickName) => {
      if (
        !profileInfo?.id ||
        !profileInfo.profileNickName ||
        profileInfo.profileNickName === ''
      ) {
        showAlert({
          title: '안내',
          message: '닉네임을 등록해주세요.',
        });
        return;
      }

      if (saveFlag) {
        setSaveFlag(false);

        const params: NameValue[] = [
          {
            name: 'displayNicknameFirst',
            value: JSON.stringify(useNickName),
          },
        ];

        await modifyProfile(params);
        requestProfile();
        setSaveFlag(true);
      }
    },
    [profileInfo?.id, profileInfo?.profileNickName, saveFlag]
  );

  if (profileInfo === undefined) {
    return null;
  }

  return (
    <>
      <div
        className="profile-contents-area"
        data-area={Area.COMMUNITY_HEADER_PROFILE}
      >
        <div className="profile-wrapper">
          <div className="bg-wrapper">
            <Image
              src={
                profileInfo.backgroundImagePath ||
                '/suni-community/images/all/img-my-profile-card-bg.f2a776a9.png'
              }
            />
            <div className="profile-info-wrapper">
              <div className="profile-info-area">
                <div className="header-bttn-area">
                  {!checkExternalInstructor() && (
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
                  )}
                  <div className="close-wrapper">
                    <button
                      onClick={() => {
                        onCloseHeaderUserProfileInfoProfileCardPopup();
                      }}
                    >
                      <Image src="/suni-community/images/all/icon-profile-close.png" />
                      <span className="blind">close</span>
                    </button>
                  </div>
                </div>

                <div className="image-area">
                  <Image
                    src={
                      (profileInfo?.profileImage &&
                        profileInfo?.profileImage) ||
                      '/suni-community/images/all/img-profile-80-px.png'
                    }
                    className="ui image"
                  />
                </div>
                <div className="profile-info ">
                  <span className="prof-tit">
                    {isNickName
                      ? profileInfo?.profileNickName
                      : profileInfo?.profileName}
                  </span>
                  <div className="foll-info">
                    <span>{profileInfo?.followerCount}</span> Followers
                    <span>{profileInfo?.followingCount}</span> Following
                  </div>
                </div>
                {/*<div className="count-area">
                  <div className="cnt-box com-cnt">
                    <span>커뮤니티</span>
                    <strong>{profileInfo?.communityCount}</strong>
                  </div>
                  <div className="cnt-box feed-cnt">
                    <span>Feed</span>
                    <strong>{profileInfo?.feedCount}</strong>
                  </div>
                </div>
                  <div className="follow-bttn-area"></div>*/}
                {
                  /*checkExternalInstructor() ? (
                  <div className="page-bttn-area">
                    <Button className="page-bttn" onClick={onInstructor}>
                      강사 서비스
                    </Button>
                  </div>
                ) : checkInstructor() && !checkExternalInstructor() ? (*/
                  checkInstructor() ? (
                    <div className="page-bttn-area type2">
                      <Button
                        className="page-bttn"
                        onClick={() => {
                          window.open(
                            `${window.location.origin}/suni-main/my-training/my-page/MyProfile`,
                            '_blank'
                          );
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
                          window.open(
                            `${window.location.origin}/suni-main/my-training/my-page/MyProfile`,
                            '_blank'
                          );
                        }}
                      >
                        My Page
                      </Button>
                    </div>
                  )
                }
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
                window.open(
                  `${window.location.origin}/suni-main/my-training/my-page/MyProfile`,
                  '_blank'
                );
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
            <>
              <div className="info-area">
                <span className="prof-name">
                  {isNickName
                    ? profileInfo?.profileName
                    : profileInfo?.profileNickName}
                </span>
                <span className="comp-name">{profileInfo?.companyName}</span>
              </div>
              <div className="tag-area">
                <div
                  className="belt"
                  dangerouslySetInnerHTML={{ __html: getTagHtml() || '' }}
                ></div>
              </div>
            </>
          )}
          <div className="logout-area">
            <Button onClick={onLogout}>Logout</Button>
          </div>
        </div>
      </div>
    </>
  );
}

interface HeaderUserProfileInfoProfileCardPopupProps {
  isLMSHeader?: boolean;
}

export function HeaderUserProfileInfoProfileCardPopup(
  props: HeaderUserProfileInfoProfileCardPopupProps
) {
  const openProfileCardPopup =
    useOpenHeaderUserProfileInfoProfileCardPopup() || false;

  const profileInfo = useAppProfile();

  const profileButtonRef: any = useRef();

  const [balloonShowClass, setBalloonShowClass] = useState<string>('none');

  useEffect(() => {
    /*checkExternalInstructor() &&
      document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // componentWillUnmount
      checkExternalInstructor() &&
        document.removeEventListener('mousedown', handleClickOutside);
    };*/
  }, []);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (profileButtonRef && profileButtonRef.current !== null) {
      if (!profileButtonRef.current.contains(e.target)) {
        setTimeout(() => setBalloonShowClass('none'), 500);
      } else if (profileButtonRef.current.contains(e.target)) {
        onTogglePop();
      }
    }
  }, []);

  const onTogglePop = useCallback(() => {
    setBalloonShowClass('block');
  }, [balloonShowClass]);

  const { isLMSHeader } = props;

  return (
    <>
      {
        /*checkExternalInstructor() ? (
        <>
          <button
            className="ui user image label button btn_user"
            style={{ borderRadius: '50%', overflow: 'hidden' }}
            onClick={onTogglePop}
            ref={profileButtonRef}
          >
            <span className="name">{profileInfo?.profileName}</span>
            <span className="affiliation">
              {profileInfo?.companyName} {profileInfo?.departmentName}
            </span>
            <Image
              src={profileInfo?.profileImage || ImgProfile}
              alt="profile"
              className="ui image"
            />
          </button>
          <div
            className="balloon-pop"
            style={{
              display: balloonShowClass,
              position: 'absolute',
              top: '55px',
              right: '-2px',
              width: 'auto',
              background: `url('${process.env.PUBLIC_URL}/images/all/GNB_menu_logout.png') 0 0 no-repeat`,
              backgroundSize: '100% 100%',
              zIndex: 100,
            }}
            data-area={Area.HEADER_PROFILE}
          >
            <ul style={{ padding: '1.625rem 1.25rem' }}>
              <li>
                <a
                  href={`${window.location.origin}/suni-instructor/`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i aria-hidden="true" className="balloon mypage icon" />
                  <span>강사 서비스</span>
                </a>
              </li>
              <li>
                <button type="button" onClick={onLogout}>
                  <i aria-hidden="true" className="balloon logout icon" />
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </>
      ) : (*/
        <Popup
          className="pop_profile"
          style={{ width: '280px' }}
          trigger={
            <Button
              className={`btn_user ${isLMSHeader && 'user image label'}`}
              style={
                checkExternalInstructor()
                  ? {
                      position: 'relative',
                      top: '1rem',
                      borderRadius: '50%',
                      overflow: 'hidden',
                    }
                  : { borderRadius: '50%', overflow: 'hidden' }
              }
            >
              <Image
                src={profileInfo?.profileImage || ImgProfile}
                alt="profile"
                className="ui image"
              />
            </Button>
          }
          content={
            <Popup.Content>
              <UserProfileInfoProfileCardPopupContent />
            </Popup.Content>
          }
          position="bottom right"
          on="click"
          open={openProfileCardPopup}
          onOpen={onOpenHeaderUserProfileInfoProfileCardPopup}
          onClose={onCloseHeaderUserProfileInfoProfileCardPopup}
        />
      }
    </>
  );
}
