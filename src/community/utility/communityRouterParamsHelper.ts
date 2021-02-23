import { useEffect, useState } from "react";
import { matchPath, useLocation } from "react-router-dom";
import { findMenu } from "../api/communityApi";
import { findCommunityMenu } from "../api/CommunityMenuApi";
import CommunityMenu from "../model/CommunityMenu";
import { getCommunityHome } from "../store/CommunityHomeStore";
import { getEmptyCommunityHome } from "../viewModel/CommunityHome";

interface CommunityMenuParams {
  communityId: string;
  menuId: string;
}

export function getCurrentCommunitySurveyMenu(pathname: string): Promise<CommunityMenu | undefined> {
  const path = pathname.substr(pathname.indexOf('/community'));
  const mathch = matchPath<CommunityMenuParams>(path, {
    path:
      '/community/:communityId/poll/:menuId',
    exact: true,
    strict: true,
  });
  if (mathch !== null) {
    const { communityId, menuId } = mathch.params;
    const communityHome = getCommunityHome() || getEmptyCommunityHome();
    const next = communityHome.menus.find(menu => menu.menuId === menuId)
    if (next !== undefined) {
      return Promise.resolve(next);
    }
    return findMenu(communityId, menuId);
  }
  return Promise.resolve(undefined)
}

export function useCurrentCommunitySurveyMenu() {
  const { pathname } = useLocation();
  const [value, setValue] = useState<CommunityMenu>();
  useEffect(() => {
    getCurrentCommunitySurveyMenu(pathname)
      .then(communityMenu => {
        if (communityMenu !== undefined) {
          setValue(communityMenu);
        }
      })
  }, [pathname])

  return value;
}