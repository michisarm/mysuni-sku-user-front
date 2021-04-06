
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BadgeDetailRouteParams } from "../ui/model/BadgeRouteParams";
import { BadgeStudentService } from "../../lecture/stores";

export function useRequestBadgeStudent() {
  const params = useParams<BadgeDetailRouteParams>();

  useEffect(() => {
    BadgeStudentService.instance.findBadgeStudent(params.badgeId);

    return () => {
      BadgeStudentService.instance.clearBadgeStudent();
    };

  }, [params.badgeId]);
}