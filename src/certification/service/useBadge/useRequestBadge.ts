import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BadgeDetailRouteParams } from "../../ui/model/BadgeRouteParams";
import { BadgeService } from "../../../lecture/stores";

export function useRequestBadge(): void {
  const params = useParams<BadgeDetailRouteParams>();

  useEffect(() => {
    BadgeService.instance.findBadge(params.badgeId);

    return () => {
      BadgeService.instance.clearBadge();
    };
  }, [params.badgeId]);
}