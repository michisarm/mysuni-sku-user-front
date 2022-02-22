/* eslint-disable  */
import React, { useEffect, useState } from 'react';
import { Button, Image } from 'semantic-ui-react';
import { getProfileInfo } from '../../../service/ProfilePopupService/getProfileInfo';
import {
  useProfileInfoModel,
  setProfileInfoModel,
} from '../../../store/ProfileInfoStore';

import {
  useProfileInfoCommunityModel,
  setProfileInfoCommunityModel,
} from '../../../store/ProfileInfoCommunityStore';
import {
  useProfileInfoPostModel,
  setProfileInfoPostModel,
} from '../../../store/ProfileInfoPostStore';
import { getProfileInfoCommunities } from '../../../service/ProfilePopupService/getProfileInfoCommunities';
import { getProfileInfoPost } from '../../../service/ProfilePopupService/getProfileInfoPost';
import { getProfileAllInfoBadge } from '../../../service/ProfilePopupService/getProfileInfoBadge';
import moment from 'moment';
import { getFollow } from '../../../service/ProfilePopupService/getFollow';
import { useFollowModel } from '../../../store/FollowStore';
import { followMember, unfollowMember } from '../../../api/ProfileInfoAPI';
import { patronInfo } from '@nara.platform/dock';
import ProfileImage from '../../../../../../src/shared/components/Image/Image';
import DefaultBgImg from '../../../../../style/media/img-my-profile-card-bg.png';
import DefaultImg from '../../../../../style/media/img-profile-80-px.png';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';
import { isCommunityAuth } from 'layout/UserApp/store/MenuAuthStore';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { observer } from 'mobx-react';
import { SkProfileService } from 'profile/stores';
import { findForeignerUser } from '../../../../../shared/helper/findForeignerUser';

interface Props {
  open: boolean;
  setOpen: (state: boolean) => void;
  memberId: string | undefined;
  preProfileInfo: {
    isSetProfile: boolean;
    nickName: string;
    introduce: string;
    profileImg: string;
    profileBgImg: string;
  };
}

