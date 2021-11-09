import React, { useEffect, useState } from 'react';
import { Card, Icon, Label, Segment } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { CardBundle } from '../../../../lecture/shared/model/CardBundle';
import { findAvailableCardBundles } from '../../../../lecture/shared/api/arrangeApi';
import Swiper from 'react-id-swiper';
import { parsePolyglotString } from '../../../../shared/viewmodel/PolyglotString';
import { timeToHourMinuteFormat } from '../../../../shared/helper/dateTimeHelper';

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
  }, []);

  return (
    <Segment className="full learning-section type5">
      <div className="section-head">
        <div className="sec-tit-txt">
          구성원이 찾는 <strong>인기키워드</strong>
        </div>
        {/* <KeywordTags /> */}
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
