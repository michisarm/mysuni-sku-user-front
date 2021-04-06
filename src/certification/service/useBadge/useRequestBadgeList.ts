import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BadgeRouteParams } from "../../ui/model/BadgeRouteParams";
import { BadgeService, BadgeCategoryService } from "../../../lecture/stores";
import { BadgeRdo } from "../../model/BadgeRdo";

const PAGE_SIZE = 12;

export function useRequestBadgeList() {
  const params = useParams<BadgeRouteParams>();
  const currentPageNo = parseInt(params.pageNo);

  const selectedCategoryId = BadgeCategoryService!.instance.selectedCategoryId;
  const selectedLevel = BadgeService.instance.selectedLevel;


  useEffect(() => {
    const offset = (currentPageNo - 1) * PAGE_SIZE;
    const limit = PAGE_SIZE;

    const badgeRdo: BadgeRdo = {
      categoryId: selectedCategoryId,
      level: selectedLevel,
      offset,
      limit,
    };

    BadgeService!.instance.findAllBadges(badgeRdo);

  }, [selectedCategoryId, selectedLevel, params.pageNo]);
}

