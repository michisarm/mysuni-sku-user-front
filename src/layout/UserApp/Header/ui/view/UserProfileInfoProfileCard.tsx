import React, { useEffect, useState, useCallback } from "react";
import { Button, Image } from 'semantic-ui-react';
import { getProfileInfo } from '../../../service/ProfilePopupService/getProfileInfo'
import { useProfileInfoModel, setProfileInfoModel } from '../../../store/ProfileInfoStore';
import { useProfileInfoBadgesModel } from "../../../store/ProfileInfoBadgeStore";
import { useProfileInfoCommunityModel } from "../../../store/ProfileInfoCommunityStore";
import { useProfileInfoPostModel } from "../../../store/ProfileInfoPostStore";
import { getProfileInfoCommunities } from "../../../service/ProfilePopupService/getProfileInfoCommunities";
import { getProfileInfoPost } from "../../../service/ProfilePopupService/getProfileInfoPost";
import { getProfileInfoBadge } from "../../../service/ProfilePopupService/getProfileInfoBadge";
import moment from "moment";
import { getFollow } from "../../../service/ProfilePopupService/getFollow";
import { useFollowModel } from "../../../store/FollowStore";
import { followMember, unfollowMember, findAllFollow } from "../../../api/ProfileInfoAPI";
import { patronInfo } from "@nara.platform/dock";
import ProfileImage from '../../../../../../src/shared/components/Image/Image';

interface Props {
  open: boolean,
  setOpen: (state: boolean) => void,
  memberId: string | undefined,
  preProfileInfo: {
    isSetProfile: boolean,
    nickName: string,
    hobby: string,
    profileImg: string,
    profileBgImg: string,
  },
}

function UserProfileinfoProfileCard(props: Props) {
  const profileInfo = useProfileInfoModel();
  const [followClassName, setFollowClassName] = useState<string>('following');
  const [isFollow, setIsFollow] = useState<string>('Follow');
  const badgeData = useProfileInfoBadgesModel();
  const communityData = useProfileInfoCommunityModel();
  const feedData = useProfileInfoPostModel();
  const followData = useFollowModel();
  const currentDate = new Date();
  const denizenId = patronInfo.getDenizenId();
  const [nickname, setNickname] = useState<string>('');
  const [hobby, setHobby] = useState<string>('');
  const [profileImg, setProfileImg] = useState<string>('');
  const [profileBgImg, setProfileBgImg] = useState<string>('');
  const [preProfileImg, setPreProfileImg] = useState<string>('');
  const [preProfileBgImg, setPreProfileBgImg] = useState<string>('');
  const {preProfileInfo} = props;

  useEffect(() => {
    getProfileInfo(props.memberId)

    //Badge, Community, Feed 개수 조회
    getProfileInfoBadge(props.memberId, "0", moment(currentDate.getFullYear() + "-12-31 23:59:59").format('x'));
    getProfileInfoCommunities(props.memberId);
    getProfileInfoPost(props.memberId);
    //Follow 목록 조회
    getFollow();

    return () => {
      setProfileInfoModel();
    }

  }, [props.memberId])

  useEffect(() => {
    getFollowYN();
  }, [followData])

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

        setNickname(profileInfo.nickname)
        setHobby(profileInfo.hobby)
        setProfileImg(profileInfo.profileImg)
        setProfileBgImg(profileInfo.profileBgImg)

        if (preProfileInfo.isSetProfile) {
          if(preProfileInfo.nickName) setNickname(preProfileInfo.nickName)
          if(preProfileInfo.hobby) setHobby(preProfileInfo.hobby)
          if(preProfileInfo.profileImg) setPreProfileImg(preProfileInfo.profileImg)
          if(preProfileInfo.profileBgImg) setPreProfileBgImg(preProfileInfo.profileBgImg)
        }
    }
  }, [profileInfo, props.preProfileInfo])

  //hobby를 ',' 기준으로 구분한다.
  function getTagHtml() {
    let tagList = new Array();
    let tagHtml = '';

    tagList = hobby ? hobby.split(',') : [""];
    tagList.map((tag, index) => {
      if (tag !== '') {
        tagHtml +=
          '<span>#' + tag + '</span>';
      }
    });

    return tagHtml;
  }

  const getFollowYN = useCallback(() => {
    followData && followData.ids.map(f => {
      if (f === props.memberId) {
        setFollowClassName('unfollowing');
        setIsFollow('Unfollow');
      }
    })
  }, [followData])

  function onClickFollow() {
    if (isFollow === "Follow") {
      unfollowMember(props.memberId!).then(() => { getFollow() });
    } else {
      followMember(props.memberId!).then(() => { getFollow() });
    }
  }

  return (
    <>
      <div className="profile-wrapper">
        <div className="bg-wrapper">
          <ProfileImage 
            src={ preProfileBgImg || profileBgImg} 
          />
          <div className="profile-info-wrapper">
            <div className="profile-info-area">
              <div className="close-wrapper">
                <button onClick={() => props.setOpen(!props.open)}>
                  <Image src={`${process.env.PUBLIC_URL}/images/all/icon-profile-close.png`} />
                  <span className="blind">close</span>
                </button>
              </div>

              <div className="image-area">
                <ProfileImage 
                  src={preProfileImg || profileImg} 
                  className="ui image"
                />
              </div>
              <div className="profile-info ">
                <span className="prof-tit">{profileInfo?.isNickname ? nickname : profileInfo?.name}</span>
                <div className="foll-info"><span>{profileInfo?.followerCount}</span>{' '}Follower111<span>{profileInfo?.followingCount}</span>{' '}Following</div>
              </div>
              <div className="count-area">
                <div className="cnt-box bad-cnt">
                  <span>Badge</span>
                  <strong>{badgeData?.badgesTotalCount}</strong>
                </div>
                <div className="cnt-box com-cnt">
                  <span>커뮤니티</span>
                  <strong>{communityData?.communitiesTotalCount}</strong>
                </div>
                <div className="cnt-box feed-cnt">
                  <span>Feed</span>
                  <strong>{feedData?.postsTotalCount}</strong>
                </div>
              </div>
              <div className="follow-bttn-area">
                {props.memberId !== denizenId &&
                  <Button className={followClassName} onClick={onClickFollow}>{isFollow}</Button>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="tag-info-area">
        <div className="info-area">
          <span className="prof-name">{profileInfo?.isNickname ? profileInfo?.name : nickname}</span>
          <span className="comp-name">{profileInfo?.company.name}</span>
        </div>
        <div className="tag-area">
          <div className="belt" dangerouslySetInnerHTML={{ __html: getTagHtml() }}>
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
          <Button onClick={() => props.setOpen(!props.open)}>Close</Button>
        </div>
      </div>
    </>
  )
}

export default UserProfileinfoProfileCard;