import React, {
  ChangeEvent,
  Component,
  createRef,
  useCallback,
  useRef,
  useState,
} from 'react';
import { CommunityProfileItem } from 'community/viewModel/CommunityProfile';
import {
  getCommunityProfileItem,
  setCommunityProfileItem,
} from 'community/store/CommunityProfileStore';
import ContentsProfileEditView from './ContentsProfileEditView';
import { upload } from 'community/api/FileApi';
import defaultBg from '../../../../style/media/bg-ttl-sample-02.png';
import {
  requestFollowersModal,
  requestFollowingsModal,
  requestFollowModalAdd,
  requestFollowModalDelete,
} from 'community/service/useFollowModal/utility/requestFollowModalIntro';
import {
  useFollowersModal,
  useFollowingsModal,
} from 'community/store/CommunityFollowModalStore';
//default imgage
import DefaultImg from '../../../../style/media/img-profile-80-px.png';
import { Button, Modal } from 'semantic-ui-react';
import { getProfileItemMapFromCommunity } from 'community/service/useCommunityProfile/utility/getProfileItemMapFromCommunity';
import { useHistory } from 'react-router-dom';
import ProfileImage from '../../../../../src/shared/components/Image/Image';
import ProfileImagePath from '../../../../../src/shared/components/Image/ProfileImagePath';
import { PolyglotText } from '../../../../shared/ui/logic/PolyglotText';

interface ProfileTitleViewProps {
  profileItem: CommunityProfileItem;
  menuType: string;
}

