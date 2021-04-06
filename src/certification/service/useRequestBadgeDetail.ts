import { useParams } from "react-router-dom";
import { BadgeDetailRouteParams } from "../ui/model/BadgeRouteParams";
import { useEffect } from "react";
import { BadgeService, BadgeStudentService, BadgeCardService } from "../../lecture/stores";
import CardStudentService from "../present/logic/CardStudentService";
import { LearningState } from "../../shared/model";

export function useRequestBadgeDetail() {
  const params = useParams<BadgeDetailRouteParams>();
  const badge = BadgeService.instance.badge;

  useEffect(() => {
    BadgeService.instance.findBadge(params.badgeId);
    BadgeStudentService.instance.findBadgeStudent(params.badgeId);

    return () => {
      BadgeService.instance.clearBadge();
      BadgeStudentService.instance.clearBadgeStudent();
    };

  }, [params.badgeId]);

  useEffect(() => {
    if (badge === undefined) {
      return;
    }

    if (
      badge.relatedBadgeIds &&
      badge.relatedBadgeIds.length > 0
    ) {
      BadgeService.instance.findAllLinkedBadges(badge.relatedBadgeIds);
    }

    if (
      badge.cardIds &&
      badge.cardIds.length > 0) {
      BadgeCardService.instance.findAllBadgeCards(badge.cardIds);
      CardStudentService.instance.findCardStudentsByCardIdsAndLearningState(badge.cardIds, LearningState.Passed);
    }

    return () => {
      BadgeService.instance.clearLinkedBadges();
      BadgeCardService.instance.clearBadgeCards();
      CardStudentService.instance.clearCardStudents();
    };

  }, [badge])
}