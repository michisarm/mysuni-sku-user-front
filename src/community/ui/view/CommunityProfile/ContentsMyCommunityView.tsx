import React, { Component, createRef } from 'react';
import { Segment, Sticky, Icon, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
// import "../../style.css"
import ContentsMoreView from './ContentsMoreView';
import { CommunityProfileMyCommunity } from 'community/viewModel/CommunityProfile';
import MyCommunityIntro from '../../../viewModel/MyCommunityIntro/MyCommunityIntro';
import moment from 'moment';
import ProfileCommunityItem from '../../../viewModel/CommunityProfile/ProfileCommunityItem';
import CommunityType from '../../../model/CommunityType';
import { requestAppendProfileCommunities } from '../../../service/useCommunityProfile/utility/requestProfileCommunities';

interface ContentsMyCommunityViewProps {
  communityProfileMyCommunity: CommunityProfileMyCommunity;
}

function CommunityTypeToString(type: CommunityType) {
  switch (type) {
    case 'COHORT':
      return 'Cohort';
    case 'LEARNING':
      return 'Learning';
    case 'OPEN':
      return 'Open';
    default:
      return '';
  }
}

const CommunityItemView: React.FC<ProfileCommunityItem> = function CommunityItemView({
  communityId,
  type,
  fieldName,
  name,
  managerName,
  memberCount,
  createdTime,
  isManager,
}) {
  return (
    <tr key={communityId}>
      <td>{CommunityTypeToString(type)}</td>
      <td className="title ellipsis">
        {type === 'OPEN' && (<span className="label">{fieldName}</span>)}
        <Link to={`/community/${communityId}`}>{name}</Link>
      </td>
      <td>
        {isManager && <span className="manager">{managerName}</span>}
        {!isManager && <span>{managerName}</span>}
      </td>
      <td>{memberCount}</td>
      <td>{createdTime}</td>
    </tr>
  );
};

const ContentsMyCommunityView: React.FC<ContentsMyCommunityViewProps> = function ContentsMyCommunityView({
  communityProfileMyCommunity,
}) {
  return (
    <Segment className="full">
      <div className="course-detail-center community-containter">
        <div className="community-main-contants">
          <div className="community-list-wrap">
            <table className="ui table fixed">
              <colgroup>
                <col width="130px" />
                <col width="*" />
                <col width="130px" />
                <col width="130px" />
                <col width="130px" />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">유형</th>
                  <th scope="col">커뮤니티명</th>
                  <th scope="col">관리자</th>
                  <th scope="col">멤버</th>
                  <th scope="col">생성일자</th>
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
