import { clearfindCommunityViewCache } from '../../../data/community/apis/communityViewApi';
import { ButtonProps, DropdownProps, MenuItemProps } from 'semantic-ui-react';
import {
  registerCommunityBookmark,
  removeCommunityBookmark,
} from '../../../data/community/apis/bookmarksApi';
import {
  getEmptyMainMyCommunityTab,
  MainMyCommunitiesSort,
  MainMyCommunityTab,
  MyCommuntyTab,
} from '../mycommunity.model';
import {
  requestMainBookMarkCommunityItems,
  requestMainManagedCommunityItems,
  requestMainMyCommunityCount,
  requestMainMyCommunityItems,
} from '../services/mycommunity.request.services';
import {
  getMainMyCommunityTab,
  setMainMyCommunityTab,
} from '../services/mycommunity.services';

function requestCommunityType(selectedTab: MyCommuntyTab) {
  switch (selectedTab) {
    case 'AllList':
      requestMainMyCommunityItems();
      break;
    case 'FavoritesList':
      requestMainBookMarkCommunityItems();
      break;
    case 'ManageList':
      requestMainManagedCommunityItems();
      break;
    default:
      break;
  }
}

export function onMyCommunitiesSortChange(
  _: React.SyntheticEvent<HTMLElement>,
  data: DropdownProps
) {
  const MainMyCommunityTab =
    getMainMyCommunityTab() || getEmptyMainMyCommunityTab();

  const next: MainMyCommunityTab = {
    ...MainMyCommunityTab,
    sort: data.value as MainMyCommunitiesSort,
    items: [],
  };

  setMainMyCommunityTab(next);

  requestCommunityType(MainMyCommunityTab.selectedTab);
}

export function onClickComunityTab(_: React.MouseEvent, data: MenuItemProps) {
  const MainMyCommunityTab =
    getMainMyCommunityTab() || getEmptyMainMyCommunityTab();

  setMainMyCommunityTab({
    ...MainMyCommunityTab,
    sort: 'lastPostTime',
  });

  requestCommunityType(data.name as MyCommuntyTab);
}

export async function onClickComunityBookmark(
  _: React.MouseEvent,
  data: ButtonProps
) {
  await registerCommunityBookmark(data.id);

  const MainMyCommunityTab =
    getMainMyCommunityTab() || getEmptyMainMyCommunityTab();
  clearfindCommunityViewCache();
  requestMainMyCommunityCount();
  requestCommunityType(MainMyCommunityTab.selectedTab);
}

export async function onClickComunityUnBookmark(
  _: React.MouseEvent,
  data: ButtonProps
) {
  await removeCommunityBookmark(data.id);

  const MainMyCommunityTab =
    getMainMyCommunityTab() || getEmptyMainMyCommunityTab();
  clearfindCommunityViewCache();
  requestMainMyCommunityCount();
  requestCommunityType(MainMyCommunityTab.selectedTab);
}
