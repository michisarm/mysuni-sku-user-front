import React, { useCallback, useState, useEffect } from 'react';
import { Image } from '../../components/Image';
import {
  useUserProfileInfo,
  getMyFollowList,
} from '../userProfileInfo.services';
import { patronInfo } from '@nara.platform/dock';
import { Button } from 'semantic-ui-react';
import { unfollow, follow } from '../../data/community/apis/followApi';
import {
  requestUserProfileInfo,
  requestMyFollow,
} from '../userProfileInfo.request.services';
import { checkExternalInstructor } from '../../app.services';
import { requestFindFollowerAndFollowing } from '../../main/main.request.services';
import { findForeignerUser } from '../../../../shared/helper/findForeignerUser';

interface Props {
  open: boolean;
  setOpen: (state: boolean) => void;
  memberId: string;
}

export function UserProfileInfoProfileCard(props: Props) {
  const profileInfo = useUserProfileInfo();
  const denizenId = patronInfo.getDenizenId();

  const [followClassName, setFollowClassName] = useState<string>('following');
  const [isFollow, setIsFollow] = useState<string>('Follow');
  const [isFollowFlag, setIsFollowFlag] = useState<boolean>();

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
    requestMyFollow().then(() => {
      const followData = getMyFollowList();
      let result = true;

      result = !followData?.some((f) => f.followingId === props.memberId);
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
    });
  }, [props.memberId]);

  const onClickFollow = useCallback(() => {
    if (isFollow === 'Unfollow') {
      unfollow(props.memberId).then(() => {
        requestUserProfileInfo(props.memberId);
        requestFindFollowerAndFollowing();
        changeFollowState(true);
      });
    } else {
      follow(props.memberId).then(() => {
        requestUserProfileInfo(props.memberId);
        requestFindFollowerAndFollowing();
        changeFollowState(false);
      });
    }
  }, [isFollow, props.memberId]);

  const changeFollowState = useCallback(
    (result: boolean) => {
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
    },
    [isFollowFlag]
  );

  if (profileInfo === undefined) {
    return null;
  }

  const isForeignerUser = findForeignerUser();

  return (
    <>
      <div className="profile-wrapper">
        <div className="bg-wrapper">
          <Image
            src={
              profileInfo.backGrounImage ||
              '/suni-community/images/all/img-my-profile-card-bg.png'
            }
          />
          <div className="profile-info-wrapper">
            <div className="profile-info-area">
              <div className="close-wrapper">
                <button onClick={() => props.setOpen(!props.open)}>
                  <Image src="/suni-community/images/all/icon-profile-close.png" />
                  <span className="blind">close</span>
                </button>
              </div>

              <div className="image-area">
                <Image
                  src={
                    profileInfo.profileImage ||
                    '/suni-community/images/all/img-profile-80-px.png'
                  }
                  className="ui image"
                />
              </div>
              <div className="profile-info ">
                <span className="prof-tit">{profileInfo.nickName}</span>
                <div className="foll-info">
                  <span>{profileInfo?.followerCount}</span> Followers
                  <span>{profileInfo?.followingCount}</span> Following
                </div>
              </div>
              {(!isForeignerUser && (
                <div className="count-area">
                  <div className="cnt-box com-cnt">
                    <span>커뮤니티</span>
                    <strong>{profileInfo?.communityCount}</strong>
                  </div>
                  <div className="cnt-box feed-cnt">
                    <span>Feed</span>
                    <strong>{profileInfo?.feedCount}</strong>
                  </div>{' '}
                </div>
              )) ||
                null}
              <div className="follow-bttn-area">
                {props.memberId !== denizenId && !checkExternalInstructor() && (
                  <Button className={followClassName} onClick={onClickFollow}>
                    {isFollow}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="tag-info-area">
        <div className="info-area">
          <span className="prof-name">{profileInfo.name}</span>
          <span className="comp-name">{profileInfo.companyName}</span>
        </div>
        <div className="tag-area">
          <div
            className="belt"
            dangerouslySetInnerHTML={{ __html: getTagHtml() || '' }}
          />
        </div>
        <div className="close-area">
          <Button onClick={() => props.setOpen(!props.open)}>Close</Button>
        </div>
      </div>
    </>
  );
}
