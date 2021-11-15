import { useMainOpenCommunities } from './opencommunity.services';
import React from 'react';
import { Radio } from 'semantic-ui-react';
import {
  onOpenCommunitySortCreatedTimeClick,
  onOpenCommunitySortMemberCountClick,
  onOpenCommunitySortNameClick,
  onOpenCommunitySortApprovedClick,
} from './opencommunity.events';

export function OpenCommunityListHeaderView() {
  const openCommunities = useMainOpenCommunities();
  if (openCommunities === undefined) {
    return null;
  }
  const { sort } = openCommunities;
  return (
    <div className="open-tab-radio">
      <Radio
        className="base"
        label="최신순"
        name="sort"
        value="createdTime"
        checked={sort === 'createdTime'}
        onClick={onOpenCommunitySortCreatedTimeClick}
      />
      <Radio
        className="base"
        label="멤버순"
        name="sort"
        value="memberCount"
        checked={sort === 'memberCount'}
        onClick={onOpenCommunitySortMemberCountClick}
      />
      <Radio
        className="base"
        label="가나다순"
        name="sort"
        value="name"
        checked={sort === 'name'}
        onClick={onOpenCommunitySortNameClick}
      />
      <Radio
        className="base"
        label="가입대기"
        name="sort"
        value="approved"
        checked={sort === 'approved'}
        onClick={onOpenCommunitySortApprovedClick}
      />
    </div>
  );
}
