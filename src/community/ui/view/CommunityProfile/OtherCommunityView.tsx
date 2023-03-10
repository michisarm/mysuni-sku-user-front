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
import { Area } from 'tracker/model';

interface OtherCommunityViewProps {
  communityProfileCommunity: CommunityProfileMyCommunity;
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
  return (
    <tr key={communityId}>
      <td className="title ellipsis">
        {<span className="label">{fieldName}</span>}
        <Link to={`/community/${communityId}`}>{name}</Link>
      </td>
      <td>
        <span>{managerName}</span>
      </td>
      <td>{memberCount}</td>
      <td>{createdTime}</td>
    </tr>
  );
};

const OtherCommunityView: React.FC<OtherCommunityViewProps> = function OtherCommunityView({
  communityProfileCommunity,
}) {
  return (
    <Segment className="full">
      <div
        className="course-detail-center community-containter"
        data-area={Area.COMMUNITY_COMMUNITY}
      >
        <div className="community-main-contants">
          <div className="community-list-wrap">
            <table className="ui table fixed">
              <colgroup>
                <col width="auto" />
                <col width="130px" />
                <col width="130px" />
                <col width="130px" />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">???????????????</th>
                  <th scope="col">?????????</th>
                  <th scope="col">??????</th>
                  <th scope="col">????????????</th>
                </tr>
              </thead>
              <tbody>
                {communityProfileCommunity.communities.map(CommunityItemView)}
              </tbody>
            </table>
          </div>
          {/* <ContentsMoreView /> */}
          <div className="more-comments">
            {communityProfileCommunity.communitiesTotalCount >
              communityProfileCommunity.communitiesOffset && (
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

export default OtherCommunityView;
