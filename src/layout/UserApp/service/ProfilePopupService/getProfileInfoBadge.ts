import { patronInfo } from '@nara.platform/dock';
import { MyBadge } from '../../../../certification/model/MyBadge';
import { findBadgesByBadgeIssueState } from '../../api/ProfileInfoAPI';
import { BadgeModel, BadgesModel } from '../../model/BadgeModel';
import { setProfileInfoBadgesModel } from '../../store/ProfileInfoBadgeStore';

export async function getProfileInfoBadge(memberId: string | undefined, startDate: string, endDate: string) {
  const memberIdValue = memberId === undefined ? '' : memberId;
  const badgeData = await findBadgesByBadgeIssueState(memberIdValue, startDate, endDate);

  let result: BadgesModel = {
    badges: [],
    badgesTotalCount: 0,
    badgesOffset: 0,
  };

  if (badgeData !== undefined) {
    result = {
      badges: badgeData.results,
      badgesTotalCount: badgeData.totalCount,
      badgesOffset: 0
    };
  }

  setProfileInfoBadgesModel(result);

}

