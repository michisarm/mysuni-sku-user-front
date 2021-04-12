import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { observer, inject } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import { Button, Icon } from 'semantic-ui-react';
import { NoSuchContentPanel } from 'shared';
import { Lecture } from 'lecture';
import { ContentWrapper } from '../MyLearningContentElementsView';
import ReactGA from 'react-ga';
import {
  findCardListCache,
  clearFindCardListCache,
} from '../../../../lecture/detail/api/cardApi';
import { CardBundle } from '../../../../lecture/shared/model/CardBundle';
import { CardWithCardRealtedCount } from '../../../../lecture/model/CardWithCardRealtedCount';
import CardView from '../../../../lecture/shared/Lecture/ui/view/CardVIew';
import CardGroup, {
  GroupType,
} from '../../../../lecture/shared/Lecture/sub/CardGroup';
import { useRequestCollege } from '../../../../shared/service/useCollege/useRequestCollege';
import isIncludeCineroomId from '../../../../shared/helper/isIncludeCineroomId';

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

      const cardList = await findCardListCache(joinedIds);

      if (cardList !== undefined) {
        setCardList(cardList);
      }
    }
  };

  useEffect(() => {
    fetchCardList();
    return () => {
      clearFindCardListCache();
    };
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
                    // 리본에 정원마감 또는 D-DAY, D-14 형식으로 표현 돼야 함
                    // 정원 마감 : capacity <= student_count
                    // D-DAY OR D-14 ... : 수강신청 마감일 - TODAY
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
