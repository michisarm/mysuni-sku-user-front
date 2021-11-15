export type PositionType = 'TopMenu' | 'FloatingMenu' | 'HomeElement';
export type PageElementType =
  | 'Category'
  | 'Learning'
  | 'Recommend'
  | 'Create'
  | 'Certification'
  | 'Community'
  | 'MyPage'
  | 'Introduction'
  | 'Support'
  | 'FavoriteChannels'
  | 'SiteMap'
  | 'Approval'
  | 'AplRegistration'
  | 'Summary'
  | 'LearningCards'
  | 'ChallengingBadges'
  | 'RecommendCards';

export interface PageElement {
  position: PositionType;
  type: PageElementType;
}
