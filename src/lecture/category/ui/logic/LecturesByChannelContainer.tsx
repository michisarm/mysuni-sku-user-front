import React, { useEffect, useState, Component } from 'react';
import { mobxHelper, reactAutobind } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { patronInfo } from '@nara.platform/dock';

import { ReviewService } from '@nara.drama/feedback';
import { ChannelModel } from 'college/model';
import { LectureService } from '../../../stores';
import { LectureServiceType, OrderByType } from '../../../model';
import routePaths from '../../../routePaths';
import { Segment } from 'semantic-ui-react';
import {
  parseLanguage,
  parsePolyglotString,
} from 'shared/viewmodel/PolyglotString';
import {
  Area,
  UserLectureCard,
} from '@sku/skuniv-ui-lecture-card/lib/views/lectureCard.models';
import { hoverTrack } from 'tracker/present/logic/ActionTrackService';
import {
  LectureCardView,
  parseUserLectureCards,
} from '@sku/skuniv-ui-lecture-card';
import { SkProfileService } from '../../../../profile/stores';
import { getPolyglotText } from '../../../../shared/ui/logic/PolyglotText';
import Swiper from 'react-id-swiper';
import CardGroup, {
  GroupType,
} from '../../../shared/Lecture/sub/CardGroup/CardGroupContainer2';
import { scrollSwiperHorizontalTrack } from 'tracker/present/logic/ActionTrackService';

const SwiperProps = (swiperName: string) => {
  return {
    observer: true,
    observerParents: true,
    slidesPerView: 4,
    spaceBetween: 7,
    slidesPerGroup: 4,
    loop: false,
    loopFillGroupWithBlank: true,
    navigation: {
      nextEl: '.' + swiperName + ' .swiper-button-next',
      prevEl: '.' + swiperName + ' .swiper-button-prev',
    },
    speed: 500,
  };
};

interface Props extends RouteComponentProps<Params> {
  lectureService?: LectureService;
  reviewService?: ReviewService;
  channel: ChannelModel;
  onViewAll: (e: any, data: any) => void;
}

interface Params {
  collegeId: string;
}

interface State {
  cardWithCardRealtedCounts: UserLectureCard[];
  totalCount: number;
  isLoading: boolean;
  swiper: any;
}

@inject(
  mobxHelper.injectFrom(
    'lecture.lectureService',
    'shared.reviewService',
    'myTraining.inMyLectureService'
  )
)
@reactAutobind
@observer
class LecturesByChannelContainer extends Component<Props, State> {
  //
  PAGE_SIZE = 8;

  constructor(props: Props) {
    super(props);
    this.state = {
      cardWithCardRealtedCounts: [],
      totalCount: 0,
      isLoading: false,
      swiper: null,
    };
  }

  componentDidMount() {
    //
    this.findLectures();
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    const { channel } = this.props;
    const { channel: prevChannel } = prevProps;

    if (channel && channel.id !== prevChannel.id) this.findLectures();

    const { swiper } = this.state;
    swiper.on('slideChange', () => this.onSlideChangeHandler(swiper));
  }

  componentWillUnmount() {
    const { swiper } = this.state;
    if (swiper !== null) {
      swiper.off('slideChange', () => this.onSlideChangeHandler(swiper));
    }
  }

  onSlideChangeHandler = (swiper: any) => {
    if (swiper && swiper.isEnd) {
      scrollSwiperHorizontalTrack({
        element: swiper.el,
        area: Area.COLLEGE_CARD,
        scrollClassName: 'cardSwiper',
        actionName: 'COLLEGE 스크롤',
      });
    }
  };

  async findLectures() {
    //
    const { lectureService, channel } = this.props;

    this.setState({ isLoading: true });
    const { results, totalCount } =
      await lectureService!.findPagingChannelLectures(
        channel.id,
        this.PAGE_SIZE,
        0,
        OrderByType.Time
      );

    this.setState({
      cardWithCardRealtedCounts: results,
      totalCount,
    });
  }

  onViewDetail(e: any, data: any) {
    //
    const { model } = data;
    const { history } = this.props;
    const collegeId = model.category.college.id;
    const cineroom =
      patronInfo.getCineroomByPatronId(model.servicePatronKeyString) ||
      patronInfo.getCineroomByDomain(model)!;

    if (model.serviceType === LectureServiceType.Card) {
      // history.push(routePaths.courseOverviewPrev(collegeId, model.coursePlanId, model.serviceType, model.serviceId));
      history.push(routePaths.courseOverview(model.cardId));
    } else {
      // history.push(routePaths.lectureCardOverviewPrev(collegeId, model.cubeId, model.serviceId));
      history.push(routePaths.lectureCardOverview(model.cardId, model.cubeId));
    }
  }

  onViewAll(e: any) {
    const { channel, onViewAll } = this.props;

    onViewAll(e, {
      channel,
    });
  }

  render() {
    //
    const { channel, reviewService } = this.props;
    const { collegeId } = this.props.match.params;
    const { cardWithCardRealtedCounts, totalCount, isLoading } = this.state;
    const { ratingMap } = reviewService as ReviewService;
    const userLanguage = SkProfileService.instance.skProfile.language;

    return (
      <>
        <div className="leaning-section-wrap">
          <Segment
            className="full learning-section type1"
            data-area={Area.COLLEGE_CARD}
          >
            <div className="section-head">
              <div className="sec-tit-txt">
                <div
                  className="section-count-big"
                  dangerouslySetInnerHTML={{
                    __html: getPolyglotText(
                      '<strong>{name}</strong> 의 학습 과정 입니다. <strong>({count})</strong>',
                      'cicl-목록-학습과정',
                      {
                        name: parsePolyglotString(channel.name),
                        count: totalCount + '',
                      }
                    ),
                  }}
                />
              </div>
              <div className="sec-tit-btn">
                <button className="btn-more" onClick={this.onViewAll}>
                  전체보기
                </button>
              </div>
            </div>
            <div className="section-body">
              <div
                className="cardSwiper"
                data-action-name={
                  parsePolyglotString(channel.name, 'ko') +
                  `의 학습 과정 입니다`
                }
              >
                <Swiper
                  {...SwiperProps(channel.id)}
                  getSwiper={(s) => this.setState({ swiper: s })}
                >
                  {parseUserLectureCards(
                    cardWithCardRealtedCounts,
                    userLanguage
                  ).map((card, i) => {
                    return (
                      <div className="swiper-slide" key={card.cardId}>
                        <CardGroup type={GroupType.Wrap}>
                          <LectureCardView
                            {...card}
                            useBookMark={true}
                            dataArea={Area.COLLEGE_CARD}
                            hoverTrack={hoverTrack}
                          />
                        </CardGroup>
                      </div>
                    );
                  })}
                </Swiper>
                <div className={channel.id}>
                  <div className="swiper-button-prev" />
                  <div className="swiper-button-next" />
                </div>
              </div>
            </div>
          </Segment>
        </div>
      </>
    );
  }
}

export default withRouter(LecturesByChannelContainer);
