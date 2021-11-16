import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LectureCardView } from '@sku/skuniv-ui-lecture-card';
import { SkProfileService } from '../../../../profile/stores';
import { RecommendCardRom } from '../../../model/RecommendCardRom';
import CardView from '../../../shared/Lecture/ui/view/CardVIew';
import { NoSuchContentPanel } from 'shared';
import { Area } from '@sku/skuniv-ui-lecture-card/lib/views/lectureCard.models';
import {
  hoverTrack,
  scrollHorizontalTrack,
} from 'tracker/present/logic/ActionTrackService';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../../shared/ui/logic/PolyglotText';
import { getChannelName } from '../../../../shared/service/useCollege/useRequestCollege';
import { DifficultyLevel } from 'personalcube/cubeintro/model';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import isIncludeCineroomId from 'shared/helper/isIncludeCineroomId';
import Swiper from 'react-id-swiper';
import CardGroup, { GroupType } from 'lecture/shared/Lecture/sub/CardGroup';
import { Segment } from 'semantic-ui-react';
import { timeToHourMinuteFormat } from '../../../../shared/helper/dateTimeHelper';
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
    if(swiper && swiper.isEnd){
      scrollSwiperHorizontalTrack({
        element: swiper.el,
        area: Area.RECOMMEND_LIST,
        scrollClassName: 'cardSwiper',
        actionName: '추천카드 스크롤',
      })  
    }
  }
  //
  const userLanguage = SkProfileService.instance.skProfile.language;

  const { channelId, cardCount, totalCardCount, cardForUserViewRdos } = props;

  const isCardWithRelatedCountRoms =
    cardForUserViewRdos == null || cardForUserViewRdos.length < 0
      ? false
      : true;

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
              '<b>{channel}</b>채널에서 {name}님께 추천하는 과정입니다.',
              'rcmd-추천-Channel',
              {
                channel: getChannelName(channelId) || '',
                name: SkProfileService.instance.profileMemberName || '',
              }
            ),
          }}
        />{' '}
        <span className="channel">{`(${getCardCount()})`}</span>
        {isCardWithRelatedCountRoms && (
          <div className="right">
            <Link to={`/lecture/recommend/channel/${channelId}`}>
              <button className="ui icon button right btn-more">
                전체보기
                {/* <PolyglotText
                  defaultString="View all"
                  id="rcmd-추천-ViewAll2"
                /> */}
                <i aria-hidden="true" className="icon morelink" />
              </button>
            </Link>
          </div>
        )}
      </div>

      <div className="section-body">
        <div className="cardSwiper">
          {(isCardWithRelatedCountRoms && (
            <>
              <Swiper {...SwiperProps} getSwiper={s => updateSwiper(s)}>
                {isCardWithRelatedCountRoms &&
                  cardForUserViewRdos.map((item) => {
                    return (
                      <div className={`${channelId}-${swipeName} swiper-slide`}>
                        <CardGroup type={GroupType.Wrap} key={item.id}>
                          <LectureCardView
                            cardId={item.id}
                            cardName={parsePolyglotString(item.name)}
                            learningTime={timeToHourMinuteFormat(
                              item.learningTime
                            )}
                            thumbnailImagePath={item.thumbnailImagePath}
                            passedStudentCount={item.passedStudentCount.toString()}
                            starCount={item.starCount.toString()}
                            simpleDescription={parsePolyglotString(
                              item.simpleDescription
                            )}
                            difficultyLevel={
                              item.difficultyLevel || DifficultyLevel.Basic
                            }
                            userLanguage={userLanguage}
                            studentCount={item.studentCount}
                            langSupports={item.langSupports}
                            useBookMark={true}
                            // 체크 필요
                            isRequiredLecture={item.required}
                            collegeId={item.mainCollegeId}
                            dataArea={Area.RECOMMEND_LIST}
                            hoverTrack={hoverTrack}
                          />
                        </CardGroup>
                      </div>
                    );
                  })}
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
