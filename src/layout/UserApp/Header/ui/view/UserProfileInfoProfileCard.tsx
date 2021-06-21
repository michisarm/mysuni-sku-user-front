import React, { useEffect, useState } from "react";
import { Button, Image } from 'semantic-ui-react';
import { getProfileInfo } from '../../../service/ProfilePopupService/getProfileInfo'
import { useProfileInfoModel, setProfileInfoModel } from '../../../store/ProfileInfoStore';
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
  const [followClassName, setFollowClassName] = useState<string>('unfollowing');
  const [isFollow, setIsFollow] = useState<string>('Unfollow');
  const [nickname, setNickname] = useState<string>('');
  const [hobby, setHobby] = useState<string>('');
  const [profileImg, setProfileImg] = useState<string>('');
  const [profileBgImg, setProfileBgImg] = useState<string>('');
  const [preProfileImg, setPreProfileImg] = useState<string>('');
  const [preProfileBgImg, setPreProfileBgImg] = useState<string>('');
  const {preProfileInfo} = props;

  useEffect(() => {
    getProfileInfo(props.memberId)
    setFollowClassName(profileInfo?.isFollow ? 'following' : 'unfollowing');
    setIsFollow(profileInfo?.isFollow ? 'Follow' : 'Unfollow');
  }, [props.memberId])

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
                  <strong>{profileInfo?.badgeCount}</strong>
                </div>
                <div className="cnt-box com-cnt">
                  <span>커뮤니티</span>
                  <strong>{profileInfo?.communityCount}</strong>
                </div>
                <div className="cnt-box feed-cnt">
                  <span>Feed</span>
                  <strong>{profileInfo?.feedCount}</strong>
                </div>
              </div>
              <div className="follow-bttn-area">
                {/* following/unfollowing class이름에 따라 css 바뀜*/}
                <Button className={followClassName}>{isFollow}</Button>
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