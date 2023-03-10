import { patronInfo } from '@nara.platform/dock';
import React, { useCallback, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Icon, Label, Segment } from 'semantic-ui-react';
import LectureModel from '../../../../model/LectureModel';

import BoxCardView from '../../../../shared/Lecture/ui/view/BoxCardView';
import LectureRelations from '../../../viewModel/LectureOverview/LectureRelations';
import lectureRoutePaths from '../../../../routePaths';
import { useLectureCardSummary } from '../../../store/LectureOverviewStore';
import {
  hoverTrack,
  scrollHorizontalTrack,
} from 'tracker/present/logic/ActionTrackService';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';
import {
  LectureCardView,
  parseUserLectureCards,
} from '@sku/skuniv-ui-lecture-card';
import { Area } from '@sku/skuniv-ui-lecture-card/lib/views/lectureCard.models';
import { SkProfileService } from '../../../../../profile/stores';
import Swiper from 'react-id-swiper';
import CardGroup from 'semantic-ui-react/dist/commonjs/views/Card/CardGroup';
import { GroupType } from '../../../../shared/Lecture/sub/CardGroup';
import { scrollSwiperHorizontalTrack } from 'tracker/present/logic/ActionTrackService';

interface LectureRelationsViewProps {
  lectureRelations: LectureRelations;
}

interface LectureViewProps {
  model: LectureModel;
  thumbnailImage?: string;
  rating?: number;
}

const SwiperProps = {
  slidesPerView: 4,
  spaceBetween: 7,
  slidesPerGroup: 4,
  loop: false,
  loopFillGroupWithBlank: true,
  navigation: {
    nextEl: '.swiperRelations .swiper-button-next',
    prevEl: '.swiperRelations .swiper-button-prev',
  },
  speed: 500,
};

const LectureView: React.FC<LectureViewProps> = function LectureView({
  model,
  thumbnailImage,
  rating,
}) {
  const [hovered, setHovered] = useState<boolean>(false);
  const history = useHistory();

  const onHoverIn = useCallback(() => {
    setHovered(true);
  }, []);

  const onHoverOut = useCallback(() => {
    setHovered(false);
  }, []);

  const onViewDetail = useCallback(
    (_: any) => {
      const cineroom = patronInfo.getCineroomByDomain(model)!;

      history.push(lectureRoutePaths.courseOverview(model.cardId));
    },
    [history, model]
  );

  let state = model.state;
  let date;

  if (model.required && !state) {
    state = '????????????';
    rating = undefined;
    date = undefined;
  } else if (state) {
    rating = undefined;
    date = model.timeStrByState;
  }

  return (
    <li>
      <CardGroup type={GroupType.Box}>
        <BoxCardView
          model={model}
          hovered={hovered}
          rating={rating}
          state={state}
          date={date}
          thumbnailImage={thumbnailImage}
          onViewDetail={onViewDetail}
          onHoverIn={onHoverIn}
          onHoverOut={onHoverOut}
        />
      </CardGroup>
    </li>
  );
};

const LectureRelationsView: React.FC<LectureRelationsViewProps> =
  function LectureRelationsView({ lectureRelations }) {
    const lectureSummary = useLectureCardSummary();
    const userLanguage = SkProfileService.instance.skProfile.language;

    const cards = parseUserLectureCards(lectureRelations.cards, userLanguage);

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
          area: Area.CARD_RELATION,
          scrollClassName: 'cardSwiper',
          actionName: '???????????? ???????????? ?????????',
        });
      }
    }

    return (
      <div
        className="badge-detail border-none"
        id="lms-related-process"
        data-area={Area.CARD_RELATION}
      >
        <div className="ov-paragraph">
          <div className="section-head">
            <div className="title">
              <h3 className="title-style">
                <Label className="onlytext bold size24">
                  <Icon className="before" />
                  <span>
                    {/*Tag*/}
                    <PolyglotText
                      defaultString="????????????"
                      id="Course-Contents-????????????"
                    />
                  </span>
                </Label>
              </h3>
            </div>
          </div>
          <div className="section-body">
            <div className="cardSwiper" data-action-name={lectureSummary?.name}>
              <Swiper {...SwiperProps} getSwiper={(s) => updateSwiper(s)}>
                {cards.map((card) => {
                  return (
                    <div className="swiper-slide" key={card.cardId}>
                      <CardGroup className="card-warp">
                        <LectureCardView
                          {...card}
                          useBookMark
                          dataArea={Area.CARD_RELATION}
                          hoverTrack={hoverTrack}
                        />
                      </CardGroup>
                    </div>
                  );
                })}
              </Swiper>
              <div className="swiperRelations">
                <div className="swiper-button-prev" />
                <div className="swiper-button-next" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default LectureRelationsView;
