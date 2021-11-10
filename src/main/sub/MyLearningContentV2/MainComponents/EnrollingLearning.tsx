import { LectureCardView } from '@sku/skuniv-ui-lecture-card';
import { Area } from '@sku/skuniv-ui-lecture-card/lib/views/lectureCard.models';
import { Lecture } from 'lecture';
import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import { useHistory } from 'react-router-dom';
import { Button, Icon, Segment } from 'semantic-ui-react';
import { Loadingpanel } from 'shared';
import { findEnrollingCardList } from '../../../../lecture/detail/api/cardApi';
import { EnrollingCardList } from '../../../../lecture/model/EnrollingCardList';
import LectureFilterRdoModel from '../../../../lecture/model/LectureFilterRdoModel';
import CardGroup, {
  GroupType,
} from '../../../../lecture/shared/Lecture/sub/CardGroup';
import { SkProfileService } from '../../../../profile/stores';
import isIncludeCineroomId from '../../../../shared/helper/isIncludeCineroomId';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../../shared/ui/logic/PolyglotText';
import { parsePolyglotString } from '../../../../shared/viewmodel/PolyglotString';
import { ContentWrapper } from '../MyLearningContentElementsView';
import Swiper from 'react-id-swiper';

const SwiperProps = {
  slidesPerView: 3,
  spaceBetween: 7,
  slidesPerGroup: 3,
  loop: false,
  loopFillGroupWithBlank: true,
  navigation: {
    nextEl: '.' + 'swiperCommend' + ' .swiper-button-next',
    prevEl: '.' + 'swiperCommend' + ' .swiper-button-prev',
  },
  speed: 500,
};

function EnrollingLearning() {
  const history = useHistory();
  const [cardList, setCardList] = useState<EnrollingCardList[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [title] = useState(
    getPolyglotText('수강 신청 과정 모아보기', 'home-Enrolling-Title')
  );
  const userLanguage = SkProfileService.instance.skProfile.language;

  useEffect(() => {
    fetchEnrollingCardList();
  }, []);

  const fetchEnrollingCardList = async () => {
    setIsLoading(true);
    const enrollingCardList = await findEnrollingCardList(
      LectureFilterRdoModel.enrLectures(8, 0, false)
    );

    const endCard: EnrollingCardList[] = [];
    const cardList: EnrollingCardList[] = [];

    // 정원 마감인 경우 맨 뒤로 보내기
    enrollingCardList?.results.forEach((enrollingCardList) => {
      if (
        enrollingCardList.upcomingClassroomInfo &&
        enrollingCardList.upcomingClassroomInfo.studentCount >=
          enrollingCardList.upcomingClassroomInfo.capacity
      ) {
        endCard.push(enrollingCardList);
      } else {
        cardList.push(enrollingCardList);
      }
    });

    cardList.push(...endCard);
    enrollingCardList.results = cardList;

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
    <Segment
      className="full learning-section type1"
      dataArea={Area.MAIN_ENROLLING}
    >
      <div className="section-head">
        <div className="sec-tit-txt">
          <strong>수강신청 임박</strong>한 과정
        </div>
        <div className="sec-tit-btn">
          <button className="btn-more" onClick={onViewAll}>
            전체보기
          </button>
        </div>
      </div>

      <div className="section-body">
        <div className="cardSwiper">
          <Swiper {...SwiperProps}>
            {cardList &&
              cardList.map((card, i) => {
                return (
                  <CardGroup type={GroupType.Wrap} key={card.id}>
                    <LectureCardView
                      cardId={card.id}
                      cardName={parsePolyglotString(card.name)}
                      learningTime={String(card.learningTime)}
                      thumbnailImagePath={card.thumbImagePath}
                      difficultyLevel={card.difficultyLevel}
                      passedStudentCount={String(card.passedStudentCount)}
                      starCount={String(card.starCount)}
                      simpleDescription={parsePolyglotString(
                        card.simpleDescription
                      )}
                      studentCount={card.studentCount}
                      userLanguage={userLanguage}
                      langSupports={card.langSupports}
                      collegeId={card.mainCollegeId}
                      isRequiredLecture={card.required}
                      upcomingClassroomInfo={card.upcomingClassroomInfo}
                      dataArea={Area.MAIN_ENROLLING}
                      useBookMark
                    />
                  </CardGroup>
                );
              })}
          </Swiper>
          <div className="swiperRequired">
            <div className="swiper-button-prev" />
            <div className="swiper-button-next" />
          </div>
        </div>
      </div>
    </Segment>

    // <ContentWrapper dataArea={Area.MAIN_ENROLLING}>
    //   <div className="section-head">
    //     {isLoading ||
    //       (!isLoading && cardList && cardList.length > 0 && (
    //         <strong>{title}</strong>
    //       ))}
    //     <div className="right">
    //       {cardList && cardList.length > 0 && (
    //         <Button icon className="right btn-blue" onClick={onViewAll}>
    //           <PolyglotText
    //             defaultString="View all"
    //             id="home-Enrolling-View all"
    //           />
    //           <Icon className="morelink" />
    //         </Button>
    //       )}
    //     </div>
    //   </div>
    //   {(cardList && cardList.length > 0 && (
    //     <>
    //       <Lecture.Group type={Lecture.GroupType.Line} dataActionName={title}>
    //         {cardList.map((card, i) => {
    //           return (
    //             <li key={i}>
    //               <CardGroup type={GroupType.Box}>
    //                 <LectureCardView
    //                   cardId={card.id}
    //                   cardName={parsePolyglotString(card.name)}
    //                   learningTime={String(card.learningTime)}
    //                   thumbnailImagePath={card.thumbImagePath}
    //                   difficultyLevel={card.difficultyLevel}
    //                   passedStudentCount={String(card.passedStudentCount)}
    //                   starCount={String(card.starCount)}
    //                   simpleDescription={parsePolyglotString(
    //                     card.simpleDescription
    //                   )}
    //                   studentCount={card.studentCount}
    //                   userLanguage={userLanguage}
    //                   langSupports={card.langSupports}
    //                   collegeId={card.mainCollegeId}
    //                   isRequiredLecture={card.required}
    //                   upcomingClassroomInfo={card.upcomingClassroomInfo}
    //                   dataArea={Area.MAIN_ENROLLING}
    //                   useBookMark
    //                 />
    //               </CardGroup>
    //             </li>
    //           );
    //         })}
    //       </Lecture.Group>
    //     </>
    //   )) || (
    //     <>
    //       {isLoading === true && (
    //         <Segment
    //           style={{
    //             paddingTop: 0,
    //             paddingBottom: 0,
    //             paddingLeft: 0,
    //             paddingRight: 0,
    //             height: 400,
    //             boxShadow: '0 0 0 0',
    //             border: 0,
    //           }}
    //         >
    //           <Loadingpanel loading={isLoading} color="#eff0f1" />
    //         </Segment>
    //       )}
    //     </>
    //   )}
    // </ContentWrapper>
  );
}

export default EnrollingLearning;
