import { CommunityMenuType } from './data/community/models/CommunityMenuType';
import _ from 'lodash';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { MemberType } from './data/community/models/Member';
import { CardModel } from './data/lecture/models/CardModel';
import { parseChannelId, parseCollegeId } from './app/services/app.services';

const ONE_DAY = 24 * 60 * 60 * 1000;
const ONE_HOUR = 60 * 60 * 1000;
const TWO_DAY = ONE_DAY * 2;

export function parseMenuIcon(type: CommunityMenuType) {
  let icon = 'board';
  let path = '/suni-community/images/all/icon-community-menu-board.png';

  switch (type) {
    case 'ANODISCUSSION':
      path = '/suni-community/images/all/icon-community-menu-discussion.png';
      icon = 'anodiscussion';
      break;
    case 'DISCUSSION':
      path = '/suni-community/images/all/icon-community-menu-discussion.png';
      icon = 'discussion';
      break;
    case 'STORE':
      path = '/suni-community/images/all/icon-community-menu-download.png';
      icon = 'data';
      break;
    case 'SURVEY':
      path = '/suni-community/images/all/icon-community-menu-survey.png';
      icon = 'poll';
      break;
    case 'LINK':
      path = '/suni-community/images/all/icon-community-menu-link.png';
      break;
    case 'HTML':
      path = '/suni-community/images/all/icon-community-menu-html.png';
      icon = 'content';
      break;
    default:
      break;
  }

  return { path, icon };
}

export function parseMenuIconClasName(type: CommunityMenuType): string {
  let icon = 'i_board';

  switch (type) {
    case 'ANODISCUSSION':
      icon = 'i_discussion';
      break;
    case 'DISCUSSION':
      icon = 'i_discussion';
      break;
    case 'STORE':
      icon = 'i_download';
      break;
    case 'SURVEY':
      icon = 'i_survey';
      break;
    case 'LINK':
      icon = 'i_link';
      break;
    case 'HTML':
      icon = 'i_html';
      break;
    default:
      break;
  }

  return icon;
}

export function formatTimestampToDate(timestamp: number): string {
  if (timestamp === 0) {
    return '-';
  }
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const formattedMonth = month < 10 ? `0${month}` : `${month}`;
  const formattedDay = day < 10 ? `0${day}` : `${day}`;

  return `${year}.${formattedMonth}.${formattedDay}`;
}

export function getTimeString(createdTime: number): string {
  const timeStamp = Date.now() - createdTime;
  if (timeStamp < 0) {
    return '';
  }
  if (timeStamp < ONE_HOUR) {
    return `${Math.floor(timeStamp / 1000 / 60)}분 전`;
  }
  if (timeStamp < ONE_DAY) {
    return `${Math.floor(timeStamp / 1000 / 60 / 60)}시간 전`;
  }
  if (timeStamp < TWO_DAY) {
    return '1일 전';
  }
  return dayjs(createdTime).format('YYYY.MM.DD');
}

export function timeToHourMinutePaddingFormat(time: number) {
  const hour = Math.floor(time / 60) || 0;
  const minute = time % 60 || 0;

  if (hour < 1 && minute < 1) {
    return '0h 0m';
  } else if (hour < 1) {
    return `0h ${minute}m`;
  } else if (minute < 1) {
    return `${hour}h 0m`;
  } else {
    return `${hour}h ${minute}m`;
  }
}

export function getDayOfWeek(date: string): string {
  return dayjs(date).locale('ko').format('dddd');
}

export function getTotalPage(totalCount: number, limit: number) {
  let totalPageCount = Math.ceil(totalCount / limit);
  if (totalCount % limit < 0) {
    totalPageCount++;
  }

  return totalPageCount;
}

export function getItemNo(
  totalCount: number,
  offset: number,
  index: number,
  itemsLength: number
) {
  if (totalCount - offset < itemsLength) {
    return itemsLength - index;
  }

  return totalCount - offset - index;
}

export const parseMemberType = (
  managerId: string,
  memberId: string,
  memberType: MemberType
) => {
  if (managerId === memberId) {
    return '대표관리자';
  }

  switch (memberType) {
    case 'ADMIN':
      return '관리자';
    case 'MEMBER':
      return '멤버';
  }
};

export function getDenizedId() {
  const workSpaces = localStorage.getItem('nara.workspaces') || '';
  const parseWorkSpaces = JSON.parse(workSpaces).cineroomWorkspaces;

  const splitedTenantId = parseWorkSpaces[0].tenantId.split('@');
  const denizedId = `${
    splitedTenantId[0].split('-')[0]
  }@${splitedTenantId[1].substring(0, splitedTenantId[1].lastIndexOf('-'))}`;

  return denizedId;
}

export function numberWithCommas(x: number) {
  let s = x.toString();
  const pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(s)) s = s.replace(pattern, '$1,$2');
  return s;
}

export function cardToCategoryString(card: CardModel): string {
  const { categories } = card;

  const category = categories.find((c) => c.mainCategory === true);

  if (category !== undefined) {
    return `${parseCollegeId(category.collegeId)} / ${parseChannelId(
      category.channelId
    )}`;
  }

  return '';
}
export function parseCommunityMenuTypeName(type: CommunityMenuType) {
  switch (type) {
    case 'DISCUSSION':
      return 'discussion';
    case 'ANODISCUSSION':
      return 'discussion';
    case 'SURVEY':
      return 'survey';
    case 'HTML':
      return 'html';
    case 'LINK':
      return 'link';
    default:
      return 'board';
  }
}

const defaultProfileImage =
  'https://image.mysuni.sk.com/suni-asset/public/images/all/img-profile-80-px.png';

export function getProfileImage(
  profileImage: string | undefined,
  gdiProfileImage: string,
  useGdi: boolean
) {
  if (useGdi === true) {
    return `/profile/photo${gdiProfileImage}`;
  }
  if (
    profileImage === undefined ||
    profileImage === null ||
    profileImage === ''
  ) {
    return defaultProfileImage;
  }
  return profileImage;
}

export function getCommunityProfileImage(profileImage: string | undefined) {
  if (
    profileImage === undefined ||
    profileImage === null ||
    profileImage === ''
  ) {
    return defaultProfileImage;
  }

  if (
    profileImage.includes('/profile') ||
    profileImage.includes('/instructor')
  ) {
    return profileImage;
  }

  return `/profile/photo${profileImage}`;
}
