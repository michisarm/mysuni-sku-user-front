import React, {useEffect, useState} from 'react';
import {mobxHelper} from '@nara.platform/accent';
import {inject, observer} from 'mobx-react';
import {RouteComponentProps, withRouter} from 'react-router';

import {ActionLogService} from 'shared/stores';
import {ContentLayout, Tab, TabItemModel} from 'shared';
import routePaths from '../../routePaths';
import MyBadgeContentType from '../model/MyBadgeContentType';

import AllBadgeListContainer from '../logic/AllBadgeListContainer';
import ChallengingBadgeContainer from '../logic/ChallengingBadgeContainer';
import EarnedBadgeListContainer from '../logic/EarnedBadgeListContainer';
import BadgeService from '../../present/logic/BadgeService';


interface Props extends RouteComponentProps<{ tab: string, pageNo: string }> {
  actionLogService?: ActionLogService,
  badgeService?: BadgeService,

  profileMemberName: string,
}

enum SubBreadcrumb {
  AllBadgeList = 'Badge List',
  ChallengingBadgeList = '도전중 Badge',
  EarnedBadgeList = 'My Badge',
}

const MyBadgePage : React.FC<Props> = (Props) => {
  //
  const { badgeService, profileMemberName, history, match } = Props;

  const { params } = match;

  const [subBreadcrumb, setSubBreadcrumb] = useState(SubBreadcrumb.AllBadgeList);

  // lectureService 변경  실행
  useEffect(() => {
    //
    setSubBreadcrumb((SubBreadcrumb as any)[match.params.tab] || '');
  }, []);

  useEffect(() => {
    //
    if (subBreadcrumb !== match.params.tab) {
      setSubBreadcrumb((SubBreadcrumb as any)[match.params.tab] || '');
    }

    badgeService?.getCountOfBadges();

  }, [match.params.tab]);

  const getTabs = () => {
    //
    return [
      {
        name: MyBadgeContentType.AllBadgeList,
        item: (
          <>
            Badge List
            <span className="count">{badgeService?.badgeCount}</span>
          </>
        ),
        render: () => (
          <>
            <AllBadgeListContainer badgeCount={badgeService?.badgeCount} />
          </>
        )
      },
      {
        name: MyBadgeContentType.ChallengingBadgeList,
        item: (
          <>
            도전중 Badge
            <span className="count">{badgeService?.challengingCount}</span>
          </>
        ),
        render: () => (
          <ChallengingBadgeContainer/>
        )
      },
      {
        name: MyBadgeContentType.EarnedBadgeList,
        item: (
          <>
            My Badge
            <span className="count">{badgeService?.earnedCount}</span>
          </>
        ),
        render: () => (
          <EarnedBadgeListContainer
            profileMemberName={profileMemberName}
            badgeCount={badgeService?.earnedCount}
          />
        )
      }
    ];
  };

  const onChangeTab = (tab: TabItemModel) => {
    history.push(routePaths.badgeTab(tab.name));
  };

  return (
    <ContentLayout
      breadcrumb={[
        { text: 'Certification'},
        { text: subBreadcrumb },
      ]}
    >

      <Tab
        tabs={getTabs()}
        defaultActiveName={params.tab}
        onChangeTab={onChangeTab}
      />
    </ContentLayout>
  );
};

export default inject(mobxHelper.injectFrom(
  'shared.actionLogService',
  'badge.badgeService',
))(withRouter(observer(MyBadgePage)));

