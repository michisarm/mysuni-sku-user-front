import React, { useCallback, useState, useEffect, Component } from 'react';
import myTrainingRoutePaths from 'myTraining/routePaths';
import { useProfilePopupModel, getProfilePopupModel } from '../../../store/ProfilePopupStore';
import { Button, Image } from 'semantic-ui-react';
import { getProfilePopup } from '../../../service/ProfilePopupService/getProfilePopup';
import { SkProfileService } from 'profile/stores';
import SkProfileUdo from '../../../../../../src/profile/model/SkProfileUdo';
import { reactAlert } from '@nara.platform/accent';
import ProfileImage from '../../../../../../src/shared/components/Image/Image';


interface Props {
  setOpen: () => void,
}

interface State {

}

function ProfilePopupView(props: Props) {
  const profileInfo = useProfilePopupModel()
  const [isNickName, setIsNickName] = useState<boolean>();
  const [btnRealName, setBtnRealName] = useState<string>('chng-active');
  const [btnNickName, setBtnNickName] = useState<string>('');
  const [isSettingProfile, setIsSettingProfile] = useState<boolean>(true);
  const skProfileService = SkProfileService.instance;
  const { skProfile, modifySkProfile } = skProfileService;

  useEffect(() => {
    getProfilePopup();
  }, []);

  useEffect(() => {
    if(profileInfo){
      if(profileInfo.nameFlag === 'R'){
        setIsNickName(false)
      }else{
        setIsNickName(true)
      }
    }
  }, [profileInfo]);

  const onClickToggle = useCallback(async (useNickName) => {

    if(profileInfo && 
        profileInfo.nickname && 
        profileInfo.nickname === ''){
      reactAlert({
        title: '안내',
        message: '닉네임을 등록해주세요.',
      });
      return;
    }

    const skProfileUdo: SkProfileUdo = new SkProfileUdo(
      skProfile.member.currentJobGroup,
      skProfile.member.favoriteJobGroup,
      skProfile.pisAgreement
    );
    
    if (useNickName) {
      setIsNickName(useNickName);
      skProfileUdo.nameFlag = 'N';
    }
    else {
      setIsNickName(useNickName);
      skProfileUdo.nameFlag = 'R';
    }

    await modifySkProfile(skProfileUdo);
    getProfilePopup();
  }, [isNickName])

  //hobby를 ',' 기준으로 구분한다.
  function getTagHtml() {
    let tagList = new Array();
    let tagHtml = '';

    tagList = profileInfo ? profileInfo.hobby.split(',') : [""];
    tagList.map((tag, index) => {
      if (tag !== '') {
        tagHtml +=
          '<span>#' + tag + '</span>';
      }
    });

    return tagHtml;
  }

  function onLogout() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/api/checkpoint/sso/logout';
  }

  return (
    <>
    {
      profileInfo && (
        <div className="profile-contents-area">
          <div className="profile-wrapper">
            <div className="bg-wrapper">
              {<ProfileImage src={profileInfo?.profileBgImg} />}
              <div className="profile-info-wrapper">
                <div className="profile-info-area">
                  <div className="header-bttn-area">
                    <div className="name-chng-area">
                      {/* 실명/닉네임 class 이름 chng-active*/}
                      {/* <Button className={`name-chng-bttn ${(profileInfo.nameFlag === 'R' && !isNickName) ? 'chng-active' : ''}`} onClick={() => onClickToggle(false)}>실명</Button>
                      <Button className={`name-chng-bttn ${(profileInfo.nameFlag === 'N' && isNickName) ? 'chng-active' : ''}`} onClick={() => onClickToggle(true)}>닉네임</Button> */}
                      <Button className={`name-chng-bttn ${(isNickName !== undefined && !isNickName) ? 'chng-active' : ''}`} onClick={() => onClickToggle(false)}>실명</Button>
                      <Button className={`name-chng-bttn ${(isNickName !== undefined && isNickName) ? 'chng-active' : ''}`} onClick={() => onClickToggle(true)}>닉네임</Button>
                    </div>
                    <div className="close-wrapper">
                      <button onClick={() => { props.setOpen() }}>
                        <Image src={`${process.env.PUBLIC_URL}/images/all/icon-profile-close.png`} />
                        <span className="blind">close</span>
                      </button>
                    </div>

                  </div>

                  <div className="image-area">
                    <ProfileImage src={profileInfo?.profileImg} />
                  </div>
                  <div className="profile-info ">
                    <span className="prof-tit">
                      {isNickName ? profileInfo?.nickname : profileInfo?.name}
                    </span>
                    <div className="foll-info">
                      <span>{profileInfo?.followerCount}</span>
                      &nbsp;Follower
                      <span>{profileInfo?.followingCount}</span>
                      &nbsp;Following
                    </div>
                  </div>
                  <div className="page-bttn-area">
                    <Button
                      className="page-bttn"
                      onClick={() => window.location.href = myTrainingRoutePaths.myPage()}
                    >
                      My Page
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tag-info-area">
            {!isSettingProfile && (
              // 프로필설정이 안되어있는 경우
              <Button
                className="btn-setting"
                onClick={() => window.location.href = myTrainingRoutePaths.myPage()}
              >
                프로필 설정
                <i><Image src={`${process.env.PUBLIC_URL}/images/all/icon-tooltip-w-20-px.svg`} /></i>
                <p className="tool-tip-box">프로필을 설정해서<br />자유롭게 활동해 보세요!</p>
              </Button>
            )}
            {isSettingProfile && (
              // 프로필설정이 되어있는 경우
              <>
                <div className="info-area">
                  <span className="prof-name">
                    {isNickName ? profileInfo?.name : profileInfo?.nickname}
                  </span>
                  <span className="comp-name">{profileInfo?.company.name}</span>
                </div>
                <div className="tag-area">
                  <div className="belt" dangerouslySetInnerHTML={{ __html: getTagHtml() }} />
                </div>
              </>
            )}
            <div className="logout-area">
              <Button
                onClick={onLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );


}

export default ProfilePopupView;