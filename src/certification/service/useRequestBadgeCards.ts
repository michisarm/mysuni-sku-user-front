import { useEffect } from "react";
import { BadgeCardService, BadgeService } from "../../lecture/stores";


export function useRequestBadgeCards() {
  const badge = BadgeService.instance.badge;

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