import { useHotTopicListViewModel } from 'hotTopic/store/HotTopicStore';
import { SkProfileService } from 'profile/stores';
import React, { useEffect, useRef, useState } from 'react';
import Swiper from 'react-id-swiper';
import { Icon } from 'semantic-ui-react';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';
import { HotTopicView } from '../view/HotTopicView';

export function HotTopicOtherListContainer() {
  const hotTopicList = useHotTopicListViewModel();
  const swipeName = 'swiperOtherTopics';

  const [swiper, setSwiper] = useState<any>(null);

  const topicGridSwiper = {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
      el: '.' + swipeName + ' .swiper-pagination',
      clickable: true,
    },
    autoplay: {
      delay: 5000,
    },
    speed: 500,
    getSwiper: setSwiper,
  };

  // swiper instance
  const [play, setPlay] = useState(true); // auto play 기준

  // useEffect(() => {
  //   const swiperInstance = document.querySelector('.swiper-container')?.swiper;

  //   setSwiper(swiperInstance);
  // }, []);

  useEffect(() => {
    if (
      swiper !== null &&
      swiper.autoplay !== undefined &&
      typeof swiper === 'object'
    ) {
      if (play) {
        swiper.autoplay.start();
        console.log('swiper start');
      } else {
        swiper.autoplay.stop();
        console.log('swiper stop');
      }
    }
  }, [swiper, play]);

  const onClickAutoPlayBtn = () => {
    setPlay(!play);
  };

  //const swiperRef = useRef(null);
  // const onClickAutoPlayBtn2 = () => {
  //   if (swiperRef.current && swiperRef.current.swiper) {
  //     if (play) {
  //       swiperRef.current.swiper.autoplay.start();
  //     } else {
  //       swiperRef.current.swiper.autoplay.stop();
  //     }
  //   }
  // }

  return (
    <>
      {hotTopicList && hotTopicList.length > 0 && (
        <div className="side-area">
          <div className="aside-inner">
            <div
              className="aside-tit"
              dangerouslySetInnerHTML={{
                __html: getPolyglotText(
                  '<strong>{name} 님</strong><br />다른 Hot Topic은 어떠세요?',
                  'hottopic-title-다른ht',
                  { name: SkProfileService.instance.profileMemberName }
                ),
              }}
            />
            <div className="cardSwiper othertopicSwiper common-swiper1">
              <Swiper {...topicGridSwiper}>
                {hotTopicList.map((hotTopic, index) => {
                  index++;
                  return (
                    <div className="swiper-slide">
                      <HotTopicView hotTopic={hotTopic} />
                      {index < hotTopicList.length && (
                        <HotTopicView hotTopic={hotTopicList[index]} />
                      )}
                    </div>
                  );
                })}
              </Swiper>
              <div className={swipeName}>
                {/* <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div> */}
                <div className="swiper-navi-wrap">
                  <div className="swiper-pagination" />
                  <div className="btn-play">
                    {!play && <Icon name="play" onClick={onClickAutoPlayBtn} />}
                    {play && <Icon name="pause" onClick={onClickAutoPlayBtn} />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
