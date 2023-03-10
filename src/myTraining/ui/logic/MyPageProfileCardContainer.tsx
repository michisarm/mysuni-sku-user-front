/* eslint-disable react-hooks/exhaustive-deps */
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
import DefaultImg from '../../../style/media/img-profile-80-px.png';
// import DefaultBgImg from 'style/../../public/images/all/img-my-profile-card-bg.png';
import DefaultBgImg from '../../../style/media/img-my-profile-card-bg.png';
import ProfileImage from '../../../../src/shared/components/Image/Image';
import { isExternalInstructor } from '../../../shared/helper/findUserRole';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { PolyglotText, getPolyglotText } from 'shared/ui/logic/PolyglotText';
import { getProfilePopup } from 'layout/UserApp/service/ProfilePopupService/getProfilePopup';
import { useProfilePopupModel } from 'layout/UserApp/store/ProfilePopupStore';
import { isEmpty } from 'lodash';

interface MyPageHeaderContainerProps {
  skProfileService?: SkProfileService;
  clickTabHandler?: (id: string) => void;
  photoImageBase64: string;
}

function MyPageHeaderContainer({
  skProfileService,
  clickTabHandler,
  photoImageBase64,
}: MyPageHeaderContainerProps) {
  const { skProfile, modifySkProfile } = skProfileService!;

  const [showNameFlag, setShowNameFlag] = useState<boolean>();
  const [saveFlag, setSaveFlag] = useState<boolean>(true);
  const params = useParams<MyPageRouteParams>();
  const profileInfo = useProfilePopupModel();

  useEffect(() => {
    if (skProfileService) {
      if (!isExternalInstructor()) {
        skProfileService.findSkProfile();
      } else {
        skProfileService.findCommunityProfile();
      }
    }
    getProfilePopup();
  }, []);

  useEffect(() => {
    // Follower, Following Set
    // requestFollowersModal();
    // requestFollowingsModal();

    if (skProfile.displayNicknameFirst) {
      setShowNameFlag(false);
    } else {
      setShowNameFlag(true);
    }
  }, [skProfile]);

  // useRequestLearningSummary();

  const onClickShowName = useCallback(async (value: boolean) => {
    if (!skProfile.id || !skProfile.nickname || skProfile.nickname === '') {
      reactAlert({
        title: getPolyglotText('??????', 'mypage-???????????????-??????'),
        message: getPolyglotText(
          '???????????? ??????????????????.',
          'mypage-???????????????-????????????'
        ),
      });
      return;
    }

    if (saveFlag) {
      setSaveFlag(false);

      const params = {
        nameValues: [
          { name: 'displayNicknameFirst', value: JSON.stringify(value) },
        ],
      };

      await modifySkProfile(params);

      skProfileService!.findSkProfile().then(() => {
        setSaveFlag(true);
      });
    }
  }, []);

  return (
    <>
      <div className="profile-contents-area">
        <div className="profile-wrapper">
          <div className="bg-wrapper">
            <div className="profile-info-wrapper">
              <div className="profile-info-area">
                <div className="image-area">
                  <ProfileImage
                    id="profileImage"
                    className="ui image"
                    src={skProfile.photoFilePath || DefaultImg}
                    onError={(event: any) =>
                      (event.currentTarget.style.display = 'none')
                    }
                    onLoad={(event: any) =>
                      (event.currentTarget.style.display = '')
                    }
                    alt="?????????????????????"
                  />
                </div>

                <div className="profile-info ">
                  <span className="prof-tit">
                    {showNameFlag
                      ? parsePolyglotString(skProfile.name)
                      : skProfile.nickname}
                  </span>
                  {!isExternalInstructor() && (
                    <div className="foll-info">
                      {/* <span>{skProfile.followerCount}</span> Followers
                      <span>{skProfile.followingCount}</span> Following
                      ????????? - ???????????? api ?????? ??????
                      */}
                      <span>{profileInfo?.followerCount || 0}</span>{' '}
                      <PolyglotText
                        defaultString="Followers"
                        id="mypage-???????????????-Followers"
                      />
                      <span>{profileInfo?.followingCount || 0}</span>{' '}
                      <PolyglotText
                        defaultString="Following"
                        id="mypage-???????????????-Following"
                      />
                    </div>
                  )}
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
