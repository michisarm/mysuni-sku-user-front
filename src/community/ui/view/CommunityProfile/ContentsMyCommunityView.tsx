import React, { Component, createRef } from 'react';
import { Segment, Sticky, Icon, Menu } from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';
// import "../../style.css"
import ContentsMoreView from './ContentsMoreView';
import { CommunityProfileMyCommunity } from 'community/viewModel/CommunityProfile';
import MyCommunityIntro from '../../../viewModel/MyCommunityIntro/MyCommunityIntro';
import { reactAlert, reactConfirm } from '@nara.platform/accent';
import moment from 'moment';
import ProfileCommunityItem from '../../../viewModel/CommunityProfile/ProfileCommunityItem';
import CommunityType from '../../../model/CommunityType';
import { Area } from 'tracker/model';
import {
  requestAppendProfileCommunities,
  requestProfileCommunities,
  delMember,
} from '../../../service/useCommunityProfile/utility/requestProfileCommunities';
import { SkProfileService } from 'profile/stores';

interface ContentsMyCommunityViewProps {
  communityProfileMyCommunity: CommunityProfileMyCommunity;
}

const CommunityItemView: React.FC<ProfileCommunityItem> = function CommunityItemView({
  communityId,
  fieldName,
  name,
  managerName,
  memberCount,
  createdTime,
  isManager,
}) {
  const handleOk = () => {
    reactConfirm({
      title: '확인',
      message: `${name} 커뮤니티를 탈퇴하시겠습니까? 작성하신 게시글은 해당 커뮤니티에 남겨 집니다.`,
      onOk: async () => {
        const result = await delMember(
          communityId,
          SkProfileService.instance.skProfile.id
        );
        if (result === 'success') {
          requestProfileCommunities();
        }
      },
    });
  };
  const history = useHistory();

  return (
    <tr key={communityId}>
      <td className="title ellipsis">
        {<span className="label">{fieldName}</span>}
        <Link to={`/community/${communityId}`}>{name}</Link>
      </td>
      <td>
        {isManager && <span className="manager">{managerName}</span>}
        {!isManager && <span>{managerName}</span>}
      </td>
      <td>{memberCount}</td>
      <td>{createdTime}</td>
      <td>
        {isManager && (
          <button
            type="button"
            className="sece_btn"
            onClick={e =>
              history.push(
                `/community/admin/${communityId}/memberManagement/member`
              )
            }
            style={{ color: '#ff664d', borderColor: '#ff664d' }}
          >
            관리하기
          </button>
        )}
        {!isManager && (
          <button
            type="button"
            className="sece_btn"
            onClick={handleOk}
            style={{ color: '#6b788f', borderColor: '#6b788f' }}
          >
            탈퇴하기
          </button>
        )}
      </td>
    </tr>
  );
};

const ContentsMyCommunityView: React.FC<ContentsMyCommunityViewProps> = function ContentsMyCommunityView({
  communityProfileMyCommunity,
}) {
  return (
    <Segment className="full">
      <div
        className="course-detail-center community-containter"
        data-area={Area.COMMUNITY_COMMUNITY}
      >
        <div className="community-main-contants">
          <div className="community-list-wrap mycomu_fi">
            <table className="ui table fixed">
              <colgroup>
                <col width="auto" />
                <col width="100px" />
                <col width="150px" />
                <col width="100px" />
                <col width="150px" />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">커뮤니티명</th>
                  <th scope="col">관리자</th>
                  <th scope="col">멤버</th>
                  <th scope="col">가입일자</th>
                  <th scope="col">관리</th>
                </tr>
              </thead>
              <tbody>
                {communityProfileMyCommunity.communities.map(CommunityItemView)}
              </tbody>
            </table>
          </div>
          {/* <ContentsMoreView /> */}
          <div className="more-comments">
            {communityProfileMyCommunity.communitiesTotalCount >
              communityProfileMyCommunity.communitiesOffset && (
              <button
                className="ui icon button left moreview"
                onClick={requestAppendProfileCommunities}
              >
                <i aria-hidden="true" className="icon moreview" /> list more
              </button>
            )}
          </div>
        </div>
      </div>
    </Segment>
  );
};

export default ContentsMyCommunityView;
