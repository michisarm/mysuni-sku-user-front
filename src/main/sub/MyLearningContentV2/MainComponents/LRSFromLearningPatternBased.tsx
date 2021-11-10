import React, { useEffect, useMemo, useState } from 'react';
import Swiper from 'react-id-swiper';

import { RouteComponentProps, withRouter } from 'react-router';
import { Button, Icon, Segment } from 'semantic-ui-react';
import { NoSuchContentPanel } from 'shared';
import { Lecture } from 'lecture';
import myTrainingRoutes from '../../../../myTraining/routePaths';
import { ContentWrapper } from '../MyLearningContentElementsView';
import ReactGA from 'react-ga';
import { RecommendationViewModel } from '../../../../lecture/recommend/viewmodel/RecommendationViewModel';
import { findRecommendationCardsFromLearningPatternBased } from '../../../../lecture/recommend/api/recommendApi';
import CardView from '../../../../lecture/shared/Lecture/ui/view/CardVIew';
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

function getTitle(
  profileMemberName: string,
  viewModel?: RecommendationViewModel
) {
  if (viewModel === undefined) {
    return '';
  }
  const { recTitle } = viewModel;
  if (recTitle?.length > 0) {
    // return `${profileMemberName}${recTitle}`; api에서 받아오는 recTitle내용 추후 변경시
    return `${profileMemberName} ${getPolyglotText(
      '이 관심 가질만한 과정을 모아봤어요~',
      'home-LRSLPB-Title1'
    )}`;
  } else {
    return `${profileMemberName} ${getPolyglotText(
      '님을 위한 mySUNI의 추천 과정',
      'home-LRSLPB-Title2'
    )}`;
  }
}

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
  const { profileMemberName } = Props;
  const history = useHistory();
  const [viewModel, setViewModel] = useState<RecommendationViewModel>();

  useEffect(() => {
    findRecommendationCardsFromLearningPatternBased().then((next) => {
      if (next !== undefined) {
        const sortedCards = takeTwoOfEachCollege(next.cards);
        setViewModel({
          ...next,
          cards: sortedCards,
        });
      }
    });
  }, []);

  const title = useMemo(
    () => getTitle(profileMemberName, viewModel),
    [profileMemberName, viewModel]
  );

  const onViewAll = () => {
    history.push(myTrainingRoutes.learningLrsLecture());

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

  if (cards.length === 0) {
    return (
      <Segment
        className="full learning-section type2"
        dataArea={Area.MAIN_RECOMMEND}
      >
        <div className="section-head">
          <div
            className="sec-tit-txt"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <div className="sec-tit-btn">
            <button className="btn-more" onClick={onViewAll}>
              전체보기
            </button>
          </div>
        </div>

        <NoSuchContentPanel
          message={
            <div className="text">
              <PolyglotText
                defaultString="추천과정에 해당하는 학습 과정이 없습니다."
                id="home-Recommend-목록없음"
              />
            </div>
          }
        />
      </Segment>
    );
  }

  return (
    <Segment
      className="full learning-section type2"
      dataArea={Area.MAIN_RECOMMEND}
    >
      <div className="section-head">
        <div
          className="sec-tit-txt"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <div className="sec-tit-btn">
          <button className="btn-more" onClick={onViewAll}>
            전체보기
          </button>
        </div>
      </div>

      <div className="section-body swiper-no-txticon">
        <div className="cardSwiper">
          <Swiper {...SwiperProps}>
            {parseUserLectureCards(
              cards,
              SkProfileService.instance.skProfile.language
            ).map((item, i) => {
              return (
                <div className="swiper-slide" key={item.cardId}>
                  <CardGroup
                    type={GroupType.Wrap}
                    dataActionName={
                      title.includes('학습 콘텐츠 기반 추천 과정')
                        ? '학습 콘텐츠 기반 추천 과정'
                        : 'mySUNI의 추천 과정'
                    }
                  >
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
          <div className="swiperCommend2">
            <div className="swiper-button-prev" />
            <div className="swiper-button-next" />
          </div>
        </div>
      </div>
    </Segment>
  );
};
