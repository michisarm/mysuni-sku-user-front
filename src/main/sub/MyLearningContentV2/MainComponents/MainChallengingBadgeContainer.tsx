import React, { useCallback, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Button, Icon } from 'semantic-ui-react';
import { NoSuchContentPanel } from 'shared';
import certificationRoutes from 'certification/routePaths';
import { ContentWrapper } from '../MyLearningContentElementsView';
import BadgeStyle from '../../../../certification/ui/model/BadgeStyle';
import BadgeSize from '../../../../certification/ui/model/BadgeSize';
import ReactGA from 'react-ga';
import { MyBadgeRdo } from '../../../../certification/model/MyBadgeRdo';
import { MyBadge } from '../../../../certification/model/MyBadge';
import BadgeView from '../../../../certification/ui/view/BadgeView';
import { Area } from 'tracker/model';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../../shared/ui/logic/PolyglotText';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { getDefaultLang } from 'lecture/model/LangSupport';
import { BadgeService } from 'lecture/stores';
import { useHistory } from 'react-router-dom';
import { SkProfileService } from 'profile/stores';

function MainChallengingBadgeContainer() {
  const history = useHistory();

  const badgeService = BadgeService.instance;
  const { challengeBadges } = badgeService;
  const {
    skProfile: { profileViewName },
  } = SkProfileService.instance;

  useEffect(() => {
    const myBadgeRdo: MyBadgeRdo = {
      offset: 0,
      limit: 5,
    };
    badgeService.findAllChallengeBadges(myBadgeRdo, true);

    return () => {
      badgeService.clearChallengeBadges();
    };
  }, []);

  const onViewAll = useCallback(() => {
    window.sessionStorage.setItem('from_main', 'TRUE');
    history.push(certificationRoutes.badgeChallengingBadgeList());
  }, [history]);

  const onClickLink = useCallback(() => {
    history.push(certificationRoutes.badgeAllBadgeList());

    ReactGA.event({
      category: '도전중인 Badge',
      action: 'Click',
      label: '도전중인 Badge 전체보기',
    });
  }, [history]);

  const onClick = useCallback(
    (idx: number) => {
      ReactGA.event({
        category: '메인_도전중인-Badge',
        action: 'Click Card',
        // label: `(Badge) - ${myBadges[idx].name}`,
        label: `${parsePolyglotString(
          challengeBadges[idx].name,
          getDefaultLang(challengeBadges[idx].langSupport)
        )}`,
      });
    },
    [challengeBadges]
  );

  return (
    <ContentWrapper className="badge-scrolling" dataArea={Area.MAIN_BADGE}>
      <div className="section-head">
        <div
          dangerouslySetInnerHTML={{
            __html: `<strong>${getPolyglotText(
              '{name}님이 도전중인 Badge',
              'home-ChallengeBadges-Title',
              {
                name: profileViewName,
              }
            )}</strong>`,
          }}
        />
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
}

export default observer(MainChallengingBadgeContainer);
