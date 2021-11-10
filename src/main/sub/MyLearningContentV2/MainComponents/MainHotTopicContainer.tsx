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

  return (
    <Segment className="full learning-section type5">
      <div className="section-head">
        <div className="sec-tit-txt">
          구성원이 찾는 <strong>인기키워드</strong>
        </div>
        <div className="keyword-tag-wrap">
          <div className="keyword-wrap">
            {searchPopularList?.map((c) => {
              return (
                <Label as="button" className="kwd">
                  #{c}
                </Label>
              );
            })}
          </div>
        </div>
      </div>
      <div className="section-body">
        <div className="sec-tit-txt">
          <strong>Hot Topic</strong>
        </div>
        <div className="cardSwiper">
          <Swiper {...swiperProps}>
            {cardBundles.map((c) => (
              <div className="swiper-slide">
                <Card.Group className="topic-card-warp">
                  <Card className="topic-item">
                    <div className="thumb-img-area">
                      <img
                        src={c.imageUrl}
                        className="ui image thumb-img"
                        alt="프로필 이미지"
                      />
                    </div>
                    <div className="card-inner">
                      <div className="topic-tit">
                        <span>{parsePolyglotString(c.displayText)}</span>
                      </div>
                      <div className="topic-info-wrap">
                        <Label className="topic-info course">
                          <Icon className="list" />
                          <span>
                            총 <strong>{c.cardIds.length}개</strong> 학습카드
                          </span>
                        </Label>
                        <Label className="topic-info time">
                          <span>{timeToHourMinuteFormat(c.learningTime)}</span>
                        </Label>
                      </div>
                    </div>
                  </Card>
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
