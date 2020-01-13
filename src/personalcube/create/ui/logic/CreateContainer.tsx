import React from 'react';
import { mobxHelper, reactAutobind } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import { ReviewService } from '@nara.drama/feedback';
import { Menu, Segment, Sticky } from 'semantic-ui-react';

import { ContentLayout, CubeState, CubeType, PageService } from 'shared';
import { PersonalCubeService } from 'personalcube/personalcube';
import { InMyLectureCdoModel, InMyLectureModel, InMyLectureService } from 'myTraining';
import lectureRoutePaths from 'lecture/routePaths';
import myTrainingRoutePaths from 'myTraining/routePaths';
import { SkProfileService } from 'profile';
import { ChannelModel } from 'college';
import { LectureCardService, LectureModel, LectureService } from 'lecture';
import { SeeMoreButton } from 'lecture/shared';

import CreateProfileView from '../view/CreateProfileView';
import SelectView from '../view/SelectView';
import SelectType from '../../../../shared/model/SelectType';
import CreateListView from '../view/CreateListView';
import NoSuchContentPanel from '../../../../shared/components/NoSuchContentPanel';
import Lecture from '../../../../lecture/shared/Lecture/ui/logic/LectureContainer';
import LectureServiceType from '../../../../lecture/shared/model/LectureServiceType';
import routePaths from '../../../routePaths';
import LineHeaderContainer from '../../../../myTraining/ui/logic/LineHeaderContainer';


interface Props extends RouteComponentProps<{ tab: string }> {
  personalCubeService: PersonalCubeService
  pageService?: PageService,
  lectureService?: LectureService,
  lectureCardService?: LectureCardService,
  inMyLectureService?: InMyLectureService,
  skProfileService?: SkProfileService
  reviewService?: ReviewService
}

interface States {
  activeItem : string
  disabled: boolean
  limit: number
  channels: ChannelModel[]
}

@inject(mobxHelper.injectFrom(
  'personalCube.personalCubeService',
  'shared.pageService',
  'shared.reviewService',
  'lecture.lectureService',
  'lecture.lectureCardService',
  'myTraining.inMyLectureService',
  'profile.skProfileService',
))
@observer
@reactAutobind
class CreateContainer extends React.Component<Props, States> {
  //
  PAGE_KEY = 'lecture.shared';

  PAGE_SIZE = 8;

  state = {
    activeItem: '',
    disabled: false,
    limit: 0,
    channels: [],
  };

  constructor(props: Props) {
    //
    super(props);
    this.init();
  }

  componentDidMount() {
    const { skProfileService, inMyLectureService } = this.props;

    skProfileService!.findSkProfile();
    this.init();
    inMyLectureService!.findAllInMyLectures();
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    //
    const currentTab = this.props.match.params.tab;

    if (prevProps.match.params.tab !== currentTab) {
      this.setTab(currentTab);
    }
  }

  init() {
    //
    const { match, pageService, lectureService } = this.props;

    pageService!.initPageMap(this.PAGE_KEY, 0, this.PAGE_SIZE);
    lectureService!.clearLectures();
    this.setTab(match.params.tab);
  }

  setTab(tab: string) {
    this.setState( { activeItem: tab });

    if (tab === 'Create') {
      this.findAllCubes(20);
    } else {
      this.findPagingSharedLectures();
    }
  }

  handleItemClick(e: any, { name }: any) {
    this.props.history.push(routePaths.createTab(name));
  }

  routeToCreateDetail() {
    this.props.history.push(routePaths.createNew());
  }

  routeToMyPage() {
    this.props.history.push(myTrainingRoutePaths.myPage());
  }

  handleClickCubeRow(personalCubeId: string) {
    //
    const { personalCubeService } = this.props;
    if (personalCubeService) {
      personalCubeService.findPersonalCube(personalCubeId)
        .then(() => {
          const cubeType = personalCubeService.personalCube.contents.type;
          const cubeState = personalCubeService.personalCube.cubeState;
          if (cubeState === CubeState.Created) this.props.history.push(routePaths.createDetail(personalCubeId, cubeType));
          else  this.props.history.push(routePaths.createSharedDetail(personalCubeId, cubeType, cubeState));
        });
    }
  }

