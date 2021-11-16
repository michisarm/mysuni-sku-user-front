import { LectureCardView } from '@sku/skuniv-ui-lecture-card';
import { Area } from '@sku/skuniv-ui-lecture-card/lib/views/lectureCard.models';
import { hoverTrack } from 'tracker/present/logic/ActionTrackService';
import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import { useHistory } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';
import { findEnrollingCardList } from '../../../../lecture/detail/api/cardApi';
import { EnrollingCardList } from '../../../../lecture/model/EnrollingCardList';
import LectureFilterRdoModel from '../../../../lecture/model/LectureFilterRdoModel';
import CardGroup, {
  GroupType,
} from '../../../../lecture/shared/Lecture/sub/CardGroup';
import { SkProfileService } from '../../../../profile/stores';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../../shared/ui/logic/PolyglotText';
import { parsePolyglotString } from '../../../../shared/viewmodel/PolyglotString';
import Swiper from 'react-id-swiper';
import { scrollSwiperHorizontalTrack } from 'tracker/present/logic/ActionTrackService';
import { timeToHourMinuteFormat } from '../../../../shared/helper/dateTimeHelper';

const SwiperProps = {
  slidesPerView: 4,
  spaceBetween: 7,
  slidesPerGroup: 4,
  loop: false,
  loopFillGroupWithBlank: true,
  navigation: {
    nextEl: '.swiperEnrolling .swiper-button-next',
    prevEl: '.swiperEnrolling .swiper-button-prev',
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

  const [swiper, updateSwiper] = useState<any>(null);
  useEffect(() => {
    if (swiper !== null) {
      const onSlideChangeHandler = () => onSlideChange(swiper);
      swiper.on('slideChange', onSlideChangeHandler);
      return () => {
        swiper.off('slideChange', onSlideChangeHandler);
      };
    }
  }, [onSlideChange, swiper]);
  function onSlideChange(swiper: any) {
    if (swiper && swiper.isEnd) {
      scrollSwiperHorizontalTrack({
        element: swiper.el,
        area: Area.MAIN_ENROLLING,
        scrollClassName: 'cardSwiper',
        actionName: '메인카드 스크롤',
      });
    }
  }

  const onViewAll = () => {
    window.sessionStorage.setItem('from_main', 'TRUE');
    history.push(`/my-training/new-learning/Enrolling/pages/1`);

    ReactGA.event({
      category: title,
      action: 'Click',
      label: '수강 신청 과정 전체보기',
    });
  };

  if (cardList === undefined || cardList.length === 0) {
    return null;
  }

  return (
    <Segment
      className="full learning-section type1"
      data-area={Area.MAIN_ENROLLING}
    >
      <div className="section-head">
        <div
          className="sec-tit-txt"
          dangerouslySetInnerHTML={{
            __html: getPolyglotText(
              '<strong>수강신청 임박</strong>한 과정',
              'main-enrolling'
            ),
          }}
        />
        <div className="sec-tit-btn">
          <button className="btn-more" onClick={onViewAll}>
            <PolyglotText id="main-viewall" defaultString="전체보기" />
          </button>
        </div>
      </div>

      <div className="section-body">
        <div className="cardSwiper" data-action-name="수강신청 임박한 과정">
          <Swiper {...SwiperProps} getSwiper={(s) => updateSwiper(s)}>
            {cardList &&
              cardList.map((card, i) => {
                return (
                  <div className="swiper-slide" key={card.id}>
                    <CardGroup type={GroupType.Wrap}>
                      <LectureCardView
                        cardId={card.id}
                        cardName={parsePolyglotString(card.name)}
                        learningTime={timeToHourMinuteFormat(card.learningTime)}
                        thumbnailImagePath={card.thumbnailImagePath}
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
                        hoverTrack={hoverTrack}
                      />
                    </CardGroup>
                  </div>
                );
              })}
          </Swiper>
          <div className="swiperEnrolling">
            <div className="swiper-button-prev" />
            <div className="swiper-button-next" />
          </div>
        </div>
      </div>
    </Segment>
  );
}

export default EnrollingLearning;
