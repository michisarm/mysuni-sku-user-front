import 'element-scroll-polyfill';
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
import { NavLink, useHistory, } from 'react-router-dom';
import lecturePaths from 'lecture/routePaths';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../shared/ui/logic/PolyglotText';
import {
  SkProfileService,
  useFavoriteChannelIds,
} from '../../../profile/stores';
import { getChannelName } from '../../../shared/service/useCollege/useRequestCollege';
import { getAxios } from '../../../shared/api/Axios';
import { AxiosReturn } from '../../../shared/api/AxiosReturn';
import { Area } from '@sku/skuniv-ui-lecture-card/lib/views/lectureCard.models';
import { hoverTrack } from 'tracker/present/logic/ActionTrackService';
import { scrollSwiperHorizontalTrack } from 'tracker/present/logic/ActionTrackService';

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
  const [channelOpened, setChannelOpened] = useState<boolean>(false);
  const favoriteChannelIds = useFavoriteChannelIds();
  const [selectedChannelId, setSelectedChannelId] = useState<string>();
  const history = useHistory();

  const scrollRef = createRef<HTMLDivElement>();

  function onClickSetChannelOpened(value: boolean) {
    //
    setChannelOpened(value);
    if (scrollRef.current?.scrollTo !== undefined) {
      scrollRef.current?.scrollTo(0, 0);
    }
  }

  useEffect(() => {
    // API ????????? ??????
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
    setSelectedChannelId(favoriteChannelIds[0] || '');
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
        actionName: '???????????? ?????????',
      });
    }
  }

  const recommendSetting = () => {
    history.push('/lecture/recommend?setting=true');
    // history.push(`/search?query=${searchInfo.searchValue}`);
  }

  return (
    <Segment
      className="full learning-section type1"
      data-area={Area.MAIN_CHANNEL}
    >
      <div className="section-head">
        <div className="sec-tit-txt">
          <span
            dangerouslySetInnerHTML={{
              __html: getPolyglotText(
                '<strong>{name}</strong>??? ????????????',
                'main-favorites',
                {
                  name: SkProfileService.instance.profileMemberName,
                }
              ),
            }}
          />
          <Button
            icon
            className="img-icon setting"
            onClick={recommendSetting}
          >
            <Icon className="setting30"/><span className="blind">??????</span>
          </Button>
        </div>
        <div className="sec-tit-btn">
          <NavLink className="btn-more" to={lecturePaths.recommend()}>
            <PolyglotText id="main-viewall" defaultString="????????????" />
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
              {favoriteChannelIds.map((id) => {
                return (
                  <Label
                    as="button"
                    className={`ch ${selectedChannelId === id ? 'active' : ''}`}
                    key={id}
                    onClick={() => {
                      setSelectedChannelId(id);
                      // setChannelOpend(false);
                    }}
                  >
                    {getChannelName(id)}
                  </Label>
                );
              })}
            </div>
          </div>
        </div>
        <div
          className="cardSwiper swiper-no-txticon"
          data-action-name="????????????"
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
                          useBookMark={true} // bookMark ????????? ???????????? true, ???????????? ????????? false
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
              <span className="blind">????????? ??????</span>
              <div className="text02">
                {getPolyglotText(
                  '???????????? ????????? ???????????? ?????? ??????????????? ????????????.',
                  'rcmd-??????-????????????'
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Segment>
  );
}
