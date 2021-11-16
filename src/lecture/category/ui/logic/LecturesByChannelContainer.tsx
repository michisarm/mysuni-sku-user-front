import React, { Component } from 'react';
import { mobxHelper, reactAutobind } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { patronInfo } from '@nara.platform/dock';

import { ReviewService } from '@nara.drama/feedback';
import { ChannelModel } from 'college/model';
import { InMyLectureService } from 'myTraining/stores';
import { LectureService } from '../../../stores';
import { LectureModel, LectureServiceType, OrderByType } from '../../../model';
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
  inMyLectureService?: InMyLectureService;
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
  }

  async findLectures() {
    //
    const { lectureService, reviewService, inMyLectureService, channel } =
      this.props;

    this.setState({ isLoading: true });
    const { results, totalCount } =
      await lectureService!.findPagingChannelLectures(
        channel.id,
        this.PAGE_SIZE,
        0,
        OrderByType.Time
      );
    inMyLectureService!.findAllInMyLectures().then(() => {
      this.setState({
        isLoading: false,
      });
    });

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
    const { channel, reviewService, inMyLectureService } = this.props;
    const { collegeId } = this.props.match.params;
    const { cardWithCardRealtedCounts, totalCount, isLoading } = this.state;
    const { ratingMap } = reviewService as ReviewService;
    const { inMyLectureMap } = inMyLectureService as InMyLectureService;
    const userLanguage = parseLanguage(
      SkProfileService.instance.skProfile.language
    );

    return (
      <>
        <div className="leaning-section-wrap">
          <Segment
            className="full learning-section type1"
            data-area={Area.EXPERT_LECTURE}
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
              <div className="cardSwiper">
                <Swiper {...SwiperProps(channel.id)}>
                  {parseUserLectureCards(cardWithCardRealtedCounts).map(
                    (card, i) => {
                      return (
                        <div className="swiper-slide" key={card.cardId}>
                          <CardGroup type={GroupType.Wrap}>
                            <LectureCardView
                              {...card}
                              userLanguage={userLanguage}
                              useBookMark={true}
                              dataArea={Area.EXPERT_LECTURE}
                              hoverTrack={hoverTrack}
                            />
                          </CardGroup>
                        </div>
                      );
                    }
                  )}
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