  onChangeCubeQueryProps(name: string, value: string | Date | number, nameSub?: string, valueSub?: string | number) {
    const { personalCubeService } = this.props;
    if (personalCubeService && nameSub) {
      personalCubeService.changePersonalCubeQueryProps(name, value, nameSub, valueSub);
    }
    if (personalCubeService && !nameSub) {
      personalCubeService.changePersonalCubeQueryProps(name, value);
    }

    this.findAllCubes(20);
  }

  findAllCubes(limit?: number) {
    const { personalCubeService } = this.props;
    this.setState({ disabled: true });
    if ( personalCubeService && limit) {
      //const offset = 0;
      personalCubeService.changePersonalCubeQueryProps('limit', limit);
      personalCubeService.findAllPersonalCubesByQuery()
        .then(() => {
          const { personalCubes } = this.props.personalCubeService || {} as PersonalCubeService;
          const totalCount = personalCubes.totalCount;
          if (limit >= totalCount) this.setState({ disabled: true });
          else if (limit < totalCount) this.setState({ limit: limit + 20, disabled: false });
        });
    }
  }

  async findPagingSharedLectures() {
    //
    const { pageService, lectureService, reviewService } = this.props;
    const page = pageService!.pageMap.get(this.PAGE_KEY);
    const { channels } = this.state;
    const channelIds = channels.map((channel: ChannelModel) => channel.channelId);

    const lectureOffsetList = await lectureService!.findPagingSharedLectures(page!.limit, page!.nextOffset, channelIds);
    let feedbackIds: string[] = [];
    if (lectureOffsetList && lectureOffsetList.results && lectureOffsetList.results.length) {
      feedbackIds = lectureOffsetList.results.map(lecture => lecture.reviewId);
      reviewService!.findReviewSummariesByFeedbackIds(feedbackIds);
    }
    pageService!.setTotalCountAndPageNo(this.PAGE_KEY, lectureOffsetList.totalCount, page!.pageNo + 1);
  }

  onViewDetail(e: any, data: any) {
    //
    const { model } = data;
    const { history } = this.props;
    const collegeId = model.category.college.id;

    if (model.serviceType === LectureServiceType.Program || model.serviceType === LectureServiceType.Course) {
      history.push(lectureRoutePaths.courseOverview(collegeId, model.coursePlanId, model.serviceType, model.serviceId));
    }
    else if (model.serviceType === LectureServiceType.Card) {
      history.push(lectureRoutePaths.lectureCardOverview(collegeId, model.cubeId, model.serviceId));
    }
  }

  isContentMore() {
    //
    const { pageService } = this.props;
    const page = pageService!.pageMap.get(this.PAGE_KEY);

    return page!.pageNo < page!.totalPages;
  }

  onClickSeeMore() {
    //
    this.findPagingSharedLectures();
  }

  onFilter(channels: ChannelModel[]) {
    //const { activeItem } = this.state;
    const { pageService, lectureService  } = this.props;
    this.setState({ channels }, () => {

      lectureService!.clearLectures();
      pageService!.initPageMap(this.PAGE_KEY, 0, this.PAGE_SIZE);
      this.findPagingSharedLectures();
    });
  }

  onActionLecture(lecture: LectureModel | InMyLectureModel) {
    //
    const { inMyLectureService } = this.props;
    if (lecture instanceof InMyLectureModel) {
      inMyLectureService!.removeInMyLecture(lecture.id)
        .then(() => inMyLectureService!.findAllInMyLectures());
    }
    else {
      inMyLectureService!.addInMyLecture(new InMyLectureCdoModel({
        serviceId: lecture.serviceId,
        serviceType: lecture.serviceType,
        category: lecture.category,
        name: lecture.name,
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
      }))
        .then(() => inMyLectureService!.findAllInMyLectures());
    }
  }

  onRouteToCreate() {
    this.props.history.push(routePaths.createNew());
  }

