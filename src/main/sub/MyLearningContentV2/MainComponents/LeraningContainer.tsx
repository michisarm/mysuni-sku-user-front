/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { NoSuchContentPanel } from 'shared';
import { ContentWrapper } from '../MyLearningContentElementsView';
import ReactGA from 'react-ga';
import { findCardFromCardBundle } from '../../../../lecture/detail/api/cardApi';
import { CardBundle } from '../../../../lecture/shared/model/CardBundle';
import CardGroup, {
  GroupType,
} from '../../../../lecture/shared/Lecture/sub/CardGroup';
import {
  parseLanguage,
  parsePolyglotString,
} from 'shared/viewmodel/PolyglotString';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';
import {
  CardProps,
  LectureCardView,
  parseUserLectureCards,
} from '@sku/skuniv-ui-lecture-card';
import { SkProfileService } from '../../../../profile/stores';
import { Area } from '@sku/skuniv-ui-lecture-card/lib/views/lectureCard.models';
import Swiper from 'react-id-swiper';

interface Props extends RouteComponentProps {
  profileMemberName?: string;
  cardBundle: CardBundle;
}

const LearningContainer: React.FC<Props> = function LearningContainer({
  cardBundle,
  history,
}) {
  const [dataArea, setDataArea] = useState<Area>();
  const [cardList, setCardList] = useState<CardProps[]>([]);
  const isRecommend = cardBundle.type === 'Recommended';

  const fetchCardList = async () => {
    const userLanguage = parseLanguage(
      SkProfileService.instance.skProfile.language
    );

    if (cardBundle.cardIds) {
      const cardList = await findCardFromCardBundle(
        cardBundle.cardIds,
        8,
        false
      );

      if (cardList !== undefined) {
        setCardList(parseUserLectureCards(cardList, userLanguage));
      }
    }
  };

  useEffect(() => {
    fetchCardList();
  }, []);

  const onViewAll = () => {
    const { id, type } = cardBundle;

    window.sessionStorage.setItem('from_main', 'TRUE');

    if (type === 'HotTopic') {
      history.push(`/hot-topic/${id}`);
    } else {
      history.push(`/my-training/new-learning/${id}/pages/1`);
    }

    // react-ga event
    ReactGA.event({
      category: type,
      action: 'Click',
      label: `${type} 전체보기`,
    });
  };

  useEffect(() => {
    const { type } = cardBundle;
    switch (type) {
      case 'Normal':
        setDataArea(Area.MAIN_NORMAL);
        break;
      case 'New':
        setDataArea(Area.MAIN_NEW);
        break;
      case 'Popular':
        setDataArea(Area.MAIN_POPULAR);
        break;
      case 'Recommended':
        setDataArea(Area.MAIN_RECOMMEND);
        break;
    }
  }, [cardBundle]);
  const swipeName = useMemo(() => {
    switch (cardBundle.type) {
      case 'New':
        return 'swiperNew';
      case 'Popular':
        return 'swiperPopular';
    }
    return 'swiperNormal';
  }, [cardBundle.type]);

  // if (cardList.length === 0) {
  //   return (
  //     <ContentWrapper dataArea={Area.MAIN_REQUIRED}>
  //       <div className="section-head">
  //         <div
  //           className="sec-tit-txt"
  //           dangerouslySetInnerHTML={{
  //             __html: parsePolyglotString(cardBundle?.displayText),
  //           }}
  //         />
  //         <div className="sec-tit-btn">
  //           <button className="btn-more" onClick={onViewAll}>
  //           <PolyglotText id="main-viewall" defaultString="전체보기" />
  //           </button>
  //         </div>
  //       </div>
  //       <NoSuchContentPanel
  //         message={
  //           <div
  //             className="text"
  //             dangerouslySetInnerHTML={{
  //               __html: getPolyglotText(
  //                 `{bundleName}에 해당하는 학습 과정이 없습니다.`,
  //                 'home-bundleName-title',
  //                 {
  //                   bundleName: parsePolyglotString(cardBundle.displayText),
  //                 }
  //               ),
  //             }}
  //           />
  //         }
  //       />
  //     </ContentWrapper>
  //   );
  // }

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

  const title = useMemo<string>(() => {
    switch (cardBundle.type) {
      case 'New':
        return getPolyglotText(
          '따끈따끈 <strong>신규 과정</strong>',
          'main-new'
        );
      case 'Popular':
        return getPolyglotText(
          '<strong>인기 과정</strong>을 소개해드려요!',
          'main-popular'
        );
    }
    return parsePolyglotString(cardBundle?.displayText);
  }, [cardBundle.type, cardBundle.displayText]);

  if (cardList.length === 0) {
    return null;
  }

  return (
    <ContentWrapper dataArea={dataArea}>
      <div className="section-head">
        <div
          className="sec-tit-txt"
          dangerouslySetInnerHTML={{
            __html: title,
          }}
        />
        <div className="sec-tit-btn">
          <button className="btn-more" onClick={onViewAll}>
            <PolyglotText id="main-viewall" defaultString="전체보기" />
          </button>
        </div>
      </div>
      <div className="section-body">
        <div className="cardSwiper">
          <Swiper {...SwiperProps}>
            {cardList.map((item, i) => {
              return (
                <div className="swiper-slide" key={item.cardId}>
                  <CardGroup type={GroupType.Wrap}>
                    <LectureCardView
                      {...item}
                      useBookMark={true} // bookMark 기능을 사용하면 true, 사용하지 않으면 false
                      dataArea={Area.MAIN_REQUIRED}
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
    </ContentWrapper>
  );
};

export default withRouter(LearningContainer);
