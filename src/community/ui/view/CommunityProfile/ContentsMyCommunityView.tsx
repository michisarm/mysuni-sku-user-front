import React, { Component, createRef } from 'react';
import { Segment, Sticky, Icon, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
// import "../../style.css"
import ContentsMoreView from './ContentsMoreView';
import { CommunityProfileMyCommunity } from 'community/viewModel/CommunityProfile';
import MyCommunityIntro from '../../../viewModel/MyCommunityIntro/MyCommunityIntro';
import moment from 'moment';

interface ContentsMyCommunityViewProps {
  myCommunityIntro: MyCommunityIntro;
}

const ContentsMyCommunityView: React.FC<ContentsMyCommunityViewProps> = function ContentsMyCommunityView({
  myCommunityIntro,
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
                {/* {myCommunityIntro.communities.map(
                  ({
                    type,
                    fieldTitle,
                    name,
                    manager,
                    memberCount,
                    lastPostTime,
                  }) => {
                    return (
                      <tr>
                        <td>{type}</td>
                        <td className="title ellipsis">
                          <span className="label">{fieldTitle}</span>
                          {name}
                        </td>
                        <td>
                          <span className="manager">{manager}</span>
                        </td>
                        <td>{memberCount}</td>
                        <td>
                          {lastPostTime === null
                            ? ''
                            : moment(lastPostTime).format('YYYY.MM.DD')}
                        </td>
                      </tr>
                    );
                  }
                )} */}
              </tbody>
            </table>
          </div>
          {/* <ContentsMoreView /> */}
        </div>
      </div>
    </Segment>
  );
};

export default ContentsMyCommunityView;
