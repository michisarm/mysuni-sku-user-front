import { BadgeLevel } from "../../model/BadgeLevel";
import { useEffect } from "react";
import { MyBadgeRdo } from "../../model/MyBadgeRdo";
import { BadgeService } from "../../../lecture/stores";

export function useRequestMyBadges(level: BadgeLevel) {

  useEffect(() => {
    const myBadgeRdo: MyBadgeRdo = {
      level,
      issued: true,
      offset: 0,
      limit: 9999
    };

    BadgeService.instance.findAllMyBadges(myBadgeRdo);

    return () => {
      BadgeService.instance.clearMyBadges();
    }

  }, [level]);
}