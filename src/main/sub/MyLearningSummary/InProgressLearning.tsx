import { CardProps, parseUserLectureCards } from '@sku/skuniv-ui-lecture-card';
import React, { useCallback, useEffect, useState } from 'react';
import Swiper from 'react-id-swiper';
import {
  findByQdo,
  findCardFromCardBundle,
  findMyLatestLearningCards,
} from '../../../lecture/detail/api/cardApi';
import SkProfileService from '../../../profile/present/logic/SkProfileService';
import { getCollgeName } from '../../../shared/service/useCollege/useRequestCollege';
import Image from 'shared/components/Image';
import { useHistory } from 'react-router-dom';
import { findAvailableCardBundlesCache } from '../../../lecture/shared/api/arrangeApi';

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
  const [swiperOn, setSwiperOn] = useState<boolean>(false);

  const fetchLearningCardLsit = async () => {
    let learningCardList = await findMyLatestLearningCards(3);
    if (learningCardList === undefined || learningCardList.length === 0) {
      const cardBundles = await findAvailableCardBundlesCache();
      const newBundle = cardBundles?.find((c) => c.type === 'New');
      if (newBundle !== undefined) {
        learningCardList = await findCardFromCardBundle(
          newBundle.cardIds,
          3,
          false
        );
      }
    }
    if (learningCardList === undefined || learningCardList.length === 0) {
      const learningCardListOffsetList = await findByQdo({
        offset: 0,
        limit: 3,
        orderBy: 'TimeDesc',
      });
      if ((learningCardListOffsetList?.results.length || 0) > 0) {
        learningCardList = learningCardListOffsetList?.results;
      }
    }

    if (learningCardList !== undefined) {
      const userLanguage = SkProfileService.instance.skProfile.language;
      setCardList(parseUserLectureCards(learningCardList, userLanguage));
      setSwiperOn(true);
    }
  };
  useEffect(() => {
    fetchLearningCardLsit();
  }, []);

  return (
    <div className="std-slider-wrap">
      <div className="std-slider-inner cardSwiper">
        {swiperOn === true && (
          <Swiper {...swiperProps}>{cardList.map((c) => ItemView(c))}</Swiper>
        )}
        <div className="std-navi">
          <div className="swiper-button-prev" />
          <div className="swiper-button-next" />
          <div className="swiper-pagination" />
        </div>
      </div>
    </div>
  );
}

export function ItemView(c: CardProps) {
  const history = useHistory();
  return (
    <div
      className="swiper-slide"
      key={c.cardId}
      onClick={() => {
        history.push(`/lecture/card/${c.cardId}/view/redirect-cube`);
      }}
    >
      <a className="inner">
        <div className="over-img">
          <Image src={c.thumbnailImagePath} className="tmb" />
        </div>
        <div className="sl-info">
          <span className="sl-ct">{getCollgeName(c.collegeId)}</span>
          <strong className="sl-tit">{c.cardName}</strong>
        </div>
      </a>
    </div>
  );
}
