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
import { SkProfileService } from '../../../../profile/stores';
import CardGroup, {
  GroupType,
} from '../../../../lecture/shared/Lecture/sub/CardGroup';
import { parsePolyglotString } from '../../../../shared/viewmodel/PolyglotString';

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
    nextEl: '.' + 'swiperCommend' + ' .swiper-button-next',
    prevEl: '.' + 'swiperCommend' + ' .swiper-button-prev',
  },
  speed: 500,
};

export const LRSFromContentbase: React.FC<Props> = (Props) => {
  const { profileMemberName } = Props;
  const history = useHistory();
  const [viewModel, setViewModel] = useState<RecommendationViewModel>();

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
      category: '추천 과정',
      action: 'Click',
      label: '추천 과정 전체보기',
    });
  };

  // 210719 조회되는 cards 가 없을 시, 해당 섹션 보이지 않도록 수정됨.
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
      dataArea={Area.MAIN_RECOMMEND}
    >
      <div className="section-head">
        <div
          className="sec-tit-txt"
          dangerouslySetInnerHTML={{
            __html: getPolyglotText(
              '<strong>{name} 님</strong>의</br><strong>학습패턴</strong>을 기반으로</br>추천 드려요!',
              'main-lrs-title1',
              {
                name: parsePolyglotString(
                  SkProfileService.instance.skProfile.name
                ),
              }
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
        <div className="cardSwiper swiper-no-txticon">
          <Swiper {...SwiperProps}>
            {parseUserLectureCards(
              cards,
              SkProfileService.instance.skProfile.language
            ).map((item, i) => {
              return (
                <div className="swiper-slide" key={item.cardId}>
                  <CardGroup type={GroupType.Wrap}>
                    <LectureCardView
                      {...item}
                      useBookMark={true} // bookMark 기능을 사용하면 true, 사용하지 않으면 false
                      dataArea={Area.MAIN_RECOMMEND}
                    />
                  </CardGroup>
                </div>
              );
            })}
          </Swiper>
          <div className="swiperCommend">
            <div className="swiper-button-prev" />
            <div className="swiper-button-next" />
          </div>
        </div>
      </div>
    </Segment>
  );
};
