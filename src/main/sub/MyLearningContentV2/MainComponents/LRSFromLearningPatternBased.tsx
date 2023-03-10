import React, { useEffect, useState } from 'react';
import Swiper from 'react-id-swiper';

import { Segment } from 'semantic-ui-react';
import myTrainingRoutes from '../../../../myTraining/routePaths';
import ReactGA from 'react-ga';
import { RecommendationViewModel } from '../../../../lecture/recommend/viewmodel/RecommendationViewModel';
import { findRecommendationCardsFromContentBase } from '../../../../lecture/recommend/api/recommendApi';
import { useHistory } from 'react-router-dom';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../../shared/ui/logic/PolyglotText';
import { takeTwoOfEachCollege } from 'lecture/model/CardWithCardRealtedCount';
import {
  LectureCardView,
  parseUserLectureCards,
} from '@sku/skuniv-ui-lecture-card';
import { Area } from '@sku/skuniv-ui-lecture-card/lib/views/lectureCard.models';
import { hoverTrack } from 'tracker/present/logic/ActionTrackService';
import { SkProfileService } from '../../../../profile/stores';
import CardGroup, {
  GroupType,
} from '../../../../lecture/shared/Lecture/sub/CardGroup';
import { scrollSwiperHorizontalTrack } from 'tracker/present/logic/ActionTrackService';

interface Props {
  profileMemberName: string;
}

const SwiperProps = {
  slidesPerView: 3,
  spaceBetween: 7,
  slidesPerGroup: 3,
  loop: false,
  loopFillGroupWithBlank: true,
  navigation: {
    nextEl: '.' + 'swiperCommend2' + ' .swiper-button-next',
    prevEl: '.' + 'swiperCommend2' + ' .swiper-button-prev',
  },
  speed: 500,
};

export const LRSFromLearningPatternBased: React.FC<Props> = (Props) => {
  const history = useHistory();
  const [viewModel, setViewModel] = useState<RecommendationViewModel>();
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
        area: Area.MAIN_RECOMMEND,
        scrollClassName: 'cardSwiper',
        actionName: '???????????? ?????????',
      });
    }
  }

  useEffect(() => {
    findRecommendationCardsFromContentBase().then((next) => {
      if (next !== undefined) {
        const sortedCards = takeTwoOfEachCollege(next.cards);
        setViewModel({
          ...next,
          cards: sortedCards,
        });
      }
    });
  }, []);

  const onViewAll = () => {
    history.push(myTrainingRoutes.learningLrsLecture('ContentBase'));

    // react-ga event
    ReactGA.event({
      category: '?????? ??????',
      action: 'Click',
      label: '?????? ?????? ????????????',
    });
  };

  // 210719 ???????????? cards ??? ?????? ???, ?????? ?????? ????????? ????????? ?????????.
  if (
    viewModel === undefined ||
    viewModel.cards === undefined ||
    viewModel.cards.length === 0
  ) {
    return null;
  }

  const { cards } = viewModel;

  return (
    <Segment
      className="full learning-section type2"
      data-area={Area.MAIN_RECOMMEND}
    >
      <div className="section-head">
        <div
          className="sec-tit-txt"
          dangerouslySetInnerHTML={{
            __html: getPolyglotText(
              '<strong>{name}???</strong>???</br><strong>????????? ?????????</strong>??????</br>???????????? <strong>?????? ?????????!</strong>',
              'main-lrs-title2',
              {
                name: SkProfileService.instance.profileMemberName,
              }
            ),
          }}
        />
        <div className="sec-tit-btn">
          <button className="btn-more" onClick={onViewAll}>
            <PolyglotText id="main-viewall" defaultString="????????????" />
          </button>
        </div>
      </div>

      <div className="section-body swiper-no-txticon">
        <div className="cardSwiper" data-action-name="?????????????????? ??????">
          <Swiper {...SwiperProps} getSwiper={(s) => updateSwiper(s)}>
            {parseUserLectureCards(
              cards,
              SkProfileService.instance.skProfile.language
            ).map((item, i) => {
              return (
                <div className="swiper-slide" key={item.cardId}>
                  <CardGroup type={GroupType.Wrap}>
                    <LectureCardView
                      {...item}
                      useBookMark={true} // bookMark ????????? ???????????? true, ???????????? ????????? false
                      dataArea={Area.MAIN_RECOMMEND}
                      hoverTrack={hoverTrack}
                    />
                  </CardGroup>
                </div>
              );
            })}
          </Swiper>
          <div className="swiperCommend2">
            <div className="swiper-button-prev" />
            <div className="swiper-button-next" />
          </div>
        </div>
      </div>
    </Segment>
  );
};
