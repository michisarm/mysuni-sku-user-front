/* eslint-disable  */
import React, { useEffect, useState, useCallback } from 'react';
import { Button, Image } from 'semantic-ui-react';
import {
  getProfileInfo,
  getProfileCount,
} from '../../../service/ProfilePopupService/getProfileInfo';
import {
  useProfileInfoModel,
  setProfileInfoModel,
} from '../../../store/ProfileInfoStore';
import {
  useProfileInfoBadgesModel,
  getProfileInfoBadgesModel,
} from '../../../store/ProfileInfoBadgeStore';
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
import {
  getProfileInfoBadge,
  getProfileAllInfoBadge,
} from '../../../service/ProfilePopupService/getProfileInfoBadge';
import moment from 'moment';
import { getFollow } from '../../../service/ProfilePopupService/getFollow';
import { useFollowModel } from '../../../store/FollowStore';
import {
  followMember,
  unfollowMember,
  findAllFollow,
} from '../../../api/ProfileInfoAPI';
import { patronInfo } from '@nara.platform/dock';
import ProfileImage from '../../../../../../src/shared/components/Image/Image';
import DefaultBgImg from '../../../../../style/media/img-my-profile-card-bg.png';
import DefaultImg from '../../../../../style/media/img-profile-80-px.png';
import ProfileImagePath from '../../../../../../src/shared/components/Image/ProfileImagePath';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';
import { isCommunityAuth } from 'layout/UserApp/store/MenuAuthStore';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';

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
      result = !followData.ids.some((f) => f === props.memberId);

      if (result) {
        setFollowClassName('following');
        setIsFollow('Follow');
        if (isFollowFlag === undefined) {
          setIsFollowFlag(false);
        }
      } else {
        setFollowClassName('unfollowing');
        setIsFollow('Unfollow');
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

  // const getFollowYN = useCallback(() => {
  //   followData && followData.ids.map(f => {
  //     if (f === props.memberId) {
  //       setFollowClassName('unfollowing');
  //       setIsFollow('Unfollow');
  //     } else {
  //       setFollowClassName('following');
  //       setIsFollow('Follow');
  //     }
  //   })
  // }, [followData])

  function onClickFollow() {
    const count = profileInfo?.followCount || 0;
    if (isFollow === 'Unfollow') {
      unfollowMember(props.memberId!).then(() => {
        getFollow();
        if (isFollowFlag !== undefined) {
          isFollowFlag ? setFollowerCount(count - 1) : setFollowerCount(count);
        }
      });
    } else {
      followMember(props.memberId!).then(() => {
        getFollow();
        if (isFollowFlag !== undefined) {
          isFollowFlag ? setFollowerCount(count) : setFollowerCount(count + 1);
        }
      });
    }
  }

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
                    <span>{followerCount || profileInfo?.followCount}</span>{' '}
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
              {isCommunityAuth() && (
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
                          id="mypage-유저모달-Feed"
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
              ? nickname
              : profileInfo && parsePolyglotString(profileInfo.name)}
          </span>
          <span className="comp-name">
            {profileInfo && parsePolyglotString(profileInfo.companyName)}
          </span>
        </div>
        <div className="tag-area">
          <div
            className="belt"
            dangerouslySetInnerHTML={{ __html: getTagHtml() }}
          >
            {/* <span># 일요일은요리사</span>
            <span># 다이어트</span>
            <span># 돈까스</span>
            <span># 밀가루귀신</span>
            <span># 개발자</span>
            <span># 맛있는녀석들</span>
            <span># 심야식당</span>
            <span># 건강한돼지</span>
            <span># 아기자기</span> */}
          </div>
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

export default UserProfileinfoProfileCard;
