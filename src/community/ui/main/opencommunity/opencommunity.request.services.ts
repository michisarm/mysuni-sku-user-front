import { findAllFields } from '../../data/community/apis/fieldsApi';
import {
  setMainOpenCommunities,
  getMainOpenCommunities,
  setAllWithBookMarkCount,
  getAllWithBookMarkCount,
} from './opencommunity.services';
import {
  communityViewToOpenCommunityItem,
  FieldItem,
  getEmptyAllWithBookMarkCount,
  getEmptyMainOpenCommunities,
} from './opencommunity.model';
import { useEffect } from 'react';
import {
  findAllOpenCommunities,
  findCommunityCountByField,
} from '../../data/community/apis/communityViewApi';
import { find } from 'lodash';

export async function requestFindAllOpenCommunities() {
  const value = getMainOpenCommunities() || getEmptyMainOpenCommunities();

  setMainOpenCommunities({
    ...value,
    ingRequest: true,
  });

  const { sort, index, fieldId } = value;
  const getParams = () => {
    if (fieldId === 'all') {
      return {
        sort,
        offset: index,
        bookMarked: false,
      };
    }

    if (fieldId === 'bookmark') {
      return {
        sort,
        offset: index,
        bookMarked: true,
      };
    }

    return {
      sort,
      offset: index,
      bookMarked: false,
      fieldId,
    };
  };

  const communityViews = await findAllOpenCommunities(getParams());

  if (communityViews !== undefined) {
    const current = getMainOpenCommunities() || getEmptyMainOpenCommunities();

    setMainOpenCommunities({
      ...current,
      items: [
        ...current.items,
        ...communityViews.results.map(communityViewToOpenCommunityItem),
      ],
      index: current.index + communityViews.results.length,
      totalCount: communityViews.totalCount,
      ingRequest: false,
    });
  }
}

export async function requestOpenCommunityCount() {
  const value = getMainOpenCommunities() || getEmptyMainOpenCommunities();
  setMainOpenCommunities({
    ...value,
    ingRequest: true,
  });
  const { sort, index } = value;
  const totalCommunityViews = await findAllOpenCommunities({
    sort,
    offset: index,
    bookMarked: false,
  });
  const bookMarkCommunityViews = await findAllOpenCommunities({
    sort,
    offset: index,
    bookMarked: true,
  });

  setAllWithBookMarkCount({
    allCount: totalCommunityViews?.totalCount || 0,
    bookMarkedCount: bookMarkCommunityViews?.totalCount || 0,
  });
}

export async function requestBookmarkedOpneCommunityCount() {
  const value = getMainOpenCommunities() || getEmptyMainOpenCommunities();
  const allWithBookMarkCount =
    getAllWithBookMarkCount() || getEmptyAllWithBookMarkCount();
  const { sort, index } = value;
  const communityViews = await findAllOpenCommunities({
    sort,
    offset: index,
    bookMarked: true,
  });

  if (communityViews !== undefined) {
    setAllWithBookMarkCount({
      ...allWithBookMarkCount,
      bookMarkedCount: communityViews.totalCount,
    });
  }
}

export async function requestFindAllFields() {
  const fields = await findAllFields();
  const fieldCountList = await findCommunityCountByField();

  if (fields !== undefined) {
    const parseFieldItems: FieldItem[] = fields.map(item => {
      const findFiedCount = find(fieldCountList, { fieldId: item.id });

      return {
        ...item,
        communityCount: findFiedCount?.communityCount || 0,
        joinedCommunityCount: findFiedCount?.joinedCommunityCount || 0,
        notJoinedCommunityCount: findFiedCount?.notJoinedCommunityCount || 0,
      };
    });
    const value = getEmptyMainOpenCommunities();
    setMainOpenCommunities({
      ...value,
      fieldItems: parseFieldItems,
    });
    requestFindAllOpenCommunities();
  }
}

export function useRequestMainOpenCommunities() {
  useEffect(() => {
    requestFindAllFields();
    requestOpenCommunityCount();

    return setMainOpenCommunities;
  }, []);
}
