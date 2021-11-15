import React, { Component } from 'react';
import { mobxHelper, reactAutobind } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { patronInfo } from '@nara.platform/dock';

import { ReviewService } from '@nara.drama/feedback';
import { CubeType } from 'shared/model';
import { NoSuchContentPanel, Loadingpanel } from 'shared';
import { ChannelModel } from 'college/model';
import { InMyLectureCdoModel, InMyLectureModel } from 'myTraining/model';
import { InMyLectureService } from 'myTraining/stores';
import { LectureService } from '../../../stores';
import { LectureModel, LectureServiceType, OrderByType } from '../../../model';
import routePaths from '../../../routePaths';
import { Lecture } from '../../../shared';
import { Segment } from 'semantic-ui-react';
import { CardWithCardRealtedCount } from '../../../model/CardWithCardRealtedCount';
import CardView from '../../../shared/Lecture/ui/view/CardVIew';
import {
  parseLanguage,
  parsePolyglotString,
} from 'shared/viewmodel/PolyglotString';
import { Area } from '@sku/skuniv-ui-lecture-card/lib/views/lectureCard.models';
import {
  LectureCardView,
  parseCommunityLectureCard,
} from '@sku/skuniv-ui-lecture-card';
import { SkProfileService } from '../../../../profile/stores';
import { getPolyglotText } from '../../../../shared/ui/logic/PolyglotText';
import Swiper from 'react-id-swiper';
import CardGroup, {
  GroupType,
} from '../../../shared/Lecture/sub/CardGroup/CardGroupContainer2';

const SwiperProps = {
  slidesPerView: 4,
  spaceBetween: 7,
  slidesPerGroup: 4,
  loop: false,
  loopFillGroupWithBlank: true,
  navigation: {
    nextEl: '.' + 'swiperCollege' + ' .swiper-button-next',
    prevEl: '.' + 'swiperCollege' + ' .swiper-button-prev',
  },
  speed: 500,
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
  cardWithCardRealtedCounts: CardWithCardRealtedCount[];
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
    const { results: cardWithCardRealtedCounts, totalCount } =
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
      cardWithCardRealtedCounts,
      totalCount,
    });
  }

  onActionLecture(lecture: LectureModel | InMyLectureModel) {
    //
    const { inMyLectureService } = this.props;
    if (lecture instanceof InMyLectureModel) {
      inMyLectureService!
        .removeInMyLecture(lecture.id)
        .then(() =>
          inMyLectureService!.removeInMyLectureInAllList(
            lecture.serviceId,
            lecture.serviceType
          )
        );
    } else {
      inMyLectureService!
        .addInMyLecture(
          new InMyLectureCdoModel({
            serviceId: lecture.serviceId,
            serviceType: lecture.serviceType,
            category: lecture.category,
            name: lecture.name ? parsePolyglotString(lecture.name) : '',
            description: lecture.description,
            cubeType: lecture.cubeType,
            learningTime: lecture.learningTime,
            stampCount: lecture.stampCount,
            coursePlanId: lecture.coursePlanId,

            requiredSubsidiaries: lecture.requiredSubsidiaries,
            cubeId: lecture.cubeId,
            courseSetJson: lecture.courseSetJson,
            courseLectureUsids: lecture.courseLectureUsids,
            lectureCardUsids: lecture.lectureCardUsids,

            reviewId: lecture.reviewId,
            baseUrl: lecture.baseUrl,
            servicePatronKeyString: lecture.patronKey.keyString,
          })
        )
        .then(() =>
          inMyLectureService!.addInMyLectureInAllList(
            lecture.serviceId,
            lecture.serviceType
          )
        );
    }
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
            dataArea={Area.MAIN_REQUIRED}
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
                <Swiper {...SwiperProps}>
                  {cardWithCardRealtedCounts.map(
                    ({ card, cardRelatedCount }) => {
                      return (
                        <CardGroup type={GroupType.Wrap}>
                          <LectureCardView
                            {...parseCommunityLectureCard(cards, userLanguage)}
                            useBookMark={true}
                            dataArea={Area.EXPERT_LECTURE}
                          />
                          {/*<LectureCardView*/}
                          {/*  cardId={card.id}*/}
                          {/*  cardName={parsePolyglotString(card.name)}*/}
                          {/*  learningTime={card.learningTime.toString()}*/}
                          {/*  passedStudentCount={cardRelatedCount.passedStudentCount.toString()}*/}
                          {/*  starCount={cardRelatedCount.starCount.toString()}*/}
                          {/*  thumbnailImagePath={card.thumbImagePath}*/}
                          {/*  langSupports={card.langSupports}*/}
                          {/*  simpleDescription={parsePolyglotString(*/}
                          {/*    card.simpleDescription*/}
                          {/*  )}*/}
                          {/*  studentCount={cardRelatedCount.studentCount}*/}
                          {/*  //??*/}
                          {/*  isRequiredLecture={false}*/}
                          {/*  // upcomingClassroomInfo={}*/}
                          {/*  difficultyLevel={card.difficultyLevel}*/}
                          {/*  collegeId={collegeId}*/}
                          {/*  userLanguage={userLanguage}*/}
                          {/*  useBookMark={true}*/}
                          {/*  dataArea={Area.EXPERT_LECTURE}*/}
                          {/*/>*/}
                        </CardGroup>
                      );
                    }
                  )}
                </Swiper>
                <div className="swiperCollege">
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
