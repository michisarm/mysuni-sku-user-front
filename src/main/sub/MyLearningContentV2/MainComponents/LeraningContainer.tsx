import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { observer, inject } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import { Button, Icon, ButtonProps } from 'semantic-ui-react';
import { NoSuchContentPanel } from 'shared';
import myTrainingRoutes from 'myTraining/routePaths';
import { Lecture } from 'lecture';
import { ContentWrapper } from '../MyLearningContentElementsView';
import ReactGA from 'react-ga';
import { findCardList } from '../../../../lecture/detail/api/cardApi';
import { CardBundle } from '../../../../lecture/shared/model/CardBundle';
import { CardWithCardRealtedCount } from '../../../../lecture/model/CardWithCardRealtedCount';
import CardView from '../../../../lecture/shared/Lecture/ui/view/CardVIew';
import CardGroup, {
  GroupType,
} from '../../../../lecture/shared/Lecture/sub/CardGroup';
import { useRequestCollege } from '../../../../shared/service/useCollege/useRequestCollege';
import LectureParams, {
  toPath,
} from '../../../../lecture/detail/viewModel/LectureParams';
import isIncludeCineroomId from '../../../../shared/helper/isIncludeCineroomId';
import { CardCategory } from 'shared/model/CardCategory';

interface Props extends RouteComponentProps {
  profileMemberName?: string;
  cardBundle: CardBundle;
}

const LearningContainer: React.FC<Props> = function LearningContainer({
  cardBundle,
  history,
}) {
  // collegeName, channelName 을 불러오는 api를 호출하여 stroe에 저장한다.
  useRequestCollege();

  const [cardList, setCardList] = useState<CardWithCardRealtedCount[]>([]);

  const fetchCardList = async () => {
    if (cardBundle.cardIds) {
      const joinedIds = cardBundle.cardIds.join();

      const cardList = await findCardList(joinedIds);

      if (cardList !== undefined) {
        setCardList(cardList);
      }
    }
  };

  useEffect(() => {
    fetchCardList();
  }, []);

  const onViewAll = () => {
    //
    // actionLogService?.registerClickActionLog({ subAction: 'View all' });
    const { type } = cardBundle;

    window.sessionStorage.setItem('from_main', 'TRUE');

    switch (type) {
      case 'Normal':
        history.push(myTrainingRoutes.learningNewLecture());
        break;
      case 'New':
        history.push(myTrainingRoutes.learningNewLecture());
        break;
      case 'Popular':
        history.push(myTrainingRoutes.learningPopLecture());
        break;
      case 'Recommended':
        history.push(myTrainingRoutes.learningRqdLecture());
        break;
    }

    // react-ga event
    ReactGA.event({
      category: type,
      action: 'Click',
      label: `${type} 전체보기`,
    });
  };

  const onViewDetail = (_: React.MouseEvent, data: ButtonProps) => {
    const { id } = data;

    // react-ga event
    ReactGA.event({
      category: '메인_신규',
      action: 'Click Card',
      // label: `${model.serviceType === 'Course' ? '(Course)' : '(Cube)'} - ${
      //   model.name
      // }`,
    });

    const params: LectureParams = {
      cardId: id,
      viewType: 'view',
    };

    history.push(toPath(params));
  };

  return (
    <ContentWrapper>
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
            const isRequired = card.permittedCinerooms
              ? isIncludeCineroomId(card.permittedCinerooms)
              : false;
            console.log(isRequired);

            return (
              <li key={i}>
                <CardGroup type={GroupType.Box}>
                  <CardView
                    cardId={item.card.id}
                    isRequired={isRequired}
                    learningTime={card.learningTime}
                    thumbImagePath={card.thumbImagePath}
                    mainCategory={card.mainCategory}
                    name={card.name}
                    stampCount={card.stampCount}
                    description={card.description}
                    passedStudentCount={cardRelatedCount.passedStudentCount}
                    starCount={cardRelatedCount.starCount}
                    onViewDetail={onViewDetail}
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
