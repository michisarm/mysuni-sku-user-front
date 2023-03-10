import React, { useEffect, useState } from 'react';
import { Card, Label, Segment } from 'semantic-ui-react';
import { CardBundle } from '../../../../lecture/shared/model/CardBundle';
import Swiper from 'react-id-swiper';
import { searchRankinsCache } from '../../../../search/api/searchApi';
import {
  setSearchPopular1MList,
  useSearchPopular1MList,
} from '../../../../search/search.services';
import SearchService from '../../../../search/service/SearchService';
import { search } from '../../../../search/search.events';
import { getPolyglotText } from '../../../../shared/ui/logic/PolyglotText';
import { HotTopicView } from 'hotTopic/ui/view/HotTopicView';
import { Area } from '@sku/skuniv-ui-lecture-card/lib/views/lectureCard.models';
import { scrollSwiperHorizontalTrack } from 'tracker/present/logic/ActionTrackService';
import {
  findAvailableCardBundlesCache,
  findAvailablePageElementsCache,
} from '../../../../lecture/shared/api/arrangeApi';

const swiperProps = {
  slidesPerView: 3,
  spaceBetween: 18,
  slidesPerGroup: 3,
  loop: false,
  loopFillGroupWithBlank: true,
  navigation: {
    nextEl: '.' + 'swiperHopTopic' + ' .swiper-button-next',
    prevEl: '.' + 'swiperHopTopic' + ' .swiper-button-prev',
  },
  speed: 500,
};

async function onSearchValue(value: string) {
  const searchService = SearchService.instance;
  const { searchInfo } = searchService;

  searchService.setSearchInfoValue('searchValue', value);
  if (!searchInfo.inAgain) {
    searchService.setSearchInfoValue('recentSearchValue', value);
  }
  await search(value);
  searchService.setFocusedValue(false);
}

export function MainHotTopicContainer() {
  const [cardBundles, setCardBundles] = useState<CardBundle[]>([]);
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
        area: Area.MAIN_TOPIC,
        scrollClassName: 'cardSwiper',
        actionName: '???????????? ?????????',
      });
    }
  }

  const fetchCardBundles = async () => {
    const response = await findAvailableCardBundlesCache();
    if (response !== undefined) {
      setCardBundles(response.filter((c) => c.type === 'HotTopic'));
    }
  };
  useEffect(() => {
    fetchCardBundles();

    searchRankinsCache(0).then((response) => {
      const popularList: string[] = [];
      response?.map((rank) => {
        popularList.push(rank[0]);
      });
      setSearchPopular1MList(popularList);
    });
  }, []);

  const searchPopularList = useSearchPopular1MList();

  if (
    searchPopularList === undefined ||
    searchPopularList.length === 0 ||
    cardBundles.length === 0
  ) {
    return null;
  }

  return (
    <Segment className="full learning-section type5">
      <div className="section-head" data-area={Area.MAIN_KEYWORD}>
        <div
          className="sec-tit-txt"
          dangerouslySetInnerHTML={{
            __html: getPolyglotText(
              '???????????? ?????? <strong>???????????????</strong>',
              'main-keywords'
            ),
          }}
        />
        <div className="keyword-tag-wrap">
          <div className="keyword-wrap">
            {searchPopularList?.map((c, i) => {
              return (
                <Label
                  as="button"
                  className="kwd"
                  onClick={() => onSearchValue(c)}
                  key={i}
                >
                  #{c}
                </Label>
              );
            })}
          </div>
        </div>
      </div>
      <div className="section-body" data-area={Area.MAIN_TOPIC}>
        <div
          className="sec-tit-txt"
          dangerouslySetInnerHTML={{
            __html: getPolyglotText(
              '<strong>Hot Topic</strong>',
              'main-hottopic'
            ),
          }}
        />
        <div className="cardSwiper" data-action-name="Hot Topic">
          <Swiper {...swiperProps} getSwiper={(s) => updateSwiper(s)}>
            {cardBundles.map((c) => (
              <div className="swiper-slide" key={c.id}>
                <Card.Group className="topic-card-warp">
                  <HotTopicView hotTopicCardBundle={c} />
                </Card.Group>
              </div>
            ))}
          </Swiper>
          <div className="swiperHopTopic">
            <div className="swiper-button-prev" />
            <div className="swiper-button-next" />
          </div>
        </div>
      </div>
    </Segment>
  );
}
