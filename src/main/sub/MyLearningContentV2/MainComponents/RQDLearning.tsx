import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Button, Icon } from 'semantic-ui-react';
import { NoSuchContentPanel } from 'shared';
import { Lecture } from 'lecture';
import { ContentWrapper } from '../MyLearningContentElementsView';
import ReactGA from 'react-ga';
import {
  findRequiredLearning,
  findCardFromCardBundle,
} from '../../../../lecture/detail/api/cardApi';
import { CardWithCardRealtedCount } from '../../../../lecture/model/CardWithCardRealtedCount';
import CardView from '../../../../lecture/shared/Lecture/ui/view/CardVIew';
import CardGroup, {
  GroupType,
} from '../../../../lecture/shared/Lecture/sub/CardGroup';
import { Area } from 'tracker/model';

interface Props extends RouteComponentProps {
  profileMemberName?: string;
}

const RQDLearning: React.FC<Props> = function RQDLearning({ history }) {
  const [cardList, setCardList] = useState<CardWithCardRealtedCount[]>([]);
  const [title] = useState('Deep Change를 위한 권장과정');

  const fetchCardList = async () => {
    const cardIds = await findRequiredLearning();

    if (cardIds) {
      const cardList = await findCardFromCardBundle(cardIds, 8, false);

      if (cardList !== undefined) {
        setCardList(cardList);
      }
    }
  };

  useEffect(() => {
    fetchCardList();
  }, []);

  const onViewAll = () => {
    window.sessionStorage.setItem('from_main', 'TRUE');

    history.push(`/my-training/learning/Required/pages/1`);

    // react-ga event
    ReactGA.event({
      category: '권장 과정',
      action: 'Click',
      label: '권장 과정 전체보기',
    });
  };

  if (cardList.length === 0) {
    return null;
  }

  return (
    <ContentWrapper dataArea={Area.MAIN_REQUIRED}>
      <div className="section-head">
        <strong>{title}</strong>
        <div className="right">
          <Button icon className="right btn-blue" onClick={onViewAll}>
            View all <Icon className="morelink" />
          </Button>
        </div>
      </div>
      <Lecture.Group type={Lecture.GroupType.Line} dataActionName={title}>
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
                  dataArea={Area.MAIN_REQUIRED}
                  langSupports={card.langSupports}
                />
              </CardGroup>
            </li>
          );
        })}
      </Lecture.Group>
    </ContentWrapper>
  );
};

export default withRouter(RQDLearning);
