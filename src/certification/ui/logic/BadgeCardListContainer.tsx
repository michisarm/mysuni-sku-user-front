import React, { useState, useEffect, useCallback } from 'react';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import ReactGA from 'react-ga';
import { BadgeCardService } from '../../stores';
import CardStudentService from '../../present/logic/CardStudentService';
import BadgeCardView from '../view/BadgeCardView';


interface BadgeCardListContainerProps {
  badgeCardService?: BadgeCardService;
  cardStudentService?: CardStudentService;
}

function BadgeCardListContainer({
  badgeCardService,
  cardStudentService,
}: BadgeCardListContainerProps) {
  const { badgeCards } = badgeCardService!;
  const { passedCardIdMap } = cardStudentService!;

  const [splitUrl, setSplitUrl] = useState<string>();

  useEffect(() => {
    const badgeName = window.location.pathname.split('/');
    const splitUrlName = badgeName[badgeName.length - 1];
    setSplitUrl(splitUrlName);
  },[])

  const onClickCardGA = useCallback((name: string): void => {
    ReactGA.event({
      category: `Badge_${splitUrl}`,
      action: 'Click Card',
      label: `${name}`
    })
  }, []);

  
  return (
    <div className="course-cont">
      {
        badgeCards &&
        badgeCards.length > 0 && 
        badgeCards.map((badgeCard, index) => {
          const cardName = `${index + 1}. ${badgeCard.card.name}`;
          const cubeCount = badgeCard.cubeCount < 10 ? `0${badgeCard.cubeCount}` : `${badgeCard.cubeCount}`;
          const isPassed = passedCardIdMap.get(badgeCard.card.id) || false;

          return (
            <div className="course-box type2" key={`course-box-${index}`} onClick={() => onClickCardGA(badgeCard.card.name)}>
              <BadgeCardView
                cardId={badgeCard.card.id}
                cardName={cardName}
                cubeCount={cubeCount}
                isPassed={isPassed}
              />
            
            </div>
          );
        }) || (
          <div>학습정보가 존재하지 않습니다.</div>
        )
      }
    </div>
  );
}

export default inject(mobxHelper.injectFrom(
  'badge.badgeCardService',
  'lecture.cardStudentService',
))(observer(BadgeCardListContainer));