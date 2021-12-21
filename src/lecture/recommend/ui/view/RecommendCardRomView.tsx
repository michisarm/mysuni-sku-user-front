import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  LectureCardView,
  parseUserLectureCards,
} from '@sku/skuniv-ui-lecture-card';
import { SkProfileService } from '../../../../profile/stores';
import { RecommendCardRom } from '../../../model/RecommendCardRom';
import { NoSuchContentPanel } from 'shared';
import { Area } from '@sku/skuniv-ui-lecture-card/lib/views/lectureCard.models';
import { hoverTrack } from 'tracker/present/logic/ActionTrackService';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../../shared/ui/logic/PolyglotText';
import { getChannelName } from '../../../../shared/service/useCollege/useRequestCollege';
import Swiper from 'react-id-swiper';
import CardGroup, { GroupType } from 'lecture/shared/Lecture/sub/CardGroup';
import { Segment } from 'semantic-ui-react';
import { scrollSwiperHorizontalTrack } from 'tracker/present/logic/ActionTrackService';

export function RecommendCardRomView(props: RecommendCardRom) {
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
        area: Area.RECOMMEND_LIST,
        scrollClassName: 'cardSwiper',
        actionName: '추천카드 스크롤',
      });
    }
  }
  //
  const userLanguage = SkProfileService.instance.skProfile.language;

  const { channelId, cardCount, totalCardCount, cardForUserViewRdos } = props;

  const isCardWithRelatedCountRoms =
    cardForUserViewRdos && cardForUserViewRdos.length > 0;

  const getCardCount = () => {
    if (totalCardCount !== undefined && totalCardCount >= 0) {
      return totalCardCount;
    }

    return cardCount;
  };

  const swipeName = 'recommandList';

  const SwiperProps = {
    slidesPerView: 4,
    spaceBetween: 7,
    slidesPerGroup: 4,
    loop: false,
    loopFillGroupWithBlank: true,
    navigation: {
      nextEl: `.${channelId}-${swipeName} .swiper-button-next`,
      prevEl: `.${channelId}-${swipeName} .swiper-button-prev`,
    },
    speed: 500,
  };

  return (
    // <div
    //   onScroll={(e: React.UIEvent<HTMLElement, UIEvent>) =>
    //     scrollHorizontalTrack({
    //       e,
    //       area: Area.RECOMMEND_LIST,
    //       scrollClassName: 'scrolling',
    //       actionName: '추천카드 스크롤',
    //     })
    //   }
    // >
    <Segment
      className="full learning-section type1"
      data-area={Area.RECOMMEND_LIST}
    >
      <div className="section-head">
        <span
          dangerouslySetInnerHTML={{
            __html: getPolyglotText(
              '<strong>{channel}</strong>채널에서 추천 드려요!',
              'rcmd-추천-Channel',
              {
                channel: getChannelName(channelId) || '',
              }
            ),
          }}
        />{' '}
        <span className="channel">{`(${getCardCount()})`}</span>
        {isCardWithRelatedCountRoms && (
          <div className="right">
            <Link to={`/lecture/recommend/channel/${channelId}`}>
              <button className="ui icon button right btn-more">
                <PolyglotText id="main-viewall" defaultString="전체보기" />
                <i aria-hidden="true" className="icon morelink" />
              </button>
            </Link>
          </div>
        )}
      </div>

      <div className="section-body">
        <div
          className="cardSwiper"
          data-action-name={getChannelName(channelId)}
        >
          {(isCardWithRelatedCountRoms && (
            <>
              <Swiper {...SwiperProps} getSwiper={(s) => updateSwiper(s)}>
                {isCardWithRelatedCountRoms &&
                  parseUserLectureCards(cardForUserViewRdos, userLanguage).map(
                    (item) => {
                      return (
                        <div
                          key={item.cardId}
                          className={`${channelId}-${swipeName} swiper-slide`}
                        >
                          <CardGroup type={GroupType.Wrap} key={item.cardId}>
                            <LectureCardView
                              {...item}
                              useBookMark={true}
                              dataArea={Area.RECOMMEND_LIST}
                              hoverTrack={hoverTrack}
                            />
                          </CardGroup>
                        </div>
                      );
                    }
                  )}
              </Swiper>
              <div className={`${channelId}-${swipeName}`}>
                <div className="swiper-button-prev" />
                <div className="swiper-button-next" />
              </div>
            </>
          )) || (
            <NoSuchContentPanel
              message={`${getChannelName(channelId) || ''} ${getPolyglotText(
                '채널에 해당하는 추천 학습과정이 없습니다.',
                'rcmd-추천-채널없음'
              )}`}
            />
          )}
        </div>
      </div>
    </Segment>
  );
}
