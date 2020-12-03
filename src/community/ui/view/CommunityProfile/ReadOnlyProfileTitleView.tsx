import { findCommunityProfile } from 'community/api/profileApi';
import { requestFollowAdd, requestFollowDelete } from 'community/service/useFollowModal/utility/requestFollowModalIntro';
import React, { useCallback } from 'react';
import { Button } from 'semantic-ui-react';
import Profile from '../../../model/Profile';

interface ReadOnlyProfileTitleViewProps {
  profile?: Profile;
}

const ReadOnlyProfileTitleView: React.FC<ReadOnlyProfileTitleViewProps> = function ReadOnlyProfileTitleView({
  profile,
}) {

  const followingsBtn = useCallback(() => {
    if (profile !== undefined && profile.id !== undefined) {
      if (profile?.follow) {
        requestFollowDelete(profile?.id).then(() => {
          findCommunityProfile(profile?.id);
        });
      } else {
        requestFollowAdd(profile?.id).then(() => {
          findCommunityProfile(profile?.id);
        });
      }
    }
  },[profile?.id, profile?.follow]);

  return (
    <div className="profile_box">
      <div className="profile_pic">
        <div className="pic_area user">
          <p style={{ background: 'white' }}>
            <img
              src={
                (profile?.profileImg &&
                  '/files/community/' + profile.profileImg) ||
                'data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCI+DQogICAgPGRlZnM+DQogICAgICAgIDxjaXJjbGUgaWQ9ImEiIGN4PSI0MCIgY3k9IjQwIiByPSI0MCIvPg0KICAgIDwvZGVmcz4NCiAgICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPg0KICAgICAgICA8bWFzayBpZD0iYiIgZmlsbD0iI2ZmZiI+DQogICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9IiNhIi8+DQogICAgICAgIDwvbWFzaz4NCiAgICAgICAgPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iMzkuNSIgc3Ryb2tlPSIjREREIi8+DQogICAgICAgIDxwYXRoIGZpbGw9IiNEREQiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTU5LjExIDY3Ljc4Yy04LjM5LTMuMDU3LTExLjA3NC01LjYzNy0xMS4wNzQtMTEuMTYyIDAtMy4zMTYgMi43NS01LjQ2NSAzLjY4Ny04LjMwNi45MzgtMi44NDIgMS40OC02LjIwNyAxLjkzLTguNjU0LjQ1MS0yLjQ0OC42My0zLjM5NC44NzUtNi4wMDJDNTQuODI4IDMwLjQwMiA1Mi42NSAyMiA0MSAyMmMtMTEuNjQ2IDAtMTMuODMyIDguNDAyLTEzLjUyNSAxMS42NTYuMjQ1IDIuNjA4LjQyNSAzLjU1NS44NzUgNi4wMDIuNDUgMi40NDcuOTg2IDUuODEyIDEuOTIzIDguNjU0LjkzNyAyLjg0MSAzLjY5IDQuOTkgMy42OSA4LjMwNiAwIDUuNTI1LTIuNjgyIDguMTA1LTExLjA3NCAxMS4xNjJDMTQuNDY3IDcwLjg0NCA5IDczLjg2NiA5IDc2djEwaDY0Vjc2YzAtMi4xMzEtNS40Ny01LjE1Mi0xMy44OS04LjIyeiIgbWFzaz0idXJsKCNiKSIvPg0KICAgIDwvZz4NCjwvc3ZnPg0K'
              }
              alt="프로필 사진"
            />
          </p>
        </div>
        <div className="pic_area background">
          <p style={{ background: 'white' }}>
            <img
              src={
                (profile?.profileBgImg &&
                  '/files/community/' + profile.profileBgImg) ||
                '/static/media/bg-community-profilettl@3x.6156083d.png'
              }
              alt="배경이미지"
            />
          </p>
        </div>
      </div>

      <div className="profile_info">
        <p className="name">{profile?.nickname}</p>
        <>
          <p>{profile?.introduce}</p>
          <ul>
            <li>
              <span>Followers</span>
              <em>{profile?.followerCount}</em>
            </li>
            <li>
              <span>Following</span>
              <em>{profile?.followingCount}</em>
            </li>
            <li>
              <Button 
                className="btn_profile_follow"
                onClick={followingsBtn}
              >
                {(profile?.follow && "Unfollow") || "Follow"}
              </Button>
            </li>
          </ul>
        </>
      </div>
    </div>
  );
};

export default ReadOnlyProfileTitleView;
