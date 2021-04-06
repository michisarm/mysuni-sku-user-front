import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BadgeDetailRouteParams } from "../ui/model/BadgeRouteParams";

export function useScrollTop() {
  const params = useParams<BadgeDetailRouteParams>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.badgeId]);
}