import React, { useState, useEffect } from 'react';
import { Button, Label, Segment } from 'semantic-ui-react';
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
import {
  parseLanguage,
  parsePolyglotString,
} from '../../../shared/viewmodel/PolyglotString';

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
};

interface RecommendCardList {
  cardForUserViewRdos: UserLectureCard[];
  channelId: string;
  totalCardCount: number;
}

export function RecommendContainer() {
  const [cardList, setCardList] = useState<CardProps[]>([]);
  const [channelOpened, setChannelOpend] = useState<boolean>(false);
  const [selectedChannelId, setSelectedChannelId] = useState<string>(() => {
    return (
      SkProfileService.instance.additionalUserInfo.favoriteChannelIds[0] || ''
    );
  });
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
          setCardList(
            parseUserLectureCards(
              cardList.cardForUserViewRdos,
              parseLanguage(SkProfileService.instance.skProfile.language)
            )
          );
        }
      });
  }, [selectedChannelId]);

  return (
    <Segment className="full learning-section type1">
      <div className="section-head">
        <div
          className="sec-tit-txt"
          dangerouslySetInnerHTML={{
            __html: getPolyglotText(
              '<strong>{name}</strong>의 관심채널',
              'main-favorites',
              {
                name: parsePolyglotString(
                  SkProfileService.instance.skProfile.name
                ),
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
              onClick={() => setChannelOpend(!channelOpened)}
            />
          </div>
          <div className="channel-tag-box">
            <div className="channel-wrap">
              {SkProfileService.instance.additionalUserInfo.favoriteChannelIds.map(
                (id) => {
                  return (
                    <Label
                      as="button"
                      className={`ch ${
                        selectedChannelId === id ? 'active' : ''
                      }`}
                      key={id}
                      onClick={() => setSelectedChannelId(id)}
                    >
                      {getChannelName(id)}
                    </Label>
                  );
                }
              )}
            </div>
          </div>
        </div>
        <div className="cardSwiper swiper-no-txticon">
          <Swiper {...SwiperProps}>
            {cardList.map((item, i) => {
              return (
                <div className="swiper-slide" key={item.cardId}>
                  <CardGroup type={GroupType.Wrap}>
                    <LectureCardView
                      {...item}
                      useBookMark={true} // bookMark 기능을 사용하면 true, 사용하지 않으면 false
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
        </div>
      </div>
    </Segment>
  );
}
