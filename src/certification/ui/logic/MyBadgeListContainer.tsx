/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { useHistory } from 'react-router';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import BadgeService from '../../present/logic/BadgeService';
import { NoSuchContentPanel } from '../../../shared';
import BadgeStyle from '../model/BadgeStyle';
import BadgeSize from '../model/BadgeSize';
import BadgeCountText from '../model/BadgeCountText';
import LineHeaderContainer from './LineHeaderContainer';
import BadgeRoutePaths from '../../routePaths';
import { BadgeLevel } from '../../model/BadgeLevel';
import BadgeView from '../view/BadgeView';
import { useRequestMyBadges } from '../../service/useRequestMyBadges';
import { MyBadge } from '../../model/MyBadge';
import MyBadgeModal from '../view/MyBadgeModal';
import { PolyglotText } from '../../../shared/ui/logic/PolyglotText';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { getDefaultLang } from 'lecture/model/LangSupport';

interface MyBadgeListContainerProps {
  badgeService?: BadgeService;
}

function MyBadgeListContainer({ badgeService }: MyBadgeListContainerProps) {
  const { myBadges, myBadgeCount, selectedLevel, setSelectedLevel } =
    badgeService!;

  const history = useHistory();
  useRequestMyBadges();

  const onSelectLevel = useCallback((level: BadgeLevel) => {
    setSelectedLevel(level);
  }, []);

  const moveToBadgeList = useCallback(() => {
    history.push(BadgeRoutePaths.badgeTab());
  }, []);

  return (
    <>
      <LineHeaderContainer
        totalCount={myBadgeCount}
        countMessage={BadgeCountText.EarnedBadgeList}
        selectedLevel={selectedLevel}
        onSelectLevel={onSelectLevel}
      />
      <div className="badge-list-type list-wrapper">
        <ul>
          {(myBadges &&
            myBadges.length > 0 &&
            myBadges.map((myBadge: MyBadge, index: number) => {
              return (
                <li key={`my-badge-${index}`}>
                  <BadgeView
                    id={myBadge.id}
                    name={parsePolyglotString(
                      myBadge.name,
                      getDefaultLang(myBadge.langSupport)
                    )}
                    level={myBadge.level}
                    iconUrl={myBadge.iconUrl}
                    categoryId={myBadge.categoryId}
                    badgeStyle={BadgeStyle.List}
                    badgeSize={BadgeSize.Small}
                  />
                  <div className="badge-name">
                    <span>
                      {parsePolyglotString(
                        myBadge.name,
                        getDefaultLang(myBadge.langSupport)
                      )}
                    </span>
                  </div>
                  <MyBadgeModal myBadge={myBadge} />
                </li>
              );
            })) || (
            <NoSuchContentPanel
              message={
                <>
                  <div className="text">
                    <PolyglotText
                      id="mapg-mabd-뱃지없음"
                      defaultString="획득한 Badge가 없습니다."
                    />
                    <br />
                    <PolyglotText
                      id="mapg-mabd-뱃지도전"
                      defaultString="등록된 Badge 리스트에서 원하는 Badge에 도전해보세요."
                    />
                  </div>
                  <Button
                    icon
                    as="a"
                    className="right btn-blue2"
                    onClick={moveToBadgeList}
                  >
                    <span className="border">
                      <PolyglotText
                        id="mapg-mabd-목록없음"
                        defaultString="Badge List 바로가기"
                      />
                    </span>
                    <Icon className="morelink" />
                  </Button>
                </>
              }
            />
          )}
        </ul>
      </div>
    </>
  );
}

export default inject(mobxHelper.injectFrom('badge.badgeService'))(
  observer(MyBadgeListContainer)
);
