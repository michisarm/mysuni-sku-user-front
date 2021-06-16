import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  getCommunityHome,
  useCommunityHome,
} from '../../store/CommunityHomeStore';
import defaultHeader from '../../../style/media/bg-ttl-sample-02.png';
import Post from '../../model/Post';
import moment from 'moment';
import { reactAlert, reactConfirm } from '@nara.platform/accent';
import { deleteMember } from 'community/api/communityApi';
import { requestCommunity } from 'community/service/useCommunityHome/requestCommunity';
import ReactGA from 'react-ga';
import { SkProfileService } from 'profile/stores';
import DefaultImg from '../../../style/media/img-profile-80-px.png';
import { useCommunityMember } from '../../store/CommunityMemberStore';
import { getAllMember } from '../../service/useMemberList/useMemberList';
import ProfileImage from '../../../../src/shared/components/Image/Image';
import ProfileImagePath from '../../../../src/shared/components/Image/ProfileImagePath';

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
}) {
  const communityHome = useCommunityHome();
  const managProfileImg = getCommunityHome()?.community?.managerProfileImg;
  const managerId = getCommunityHome()?.community?.managerId;
  const memberData = useCommunityMember();

  useEffect(() => {
    const communityHome = getCommunityHome();
    if (communityHome === undefined || communityHome.community === undefined) {
      return;
    }
    getAllMember(communityHome.community.communityId, 0);
  }, [communityHome]);

  //console.log(managerId == SkProfileService.instance.skProfile.id);

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
    if (managerId === SkProfileService.instance.skProfile.id) {
      reactAlert({
        title: '확인',
        message: '관리자는 커뮤니티를 탈퇴하실 수 없습니다.',
      });
      return;
    }
    reactConfirm({
      title: '알림',
      message:
        '커뮤니티를 탈퇴 하시겠습니까? 작성하신 게시글은 커뮤니티에 남겨 집니다.',
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
        requestCommunity(communtyHome.community.communityId);
        //history.push('/board/support-qna');
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
                <div className="community-banner-title">
                  {/* {communityHome.community.name} */}
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
                      <ProfileImage
                        style={{
                          borderRadius: '36px',
                          width: '56px',
                          height: '56px',
                        }}
                        src={
                          managProfileImg
                            // ? `/files/community/${managProfileImg}`
                            ? ProfileImagePath(managProfileImg)
                            : `${DefaultImg}`
                        }
                      />
                    </div>
                    <span className="crown">
                      {communityHome.community.managerNickName}
                    </span>
                  </div>

                  {memberData?.results
                    .filter(
                      f => f.memberId !== managerId && f.memberType === 'ADMIN'
                    )
                    .map((r, index) => (
                      <div
                        className={
                          index === 0
                            ? 'profile home-detail-profile'
                            : 'profile home-detail-profile pro-mt30'
                        }
                      >
                        <div className="pic">
                          <ProfileImage
                            style={{
                              borderRadius: '36px',
                              width: '56px',
                              height: '56px',
                            }}
                            src={
                              r.profileImg
                                // ? `/files/community/${r.profileImg}`
                                ? ProfileImagePath(r.profileImg)
                                : `${DefaultImg}`
                            }
                          />
                        </div>
                        <span>{r.nickname}</span>
                      </div>
                    ))}
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
          disabled={
            communityHome.community.approved != 'APPROVED' ? true : false
          }
        >
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAGKADAAQAAAABAAAAGAAAAADiNXWtAAABdUlEQVRIDe2UMU7DQBBF568pECdAgYJbUBIKmiAOQMENEpN0WEIiBSJ0GOyKhoqWjtARuAQSBYcgQpFAiYe1hezs2uu1TMpESjQ7f/z+7qwzRMuPpQPQ9WPP354xHxKhAXCqM4NJ8F140XvSnylbr8yLHe9mZ8bRCIQfAn0wE2e65JPYyNbVIsUAFB0R8RetOptB3x1XQ5RXKQbMvC6b8h5WgHc8/1nW7wJOMxi4ryYbYRJseXknCZQpGsatNdXXNkiBzGtlJkqL0ofmgrbnPxJzay71F0ZZKjZBcpKW3i77CQrhGTuNDCexG6SECkGByWINCvawWANgAhLKPdgNgGHBxvKpAnhcZH2LwkF3P08jap9cnxFF/UQzwGPNfoKEUPJTAv+XgZy0yb9X77m+lXQcx4KcL7dygh6gIbYC1/3Wi+usFYPu6VVzOqURgLEc1G95oAiDS/c+nzdnlDvwz3svIGdPwh/kVP3Uv3B4YkYtlZod+AX115HSsSePVgAAAABJRU5ErkJggg==" />
          <span>탈퇴하기</span>
        </button>
      </div>
    </>
  );
};

export default CommunityDetailPage;
