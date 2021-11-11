import { CardProps, parseUserLectureCards } from '@sku/skuniv-ui-lecture-card';
import React, { useCallback, useEffect, useState } from 'react';
import Swiper from 'react-id-swiper';
import { findMyLatestLearningCards } from '../../../lecture/detail/api/cardApi';
import SkProfileService from '../../../profile/present/logic/SkProfileService';
import { getCollgeName } from '../../../shared/service/useCollege/useRequestCollege';

const swiperProps = {
  loop: false,
  pagination: {
    el: '.std-navi .swiper-pagination',
    clickable: true,
  },
  navigation: {
    prevEl: '.std-navi .swiper-button-prev',
    nextEl: '.std-navi .swiper-button-next',
  },
  containerClass: 'std-slider-container',
};

export function InProgressLearning() {
  const [cardList, setCardList] = useState<CardProps[]>([]);

  const fetchLearningCardLsit = useCallback(async () => {
    const learningCardList = await findMyLatestLearningCards(3);
    const userLanguage = SkProfileService.instance.skProfile.language;

    setCardList(parseUserLectureCards(learningCardList, userLanguage));
  }, []);

  useEffect(() => {
    fetchLearningCardLsit();
  }, []);

  return (
    <div className="std-slider-wrap">
      <div className="std-slider-inner cardSwiper">
        <Swiper {...swiperProps}>
          {cardList.map((c) => (
            <div className="swiper-slide" key={c.cardId}>
              <a className="inner">
                <div className="over-img">
                  <img src={c.thumbnailImagePath} className="ui image tmb" />
                </div>
                <div className="sl-info">
                  <span className="sl-ct">{getCollgeName(c.collegeId)}</span>
                  <strong className="sl-tit">{c.cardName}</strong>
                </div>
              </a>
            </div>
          ))}
        </Swiper>
        <div className="std-navi">
          <div className="swiper-button-prev" />
          <div className="swiper-button-next" />
          <div className="swiper-pagination" />
        </div>
      </div>
    </div>
  );
}
