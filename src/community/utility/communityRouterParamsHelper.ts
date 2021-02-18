import { useEffect, useState } from "react";
import { matchPath, useLocation } from "react-router-dom";
import CommunityMenu from "../model/CommunityMenu";
import { getCommunityHome } from "../store/CommunityHomeStore";

interface CommunityMenuParams {
  communityId: string;
  menuId: string;
}

export function getCurrentCommunitySurveyMenu(pathname: string): CommunityMenu | undefined {
  const path = pathname.substr(pathname.indexOf('/community'));
  const mathch = matchPath<CommunityMenuParams>(path, {
    path:
      '/community/:communityId/poll/:menuId',
    exact: true,
    strict: true,
  });
  if (mathch !== null) {
    const { communityId, menuId } = mathch.params;
    const communityHome = getCommunityHome();
    if (communityHome !== undefined) {
      return communityHome.menus.find(menu => menu.menuId === menuId)
    }
  }

  return undefined;
}

export function useCurrentCommunitySurveyMenu() {
  const { pathname } = useLocation();
  const [value, setValue] = useState<CommunityMenu>();
  useEffect(() => {
    setValue(getCurrentCommunitySurveyMenu(pathname))
  }, [pathname])

  return value;
}