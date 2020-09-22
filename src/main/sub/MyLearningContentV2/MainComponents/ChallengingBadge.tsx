import React, {useEffect} from 'react';
import {inject, observer} from 'mobx-react';
import {mobxHelper} from '@nara.platform/accent';
import {Button, Icon} from 'semantic-ui-react';
import { NoSuchContentPanel } from 'shared';
import {RouteComponentProps, withRouter} from 'react-router';
import certificationRoutes from 'certification/routePaths';
import {BadgeService} from 'certification/stores';
import {ActionLogService} from '../../../../shared/stores';
import {ContentWrapper} from '../MyLearningContentElementsView';
import OffsetElementList from '../../../../shared/model/OffsetElementList';
import BadgeModel from '../../../../certification/ui/model/MyBadgeModel';
import BadgeFilterRdoModel from '../../../../certification/ui/model/BadgeFilterRdoModel';
import {Badge} from '../../../../certification/shared/Badge';
import BadgeStyle from '../../../../certification/ui/model/BadgeStyle';
import BadgeSize from '../../../../certification/ui/model/BadgeSize';


interface Props extends RouteComponentProps {
  actionLogService?: ActionLogService,
  badgeService?: BadgeService,

  profileMemberName: string
}

const ChallengingBadge  : React.FC<Props> = (Props) => {
  //
  const { actionLogService, badgeService, profileMemberName, history, } = Props;

  const CONTENT_TYPE = 'Badge';
  const PAGE_SIZE = 4;  // 도전 뱃지는 4개

  const { myBadges } = badgeService!;

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
    badgeService!.findPagingChallengingBadges(BadgeFilterRdoModel.challenging('', PAGE_SIZE, 0), true);
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
  };


  return (
    <ContentWrapper className="badge-scrolling">
      <div className="section-head">
        <strong><span className="ellipsis">{profileMemberName}</span>님의 도전중인 Badge</strong>
        <div className="right">
          {
            myBadges.length > 0 && (
              <Button icon className="right btn-blue" onClick={onViewAll}>
                View All <Icon className="morelink"/>
              </Button>
            )
          }
        </div>
      </div>

      {myBadges.length > 0 && myBadges[0] ?
        <div className="scrolling">
          <ul className="belt">
            {myBadges.map( (badge: BadgeModel, index: number) => {
              return (
                <li key={index}>
                  <Badge
                    badge={badge}
                    badgeStyle={BadgeStyle.List}
                    badgeSize={BadgeSize.Small}
                  />
                </li>
              );
            })}
          </ul>
        </div>
        :
        <NoSuchContentPanel message={(
          <>
            <div className="text">도전중인 Badge가 없습니다.<br/>등록된 Badge 리스트에서 원하는 Badge에 도전해보세요.</div>
            <Button
              icon
              as="a"
              className="right btn-blue2"
              onClick={onClickLink}
            >
              <span className="border">Badge List 바로가기</span>
              <Icon className="morelink"/>
            </Button>
          </>
        )}
        />
      }
    </ContentWrapper>
  );
};

export default inject(mobxHelper.injectFrom(
  'shared.actionLogService',
  'badge.badgeService',
))(withRouter(observer(ChallengingBadge)));
