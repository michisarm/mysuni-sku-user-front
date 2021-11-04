import { useHotTopicListViewModel } from 'hotTopic/store/HotTopicStore';
import { SkProfileService } from 'profile/stores';
import React from 'react';
import Swiper from 'react-id-swiper';
import { Icon } from 'semantic-ui-react';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';
import { HotTopicView } from '../view/HotTopicView';

export function HotTopicOtherListContainer() {
  const hotTopicList = useHotTopicListViewModel();
  const swipeName = 'swiperOtherTopics';
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
                    <Icon name="play" />
                    <Icon name="pause" />
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
