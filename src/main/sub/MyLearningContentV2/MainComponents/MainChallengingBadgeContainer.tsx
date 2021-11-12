import React, { useCallback, useEffect, useMemo } from 'react';
import { observer } from 'mobx-react';
import { Button, Segment } from 'semantic-ui-react';
import certificationRoutes from 'certification/routePaths';
import ReactGA from 'react-ga';
import { MyBadgeRdo } from '../../../../certification/model/MyBadgeRdo';
import { MyBadge } from '../../../../certification/model/MyBadge';
import { Area } from 'tracker/model';
import { getPolyglotText } from '../../../../shared/ui/logic/PolyglotText';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { getDefaultLang } from 'lecture/model/LangSupport';
import { BadgeService } from 'lecture/stores';
import { useHistory } from 'react-router-dom';
import { SkProfileService } from 'profile/stores';
import { useBadgeLearningTimeItem } from '../../PersonalBoard/store/PersonalBoardStore';

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

  return (
    <Segment
      className="full learning-section badge-section type4"
      dataArea={Area.MAIN_BADGE}
    >
      <div className="section-head">
        <div
          className="sec-tit-txt"
          dangerouslySetInnerHTML={{
            __html: `${getPolyglotText(
              '<strong>{name}님</strong>이<br /> 도전중인 Badge',
              'home-ChallengeBadges-Title',
              {
                name: profileViewName,
              }
            )}`,
          }}
        />
        <div className="badge-listbox">
          <div className="badge-list-wrap">
            {challengeBadges.map((badge: MyBadge, index: number) => {
              return (
                <a className="badge-col-list" key={badge.id}>
                  {/* 아래 아이콘('.cate-icon')의 bg컬러를 카테고리별 벳지컬러에 맞춰주시면 됩니다(어드민 내 테마 컬러) */}
                  <div className="badge-col cate-sign">
                    <i
                      aria-hidden="true"
                      className="icon cate-icon"
                      style={{
                        backgroundColor: badge.badgeCategory.themeColor,
                      }}
                    />
                  </div>
                  <div className="badge-col cate">
                    {parsePolyglotString(badge.badgeCategory.name)}
                  </div>
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
        <div className="badge-banner-wrap">
          <div className="badge-txt-box">
            <div className="badge-txt">
              지금까지 총 <strong>{badgeMyCount}개</strong>의 뱃지를 <br />
              획득하셨어요!
            </div>
            <Button className="btn-badge-go">새로운 뱃지 도전하기!</Button>
          </div>
        </div>
      </div>
    </Segment>
  );
}

export default observer(MainChallengingBadgeContainer);
