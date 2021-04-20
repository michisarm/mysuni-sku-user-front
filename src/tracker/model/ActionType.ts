export enum Source {
  NEWSLETTER = 'NEWSLETTER',
}

export enum Action {
  CLICK = 'CLICK',
  SCROLL = 'SCROLL',
  SEARCH = 'SEARCH',
  VIEW = 'VIEW',
}

export enum ActionType {
  STUDY = 'STUDY',
  GENERAL = 'GENERAL',
}

export enum Area {
  LOGIN = 'LOGIN',
  HEADER_LOGO = 'HEADER-LOGO',
  HEADER_NOTICE = 'HEADER-NOTICE',
  HEADER_GNB = 'HEADER-GNB',
  HEADER_SEARCH = 'HEADER-SEARCH',
  HEADER_CATEGORY = 'HEADER-CATEGORY',
  HEADER_CATEGORYLIST = 'HEADER-CATEGORYLIST',
  HEADER_BANNER = 'HEADER-BANNER',
  HEADER_PROFILE = 'HEADER-PROFILE',
  HEADER_ALARM = 'HEADER-ALARM',
  MAIN_INFO = 'MAIN-INFO',
  MAIN_LEARNING = 'MAIN-LEARNING',
  MAIN_NORMAL = 'MAIN-NORMAL',
  MAIN_BADGE = 'MAIN-BADGE',
  MAIN_BANNER = 'MAIN-BANNER',
  MAIN_REQUIRED = 'MAIN-REQUIRED',
  MAIN_NEW = 'MAIN-NEW',
  MAIN_POPULAR = 'MAIN-POPULAR',
  MAIN_RECOMMEND = 'MAIN-RECOMMEND',
  MAIN_ENROLLING = 'MAIN-ENROLLING',
  MAIN_POPBANNER = 'MAIN-POPBANNER',
  FOOTER_HAMBURGER = 'FOOTER-HAMBURGER',
  FOOTER_NAVI = 'FOOTER-NAVI',
  FOOTER_SITEMAP = 'FOOTER-SITEMAP',
  LEARNING_INFO = 'LEARNING-INFO',
  LEARNING_MENU = 'LEARNING-MENU',
  LEARNING_INPROGRESS = 'LEARNING-INPROGRESS',
  LEARNING_INMYLIST = 'LEARNING-INMYLIST',
  LEARNING_REQUIRED = 'LEARNING-REQUIRED',
  LEARNING_ENROLLED = 'LEARNING-ENROLLED',
  LEARNING_COMPLETED = 'LEARNING-COMPLETED',
  LEARNING_PERSONALCOMPLETED = 'LEARNING-PERSONALCOMPLETED',
  LEARNING_RETRY = 'LEARNING-RETRY',
  NEWLEARNING_REQUIRED = 'NEWLEARNING-REQUIRED',
  NEWLEARNING_NEW = 'NEWLEARNING-NEW',
  NEWLEARNING_POPULAR = 'NEWLEARNING-POPULAR',
  NEWLEARNING_RECOMMEND = 'NEWLEARNING-RECOMMEND',
  NEWLEARNING_ENROLLING = 'NEWLEARNING-ENROLLING',
  COLLEGE_INFO = 'COLLEGE-INFO',
  COLLEGE_CARD = 'COLLEGE-CARD',
  RECOMMEND_INFO = 'RECOMMEND-INFO',
  RECOMMEND_LIST = 'RECOMMEND-LIST',
  RECOMMEND_CARD = 'RECOMMEND-CARD',
  RECOMMEND_TITLE = 'RECOMMEND-TITLE',
  CREATE_INFO = 'CREATE-INFO',
  CREATE_MENU = 'CREATE-MENU',
  CREATE_CREATE = 'CREATE-CREATE',
  CREATE_SHARED = 'CREATE-SHARED',
  CERTIFICATION_MENU = 'CERTIFICATION-MENU',
  CERTIFICATION_ALLBADGELIST = 'CERTIFICATION-ALLBADGELIST',
  CERTIFICATION_CHALLENGINGBADGELIST = 'CERTIFICATION-CHALLENGINGBADGELIST',
  CERTIFICATION_EARNEDBADGELIST = 'CERTIFICATION-EARNEDBADGELIST',
  CERTIFICATION_PATH = 'CERTIFICATION-PATH',
  CERTIFICATION_RELATION = 'CERTIFICATION-RELATION',
  COMMUNITY_HOME = 'COMMUNITY-HOME',
  COMMUNITY_CONTENT = 'COMMUNITY-CONTENT',
  COMMUNITY_INFO = 'COMMUNITY-INFO',
  COMMUNITY_MENU = 'COMMUNITY-MENU',
  COMMUNITY_MYLIST = 'COMMUNITY-MYLIST',
  COMMUNITY_MYPOST = 'COMMUNITY-MYPOST',
  COMMUNITY_LIST = 'COMMUNITY-LIST',
  COMMUNITY_FOLLOWPOST = 'COMMUNITY-FOLLOWPOST',
  COMMUNITY_FOLLOWING = 'COMMUNITY-FOLLOWING',
  COMMUNITY_PROFILEMENU = 'COMMUNITY-PROFILEMENU',
  COMMUNITY_PROFILE = 'COMMUNITY-PROFILE',
  COMMUNITY_FEED = 'COMMUNITY-FEED',
  COMMUNITY_COMMUNITY = 'COMMUNITY-COMMUNITY',
  COMMUNITY_BOOKMARK = 'COMMUNITY-BOOKMARK',
  COMMUNITY_LNB = 'COMMUNITY-LNB',
  COMMUNITY_NOCONTENT = 'COMMUNITY-NOCONTENT',
  CARD_HEADER = 'CARD-HEADER',
  CARD_MENU = 'CARD-MENU',
  CARD_TAB = 'CARD-TAB',
  CARD_LIST = 'CARD-LIST',
  CARD_OVERVIEW = 'CARD-OVERVIEW',
  CARD_TAG = 'CARD-TAG',
  CARD_EXPERT = 'CARD-EXPERT',
  CARD_RELATION = 'CARD-RELATION',
  CARD_BADGE = 'CARD-BADGE',
  CARD_CONTENT = 'CARD-CONTENT',
  CARD_COMMENTS = 'CARD-COMMENTS',
  CUBE_HEADER = 'CUBE-HEADER',
  CUBE_PLAY = 'CUBE-PLAY',
  CUBE_TAB = 'CUBE-TAB',
  CUBE_OVERVIEW = 'CUBE-OVERVIEW',
  CUBE_COMMENTS = 'CUBE-COMMENTS',
  CUBE_TAG = 'CUBE-TAG',
  SEARCH = 'SEARCH',
  INTRODUCTION_MENU = 'INTRODUCTION-MENU',
  INTRODUCTION_MYSUNI = 'INTRODUCTION-MYSUNI',
  INTRODUCTION_COLLEGE = 'INTRODUCTION-COLLEGE',
  INTRODUCTION_CERTIFICATION = 'INTRODUCTION-CERTIFICATION',
  INTRODUCTION_PROMOTION = 'INTRODUCTION-PROMOTION',
  EXPERT_MENU = 'EXPERT-MENU',
  EXPERT_INTRODUCE = 'EXPERT-INTRODUCE',
  EXPERT_LECTURE = 'EXPERT-LECTURE',
  MYPAGE_INFO = 'MYPAGE-INFO',
  MYPAGE_MENU = 'MYPAGE-MENU',
  MYPAGE_MYBADGE = 'MYPAGE-MYBADGE',
  MYPAGE_STAMP = 'MYPAGE-STAMP',
  BOARD_MENU = 'BOARD-MENU',
  BOARD_NOTICE = 'BOARD-NOTICE',
  BOARD_FAQ = 'BOARD-FAQ',
  BOARD_QNA = 'BOARD-QNA',
}

export enum FieldType {
  College = 'college',
  Channel = 'channel',
  // Course = 'course',
  Card = 'card',
  Cube = 'cube',
  Community = 'community',
  Badge = 'badge',
}