  renderCreate() {
    const { personalCubes, personalCubeQuery } = this.props.personalCubeService || {} as PersonalCubeService;
    const totalCount = personalCubes.totalCount;
    const result = personalCubes.results;
    const { limit } = this.state;

    return (
      <Segment className="full">
        <SelectView
          totalCount={totalCount}
          personalCubeQuery={personalCubeQuery}
          fieldOption={SelectType.userStatus}
          onChangeCubeQueryProps={this.onChangeCubeQueryProps}
          queryFieldName="cubeState"
        />
        {
          result && result.length && (
            <CreateListView
              result={result}
              totalCount={totalCount}
              handleClickCubeRow={this.handleClickCubeRow}
            />
          ) || (
            <NoSuchContentPanel
              message="아직 생성한 학습이 없습니다."
              link={{ text: 'Create 바로가기', path: routePaths.createNew() }}
            />
          )
        }
        { totalCount > result.length && (
          <SeeMoreButton
            onClick={() => this.findAllCubes(limit)}
          />
        )}
      </Segment>
    );
  }

  renderSharedLecture() {
    const { lectureService, reviewService, inMyLectureService } = this.props;
    const { lectures } = lectureService!;
    const { ratingMap } = reviewService!;
    const { inMyLectureMap } = inMyLectureService!;
    const { channels } = this.state;

    return (
      <Segment className="full">
        <LineHeaderContainer count={lectures && lectures.length || 0} channels={channels} onFilter={this.onFilter} />
        {
          lectures && lectures.length && (
            <div className="section">
              <Lecture.Group type={Lecture.GroupType.Box}>
                {
                  lectures.map((lecture: LectureModel, index: number) => {
                    let rating: number | undefined = ratingMap.get(lecture.reviewId) || 0;
                    const inMyLecture = inMyLectureMap.get(lecture.serviceId) || undefined;
                    if (lecture.cubeType === CubeType.Community) rating = undefined;
                    return (
                      <Lecture
                        key={`lecture-${index}`}
                        model={lecture}
                        rating={rating}
                        // thumbnailImage="http://placehold.it/60x60"
                        action={inMyLecture ? Lecture.ActionType.Remove : Lecture.ActionType.Add}
                        onAction={() => this.onActionLecture(inMyLecture || lecture)}
                        onViewDetail={this.onViewDetail}
                      />
                    );
                  })
                }
              </Lecture.Group>

              { this.isContentMore() && (
                <SeeMoreButton
                  onClick={this.onClickSeeMore}
                />
              )}
            </div>
          ) || (
            <NoSuchContentPanel message="아직 생성한 학습이 없습니다." />
          )
        }
      </Segment>
    );
  }

  render() {
    const { activeItem } = this.state;
    const { lectureService, skProfileService } = this.props;
    const { lectures } = lectureService!;
    const { skProfile } = skProfileService!;
    const { member } = skProfile;

    return (
      <ContentLayout
        className="create"
        breadcrumb={[
          { text: 'Create' },
          { text: `${activeItem}` },
        ]}
      >
        <CreateProfileView
          routeToCreateDetail={this.routeToCreateDetail}
          member={member}
          routeToMyPage={this.routeToMyPage}
        />
        <div>
          <Sticky className="tab-menu offset0">
            <div className="cont-inner">
              <Menu className="sku">
                <Menu.Item
                  name="Create"
                  active={activeItem === 'Create'}
                  onClick={this.handleItemClick}
                >
                  Create
                </Menu.Item>
                <Menu.Item
                  name="Shared"
                  active={activeItem === 'Shared'}
                  onClick={this.handleItemClick}
                >
                  Shared<span className="count">{lectures.length}</span>
                </Menu.Item>
              </Menu>
            </div>
          </Sticky>
        </div>
        {
          activeItem === 'Create' && (
            this.renderCreate()
          )
        }
        {
          activeItem === 'Shared' && (
            this.renderSharedLecture()
          )
        }
      </ContentLayout>
    );
  }
}

export default CreateContainer;
