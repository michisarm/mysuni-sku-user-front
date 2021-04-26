import React, { useCallback } from 'react';
import { Icon } from 'semantic-ui-react';
import classNames from 'classnames';
import { useHistory } from 'react-router';
import { dateTimeHelper } from 'shared';
import Image from 'shared/components/Image';
import { ChallengeBadgeTitle } from '../view/ChallengeBoxElementsView';
import { useScrollMove } from 'myTraining/useScrollMove';
import { CardWithLearningContentCountRom } from '../../../lecture/model/CardWithLearningContentCountRom';
import LectureParams, {
  toPath,
} from '../../../lecture/detail/viewModel/LectureParams';
import { getBadgeCategoryName } from '../../service/useRequestBadgeCategory';

interface BadgeCompRightProps {
  name: string;
  categoryId: string;
  badgeCards: CardWithLearningContentCountRom[];
  passedCardIdMap: Map<string, boolean>;
}

export default function BadgeCompRight({
  name,
  categoryId,
  badgeCards,
  passedCardIdMap,
}: BadgeCompRightProps) {
  const history = useHistory();
  const { scrollSave } = useScrollMove();

  const moveToCardPage = useCallback((e: any, cardId: string) => {
    e.preventDefault();
    scrollSave();

    const params: LectureParams = {
      cardId,
      viewType: 'view',
      pathname: '',
    };

    history.push(toPath(params));
  }, []);

  return (
    <div className="right-area">
      <ChallengeBadgeTitle
        mainCategoryName={getBadgeCategoryName(categoryId)}
        name={name}
      />
      <div className="challenge-list">
        <ul>
          {badgeCards &&
            badgeCards.length > 0 &&
            badgeCards.map((badgeCard, index) => {
              const { card } = badgeCard;
              const isPassed = passedCardIdMap.get(card.id);
              const formattedLearningTime = dateTimeHelper.timeToHourMinuteFormat(
                card.learningTime
              );

              return (
                <li
                  className={classNames(
                    'class-card',
                    isPassed ? 'completed' : ''
                  )}
                  key={`challenge-badge-card-${index}`}
                >
                  <a
                    href="#"
                    onClick={e => {
                      moveToCardPage(e, card.id);
                      e.preventDefault();
                    }}
                  >
                    <span className="class-icon">
                      <Image src={card.thumbImagePath} clasName="ui image" />
                    </span>
                    <span className="title">{card.name}</span>
                    <span className="time">
                      <Icon className="card-time16" />
                      {` ${formattedLearningTime}`}
                    </span>
                  </a>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
