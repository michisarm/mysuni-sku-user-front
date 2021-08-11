/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import { Button, Icon } from 'semantic-ui-react';
import { NoSuchContentPanel } from 'shared';
import { RouteComponentProps, withRouter } from 'react-router';
import certificationRoutes from 'certification/routePaths';
import { BadgeService } from 'certification/stores';
import { ContentWrapper } from '../MyLearningContentElementsView';
import BadgeStyle from '../../../../certification/ui/model/BadgeStyle';
import BadgeSize from '../../../../certification/ui/model/BadgeSize';
import ReactGA from 'react-ga';
import { MyBadgeRdo } from '../../../../certification/model/MyBadgeRdo';
import { MyBadge } from '../../../../certification/model/MyBadge';
import BadgeView from '../../../../certification/ui/view/BadgeView';
import { Area } from 'tracker/model';
import { getPolyglotText, PolyglotText } from '../../../../shared/ui/logic/PolyglotText';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { getDefaultLang } from 'lecture/model/LangSupport';

interface Props extends RouteComponentProps {
  badgeService?: BadgeService;

  profileMemberName: string;
}

const ChallengingBadge: React.FC<Props> = (Props) => {
  //
  const { badgeService, profileMemberName, history } = Props;

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

    return () => {
      badgeService!.clearChallengeBadges();
    };
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

    const myBadgeRdo: MyBadgeRdo = {
      offset: 0,
      limit: 5,
    };

    badgeService!.findAllChallengeBadges(myBadgeRdo, true);
  };

  const onViewAll = () => {
    //
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
      label: `${parsePolyglotString(
        challengeBadges[idx].name,
        getDefaultLang(challengeBadges[idx].langSupport)
      )}`,
    });
  };

  return (
    <ContentWrapper className="badge-scrolling" dataArea={Area.MAIN_BADGE}>
      <div className="section-head">
        <strong dangerouslySetInnerHTML={{__html: getPolyglotText('<span className="ellipsis">{name}</span>님이 도전중인 Badge', 'home-ChallengeBadges-Title', {name: profileMemberName})}} />
          {/* <span className="ellipsis">{profileMemberName}</span>
          <PolyglotText
            defaultString="님이 도전중인 Badge"
            id="home-ChallengeBadges-Title"
          /> */}
        <div className="right">
          {challengeBadges.length > 0 && (
            <Button icon className="right btn-blue" onClick={onViewAll}>
              <PolyglotText
                defaultString="View All"
                id="home-ChallengeBadges-ViewAll"
              />
              <Icon className="morelink" />
            </Button>
          )}
        </div>
      </div>

      {challengeBadges.length > 0 && challengeBadges[0] ? (
        <div className="scrolling" data-area-name="도전중인 Badge">
          <div className="badge-list-type">
            <ul className="belt">
              {challengeBadges.map((badge: MyBadge, index: number) => {
                return (
                  <li key={index} onClick={() => onClick(index)}>
                    <BadgeView
                      id={badge.id}
                      name={parsePolyglotString(
                        badge.name,
                        getDefaultLang(badge.langSupport)
                      )}
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
        </div>
      ) : (
        <NoSuchContentPanel
          message={
            <>
              <div className="text">
                <PolyglotText
                  defaultString="도전중인 Badge가 없습니다."
                  id="home-ChallengeBadges-도전뱃지"
                />
                <br />
                <PolyglotText
                  defaultString="등록된 Badge 리스트에서 원하는 Badge에 도전해보세요."
                  id="home-ChallengeBadges-등뱃없"
                />
              </div>
              <Button
                icon
                as="a"
                className="right btn-blue2"
                onClick={onClickLink}
              >
                <span className="border">
                  <PolyglotText
                    defaultString="Badge List 바로가기"
                    id="home-ChallengeBadges-목록없음"
                  />
                </span>
                <Icon className="morelink" />
              </Button>
            </>
          }
        />
      )}
    </ContentWrapper>
  );
};

export default inject(mobxHelper.injectFrom('badge.badgeService'))(
  withRouter(observer(ChallengingBadge))
);
