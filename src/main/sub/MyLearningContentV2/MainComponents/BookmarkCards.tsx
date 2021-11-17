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
import { hoverTrack } from 'tracker/present/logic/ActionTrackService';
import { scrollSwiperHorizontalTrack } from 'tracker/present/logic/ActionTrackService';

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
    nextEl: '.' + 'swiperWish' + ' .swiper-button-next',
    prevEl: '.' + 'swiperWish' + ' .swiper-button-prev',
  },
  speed: 500,
};

export const BookmarkCards: React.FC<Props> = (Props) => {
  const history = useHistory();
  const [cards, setCards] = useState<UserLectureCard[]>([]);
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
        area: Area.MAIN_FAVORITE,
        scrollClassName: 'cardSwiper',
        actionName: '메인카드 스크롤',
      });
    }
  }

  useEffect(() => {
    (window as any).refreshBookmarks = function refreshBookmarks() {
      findBookmarkCards().then((next) => {
        if (next !== undefined) {
          setCards(next.results);
        }
      });
    };
    (window as any).refreshBookmarks();
    return () => {
      (window as any).refreshBookmarks = null;
    };
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
      data-area={Area.MAIN_FAVORITE}
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
        <div
          className="cardSwiper swiper-no-txticon"
          data-action-name="찜해두신 과정"
        >
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
                      useBookMark={true} // bookMark 기능을 사용하면 true, 사용하지 않으면 false
                      dataArea={Area.MAIN_FAVORITE}
                      hoverTrack={hoverTrack}
                    />
                  </CardGroup>
                </div>
              );
            })}
          </Swiper>
          <div className="swiperWish">
            <div className="swiper-button-prev" />
            <div className="swiper-button-next" />
          </div>
        </div>
      </div>
    </Segment>
  );
};
