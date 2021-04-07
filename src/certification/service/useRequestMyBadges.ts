import { useEffect } from "react";
import { MyBadgeRdo } from "../model/MyBadgeRdo";
import { BadgeService } from "../../lecture/stores";

export function useRequestMyBadges() {
  const selectedLevel = BadgeService.instance.selectedLevel;

  useEffect(() => {
    const myBadgeRdo: MyBadgeRdo = {
      level: selectedLevel,
      issued: true,
      offset: 0,
      limit: 9999
    };

    BadgeService.instance.findAllMyBadges(myBadgeRdo);

    return () => {
      BadgeService.instance.clearMyBadges();
    }

  }, [selectedLevel]);
}