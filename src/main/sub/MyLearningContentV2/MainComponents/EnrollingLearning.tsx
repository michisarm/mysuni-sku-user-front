import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Icon, Segment } from 'semantic-ui-react';
import ReactGA from 'react-ga';
import { Loadingpanel } from 'shared';
import { Lecture } from 'lecture';
import { ContentWrapper } from '../MyLearningContentElementsView';
import LectureFilterRdoModel from '../../../../lecture/model/LectureFilterRdoModel';
import CardView from '../../../../lecture/shared/Lecture/ui/view/CardVIew';
import { EnrollingCardList } from '../../../../lecture/model/EnrollingCardList';
import { findEnrollingCardList } from '../../../../lecture/detail/api/cardApi';
import CardGroup, {
  GroupType,
} from '../../../../lecture/shared/Lecture/sub/CardGroup';
import { Area } from 'tracker/model';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../../shared/ui/logic/PolyglotText';

function EnrollingLearning() {
  const history = useHistory();
  const [cardList, setCardList] = useState<EnrollingCardList[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [title] = useState(
    getPolyglotText('수강 신청 과정 모아보기', 'home-Enrolling-Title')
  );

  useEffect(() => {
    fetchEnrollingCardList();
  }, []);

  const fetchEnrollingCardList = async () => {
    setIsLoading(true);
    const enrollingCardList = await findEnrollingCardList(
      LectureFilterRdoModel.enrLectures(8, 0, false)
    );
    setIsLoading(false);
    setCardList(enrollingCardList.results);
  };

  const onViewAll = () => {
    window.sessionStorage.setItem('from_main', 'TRUE');
    history.push(`/my-training/new-learning/Enrolling/pages/1`);

    ReactGA.event({
      category: title,
      action: 'Click',
      label: '수강 신청 과정 전체보기',
    });
  };

  return (
    <ContentWrapper dataArea={Area.MAIN_ENROLLING}>
      <div className="section-head">
        {isLoading === true ||
          (isLoading === false && cardList && cardList.length > 0 && (
            <strong>{title}</strong>
          ))}
        <div className="right">
          {cardList && cardList.length > 0 && (
            <Button icon className="right btn-blue" onClick={onViewAll}>
              <PolyglotText
                defaultString="View all"
                id="home-Enrolling-View all"
              />
              <Icon className="morelink" />
            </Button>
          )}
        </div>
      </div>
      {(cardList && cardList.length > 0 && (
        <>
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
                      remainingDayCount={
                        upcomingClassroomInfo.remainingDayCount
                      }
                      capacity={upcomingClassroomInfo.capacity}
                      dataArea={Area.MAIN_ENROLLING}
                      langSupports={card.langSupports}
                    />
                  </CardGroup>
                </li>
              );
            })}
          </Lecture.Group>
        </>
      )) || (
        <>
          {isLoading === true && (
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
            </Segment>
          )}
        </>
      )}
    </ContentWrapper>
  );
}

export default EnrollingLearning;
