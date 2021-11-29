import React, { useCallback, useEffect, useMemo } from 'react';
import { observer } from 'mobx-react';
import { Button, Segment } from 'semantic-ui-react';
import certificationRoutes from 'certification/routePaths';
import ReactGA from 'react-ga';
import { MyBadgeRdo } from '../../../../certification/model/MyBadgeRdo';
import { MyBadge } from '../../../../certification/model/MyBadge';
import { Area } from 'tracker/model';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../../shared/ui/logic/PolyglotText';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { getDefaultLang } from 'lecture/model/LangSupport';
import { BadgeService } from 'lecture/stores';
import { NavLink, useHistory } from 'react-router-dom';
import { SkProfileService } from 'profile/stores';
import { useBadgeLearningTimeItem } from '../../PersonalBoard/store/PersonalBoardStore';
import certificationPaths from 'certification/routePaths';
import badgeRoutePaths from 'certification/routePaths';
import { requestBadgeLearningTime } from '../../PersonalBoard/service/getBadgeLearningTime';

function MainChallengingBadgeContainer() {
  const history = useHistory();

  const badgeService = BadgeService.instance;
  const { challengeBadges, allBadgeCount } = badgeService;
  const {
    skProfile: { profileViewName },
  } = SkProfileService.instance;

  useEffect(() => {
    const myBadgeRdo: MyBadgeRdo = {
      offset: 0,
      limit: 5,
    };
    badgeService.findAllChallengeBadges(myBadgeRdo);
    requestBadgeLearningTime(SkProfileService.instance.skProfile.companyCode);

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

  const badgeLearningTimeItem = useBadgeLearningTimeItem();
  const badgeMyCount = useMemo<number>(() => {
    return badgeLearningTimeItem?.badgeMyCount || 0;
  }, [badgeLearningTimeItem]);

  if (badgeMyCount === 0 && challengeBadges.length === 0) {
    return null;
  }

  return (
    <Segment
      className="full learning-section badge-section type4"
      data-area={Area.MAIN_BADGE}
    >
      <div className="section-head">
        <div
          className="sec-tit-txt"
          dangerouslySetInnerHTML={{
            __html: `${getPolyglotText(
              '<strong>도전중인 Badge</strong>',
              'main-challenge-badge'
            )}`,
          }}
        />
        <div className="badge-listbox">
          <div className="badge-list-wrap">
            {challengeBadges.length < 1 && (
              <div className="badge-no-data">
                <span>
                  <PolyglotText
                    id="home-ChallengeBadges-도전뱃지"
                    defaultString="도전중인 Badge가 없습니다."
                  />
                </span>
              </div>
            )}
            {challengeBadges.map((badge: MyBadge, index: number) => {
              return (
                <a
                  className="badge-col-list"
                  key={badge.id}
                  onClick={() => {
                    history.push(badgeRoutePaths.badgeDetailPage(badge.id));
                  }}
                >
                  {/* 아래 아이콘('.cate-icon')의 bg컬러를 카테고리별 벳지컬러에 맞춰주시면 됩니다(어드민 내 테마 컬러) */}
                  <div className="badge-col cate-sign">
                    {/*<i*/}
                    {/*  aria-hidden="true"*/}
                    {/*  className="icon cate-icon"*/}
                    {/*  style={{*/}
                    {/*    backgroundColor: badge.badgeCategory.themeColor,*/}
                    {/*  }}*/}
                    {/*/>*/}
                    <div
                      className="cate-icon"
                      style={{ borderColor: badge.badgeCategory.themeColor }}
                    >
                      <div
                        className="cate-icon2"
                        style={{ borderColor: badge.badgeCategory.themeColor }}
                      />
                    </div>
                  </div>
                  {/*<div className="badge-col cate">*/}
                  {/*  {parsePolyglotString(badge.badgeCategory.name)}*/}
                  {/*</div>*/}
                  <div className="badge-col name">
                    {parsePolyglotString(badge.name)}
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
      <div className="section-body">
        <div
          className={`badge-banner-wrap ${badgeMyCount === 0 && 'no-badge'}`}
        >
          <div className="badge-txt-box">
            {badgeMyCount > 0 && (
              <div
                className="badge-txt"
                dangerouslySetInnerHTML={{
                  __html: getPolyglotText(
                    '지금까지 총 <strong>{badgeMyCount}개</strong>의 뱃지를<br/>획득하셨어요!',
                    'main-issued-badge',
                    { badgeMyCount: badgeMyCount.toString() }
                  ),
                }}
              />
            )}
            {badgeMyCount === 0 && (
              <div
                className="badge-txt"
                dangerouslySetInnerHTML={{
                  __html: getPolyglotText(
                    '<div className="badge-txt-big"><strong>현재 획득한 뱃지가 없습니다.</strong></div><div className="badge-txt-sub">학습을 통해 뱃지를 획득하고 <br/>지식과 Skill을 인증 받으세요!</div>',
                    'main-noissued-badge',
                    { badgeMyCount: badgeMyCount.toString() }
                  ),
                }}
              />
            )}
            <NavLink
              to={certificationPaths.badge()}
              className="ui button btn-badge-go"
            >
              {badgeMyCount > 0 && (
                <PolyglotText
                  id="main-new-badge"
                  defaultString="새로운 뱃지 도전하기!"
                />
              )}
              {badgeMyCount === 0 && (
                <PolyglotText
                  id="main-badge-title2"
                  defaultString="뱃지 도전하기!"
                />
              )}
            </NavLink>
          </div>
        </div>
      </div>
    </Segment>
  );
}

export default observer(MainChallengingBadgeContainer);
