import React from 'react';
import { mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { useHistory, useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import { ContentLayout, Tab, TabItemModel } from 'shared';
import routePaths from '../../routePaths';
import MyBadgeContentType from '../model/MyBadgeContentType';
import AllBadgeListContainer from '../logic/AllBadgeListContainer';
import BadgeService from '../../present/logic/BadgeService';
import MyBadgeListContainer from '../logic/MyBadgeListContainer';
import MyBadgeContentTypeName from '../model/MyBadgeContentTypeName';
import { BadgeRouteParams } from '../model/BadgeRouteParams';
import ChallengeBadgeContainer from '../logic/ChallengeBadgeContainer';
import { useRequestBadgeAllCount } from '../../service/useBadgeAllCount/useRequestBadgeAllCount';
import BadgeCategoryContainer from '../logic/BadgeCategoryContainer';


interface BadgeMainPageProps {
  badgeService?: BadgeService;
}

function BadgeMainPage({ 
  badgeService
 }: BadgeMainPageProps) {
  const { allBadgeCount } = badgeService!;

  const history = useHistory();
  const params = useParams<BadgeRouteParams>();

  useRequestBadgeAllCount();

  const onChangeTab = (tab: TabItemModel) => {
    history.push(routePaths.badgeTab(tab.name));
  };

  const getTabs = () => {
    return [
      {
        name: MyBadgeContentType.AllBadgeList,
        item: (
          <>
            Badge List
            {<span className="count">+{allBadgeCount.totalCount}</span> || (
              <span className="count">0</span>
            )}
          </>
        ),
        render: () => <AllBadgeListContainer />,
      },
      {
        name: MyBadgeContentType.ChallengingBadgeList,
        item: (
          <>
            도전중 Badge
            {(
              <span className="count">+{allBadgeCount.challengingCount}</span>
            ) || <span className="count">0</span>}
          </>
        ),
        render: () => <ChallengeBadgeContainer />,
      },
      {
        name: MyBadgeContentType.EarnedBadgeList,
        item: (
          <>
            My Badge
            {<span className="count">+{allBadgeCount.issuedCount}</span> || (
              <span className="count">0</span>
            )}
          </>
        ),
        render: () => <MyBadgeListContainer />,
      },
    ];
  };

  return (
    <ContentLayout
      breadcrumb={[
        { text: 'Certification' },
        { text: getSubBreadcrumbFromTab(params.tab) },
      ]}
    >
      <Tab
        large={true}
        tabs={getTabs()}
        defaultActiveName={params.tab}
        onChangeTab={onChangeTab}
        topOfContents={
          params.tab === MyBadgeContentType.AllBadgeList && (
            <BadgeCategoryContainer />
          )
        }
        renderStaticMenu={() => (
          <NavLink to="/introduction/Certification">
            <div className="item-button">인증제도 소개 바로가기</div>
          </NavLink>
        )}
      />
    </ContentLayout>
  );
}

const getSubBreadcrumbFromTab = (tab: string) => {
  return MyBadgeContentTypeName[tab as MyBadgeContentType];
};

export default inject(mobxHelper.injectFrom(
  'badge.badgeService'
))(observer(BadgeMainPage));
