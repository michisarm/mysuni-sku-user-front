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
import { BadgeRouteParams } from '../model/BadgeRouteParams';
import BadgeCategoryContainer from '../logic/BadgeCategoryContainer';
import ChallengeBadgeListContainer from '../logic/ChallengeBadgeListContainer';
import { useRequestBadgeAllCount } from '../../service/useRequestBadgeAllCount';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../shared/ui/logic/PolyglotText';

interface BadgeMainPageProps {
  badgeService?: BadgeService;
}

function BadgeMainPage({ badgeService }: BadgeMainPageProps) {
  const { allBadgeCount, setSelectedLevel } = badgeService!;

  const history = useHistory();
  const params = useParams<BadgeRouteParams>();

  useRequestBadgeAllCount();

  const onChangeTab = (tab: TabItemModel) => {
    setSelectedLevel('');
    history.push(routePaths.badgeTab(tab.name));
  };

  const getTabs = () => {
    return [
      {
        name: MyBadgeContentType.AllBadgeList,
        item: (
          <>
            <PolyglotText
              id="Certification-tabm-뱃지목록"
              defaultString="Badge List"
            />
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
            <PolyglotText
              id="Certification-tabm-도전뱃지"
              defaultString="도전중 Badge"
            />
            {(
              <span className="count">+{allBadgeCount.challengingCount}</span>
            ) || <span className="count">0</span>}
          </>
        ),
        render: () => <ChallengeBadgeListContainer />,
      },
      {
        name: MyBadgeContentType.EarnedBadgeList,
        item: (
          <>
            <PolyglotText id="Certification-tabm-mb" defaultString="My Badge" />
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
        {
          text: getPolyglotText('Certification', 'Certification-cb-dp2'),
          path: routePaths.badgeTab(),
        },
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
            <div className="item-button">
              <PolyglotText
                id="Certification-tabm-인증소개"
                defaultString="인증제도 소개 바로가기"
              />
            </div>
          </NavLink>
        )}
      />
    </ContentLayout>
  );
}

const getSubBreadcrumbFromTab = (tab: string) => {
  if (tab === 'ChallengingBadgeList') {
    return getPolyglotText('도전중 Badge', 'Certification-tabm-도전뱃지');
  } else if (tab === 'AllBadgeList') {
    return getPolyglotText('Badge List', 'Certification-tabm-뱃지목록');
  } else if (tab === 'EarnedBadgeList') {
    return getPolyglotText('My Badge', 'Certification-tabm-mb');
  } else {
    return '';
  }
};

export default inject(mobxHelper.injectFrom('badge.badgeService'))(
  observer(BadgeMainPage)
);
