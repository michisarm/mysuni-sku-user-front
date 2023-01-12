import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import Swiper from 'react-id-swiper';

import { ContentWrapper } from '../MyLearningContentElementsView';
import ReactGA from 'react-ga';
import { findRequiredLearning } from '../../../../lecture/detail/api/cardApi';
import CardGroup, {
  GroupType,
} from '../../../../lecture/shared/Lecture/sub/CardGroup';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';
import {
  CardProps,
  LectureCardView,
  parseUserLectureCards,
} from '@sku/skuniv-ui-lecture-card';
import { SkProfileService } from '../../../../profile/stores';
import { Area } from '@sku/skuniv-ui-lecture-card/lib/views/lectureCard.models';
import { hoverTrack } from 'tracker/present/logic/ActionTrackService';
import { scrollSwiperHorizontalTrack } from 'tracker/present/logic/ActionTrackService';
import { Abtest, ExperimentalGroup } from 'abtest/components';

interface Props extends RouteComponentProps {
  profileMemberName?: string;
}

const SwiperProps = {
  slidesPerView: 4,
  spaceBetween: 7,
  slidesPerGroup: 4,
  loop: false,
  loopFillGroupWithBlank: true,
  navigation: {
    nextEl: '.' + 'swiperRequired' + ' .swiper-button-next',
    prevEl: '.' + 'swiperRequired' + ' .swiper-button-prev',
  },
  speed: 500,
};

const RQDLearning: React.FC<Props> = function RQDLearning({ history }) {
  const [cardList, setCardList] = useState<CardProps[]>([]);
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
        area: Area.MAIN_REQUIRED,
        scrollClassName: 'cardSwiper',
        actionName: '메인카드 스크롤',
      });
    }
  }

  const [title] = useState(
    getPolyglotText(
      'Deep Change를 위한 <strong>핵인싸 과정</strong>',
      'main-required'
    )
  );

  const fetchCardList = async () => {
    const userLanguage = SkProfileService.instance.skProfile.language;
    const cardList = await findRequiredLearning();
    if (cardList !== undefined) {
      setCardList(parseUserLectureCards(cardList, userLanguage));
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
        <div
          className="sec-tit-txt"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <div className="sec-tit-btn">
          <button className="btn-more" onClick={onViewAll}>
            <Abtest name="AB-3" nonExperimentalGroup="A">
              <ExperimentalGroup name="A" style={undefined}>
                <PolyglotText id="main-viewall" defaultString="전체보기" />
              </ExperimentalGroup>
              <ExperimentalGroup name="B" style={undefined}>
                <p>전체 B 보기</p>
              </ExperimentalGroup>
            </Abtest>
          </button>
        </div>
      </div>
      <div className="section-body">
        <div
          className="cardSwiper"
          data-action-name="Deep Change를 위한 핵인싸 과정"
        >
          <Swiper {...SwiperProps} getSwiper={(s) => updateSwiper(s)}>
            {cardList.map((item, i) => {
              return (
                <div className="swiper-slide" key={item.cardId}>
                  <CardGroup type={GroupType.Wrap}>
                    <LectureCardView
                      {...item}
                      useBookMark={true} // bookMark 기능을 사용하면 true, 사용하지 않으면 false
                      dataArea={Area.MAIN_REQUIRED}
                      hoverTrack={hoverTrack}
                    />
                  </CardGroup>
                </div>
              );
            })}
          </Swiper>
          <div className="swiperRequired">
            <div className="swiper-button-prev" />
            <div className="swiper-button-next" />
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
};

export default withRouter(RQDLearning);
