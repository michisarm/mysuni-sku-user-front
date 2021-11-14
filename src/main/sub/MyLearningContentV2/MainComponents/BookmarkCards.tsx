import React, { useEffect, useMemo, useState } from 'react';
import Swiper from 'react-id-swiper';

import { Segment } from 'semantic-ui-react';
import { NoSuchContentPanel } from 'shared';
import myTrainingRoutes from '../../../../myTraining/routePaths';
import ReactGA from 'react-ga';
import { useHistory } from 'react-router-dom';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../../shared/ui/logic/PolyglotText';
import {
  LectureCardView,
  parseUserLectureCards,
} from '@sku/skuniv-ui-lecture-card';
import {
  Area,
  UserLectureCard,
} from '@sku/skuniv-ui-lecture-card/lib/views/lectureCard.models';
import { SkProfileService } from '../../../../profile/stores';
import CardGroup, {
  GroupType,
} from '../../../../lecture/shared/Lecture/sub/CardGroup';
import { findBookmarkCards } from '../../../../lecture/detail/api/cardApi';

function getTitle() {
  return `${getPolyglotText(
    '<strong>찜해두신 과정</strong>을<br> 모아봤어요!',
    'main-bookmark'
  )}`;
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
    nextEl: '.' + 'swiperCommend' + ' .swiper-button-next',
    prevEl: '.' + 'swiperCommend' + ' .swiper-button-prev',
  },
  speed: 500,
};

export const BookmarkCards: React.FC<Props> = (Props) => {
  const history = useHistory();
  const [cards, setCards] = useState<UserLectureCard[]>([]);

  useEffect(() => {
    findBookmarkCards().then((next) => {
      if (next !== undefined) {
        setCards(next.results);
      }
    });
  }, []);

  const title = useMemo(() => getTitle(), []);

  const onViewAll = () => {
    history.push(myTrainingRoutes.learningInMyList());

    // react-ga event
    ReactGA.event({
      category: '추천 과정',
      action: 'Click',
      label: '추천 과정 전체보기',
    });
  };

  if (cards.length === 0) {
    return null;
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
          <div className="swiperCommend">
            <div className="swiper-button-prev" />
            <div className="swiper-button-next" />
          </div>
        </div>
      </div>
    </Segment>
  );
};
