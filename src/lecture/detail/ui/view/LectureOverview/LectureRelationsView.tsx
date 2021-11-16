import { patronInfo } from '@nara.platform/dock';
import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Icon, Label, Segment } from 'semantic-ui-react';
import LectureModel from '../../../../model/LectureModel';

import BoxCardView from '../../../../shared/Lecture/ui/view/BoxCardView';
import LectureRelations from '../../../viewModel/LectureOverview/LectureRelations';
import lectureRoutePaths from '../../../../routePaths';
import { useLectureCardSummary } from '../../../store/LectureOverviewStore';
import { hoverTrack, scrollHorizontalTrack } from 'tracker/present/logic/ActionTrackService';
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
    state = '권장과정';
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

const LectureRelationsView: React.FC<LectureRelationsViewProps> = function LectureRelationsView({
  lectureRelations,
}) {
  const lectureSummary = useLectureCardSummary();
  const userLanguage = SkProfileService.instance.skProfile.language;

  const cards = parseUserLectureCards(lectureRelations.cards, userLanguage);

  return (
    <div
      className="badge-detail border-none"
      id="lms-related-process"
      data-area={Area.CARD_RELATION}
      onScroll={(e: React.UIEvent<HTMLElement, UIEvent>) =>
        scrollHorizontalTrack({
          e,
          area: Area.CARD_RELATION,
          scrollClassName: 'scrolling',
          actionName: '카드상세 관련과정 스크롤',
        })
      }
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
                    defaultString="관련과정"
                    id="Course-Contents-관련과정"
                  />
                </span>
              </Label>
            </h3>
          </div>
        </div>
        <div className="section-body">
          <div className="cardSwiper">
            <Swiper {...SwiperProps}>
              {cards.map((card) => {
                return (
                  <div className="swiper-slide" key={card.cardId}>
                    <CardGroup type={GroupType.Wrap}>
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
