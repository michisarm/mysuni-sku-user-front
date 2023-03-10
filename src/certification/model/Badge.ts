import { BadgeState } from './BadgeState';
import { BadgeType } from './BadgeType';
import { OpenRequest } from '../../personalcube/personalcube/model/OpenRequest';
import { GroupBasedAccessRule } from '../../lecture/model/GroupBasedAccessRule';
import { BadgeCategory } from './BadgeCategory';
import { BadgeLevel } from './BadgeLevel';
import { BadgeOperator } from './BadgeOperator';
import { PatronKey } from '@nara.platform/accent';
import { PolyglotString } from 'shared/viewmodel/PolyglotString';
import { LangSupport } from 'lecture/model/LangSupport';

export interface BadgeBundle {
  badge: Badge;
  badgeCategory: BadgeCategory;
}
export interface Badge {
  id: string;
  patronKey: PatronKey;
  name: PolyglotString;
  level: BadgeLevel;
  iconUrl: string;
  type: BadgeType;
  state: BadgeState;
  categories: Category[];
  subCategories: BadgeCategory[];
  categoryId: string;
  subCategoryIds: string[];
  description: PolyglotString;
  qualification: PolyglotString;
  acquisitionRequirements: PolyglotString;
  additionalRequirementsNeeded: boolean;
  issueAutomatically: boolean;
  tags: PolyglotString;
  cardIds: string[];
  relatedBadgeIds: string[];
  operator: BadgeOperator;
  registerName: PolyglotString;
  creatorEmail: string;
  openRequest: OpenRequest;
  time: number;
  learningTime: number;
  forSelectedMember: boolean;
  groupBasedAccessRule: GroupBasedAccessRule;
  langSupport: LangSupport[];
  collegeId: string;
}

interface Category {
  categoryId: string;
  mainCategory: boolean;
  displayOrderInCategory: number;
}

export function getMainCategoryId(badge?: Badge): string {
  if (
    badge === undefined ||
    !badge.categories ||
    badge.categories.length === 0
  ) {
    return '';
  }

  const mainCategory = badge.categories.find(
    (category) => category.mainCategory === true
  );

  if (mainCategory === undefined) {
    return '';
  }

  return mainCategory.categoryId;
}

export function getCineroomId(badge?: Badge): string {
  if (!badge || !badge.patronKey || !badge.patronKey.keyString) {
    return '';
  }

  const { keyString } = badge.patronKey;

  const indexOfAt = keyString.indexOf('@');

  if (indexOfAt === -1) {
    return '';
  }

  return keyString.slice(indexOfAt + 1, keyString.length);
}
