import {
  getMainOpenCommunities,
  setMainOpenCommunities,
} from './opencommunity.services';
import { getEmptyMainOpenCommunities } from './opencommunity.model';
import {
  requestFindAllOpenCommunities,
  requestOpenCommunityCount,
} from './opencommunity.request.services';
import { ButtonProps } from 'semantic-ui-react';
import {
  registerCommunityBookmark,
  removeCommunityBookmark,
} from '../../data/community/apis/bookmarksApi';

export function onAllFieldCheckClick(e: React.ChangeEvent<HTMLInputElement>) {
  const value = getMainOpenCommunities() || getEmptyMainOpenCommunities();
  setMainOpenCommunities({
    ...value,
    index: 0,
    totalCount: 0,
    items: [],
    fieldId: e.currentTarget.value,
    ingRequest: true,
  });
  requestFindAllOpenCommunities();
}

function onSortChange(
  sort: 'createdTime' | 'memberCount' | 'name' | 'approved',
) {
  const value = getMainOpenCommunities() || getEmptyMainOpenCommunities();
  setMainOpenCommunities({
    ...value,
    index: 0,
    totalCount: 0,
    items: [],
    sort,
    ingRequest: true,
  });

  requestFindAllOpenCommunities();
}

export function onOpenCommunitySortCreatedTimeClick() {
  onSortChange('createdTime');
}

export function onOpenCommunitySortMemberCountClick() {
  onSortChange('memberCount');
}

export function onOpenCommunitySortNameClick() {
  onSortChange('name');
}

export function onOpenCommunitySortApprovedClick() {
  onSortChange('approved');
}

export async function onClickOpenCommunityBookmark(
  _: React.MouseEvent,
  data: ButtonProps,
) {
  await registerCommunityBookmark(data.id);
  const mainOpenCommunities =
    getMainOpenCommunities() || getEmptyMainOpenCommunities();

  setMainOpenCommunities({
    ...mainOpenCommunities,
    index: 0,
    items: [],
  });

  if (mainOpenCommunities !== undefined) {
    requestFindAllOpenCommunities();
    requestOpenCommunityCount();
  }
}

export async function onClickOpenCommunityUnBookmark(
  _: React.MouseEvent,
  data: ButtonProps,
) {
  await removeCommunityBookmark(data.id);
  const mainOpenCommunities =
    getMainOpenCommunities() || getEmptyMainOpenCommunities();

  setMainOpenCommunities({
    ...mainOpenCommunities,
    index: 0,
    items: [],
  });

  if (mainOpenCommunities !== undefined) {
    requestFindAllOpenCommunities();
    requestOpenCommunityCount();
  }
}
