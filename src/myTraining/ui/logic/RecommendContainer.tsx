import React, { useState, useEffect, createRef } from 'react';
import { Button, Icon, Label, Segment } from 'semantic-ui-react';
import Swiper from 'react-id-swiper';
import CardGroup, {
  GroupType,
} from '../../../lecture/shared/Lecture/sub/CardGroup';
import {
  CardProps,
  LectureCardView,
  parseUserLectureCards,
  UserLectureCard,
} from '@sku/skuniv-ui-lecture-card';
import { NavLink } from 'react-router-dom';
import lecturePaths from 'lecture/routePaths';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../shared/ui/logic/PolyglotText';
import { SkProfileService } from '../../../profile/stores';
import { getChannelName } from '../../../shared/service/useCollege/useRequestCollege';
import { getAxios } from '../../../shared/api/Axios';
import { AxiosReturn } from '../../../shared/api/AxiosReturn';
import { Area } from '@sku/skuniv-ui-lecture-card/lib/views/lectureCard.models';
import { hoverTrack } from 'tracker/present/logic/ActionTrackService';
import { scrollSwiperHorizontalTrack } from 'tracker/present/logic/ActionTrackService';
import { autorun } from 'mobx';

const swipeName = 'swiperInterested';

const SwiperProps = {
  slidesPerView: 4,
  spaceBetween: 7,
  slidesPerGroup: 4,
  loop: false,
  loopFillGroupWithBlank: true,
  navigation: {
    nextEl: '.' + swipeName + ' .swiper-button-next',
    prevEl: '.' + swipeName + ' .swiper-button-prev',
  },
  speed: 500,
  observer: true,
  observerParents: true,
};

interface RecommendCardList {
  cardForUserViewRdos: UserLectureCard[];
  channelId: string;
  totalCardCount: number;
}

export function RecommendContainer() {
  const [cardList, setCardList] = useState<CardProps[]>([]);
  const [channelOpened, setChannelOpend] = useState<boolean>(false);
  const [favoriteChannelIds, setFavoriteChannelIds] = useState<string[]>(() => {
    return Array.from(
      SkProfileService.instance.additionalUserInfo.favoriteChannelIds
    );
  });
  const [selectedChannelId, setSelectedChannelId] = useState<string>(() => {
    return (
      SkProfileService.instance.additionalUserInfo.favoriteChannelIds[0] || ''
    );
  });

  const scrollRef = createRef<HTMLDivElement>();

  function onClickSetChannelOpened(value: boolean) {
    //
    scrollRef.current?.scrollTo(0, 0);
    setChannelOpend(value);
  }

  useEffect(() => {
    // API 확인후 동작
    const axios = getAxios();
    axios
      .get<RecommendCardList>(
        `/api/lecture/cards/recommend/${selectedChannelId}`
      )
      .then(AxiosReturn)
      .then((cardList) => {
        if (
          cardList !== undefined &&
          cardList.cardForUserViewRdos !== undefined
        ) {
          try {
            setCardList(
              parseUserLectureCards(
                cardList.cardForUserViewRdos,
                SkProfileService.instance.skProfile.language
              )
            );
          } catch (e) {
            console.log(e);
          }
        }
      });
  }, [selectedChannelId]);
  useEffect(() => {
    return autorun(() => {
      const next = Array.from(
        SkProfileService.instance.additionalUserInfo.favoriteChannelIds
      );
      if (next.length !== favoriteChannelIds.length) {
        setSelectedChannelId(
          SkProfileService.instance.additionalUserInfo.favoriteChannelIds[0] ||
            ''
        );
      }
    });
  }, [favoriteChannelIds]);

  const [swiper, updateSwiper] = useState<any>(null);
  useEffect(() => {
    if (swiper !== null) {
      const onSlideChangeHandler = () => onSlideChange(swiper);
      if (!swiper.destroyed) {
        swiper.on('slideChange', onSlideChangeHandler);
        return () => {
          swiper.off('slideChange', onSlideChangeHandler);
        };
      }
    }
  }, [onSlideChange, swiper]);
  function onSlideChange(swiper: any) {
    if (swiper && swiper.isEnd) {
      scrollSwiperHorizontalTrack({
        element: swiper.el,
        area: Area.MAIN_CHANNEL,
        scrollClassName: 'cardSwiper',
        actionName: '메인카드 스크롤',
      });
    }
  }

  return (
    <Segment
      className="full learning-section type1"
      data-area={Area.MAIN_CHANNEL}
    >
      <div className="section-head">
        <div
          className="sec-tit-txt"
          dangerouslySetInnerHTML={{
            __html: getPolyglotText(
              '<strong>{name}</strong>의 관심채널',
              'main-favorites',
              {
                name: SkProfileService.instance.profileMemberName,
              }
            ),
          }}
        />
        <div className="sec-tit-btn">
          <NavLink className="btn-more" to={lecturePaths.recommend()}>
            <PolyglotText id="main-viewall" defaultString="전체보기" />
          </NavLink>
        </div>
      </div>
      <div className="section-body">
        <div className={`channel-tag-wrap ${channelOpened ? 'on' : ''}`}>
          <div className="channel-tag-btn">
            <Button
              className="channel-btn"
              onClick={() => onClickSetChannelOpened(!channelOpened)}
            />
          </div>
          <div className="channel-tag-box">
            <div className="channel-wrap" ref={scrollRef}>
              {SkProfileService.instance.additionalUserInfo.favoriteChannelIds.map(
                (id) => {
                  if (getChannelName(id) !== '') {
                    return (
                      <Label
                        as="button"
                        className={`ch ${
                          selectedChannelId === id ? 'active' : ''
                        }`}
                        key={id}
                        onClick={() => {
                          setSelectedChannelId(id);
                          // setChannelOpend(false);
                        }}
                      >
                        {getChannelName(id)}
                      </Label>
                    );
                  }
                }
              )}
            </div>
          </div>
        </div>
        <div
          className="cardSwiper swiper-no-txticon"
          data-action-name="관심채널"
        >
          {cardList && cardList.length > 0 ? (
            <>
              <Swiper {...SwiperProps} getSwiper={(s) => updateSwiper(s)}>
                {cardList.map((item, i) => {
                  return (
                    <div className="swiper-slide" key={item.cardId}>
                      <CardGroup type={GroupType.Wrap}>
                        <LectureCardView
                          {...item}
                          useBookMark={true} // bookMark 기능을 사용하면 true, 사용하지 않으면 false
                          dataArea={Area.MAIN_CHANNEL}
                          hoverTrack={hoverTrack}
                        />
                      </CardGroup>
                    </div>
                  );
                })}
              </Swiper>
              <div className={swipeName}>
                <div className="swiper-button-prev" />
                <div className="swiper-button-next" />
              </div>
            </>
          ) : (
            <div className="no-cont-wrap type2">
              <Icon className="no-contents80" />
              <span className="blind">콘텐츠 없음</span>
              <div className="text02">
                {getPolyglotText(
                  '선택하신 채널에 해당하는 추천 학습과정이 없습니다.',
                  'rcmd-추천-목록없음'
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Segment>
  );
}