function UserProfileinfoProfileCard(props: Props) {
  const profileInfo = useProfileInfoModel();
  const [followClassName, setFollowClassName] = useState<string>('following');
  const [isFollow, setIsFollow] = useState<string>('Follow');
  //const badgeData = useProfileInfoBadgesModel();
  const communityData = useProfileInfoCommunityModel();
  const feedData = useProfileInfoPostModel();
  const followData = useFollowModel();
  const currentDate = new Date();
  const denizenId = patronInfo.getDenizenId();
  const [nickname, setNickname] = useState<string>('');
  const [introduce, setIntroduce] = useState<string>('');
  const [profileImg, setProfileImg] = useState<string>('');
  const [profileBgImg, setProfileBgImg] = useState<string>('');
  const [preProfileImg, setPreProfileImg] = useState<string>('');
  const [preProfileBgImg, setPreProfileBgImg] = useState<string>('');
  const { preProfileInfo } = props;

  const [badgeCount, setBadgeCount] = useState<number>(0);
  const [communityCount, setCommunityCount] = useState<number>(0);
  const [feedCount, setFeedCount] = useState<number>(0);
  const [followerCount, setFollowerCount] = useState<number>(0);
  const [isFollowFlag, setIsFollowFlag] = useState<boolean>();

  useEffect(() => {
    communityData &&
      setCommunityCount(communityData.communitiesTotalCount || 0);
  }, [communityData]);

  useEffect(() => {
    feedData && setFeedCount(feedData.postsTotalCount || 0);
  }, [feedData]);

  useEffect(() => {
    getProfileInfo(props.memberId);

    //Badge, Community, Feed 개수 조회
    //result = getProfileCount(props.memberId, moment(currentDate.getFullYear() + "-01-01 00:00:01").format('x'), moment(currentDate.getFullYear() + "-12-31 23:59:59").format('x'));
    //getProfileInfoBadge(props.memberId, "0", moment(currentDate.getFullYear() + "-12-31 23:59:59").format('x'));
    getProfileAllInfoBadge(
      props.memberId,
      '0',
      moment(currentDate.getFullYear() + '-12-31 23:59:59').format('x')
    ).then((response) => {
      setBadgeCount(response || 0);
    });
    getProfileInfoCommunities(props.memberId);
    getProfileInfoPost(props.memberId);

    //Follow 목록 조회
    getFollow();

    return () => {
      setProfileInfoModel();
      setBadgeCount(0);
      setProfileInfoCommunityModel();
      setProfileInfoPostModel();
    };
  }, [props.memberId]);

  useEffect(() => {
    let result = true;

    if (followData) {
      result = followData.some((f) => f.followingId === props.memberId);

      if (result) {
        setFollowClassName('unfollowing');
        setIsFollow('Unfollow');
        if (isFollowFlag === undefined) {
          setIsFollowFlag(false);
        }
      } else {
        setFollowClassName('following');
        setIsFollow('Follow');
        if (isFollowFlag === undefined) {
          setIsFollowFlag(true);
        }
      }
    }

    // setFollowCheck(false)
  }, [followData]);

  useEffect(() => {
    // if (profileInfo !== undefined && props.preProfileInfo !== undefined) {
    //   //프로필 설정의 미리보기에 사용
    //   if (props.preProfileInfo.isSetProfile) {
    //     profileInfo && setProfileInfoModel({
    //       ...profileInfo,
    //       nickname: props.preProfileInfo.nickName,
    //       hobby: props.preProfileInfo.hobby,
    //       profileImg: props.preProfileInfo.profileImg,
    //       profileBgImg: props.preProfileInfo.profileBgImg,
    //     });
    //   }
    // }
    if (profileInfo !== undefined && preProfileInfo !== undefined) {
      setNickname(profileInfo.nickname);
      setIntroduce(profileInfo.selfIntroduction);
      setProfileImg(profileInfo.photoImagePath);
      setProfileBgImg(profileInfo.backgroundImagePath);

      if (preProfileInfo.isSetProfile) {
        if (preProfileInfo.nickName) {
          setNickname(preProfileInfo.nickName);
        }
        if (preProfileInfo.introduce) {
          setIntroduce(preProfileInfo.introduce);
        }
        if (preProfileInfo.profileImg) {
          setPreProfileImg(preProfileInfo.profileImg);
        }
        if (preProfileInfo.profileBgImg) {
          setPreProfileBgImg(preProfileInfo.profileBgImg);
        }
      }
    }
  }, [profileInfo, props.preProfileInfo]);

  //introduce를 ',' 기준으로 구분한다.
  function getTagHtml() {
    let tagList = [];
    let tagHtml = '';

    tagList = introduce ? introduce.split(',') : [''];
    tagList.map((tag, index) => {
      if (tag !== '') {
        tagHtml += '<span>#' + tag + '</span>';
      }
    });

    return tagHtml;
  }

  function onClickFollow() {
    const count = profileInfo?.followCount || 0;
    if (isFollow === 'Unfollow') {
      unfollowMember(props.memberId!).then(() => {
        getFollow();
        setFollowerCount(count - 1);
        getProfileInfo(props.memberId);
        // if (isFollowFlag !== undefined) {
        //   isFollowFlag ? setFollowerCount(count - 1) : setFollowerCount(count);
        // }
      });
    } else {
      followMember(props.memberId!).then(() => {
        getFollow();
        setFollowerCount(count + 1);
        getProfileInfo(props.memberId);
        // if (isFollowFlag !== undefined) {
        //   isFollowFlag ? setFollowerCount(count) : setFollowerCount(count + 1);
        // }
      });
    }
  }
  const isForeignerUser = findForeignerUser();

  return (
    <>
      <div className="profile-wrapper">
        <div className="bg-wrapper">
          <ProfileImage src={preProfileBgImg || profileBgImg || DefaultBgImg} />
          <div className="profile-info-wrapper">
            <div className="profile-info-area">
              <div className="close-wrapper">
                <button onClick={() => props.setOpen(!props.open)}>
                  <Image
                    src={`${process.env.PUBLIC_URL}/images/all/icon-profile-close.png`}
                  />
                  <span className="blind">
                    <PolyglotText
                      id="mypage-유저모달-Close"
                      defaultString="close"
                    />
                  </span>
                </button>
              </div>

              <div className="image-area">
                <ProfileImage
                  src={preProfileImg || profileImg || DefaultImg}
                  className="ui image"
                />
              </div>
              <div className="profile-info ">
                <span className="prof-tit">
                  {profileInfo?.displayNicknameFirst
                    ? nickname
                    : profileInfo && parsePolyglotString(profileInfo.name)}
                </span>
                {isCommunityAuth() && (
                  <div className="foll-info">
                    <span>{profileInfo?.followCount}</span>{' '}
                    <PolyglotText
                      id="mypage-유저모달-Followers"
                      defaultString="Followers"
                    />
                    <span>{profileInfo?.followingCount}</span>
                    <PolyglotText
                      id="mypage-유저모달-Following"
                      defaultString="Following"
                    />
                  </div>
                )}
              </div>
              {isCommunityAuth() && !isForeignerUser && (
                <>
                  <div className="count-area">
                    <div className="cnt-box com-cnt">
                      <span>
                        <PolyglotText
                          id="mypage-유저모달-커뮤니티"
                          defaultString="커뮤니티"
                        />
                      </span>
                      <strong>{communityCount}</strong>
                    </div>
                    <div className="cnt-box feed-cnt">
                      <span>
                        <PolyglotText
                          id="mypage-유저모달-Feed2"
                          defaultString="Feed"
                        />
                      </span>
                      <strong>{feedCount}</strong>
                    </div>
                  </div>
                  <div className="follow-bttn-area">
                    {props.memberId !== denizenId && (
                      <Button
                        className={followClassName}
                        onClick={onClickFollow}
                      >
                        {isFollow}
                      </Button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="tag-info-area">
        <div className="info-area">
          <span className="prof-name">
            {profileInfo?.displayNicknameFirst
              ? profileInfo && parsePolyglotString(profileInfo.name)
              : nickname}
          </span>
          <span className="comp-name">
            {profileInfo && parsePolyglotString(profileInfo.companyName)}
          </span>
        </div>
        <div className="tag-area">
          <div
            className="belt"
            dangerouslySetInnerHTML={{ __html: getTagHtml() }}
          ></div>
        </div>
        <div className="close-area">
          <Button onClick={() => props.setOpen(!props.open)}>
            <PolyglotText id="mypage-유저모달-Close" defaultString="Close" />
          </Button>
        </div>
      </div>
    </>
  );
}

export default observer(UserProfileinfoProfileCard);
