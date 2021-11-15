import React, { useEffect, useState } from 'react';
import { Card, Icon, Label, Segment } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { CardBundle } from '../../../../lecture/shared/model/CardBundle';
import { findAvailableCardBundles } from '../../../../lecture/shared/api/arrangeApi';
import Swiper from 'react-id-swiper';
import { parsePolyglotString } from '../../../../shared/viewmodel/PolyglotString';
import { timeToHourMinuteFormat } from '../../../../shared/helper/dateTimeHelper';
import { searchRankinsCache } from '../../../../search/api/searchApi';
import {
  setSearchPopular1MList,
  useSearchPopular1MList,
} from '../../../../search/search.services';
import SearchService from '../../../../search/service/SearchService';
import { search } from '../../../../search/search.events';
import Image from '../../../../shared/components/Image';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../../shared/ui/logic/PolyglotText';
import { HotTopicView } from 'hotTopic/ui/view/HotTopicView';

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

  const fetchCardBundles = async () => {
    const response = await findAvailableCardBundles();
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
      <div className="section-head">
        <div
          className="sec-tit-txt"
          dangerouslySetInnerHTML={{
            __html: getPolyglotText(
              '구성원이 찾는 <strong>인기키워드</strong>',
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
      <div className="section-body">
        <div
          className="sec-tit-txt"
          dangerouslySetInnerHTML={{
            __html: getPolyglotText(
              '<strong>Hot Topic</strong>',
              'main-hottopic'
            ),
          }}
        />
        <div className="cardSwiper">
          <Swiper {...swiperProps}>
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
