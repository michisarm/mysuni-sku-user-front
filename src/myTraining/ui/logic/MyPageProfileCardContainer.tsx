import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import { SkProfileService } from '../../../profile/stores';
import { useRequestLearningSummary } from '../../service/useRequestLearningSummary';
import { Button } from 'semantic-ui-react';
import {
  requestFollowingsModal,
  requestFollowersModal,
} from 'community/service/useFollowModal/utility/requestFollowModalIntro';
import {
  useFollowersModal,
  useFollowingsModal,
} from '../../../community/store/CommunityFollowModalStore';
import { MyPageRouteParams } from '../../model/MyPageRouteParams';
import { reactAlert } from '@nara.platform/accent';
import SkProfileUdo from '../../../profile/model/SkProfileUdo';
import DefaultImg from '../../../style/media/img-profile-80-px.png';
// import DefaultBgImg from 'style/../../public/images/all/img-my-profile-card-bg.png';
import DefaultBgImg from '../../../style/media/img-my-profile-card-bg.png';
import ProfileImage from '../../../../src/shared/components/Image/Image';
import { isExternalInstructor } from '../../../shared/helper/findUserRole';

interface MyPageHeaderContainerProps {
  skProfileService?: SkProfileService;
  clickTabHandler?: (id: string) => void;
  photoImageBase64: string;
  bgImageBase64: string;
}

function MyPageHeaderContainer({
  skProfileService,
  clickTabHandler,
  photoImageBase64,
  bgImageBase64,
}: MyPageHeaderContainerProps) {
  const { skProfile, modifySkProfile } = skProfileService!;

  const [showNameFlag, setShowNameFlag] = useState<boolean>();
  const [saveFlag, setSaveFlag] = useState<boolean>(true);
  const params = useParams<MyPageRouteParams>();

  useEffect(() => {
    if (skProfileService) {
      if (!isExternalInstructor()) {
        skProfileService.findSkProfile();
      } else {
        skProfileService.findCommunityProfile();
      }
    }
  }, []);

  useEffect(() => {
    // Follower, Following Set
    // requestFollowersModal();
    // requestFollowingsModal();

    // badgeService!.findAllBadgeCount();
    // myTrainingService!.countMyTrainingsWithStamp();

    if (skProfile.nameFlag === 'N') {
      setShowNameFlag(false);
    } else {
      setShowNameFlag(true);
    }
  }, [skProfile]);

  useRequestLearningSummary();

  const onClickShowName = useCallback(async (value: boolean) => {
    if (!skProfile.id || !skProfile.nickName || skProfile.nickName === '') {
      reactAlert({
        title: '안내',
        message: '닉네임을 등록해주세요.',
      });
      return;
    }

    if (saveFlag) {
      setSaveFlag(false);

      const skProfileUdo: SkProfileUdo = new SkProfileUdo(
        // skProfile.member.currentJobGroup,
        // skProfile.member.favoriteJobGroup,
        skProfile.pisAgreement
      );

      skProfileUdo.nameFlag = value === true ? 'R' : 'N';

      await modifySkProfile(skProfileUdo);
      skProfileService!.findSkProfile().then((skProfile) => {
        setSaveFlag(true);
      });
    }
  }, []);

  return (
    <>
      <div className="profile-contents-area">
        <div className="profile-wrapper">
          <div className="bg-wrapper">
            <ProfileImage
              src={bgImageBase64 || skProfile.bgFilePath || DefaultBgImg}
              onError={(event: any) => {
                event.currentTarget.style.display = 'none';
              }}
              onLoad={(event: any) => (event.currentTarget.style.display = '')}
              alt="프로필배경기본이미지"
            />
            <div className="profile-info-wrapper">
              <div className="profile-info-area">
                <div className="header-bttn-area">
                  <div className="name-chng-area">
                    {/* 실명/닉네임 class 이름 chng-active*/}
                    <Button
                      className={`name-chng-bttn ${
                        showNameFlag ? 'chng-active' : ''
                      }`}
                      onClick={() =>
                        saveFlag &&
                        !showNameFlag &&
                        !isExternalInstructor() &&
                        onClickShowName(true)
                      }
                    >
                      실명
                    </Button>
                    <Button
                      className={`name-chng-bttn ${
                        showNameFlag ? '' : 'chng-active'
                      }`}
                      onClick={() =>
                        saveFlag &&
                        showNameFlag &&
                        !isExternalInstructor() &&
                        onClickShowName(false)
                      }
                    >
                      닉네임
                    </Button>
                  </div>
                </div>

                <div className="image-area">
                  <ProfileImage
                    id="profileImage"
                    className="ui image"
                    src={
                      photoImageBase64 || skProfile.photoFilePath || DefaultImg
                    }
                    onError={(event: any) =>
                      (event.currentTarget.style.display = 'none')
                    }
                    onLoad={(event: any) =>
                      (event.currentTarget.style.display = '')
                    }
                    alt="내프로필이미지"
                  />
                </div>
                <div className="profile-info ">
                  <span className="prof-tit">
                    {showNameFlag
                      ? skProfile?.name || skProfile.name
                      : skProfile.nickName}
                  </span>
                  {!isExternalInstructor() && (
                    <div className="foll-info">
                      {/* <span>{skProfile.followerCount}</span> Followers
                      <span>{skProfile.followingCount}</span> Following
                      김민준 - 커뮤니티 api 추가 필요
                      */}
                      <span>{0}</span> Followers
                      <span>{0}</span> Following
                    </div>
                  )}
                </div>
                <div className="page-bttn-area">
                  <Button
                    className={`page-bttn ${
                      params.tab === 'MyProfile' ? 'active' : ''
                    }`}
                    onClick={() =>
                      clickTabHandler && clickTabHandler('profile')
                    }
                  >
                    프로필 설정
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default inject(mobxHelper.injectFrom('profile.skProfileService'))(
  observer(MyPageHeaderContainer)
);