const ProfileTitleView: React.FC<ProfileTitleViewProps> =
  function ProfileTitleView({ profileItem, menuType }) {
    const [open, setOpen] = useState<boolean>(false);
    const [modalHeader, setModalHeader] = useState<string>('');

    const history = useHistory();

    const fileInputRef = useRef<HTMLInputElement>(null);
    const onClickFileButton = useCallback(() => {
      if (fileInputRef.current === null) {
        return;
      }
      fileInputRef.current?.click();
    }, []);
    const fileBgInputRef = useRef<HTMLInputElement>(null);
    const onClickBgFileButton = useCallback(() => {
      if (fileBgInputRef.current === null) {
        return;
      }
      fileBgInputRef.current?.click();
    }, []);

    const setProfileImgId = useCallback(
      (e: ChangeEvent<HTMLInputElement>) =>
        upload(e)?.then((response) => {
          const profileItem = getCommunityProfileItem();
          if (profileItem === undefined) {
            return;
          }
          const nextProfileItem = { ...profileItem, profileImg: response };
          setCommunityProfileItem(nextProfileItem);
        }),
      []
    );
    const setProfileBgImgId = useCallback(
      (e: ChangeEvent<HTMLInputElement>) =>
        upload(e)?.then((response) => {
          const profileItem = getCommunityProfileItem();
          if (profileItem === undefined) {
            return;
          }
          const nextProfileItem = { ...profileItem, profileBgImg: response };
          setCommunityProfileItem(nextProfileItem);
        }),
      []
    );

    const handleEditClick = useCallback(() => {
      //
      const profileItem = getCommunityProfileItem();
      if (profileItem === undefined) {
        return;
      }
      const nextProfileItem = { ...profileItem, editing: true };
      setCommunityProfileItem(nextProfileItem);
    }, []);

    const followersList = useFollowersModal();
    const followingsList = useFollowingsModal();

    const modalOpen = (value: string) => {
      if (value === 'followers') {
        requestFollowersModal();
        setModalHeader('followers');
        setOpen(!open);
      }
      if (value === 'following') {
        requestFollowingsModal();
        setModalHeader('following');
        setOpen(!open);
      }
    };

    // 팔로잉 모달 리스트 버튼
    const followersBtn = (id: string, idx: number, follow: boolean) => {
      if (follow === true) {
        requestFollowModalDelete(id, 'follower');
      } else {
        requestFollowModalAdd(id, 'follower');
      }
    };

    const followingsBtn = (id: string, idx: number, follow: boolean) => {
      if (follow === true) {
        requestFollowModalDelete(id, 'following');
      } else {
        requestFollowModalAdd(id, 'following');
      }
    };

    const followersModal =
      followersList?.followers.length !== 0 ? (
        followersList?.followers.map((item, idx) => {
          return (
            <li style={{ cursor: 'pointer' }}>
              <p
                className="pic"
                onClick={() => history.push(`/community/profile/${item.id}`)}
              >
                <ProfileImage
                  src={
                    item.profileImg === null || item.profileImg === ''
                      ? `${DefaultImg}`
                      : // : `/files/community/${item.profileImg}`
                        ProfileImagePath(item.profileImg)
                  }
                  alt=""
                />
              </p>
              <p
                className="nickname"
                onClick={() => history.push(`/community/profile/${item.id}`)}
              >
                {item.nickname === '' ? item.name : item.nickname}
              </p>
              <label className="chk_follow">
                <input type="checkbox" name="" />
                <span onClick={() => followersBtn(item.id, idx, item.follow)}>
                  {item.follow ? 'unfollow' : 'follow'}
                </span>
              </label>
            </li>
          );
        })
      ) : (
        <p>
          <PolyglotText
            id="cmm-flwg-noer"
            defaultString="팔로워가 없습니다. \n 관심있는 커뮤니티를 찾아 활발한 활동을 해보세요!"
          />
        </p>
      );

    const followingsModal =
      followingsList?.followings.length !== 0 ? (
        followingsList?.followings.map((item, idx) => {
          return (
            <li style={{ cursor: 'pointer' }}>
              <p
                className="pic"
                onClick={() => history.push(`/community/profile/${item.id}`)}
              >
                <ProfileImage
                  src={
                    item.profileImg === null || item.profileImg === ''
                      ? `${DefaultImg}`
                      : // : `/files/community/${item.profileImg}`
                        ProfileImagePath(item.profileImg)
                  }
                  alt=""
                />
              </p>
              <p
                className="nickname"
                onClick={() => history.push(`/community/profile/${item.id}`)}
              >
                {item.nickname === '' ? item.name : item.nickname}
              </p>
              <label className="chk_follow">
                <input type="checkbox" name="" />
                <span onClick={() => followingsBtn(item.id, idx, item.follow)}>
                  {item.follow ? 'unfollow' : 'follow'}
                </span>
              </label>
            </li>
          );
        })
      ) : (
        <p>
          <PolyglotText
            id="cmm-flwg-nong"
            defaultString="팔로우가 없습니다.\n커뮤니티에서 만난 학습자들을 팔로우 해보세요!"
          />
        </p>
      );

    return (
      //contextRef = createRef()
      // state = {activeItem: 'Comment'}

      //handleItemClick = (e, {name}) => this.setState({activeItem: name})
      <>
        <div className="profile_box">
          <div className="profile_pic">
            <div className="pic_area user">
              <p style={{ background: 'white' }}>
                <ProfileImage
                  src={
                    (profileItem.profileImg &&
                      // '/files/community/' + profileItem.profileImg) ||
                      ProfileImagePath(profileItem.profileImg)) ||
                    'data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCI+DQogICAgPGRlZnM+DQogICAgICAgIDxjaXJjbGUgaWQ9ImEiIGN4PSI0MCIgY3k9IjQwIiByPSI0MCIvPg0KICAgIDwvZGVmcz4NCiAgICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPg0KICAgICAgICA8bWFzayBpZD0iYiIgZmlsbD0iI2ZmZiI+DQogICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9IiNhIi8+DQogICAgICAgIDwvbWFzaz4NCiAgICAgICAgPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iMzkuNSIgc3Ryb2tlPSIjREREIi8+DQogICAgICAgIDxwYXRoIGZpbGw9IiNEREQiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTU5LjExIDY3Ljc4Yy04LjM5LTMuMDU3LTExLjA3NC01LjYzNy0xMS4wNzQtMTEuMTYyIDAtMy4zMTYgMi43NS01LjQ2NSAzLjY4Ny04LjMwNi45MzgtMi44NDIgMS40OC02LjIwNyAxLjkzLTguNjU0LjQ1MS0yLjQ0OC42My0zLjM5NC44NzUtNi4wMDJDNTQuODI4IDMwLjQwMiA1Mi42NSAyMiA0MSAyMmMtMTEuNjQ2IDAtMTMuODMyIDguNDAyLTEzLjUyNSAxMS42NTYuMjQ1IDIuNjA4LjQyNSAzLjU1NS44NzUgNi4wMDIuNDUgMi40NDcuOTg2IDUuODEyIDEuOTIzIDguNjU0LjkzNyAyLjg0MSAzLjY5IDQuOTkgMy42OSA4LjMwNiAwIDUuNTI1LTIuNjgyIDguMTA1LTExLjA3NCAxMS4xNjJDMTQuNDY3IDcwLjg0NCA5IDczLjg2NiA5IDc2djEwaDY0Vjc2YzAtMi4xMzEtNS40Ny01LjE1Mi0xMy44OS04LjIyeiIgbWFzaz0idXJsKCNiKSIvPg0KICAgIDwvZz4NCjwvc3ZnPg0K'
                  }
                  alt="프로필 사진"
                />
              </p>
              {profileItem.editing && (
                <>
                  <button
                    type="button"
                    className="btn_pic_edit"
                    onClick={onClickFileButton}
                  >
                    <PolyglotText
                      id="cmm-flwg-nong"
                      defaultString="이미지 등록"
                    />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={setProfileImgId}
                    style={{ display: 'none' }}
                    accept=".jpg,.jpeg,.png,.gif"
                  />
                </>
              )}
            </div>
            <div className="pic_area background">
              <p style={{ background: 'white' }}>
                <ProfileImage
                  src={
                    (profileItem.profileBgImg &&
                      // '/files/community/' + profileItem.profileBgImg) ||
                      ProfileImagePath(profileItem.profileBgImg)) ||
                    defaultBg
                  }
                  alt="배경이미지"
                />
              </p>
              {profileItem.editing && (
                <>
                  <button
                    type="button"
                    className="btn_pic_edit"
                    onClick={onClickBgFileButton}
                  >
                    이미지 등록
                  </button>
                  <input
                    ref={fileBgInputRef}
                    type="file"
                    onChange={setProfileBgImgId}
                    style={{ display: 'none' }}
                    accept=".jpg,.jpeg,.png,.gif"
                  />
                </>
              )}
            </div>
          </div>

          <div className="profile_info">
            <p className="name">{profileItem.nickname}</p>
            {(profileItem.editing && (
              <ContentsProfileEditView
                keyId="introduce"
                value={profileItem.introduce}
              />
            )) || (
              <>
                <p>{profileItem.introduce}</p>
                <ul>
                  <li>
                    <a onClick={() => modalOpen('followers')}>Followers</a>
                    <em>{profileItem.followerCount}</em>
                  </li>
                  <li>
                    <a onClick={() => modalOpen('following')}>Following</a>
                    <em>{profileItem.followingCount}</em>
                  </li>
                  {menuType === 'myProfile' && (
                    <li>
                      <button
                        type="button"
                        className="btn_profile_edit"
                        onClick={handleEditClick}
                      >
                        프로필 수정
                      </button>
                    </li>
                  )}
                </ul>
              </>
            )}
          </div>
        </div>

        <Modal open={open} className="w500 base">
          <Modal.Header>
            {modalHeader === 'followers' ? 'Followers' : 'Followings'}
          </Modal.Header>
          <Modal.Content>
            <div className="scrolling-60vh">
              <div className="content-wrap-follow">
                <ul className="follow_list">
                  {modalHeader === 'followers'
                    ? followersModal
                    : followingsModal}
                </ul>
              </div>
            </div>
          </Modal.Content>
          <Modal.Actions className="actions2">
            <Button
              className="pop2 d"
              onClick={() => {
                getProfileItemMapFromCommunity();
                setOpen(false);
              }}
            >
              닫기
            </Button>
          </Modal.Actions>
        </Modal>
      </>
    );
  };

export default ProfileTitleView;
