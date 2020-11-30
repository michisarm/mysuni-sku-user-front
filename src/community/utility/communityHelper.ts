import { CommunityPostItem } from 'community/viewModel/CommunityPostList';

export function compareAscendingByPinned(
  item0: CommunityPostItem,
  item1: CommunityPostItem
) {
  if (item0.pinned === true) {
    if (item1.pinned === false) {
      return -1;
    }
    else {
      return 1;
    }
  } else {
    return 1;
  }
}

export function addNewBadge(
  createdTime: number,
) {
  const subtractTime = new Date().getTime() - createdTime

  if (subtractTime < 86400000) {
    return true
  } else {
    return false;
  }
}

