
import BadgeService from './present/logic/BadgeService';
import BadgeCardService from './present/logic/BadgeCardService';

export default {
  badge: {
    badgeService: BadgeService.instance,
    badgeCardService: BadgeCardService.instance,
  }
};

export {
  BadgeService,
  BadgeCardService,
};

