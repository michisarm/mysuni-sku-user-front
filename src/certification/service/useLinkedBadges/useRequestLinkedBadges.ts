import { BadgeService } from "../../../lecture/stores";
import { useEffect } from "react";

export function useRequestLinkedBadges() {
  const badge = BadgeService.instance.badge;

  useEffect(() => {
    if (badge === undefined) {
      return;
    }

    if (badge.relatedBadgeIds.length > 0) {
      BadgeService.instance.findAllLinkedBadges(badge.relatedBadgeIds);
    }
  }, [badge]);
}