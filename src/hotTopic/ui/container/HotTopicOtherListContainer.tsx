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

  // swiper instance
  const [swiper, setSwiper] = useState<any>(null);
  const [play, setPlay] = useState(true); // auto play 기준

  const topicGridSwiper = {
    loop: false,
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

  useEffect(() => {
    if (
      swiper !== null &&
      swiper.autoplay !== undefined &&
      typeof swiper === 'object'
    ) {
      if (play) {
        swiper.autoplay.start();
      } else {
        swiper.autoplay.stop();
      }
    }
  }, [swiper, play]);

  const onClickAutoPlayBtn = () => {
    setPlay(!play);
  };

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
                {hotTopicList.map((hotTopic, index, elements) => {
                  const next =
                    elements && index + 1 < elements.length
                      ? elements[index + 1]
                      : undefined;
                  if (index % 2 !== 0) {
                    return <></>;
                  }
                  return (
                    <div
                      key={`other-hottopic-${index}`}
                      className="swiper-slide"
                    >
                      <HotTopicView
                        key={`other-hottopic-view-${index}`}
                        hotTopicViewModel={hotTopic}
                      />
                      {next && (
                        <HotTopicView
                          key={`other-hottopic-view2-${index + 1}`}
                          hotTopicViewModel={next}
                        />
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
