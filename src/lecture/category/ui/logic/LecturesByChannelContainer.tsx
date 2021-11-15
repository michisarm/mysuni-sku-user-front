import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
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
        <Lecture.LineHeader
          channel={channel}
          title={
            <>
              의 학습 과정입니다.{' '}
              <span className="channel">({totalCount})</span>
            </>
          }
          onViewAll={this.onViewAll}
        />
        {isLoading ? (
          <Segment
            style={{
              paddingTop: 0,
              paddingBottom: 0,
              paddingLeft: 0,
              paddingRight: 0,
              height: 400,
              boxShadow: '0 0 0 0',
              border: 0,
            }}
          >
            <Loadingpanel loading={isLoading} />
          </Segment>
        ) : (
          (cardWithCardRealtedCounts.length && (
            <Lecture.Group type={Lecture.GroupType.Line}>
              {cardWithCardRealtedCounts.map((cards, i) => {
                return (
                  <li key={i}>
                    <Lecture.Group type={Lecture.GroupType.Box}>
                      <LectureCardView
                        {...parseCommunityLectureCard(cards, userLanguage)}
                        useBookMark={true}
                        dataArea={Area.EXPERT_LECTURE}
                      />
                    </Lecture.Group>
                  </li>
                );
              })}
            </Lecture.Group>
          )) || <NoSuchContentPanel message="등록된 학습 과정이 없습니다." />
        )}
      </>
    );
  }
}

export default withRouter(LecturesByChannelContainer);
