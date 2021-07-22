import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Button, Icon } from 'semantic-ui-react';
import ReactGA from 'react-ga';
import { NoSuchContentPanel, Loadingpanel } from 'shared';
import { Lecture } from 'lecture';
import { ContentWrapper } from '../MyLearningContentElementsView';
import LectureFilterRdoModel from '../../../../lecture/model/LectureFilterRdoModel';
import CardView from '../../../../lecture/shared/Lecture/ui/view/CardVIew';
import { EnrollingCardList } from '../../../../lecture/model/EnrollingCardList';
import { findEnrollingCardList } from '../../../../lecture/detail/api/cardApi';
import CardGroup, {
  GroupType,
} from '../../../../lecture/shared/Lecture/sub/CardGroup';
import isIncludeCineroomId from '../../../../shared/helper/isIncludeCineroomId';
import { Area } from 'tracker/model';
import { getPolyglotText, PolyglotText } from '../../../../shared/ui/logic/PolyglotText';

function EnrollingLearning({ history }: RouteComponentProps) {
  const [cardList, setCardList] = useState<EnrollingCardList[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [title] = useState(getPolyglotText('수강 신청 과정 모아보기', 'home-Enrolling-Title'));

  useEffect(() => {
    fetchLearningCardLsit().then(() => setIsLoading(true));
  }, []);

  const fetchLearningCardLsit = async () => {
    const EnrollingCardList = await findEnrollingCardList(
      LectureFilterRdoModel.enrLectures(8, 0, false)
    );

    setCardList(EnrollingCardList.results);
  };

  const onViewAll = () => {
    window.sessionStorage.setItem('from_main', 'TRUE');
    history.push(`/my-training/new-learning/Enrolling/pages/1`);

    // react-ga event
    ReactGA.event({
      category: title,
      action: 'Click',
      label: '수강 신청 과정 전체보기',
    });
  };

  return (
    <ContentWrapper dataArea={Area.MAIN_ENROLLING}>
      <div className="section-head">
        {cardList && cardList.length > 0 && <strong>{title}</strong>}
        <div className="right">
          {cardList && cardList.length > 0 && (
            <Button icon className="right btn-blue" onClick={onViewAll}>
              <PolyglotText defaultString="View all" id="home-Enrolling-View all" />
              <Icon className="morelink" />
            </Button>
          )}
        </div>
      </div>
      {cardList && cardList.length > 0 ? (
        <Lecture.Group type={Lecture.GroupType.Line} dataActionName={title}>
          {cardList.map((item, i) => {
            const { card, cardRelatedCount, upcomingClassroomInfo } = item;

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
                    starCount={cardRelatedCount.starCount}
                    passedStudentCount={cardRelatedCount.passedStudentCount}
                    studentCount={upcomingClassroomInfo.studentCount}
                    remainingDayCount={upcomingClassroomInfo.remainingDayCount}
                    capacity={upcomingClassroomInfo.capacity}
                    dataArea={Area.MAIN_ENROLLING}
                  />
                </CardGroup>
              </li>
            );
          })}
        </Lecture.Group>
      ) : (
        <>
          <Loadingpanel loading={isLoading} color="#eff0f1" />
          {!isLoading && (
            <NoSuchContentPanel
              message={<div className="text"><PolyglotText defaultString="수강 신청 과정이 없습니다." id="home-Enrolling-목록없음" /></div>}
            />
          )}
        </>
      )}
    </ContentWrapper>
  );
}

export default withRouter(EnrollingLearning);
