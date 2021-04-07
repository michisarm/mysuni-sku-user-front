import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import { Button, Icon } from 'semantic-ui-react';
import { NoSuchContentPanel } from 'shared';
import { RouteComponentProps, withRouter } from 'react-router';
import certificationRoutes from 'certification/routePaths';
import { BadgeService } from 'certification/stores';
import { ActionLogService } from '../../../../shared/stores';
import { ContentWrapper } from '../MyLearningContentElementsView';
import BadgeStyle from '../../../../certification/ui/model/BadgeStyle';
import BadgeSize from '../../../../certification/ui/model/BadgeSize';
import ReactGA from 'react-ga';
import { Badge } from '../../../../certification/model/Badge';
import { MyBadgeRdo } from '../../../../certification/model/MyBadgeRdo';
import { MyBadge } from '../../../../certification/model/MyBadge';
import BadgeView from '../../../../certification/ui/view/BadgeView';

interface Props extends RouteComponentProps {
  actionLogService?: ActionLogService;
  badgeService?: BadgeService;

  profileMemberName: string;
}

const ChallengingBadge: React.FC<Props> = Props => {
  //
  const { actionLogService, badgeService, profileMemberName, history } = Props;

  const CONTENT_TYPE = 'Badge';
  /*
    메인화면에 표시되는 도전 뱃지 4개(기존의 요구사항).
    뱃지 사이즈가 변경되면서 5개로 수정.(BadgeSize.Large -> BadgeSize.Small)
  */
  const PAGE_SIZE = 5;

  const { challengeBadges } = badgeService!;

  // // lectureService 변경  실행
  useEffect(() => {
    findMyContent();
  }, []);

  const findMyContent = async () => {
    // // 세션 스토리지에 정보가 있는 경우 가져오기
    // const savedChallengingBadgeList = window.navigator.onLine && window.sessionStorage.getItem('ChallengingBadgeList');
    // if (savedChallengingBadgeList) {
    //   const badges: OffsetElementList<BadgeModel> = JSON.parse(savedChallengingBadgeList);
    //   if (badges.totalCount > PAGE_SIZE - 1) {
    //     badgeService!.setPagingChallengingBadges(badges);
    //     return;
    //   }
    // }

    badgeService!.clearMyBadges();

    const myBadgeRdo: MyBadgeRdo = {
      offset: 0,
      limit: 5,
    };

    badgeService!.findAllChallengeBadges(myBadgeRdo, true);
  };

  const onViewAll = () => {
    //
    actionLogService?.registerClickActionLog({ subAction: 'View all' });

    window.sessionStorage.setItem('from_main', 'TRUE');
    history.push(certificationRoutes.badgeChallengingBadgeList());
  };

  // Badge List로 이동
  const onClickLink = () => {
    //
    history.push(certificationRoutes.badgeAllBadgeList());

    ReactGA.event({
      category: '도전중인 Badge',
      action: 'Click',
      label: '도전중인 Badge 전체보기',
    });
  };

  // react-ga event
  const onClick = (idx: number) => {
    ReactGA.event({
      category: '메인_도전중인-Badge',
      action: 'Click Card',
      // label: `(Badge) - ${myBadges[idx].name}`,
      label: `${challengeBadges[idx].name}`,
    });
  };

  return (
    <ContentWrapper className="badge-scrolling">
      <div className="section-head">
        <strong>
          <span className="ellipsis">{profileMemberName}</span>님이 도전중인
          Badge
        </strong>
        <div className="right">
          {challengeBadges.length > 0 && (
            <Button icon className="right btn-blue" onClick={onViewAll}>
              View All <Icon className="morelink" />
            </Button>
          )}
        </div>
      </div>

      {challengeBadges.length > 0 && challengeBadges[0] ? (
        <div className="scrolling">
          <ul className="belt">
            {challengeBadges.map((badge: MyBadge, index: number) => {
              return (
                <li key={index} onClick={() => onClick(index)}>
                  <BadgeView
                    id={badge.id}
                    name={badge.name}
                    level={badge.level}
                    iconUrl={badge.iconUrl}
                    categoryId={badge.categoryId}
                    badgeStyle={BadgeStyle.List}
                    badgeSize={BadgeSize.Small}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <NoSuchContentPanel
          message={
            <>
              <div className="text">
                도전중인 Badge가 없습니다.
                <br />
                등록된 Badge 리스트에서 원하는 Badge에 도전해보세요.
              </div>
              <Button
                icon
                as="a"
                className="right btn-blue2"
                onClick={onClickLink}
              >
                <span className="border">Badge List 바로가기</span>
                <Icon className="morelink" />
              </Button>
            </>
          }
        />
      )}
    </ContentWrapper>
  );
};

export default inject(
  mobxHelper.injectFrom('shared.actionLogService', 'badge.badgeService')
)(withRouter(observer(ChallengingBadge)));
