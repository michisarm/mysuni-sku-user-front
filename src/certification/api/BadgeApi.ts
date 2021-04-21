import { getAxios } from '../../shared/api/Axios';
import { AxiosReturn } from '../../shared/api/AxiosReturn';
import { Badge, BadgeBundle } from '../model/Badge';
import { BadgeWithBadgeStudentCountRom } from '../model/BadgeWithBadgeStudentCountRom';
import { BadgeRdo } from '../model/BadgeRdo';
import { OffsetElementList } from '../../shared/model';
import { MyBadgeRdo } from '../model/MyBadgeRdo';
import { MyBadge } from '../model/MyBadge';
import { BadgeStudentCdo } from '../model/BadgeStudentCdo';

const BASE_URL = '/api/badge/badges';

export function findBadge(badgeId: string): Promise<Badge | undefined> {
  const axios = getAxios();
  const url = `${BASE_URL}/${badgeId}`;

  return axios.get<Badge>(url).then(AxiosReturn);
}

export function findBadgesByIds(
  badgeIds: string[]
): Promise<BadgeBundle[] | undefined> {
  const axios = getAxios();
  const url = `${BASE_URL}/byIds`;
  const splitedIds = (badgeIds && badgeIds.join(',')) || [];

  return axios
    .get<BadgeBundle[]>(url, {
      params: {
        ids: splitedIds,
      },
    })
    .then(AxiosReturn);
}

export function findBadgesWithStudentCount(): Promise<
  BadgeWithBadgeStudentCountRom | undefined
> {
  const axios = getAxios();
  const url = `${BASE_URL}/count`;

  return axios.get<BadgeWithBadgeStudentCountRom>(url).then(AxiosReturn);
}

export function findAvailableBadgesByRdo(
  badgeRdo: BadgeRdo
): Promise<OffsetElementList<BadgeBundle> | undefined> {
  const axios = getAxios();
  const url = `${BASE_URL}/available`;

  return axios
    .get<OffsetElementList<BadgeBundle>>(url, {
      params: badgeRdo,
    })
    .then(AxiosReturn);
}

export function findBadgesByBadgeIssueState(
  myBadgeRdo: MyBadgeRdo
): Promise<OffsetElementList<MyBadge> | undefined> {
  const axios = getAxios();
  const url = `${BASE_URL}/my`;

  return axios
    .get<OffsetElementList<MyBadge>>(url, {
      params: myBadgeRdo,
    })
    .then(AxiosReturn);
}

export function challengeBadge(
  badgeStudentCdo: BadgeStudentCdo
): Promise<boolean> {
  const axios = getAxios();
  const url = `${BASE_URL}/challenge`;

  return axios
    .post<boolean>(url, badgeStudentCdo)
    .then(response => true)
    .catch(error => false);
}

export function cancelBadgeChallenges(
  badgeStudentIds: string[]
): Promise<boolean> {
  const axios = getAxios();
  const url = `${BASE_URL}/cancelChallenge`;

  return axios
    .put<boolean>(url, badgeStudentIds)
    .then(response => true)
    .catch(error => false);
}

export function requestIssue(badgeId: string): Promise<boolean> {
  const axios = getAxios();
  const url = `${BASE_URL}/${badgeId}/requestIssue`;

  return axios
    .put<boolean>(url)
    .then(response => true)
    .catch(error => false);
}

export function cancelRequestIssue(badgeId: string): Promise<boolean> {
  const axios = getAxios();
  const url = `${BASE_URL}/${badgeId}/requestCancelIssue`;

  return axios
    .put<boolean>(url)
    .then(response => true)
    .catch(error => false);
}

export function findBadgeWithCategory(
  badgeId: string
): Promise<BadgeBundle | undefined> {
  const axios = getAxios();
  const url = `${BASE_URL}/${badgeId}/withCategory`;

  return axios.get<BadgeBundle>(url).then(AxiosReturn);
}
