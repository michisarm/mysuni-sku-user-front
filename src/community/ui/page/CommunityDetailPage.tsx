import React, { useEffect, useState, useCallback } from 'react';
import {
  Link,
  matchPath,
  useHistory,
  useLocation,
  useParams,
} from 'react-router-dom';
import {
  Segment,
  Sticky,
  Icon,
  Menu,
  Button,
  Comment,
  Popup,
} from 'semantic-ui-react';

import {
  requestNotice,
  requestRecent,
} from '../../service/useCommunityHome/requestCommunityHome';
import {
  getCommunityHome,
  useCommunityHome,
} from '../../store/CommunityHomeStore';
import commentIcon from '../../../style/media/icon-community-comment.png';
import fileIcon from '../../../style/media/icon-community-file-copy-2.png';
import profileIcon from '../../../style/media/img-profile-80-px.png';
import defaultHeader from '../../../style/media/bg-ttl-sample-02.png';
import Post from '../../model/Post';
import moment from 'moment';
import { patronInfo } from '@nara.platform/dock';
import { reactAlert, reactConfirm, axiosApi } from '@nara.platform/accent';
import { joinCommunity, deleteMember } from 'community/api/communityApi';
import { requestCommunity } from 'community/service/useCommunityHome/requestCommunity';
import { Console } from 'console';
import { addNewBadge } from 'community/utility/communityHelper';
import ReactGA from 'react-ga';
import SkProfileApi from 'profile/present/apiclient/SkProfileApi';
import { SkProfileService } from 'profile/stores';
import DefaultImg from '../../../style/media/img-profile-80-px.png';
// interface Params {
//   communityId: string;
// }

const CommunityDetailPage: React.FC<Post> = function CommunityDetailPage({
  communityId,
  postId,
  type,
  title,
  html,
  fileBoxId,
  nickName,
  createdTime,
  creatorName,
  profileImg,
  replyCount,
  managerProfileImg,
}) {
  const communityHome = useCommunityHome();
  const managProfileImg = getCommunityHome()?.community?.managerProfileImg;
  const createdDate = moment(getCommunityHome()?.community?.createdTime).format(
    'YYYY.MM.DD'
  );
  const history = useHistory();

  if (communityHome === undefined || communityHome.community === undefined) {
    return null;
  } else {
    ReactGA.event({
      category: 'Community',
      action: 'Click',
      label: `${communityHome!.community!.name}`,
    });
  }

  const drawCommunity = () => {
    reactConfirm({
      title: '알림',
      message:
        '커뮤니트를 탈퇴하시겠습니까? 작성하신 게시글은 해당 커뮤니티에 남겨 집니다.',
      onOk: async () => {
        const communtyHome = getCommunityHome();
        if (
          communtyHome === undefined ||
          communtyHome.community === undefined
        ) {
          return;
        }
        console.log(
          communtyHome.community.communityId,
          SkProfileService.instance.skProfile.id
        );
        await deleteMember(
          communtyHome.community.communityId,
          SkProfileService.instance.skProfile.id
        );
        history.goBack();
      },
    });
    // reactConfirm({
    //   title: '확인',
    //   message: `${name} 커뮤니트를 탈퇴하시겠습니까? 작성하신 게시글은 해당 커뮤니티에 남겨 집니다.`,
    //   onOk: async () => {
    //     delMember(communityId);
    //   },
    // });
  };

  return (
    <>
      <div className="community-home-contants">
        {/* 배너 */}
        <div className="community-banner-type1">
          {communityHome.community.homeType === 'BASIC' && (
            <>
              {communityHome.community.homeThumbnailId !== null && (
                <img
                  src={`/files/community/${communityHome.community.homeThumbnailId}`}
                />
              )}
              {communityHome.community.homeThumbnailId === null && (
                <img src={defaultHeader} />
              )}
              <div className="community-banner-inner">
                <div
                  className="community-banner-title"
                  style={{
                    color: communityHome.community.color
                      ? communityHome.community.color
                      : '#FFFFFF',
                  }}
                >
                  {communityHome.community.name}
                </div>
                <div
                  className="community-banner-copy"
                  style={{
                    color: communityHome.community.color
                      ? communityHome.community.color
                      : '#FFFFFF',
                  }}
                >
                  {communityHome.community.introduce}
                </div>
              </div>
            </>
          )}
          {communityHome.community.homeType === 'HTML' && (
            <div
              className="community-banner-type2"
              dangerouslySetInnerHTML={{
                __html: communityHome.community.html || '',
              }}
            />
          )}
          {communityHome.community.homeType === null && (
            <>
              <img src={defaultHeader} />
              <div className="community-banner-inner">
                <div
                  className="community-banner-title"
                  style={{
                    color: communityHome.community.color
                      ? communityHome.community.color
                      : '#FFFFFF',
                  }}
                >
                  {communityHome.community.name}
                </div>
                <div className="community-banner-copy" />
              </div>
            </>
          )}
        </div>

        {/* 공지사항 */}

        {/* 최근 게시글 */}

        <div className="my-commu-table">
          <table>
            <tbody>
              <tr>
                <th>커뮤니티명</th>
                <td>{communityHome.community.name}</td>
              </tr>
              <tr>
                <th>커뮤니티 설명</th>
                <td>{communityHome.community.description}</td>
              </tr>
              <tr>
                <th>관리자 정보</th>
                <td>
                  <div className="profile home-detail-profile">
                    <div className="pic">
                      <img
                        src={
                          managProfileImg
                            ? `/files/community/${managProfileImg}`
                            : `${DefaultImg}`
                        }
                      />
                    </div>
                    <span className="crown">
                      {communityHome.community.managerName}
                    </span>
                  </div>
                </td>
              </tr>
              <tr>
                <th>개설 일자</th>
                <td>{createdDate}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <button
          type="button"
          className="ui button sece_btn"
          onClick={drawCommunity}
        >
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAGKADAAQAAAABAAAAGAAAAADiNXWtAAABdUlEQVRIDe2UMU7DQBBF568pECdAgYJbUBIKmiAOQMENEpN0WEIiBSJ0GOyKhoqWjtARuAQSBYcgQpFAiYe1hezs2uu1TMpESjQ7f/z+7qwzRMuPpQPQ9WPP354xHxKhAXCqM4NJ8F140XvSnylbr8yLHe9mZ8bRCIQfAn0wE2e65JPYyNbVIsUAFB0R8RetOptB3x1XQ5RXKQbMvC6b8h5WgHc8/1nW7wJOMxi4ryYbYRJseXknCZQpGsatNdXXNkiBzGtlJkqL0ofmgrbnPxJzay71F0ZZKjZBcpKW3i77CQrhGTuNDCexG6SECkGByWINCvawWANgAhLKPdgNgGHBxvKpAnhcZH2LwkF3P08jap9cnxFF/UQzwGPNfoKEUPJTAv+XgZy0yb9X77m+lXQcx4KcL7dygh6gIbYC1/3Wi+usFYPu6VVzOqURgLEc1G95oAiDS/c+nzdnlDvwz3svIGdPwh/kVP3Uv3B4YkYtlZod+AX115HSsSePVgAAAABJRU5ErkJggg==" />
          <span>탈퇴하기</span>
        </button>
      </div>
    </>
  );
};

export default CommunityDetailPage;
