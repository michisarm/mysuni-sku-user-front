import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import { reactAutobind } from '@nara.platform/accent';
import { ContentLayout, CubeState, mobxHelper, PageService } from 'shared';
import { PersonalCubeService } from 'personalcube/personalcube';
import { Menu, Segment, Sticky } from 'semantic-ui-react';
import { ReviewService } from '@nara.drama/feedback/src/snap/snap';
import CreateProfileView from '../view/CreateProfileView';
import SelectView from '../view/SelectView';
import SelectType from '../../../shared/model/SelectType';
import CreateListView from '../view/CreateListView';
import NoSuchContentPanel from '../../../shared/components/NoSuchContentPanel';
import Lecture from '../../../lecture/shared/Lecture/ui/logic/LectureContainer';
import { LectureCardService, LectureModel, LectureService } from '../../../lecture';
import { SeeMoreButton } from '../../../lecture/shared';
import { InMyLectureCdoModel, InMyLectureModel, InMyLectureService } from '../../../mypage';
import LectureServiceType from '../../../lecture/shared/model/LectureServiceType';
import lectureRoutePaths from '../../../lecture/routePaths';
import routePaths from '../../routePaths';
import { SkProfileModel, SkProfileService } from '../../../profile';


interface Props extends RouteComponentProps<{ tab: string }> {
  personalCubeService: PersonalCubeService
  pageService?: PageService,
  lectureService?: LectureService,
  lectureCardService?: LectureCardService,
  reviewService?: ReviewService,
  inMyLectureService?: InMyLectureService,
  skProfileService?: SkProfileService
}

interface States {
  activeItem : string
  disabled: boolean
  limit: number
}

@inject(mobxHelper.injectFrom(
  'personalCube.personalCubeService',
  'shared.pageService',
  'lecture.lectureService',
  'lecture.lectureCardService',
  'shared.reviewService',
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
    activeItem: '',  disabled: false, limit: 0,
  };

  constructor(props: Props) {
    //
    super(props);
    this.init();
  }

  componentDidMount() {
    const { skProfileService } = this.props;

    skProfileService!.findSkProfile();
    this.init();
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
    this.props.history.push(routePaths.create(name));
  }

  routeToCreateDetail() {
    this.props.history.push('/personalcube/create-detail');
  }

  handleClickCubeRow(personalCubeId: string) {
    //
    const { personalCubeService } = this.props;
    if (personalCubeService) {
      personalCubeService.findPersonalCube(personalCubeId)
        .then(() => {
          const cubeType = personalCubeService.personalCube.contents.type;
          const cubeState = personalCubeService.personalCube.cubeState;
          if (cubeState === CubeState.Created) this.props.history.push(`/personalcube/create-detail/${personalCubeId}/${cubeType}`);
          else  this.props.history.push(`/personalcube/shared-detail/${personalCubeId}/${cubeType}/${cubeState}`);
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
    const { pageService, lectureService, reviewService, inMyLectureService } = this.props;
    const page = pageService!.pageMap.get(this.PAGE_KEY);

    inMyLectureService!.findInMyLecturesAll();
    const lectureOffsetList = await lectureService!.findPagingSharedLectures(page!.limit, page!.nextOffset);
    const feedbackIds = (lectureService!.lectures || []).map((lecture: LectureModel) => lecture.reviewId);
    if (feedbackIds && feedbackIds.length) reviewService!.findReviewSummariesByFeedbackIds(feedbackIds);

    pageService!.setTotalCountAndPageNo(this.PAGE_KEY, lectureOffsetList.totalCount, page!.pageNo + 1);
  }

  onActionLecture(lecture: LectureModel | InMyLectureModel) {
    //
    const { inMyLectureService } = this.props;
    if (lecture instanceof InMyLectureModel) {
      inMyLectureService!.removeInMyLecture(lecture.id)
        .then(this.findPagingSharedLectures);
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
      })).then(this.findPagingSharedLectures);
    }
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

  renderCreate() {
    const { personalCubes, personalCubeQuery } = this.props.personalCubeService || {} as PersonalCubeService;
    const totalCount = personalCubes.totalCount;
    const result = personalCubes.results;
    const { disabled, limit } = this.state;

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
              handleClickCubeRow={this.handleClickCubeRow}
              disabled={disabled}
              findAllCubes ={this.findAllCubes}
              limit={limit}
            />
          ) || (
            <NoSuchContentPanel message="아직 생성한 학습이 없습니다." />
          )
        }
      </Segment>
    );
  }

  renderSharedLecture() {
    const { personalCubeQuery } = this.props.personalCubeService || {} as PersonalCubeService;
    const { lectureService, reviewService, inMyLectureService } = this.props;
    const { lectures } = lectureService!;
    const { ratingMap } = reviewService!;
    const { inMyLectureMap } =  inMyLectureService!;

    return (
      <Segment className="full">
        <SelectView
          totalCount={lectures.length}
          personalCubeQuery={personalCubeQuery}
          fieldOption={SelectType.openType}
          onChangeCubeQueryProps={this.onChangeCubeQueryProps}
          queryFieldName="searchFilter"
        />
        {
          lectures && lectures.length && (
            <div className="section">
              <Lecture.Group type={Lecture.GroupType.Line}>
                {lectures.map((lecture: LectureModel, index: number) => {
                  const rating = ratingMap.get(lecture.reviewId) || 0;
                  const inMyLecture = inMyLectureMap.get(lecture.serviceId) || undefined;
                  return (
                    <Lecture
                      key={`lecture-${index}`}
                      model={lecture}
                      rating={rating}
                      // thumbnailImage="http://placehold.it/60x60"
                      action={Lecture.ActionType.Add}
                      onAction={() => this.onActionLecture(inMyLecture || lecture)}
                      onViewDetail={this.onViewDetail}
                    />
                  );
                })}
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
    const { skProfile } = skProfileService as SkProfileService;
    const { member } = skProfile as SkProfileModel;

    return (
      <ContentLayout
        className="create"
        breadcrumb={[
          { text: `${activeItem}` },
        ]}
      >
        <CreateProfileView
          routeToCreateDetail={this.routeToCreateDetail}
          member={member}
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
