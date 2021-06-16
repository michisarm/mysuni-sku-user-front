import React, { useCallback, useState, useEffect, Component } from 'react';
import myTrainingRoutePaths from 'myTraining/routePaths';
import { useProfilePopupModel } from '../../../store/ProfilePopupStore';
import { Button, Image } from 'semantic-ui-react';
import { getProfilePopup } from '../../../service/ProfilePopupService/getProfilePopup';


interface Props {
  setOpen: () => void,
}

interface State {

}

function ProfilePopupView(props: Props) {
  const profileInfo = useProfilePopupModel()
  const [isNickName, setIsNickName] = useState<boolean>(true);
  const [btnRealName, setBtnRealName] = useState<string>('chng-active');
  const [btnNickName, setBtnNickName] = useState<string>('');
  const [isSettingProfile, setIsSettingProfile] = useState<boolean>(true);

  useEffect(() => {
    getProfilePopup();
  }, []);

  const onClickToggle = useCallback(() => {
    if (isNickName) {
      setIsNickName(false);
      setBtnRealName('');
      setBtnNickName('chng-active');
    }
    else {
      setIsNickName(true);
      setBtnRealName('chng-active');
      setBtnNickName('');
    }
    //console.log("nick" + isNickName);
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
      <div className="profile-contents-area">
        <div className="profile-wrapper">
          <div className="bg-wrapper">
            {<Image src={`/files/community/${profileInfo?.profileBgImg}`} />}
            <div className="profile-info-wrapper">
              <div className="profile-info-area">
                <div className="header-bttn-area">
                  <div className="name-chng-area">
                    {/* 실명/닉네임 class 이름 chng-active*/}
                    <Button className={`name-chng-bttn ${btnRealName}`} onClick={onClickToggle}>실명</Button>
                    <Button className={`name-chng-bttn ${btnNickName}`} onClick={onClickToggle}>닉네임</Button>
                  </div>
                  <div className="close-wrapper">
                    <button onClick={() => { props.setOpen() }}>
                      <Image src={`${process.env.PUBLIC_URL}/images/all/icon-profile-close.png`} />
                      <span className="blind">close</span>
                    </button>
                  </div>

                </div>

                <div className="image-area">
                  <Image src={`/files/community/${profileInfo?.profileImg}`} />
                </div>
                <div className="profile-info ">
                  {isNickName && <span className="prof-tit">{profileInfo?.nickname}</span>}
                  {!isNickName && <span className="prof-tit">{profileInfo?.name}</span>}
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
                {!isNickName && <span className="prof-name">{profileInfo?.nickname}</span>}
                {isNickName && <span className="prof-name">{profileInfo?.name}</span>}
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
    </>
  );


}

export default ProfilePopupView;