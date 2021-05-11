import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Button, Icon, Segment } from 'semantic-ui-react';
import ReactGA from 'react-ga';
import { NoSuchContentPanel, Loadingpanel } from 'shared';
import { Lecture } from 'lecture';
import { ContentWrapper } from '../MyLearningContentElementsView';
import CardView from '../../../../lecture/shared/Lecture/ui/view/CardVIew';
import { CardWithCardRealtedCount } from '../../../../lecture/model/CardWithCardRealtedCount';
import { findMyLatestLearningCards } from '../../../../lecture/detail/api/cardApi';
import CardGroup, {
  GroupType,
} from '../../../../lecture/shared/Lecture/sub/CardGroup';
import isIncludeCineroomId from '../../../../shared/helper/isIncludeCineroomId';
import { Area } from 'tracker/model';

interface Props extends RouteComponentProps {
  profileMemberName: string;
}

function InProgressLearning({ profileMemberName, history }: Props) {
  const [cardList, setCardList] = useState<CardWithCardRealtedCount[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [title] = useState(`${profileMemberName}님이 학습중인 과정`);

  useEffect(() => {
    setIsLoading(true);
    fetchLearningCardLsit();
  }, []);

  const fetchLearningCardLsit = async () => {
    const learningCardList = await findMyLatestLearningCards(8);
    setCardList(learningCardList);
    setIsLoading(false);
  };

  const onViewAll = () => {
    history.push('/my-training/learning/InProgress/pages/1');

    // react-ga event
    ReactGA.event({
      category: '학습중인 과정',
      action: 'Click',
      label: '학습중인 과정 전체보기',
    });
  };

  return (
    <ContentWrapper dataArea={Area.MAIN_LEARNING}>
      <div className="section-head">
        <strong>{title}</strong>
        <div className="right">
          {cardList && cardList.length > 0 && (
            <Button icon className="right btn-blue" onClick={onViewAll}>
              View all <Icon className="morelink" />
            </Button>
          )}
        </div>
      </div>
      {cardList && cardList.length > 0 ? (
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
                    dataArea={Area.MAIN_LEARNING}
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
        <Segment
          style={{
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 0,
            paddingRight: 0,
            height: 400,
            boxShadow: '0 0 0 0',
            border: 0,
          }}
        >
          <Loadingpanel loading={isLoading} color="#eff0f1" />
          {!isLoading && (
            <NoSuchContentPanel
              message={
                <>
                  <div className="text">진행중인 학습 과정이 없습니다.</div>
                  <Button
                    icon
                    as="a"
                    className="right btn-blue2"
                    onClick={onViewAll}
                  >
                    <span className="border">
                      <span className="ellipsis">{profileMemberName}</span> 님이
                      학습 중인 과정 보기
                    </span>
                    <Icon className="morelink" />
                  </Button>
                </>
              }
            />
          )}
        </Segment>
      )}
    </ContentWrapper>
  );
}

export default withRouter(InProgressLearning);
