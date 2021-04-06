import { useEffect, useState } from "react";
import { autorun } from "mobx";
import { BadgeService, BadgeCardService } from "../../../lecture/stores";
import { Badge } from "../../model/Badge";



export function useRequestBadgeCards() {
  const badge = BadgeService.instance.badge;
  // const [badge, setBadge] = useState<Badge>();

  // useEffect(() => {
  //   autorun(() => {
  //     const next = BadgeService.instance.badge;
  //     setBadge(next);
  //   })
  // }, [])

  useEffect(() => {
    if (badge === undefined) {
      return;
    }

    BadgeCardService.instance.findAllBadgeCards(badge.cardIds);

    return () => {
      BadgeCardService.instance.clearBadgeCards();
    };

  }, [badge]);
}