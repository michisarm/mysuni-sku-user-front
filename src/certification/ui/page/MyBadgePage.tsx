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
import BadgeCategoryContainer from '../logic/BadgeCategoryContainer';
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
  const { categories } = badgeService!;

  const { params } = match;

  const [subBreadcrumb, setSubBreadcrumb] = useState<string>(SubBreadcrumb.AllBadgeList);
  const [categorySelection, setCategorySelection] = useState<string>('');

  const [badgeCount, setBadgeCount] = useState(0);
  const [challengeCount, setChallengeCount] = useState(0);
  const [earnedCount, setEarnedCount] = useState(0);

  // lectureService 변경  실행
  useEffect(() => {
    //
    setSubBreadcrumb((SubBreadcrumb as any)[match.params.tab] || '');

    badgeService?.getCountOfBadges().then(() => {
      setBadgeCount(badgeService.badgeCount);
      setChallengeCount(badgeService.challengingCount);
      setEarnedCount(badgeService.earnedCount);
    });

    if (match.params.tab === 'AllBadgeList') {
      badgeService!.clearCategories();
      badgeService!.findAllCategories();
    }
  }, [match.params.tab]);

  useEffect(() => {
    //
    if (subBreadcrumb !== match.params.tab) {
      setSubBreadcrumb((SubBreadcrumb as any)[match.params.tab] || '');
    }
  }, [match.params.tab]);

  const getTabs = () => {
    //
    return [
      {
        name: MyBadgeContentType.AllBadgeList,
        item: (
          <>
            Badge List
            { <span className="count">+{badgeCount}</span> || <span className="count">0</span> }
          </>
        ),
        render: () => (
          <AllBadgeListContainer
            badgeCount={badgeCount}
            categorySelection={categorySelection}
          />
        )
      },
      {
        name: MyBadgeContentType.ChallengingBadgeList,
        item: (
          <>
            도전중 Badge
            { <span className="count">+{challengeCount}</span> || <span className="count">0</span> }
          </>
        ),
        render: () => (
          <ChallengingBadgeContainer
            badgeCount={challengeCount}
          />
        )
      },
      {
        name: MyBadgeContentType.EarnedBadgeList,
        item: (
          <>
            My Badge
            { <span className="count">+{earnedCount}</span> || <span className="count">0</span> }
          </>
        ),
        render: () => (
          <EarnedBadgeListContainer
            profileMemberName={profileMemberName}
            badgeCount={earnedCount}
          />
        )
      }
    ];
  };

  const onChangeTab = (tab: TabItemModel) => {
    history.push(routePaths.badgeTab(tab.name));
  };


  // 카테고리 선택
  const onClickBadgeCategory = (e: any, categoryId: any) => {
    // 페이지 변경(초기화)
    match.params.pageNo = '1';
    history.replace(routePaths.currentPage(1));

    // 선택된 Category 정보를 가져오되, 동일한 카테고리일 경우 toggle 처리되어야 함
    if (categorySelection === categoryId) {
      // 선택해제 및 전체보기
      setCategorySelection('');
    } else {
      setCategorySelection(categoryId);
    }
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
        topOfContents={
          (params.tab === MyBadgeContentType.AllBadgeList) && (
            <BadgeCategoryContainer
              categories={categories}
              categorySelection={categorySelection}
              onClickBadgeCategory={onClickBadgeCategory}
            />
          )
        }
      />
    </ContentLayout>
  );
};

export default inject(mobxHelper.injectFrom(
  'shared.actionLogService',
  'badge.badgeService',
))(withRouter(observer(MyBadgePage)));

