import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { observer, inject } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import { Button, Icon } from 'semantic-ui-react';
import { NoSuchContentPanel } from 'shared';
import { Lecture } from 'lecture';
import { ContentWrapper } from '../MyLearningContentElementsView';
import ReactGA from 'react-ga';
import { firndCardFromCardBundle } from '../../../../lecture/detail/api/cardApi';
import { CardBundle } from '../../../../lecture/shared/model/CardBundle';
import { CardWithCardRealtedCount } from '../../../../lecture/model/CardWithCardRealtedCount';
import CardView from '../../../../lecture/shared/Lecture/ui/view/CardVIew';
import CardGroup, {
  GroupType,
} from '../../../../lecture/shared/Lecture/sub/CardGroup';
import { Area } from 'tracker/model';

interface Props extends RouteComponentProps {
  profileMemberName?: string;
  cardBundle: CardBundle;
}

const LearningContainer: React.FC<Props> = function LearningContainer({
  cardBundle,
  history,
}) {
  const [dataArea, setDataArea] = useState<Area>();
  const [cardList, setCardList] = useState<CardWithCardRealtedCount[]>([]);
  const isRecommend = cardBundle.type === 'Recommended';

  const fetchCardList = async () => {
    if (cardBundle.cardIds) {
      const cardList = await firndCardFromCardBundle(
        cardBundle.cardIds,
        8,
        isRecommend
      );

      if (cardList !== undefined) {
        setCardList(cardList);
      }
    }
  };

  useEffect(() => {
    fetchCardList();
  }, []);

  const onViewAll = () => {
    const { id, type } = cardBundle;

    window.sessionStorage.setItem('from_main', 'TRUE');

    history.push(`/my-training/new-learning/${id}/pages/1`);

    // react-ga event
    ReactGA.event({
      category: type,
      action: 'Click',
      label: `${type} 전체보기`,
    });
  };

  useEffect(() => {
    const { type } = cardBundle;
    switch (type) {
      case 'Normal':
        setDataArea(Area.MAIN_NORMAL);
        break;
      case 'New':
        setDataArea(Area.MAIN_NEW);
        break;
      case 'Popular':
        setDataArea(Area.MAIN_POPULAR);
        break;
      case 'Recommended':
        setDataArea(Area.MAIN_RECOMMEND);
        break;
    }
  }, [cardBundle]);

  if (cardList.length === 0 && isRecommend) {
    return null;
  }

  return (
    <ContentWrapper dataArea={dataArea}>
      <div className="section-head">
        <strong>{cardBundle?.displayText}</strong>
        <div className="right">
          {cardList.length > 0 && (
            <Button icon className="right btn-blue" onClick={onViewAll}>
              View all <Icon className="morelink" />
            </Button>
          )}
        </div>
      </div>
      {cardList.length > 0 ? (
        <Lecture.Group type={Lecture.GroupType.Line}>
          {cardList.map((item, i) => {
            const { card, cardRelatedCount } = item;

            return (
              <li key={i}>
                <CardGroup type={GroupType.Box}>
                  <CardView
                    cardId={item.card.id}
                    permittedCinerooms={card.permittedCinerooms}
                    learningTime={card.learningTime}
                    additionalLearningTime={card.additionalLearningTime}
                    thumbImagePath={card.thumbImagePath}
                    mainCategory={card.mainCategory}
                    name={card.name}
                    stampCount={card.stampCount}
                    simpleDescription={card.simpleDescription}
                    type={card.type}
                    passedStudentCount={cardRelatedCount.passedStudentCount}
                    starCount={cardRelatedCount.starCount}
                  />
                </CardGroup>
              </li>
            );
          })}
        </Lecture.Group>
      ) : (
        <NoSuchContentPanel
          message={
            <div className="text">
              {cardBundle.displayText}에 해당하는 학습 과정이 없습니다.
            </div>
          }
        />
      )}
    </ContentWrapper>
  );
};

export default inject(
  mobxHelper.injectFrom(
    // 'shared.actionLogService',
    'shared.reviewService',
    'newLecture.newLectureService',
    'myTraining.inMyLectureService'
  )
)(withRouter(observer(LearningContainer)));
