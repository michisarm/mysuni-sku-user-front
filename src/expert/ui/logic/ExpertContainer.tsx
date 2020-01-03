import React from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router-dom';

import { Menu, Segment, Sticky } from 'semantic-ui-react';
import { ContentLayout, PageService } from 'shared';
import { ReviewService } from '@nara.drama/feedback/src/snap/snap';
import { InstructorService } from '../../index';
import ExpertHeaderView from '../view/ExpertHeaderView';
import InstructorIntroduceView from '../view/InstructorIntroduceView';
import Lecture from '../../../lecture/shared/Lecture/ui/logic/LectureContainer';
import { LectureCardService, LectureModel, LectureService } from '../../../lecture';
import { SeeMoreButton } from '../../../lecture/shared';
import LectureServiceType from '../../../lecture/shared/model/LectureServiceType';
import routePaths from '../../../lecture/routePaths';
import { CollegeService } from '../../../college';
import { PersonalCubeService } from '../../../personalcube/personalcube';

interface Props extends RouteComponentProps<{ instructorId : string }> {
  instructorService :InstructorService
  pageService?: PageService,
  collegeService?: CollegeService,
  personalCubeService?: PersonalCubeService,
  lectureService?: LectureService,
  lectureCardService?: LectureCardService,
  reviewService?: ReviewService,
}


@inject(mobxHelper.injectFrom(
  'shared.pageService',
  'lecture.lectureService',
  'lecture.lectureCardService',
  'shared.reviewService',
  'expert.instructorService'))
@reactAutobind
@observer
@observer
@reactAutobind
class ExpertContainer extends React.Component<Props> {
  //
  state = { activeItem: 'Introduce' };

  PAGE_KEY = 'lecture.instructor';

  PAGE_SIZE = 8;

  constructor(props: Props) {
    //
    super(props);
    this.init();
  }

  componentDidMount() {
    //
    const { instructorService } = this.props;
    const { instructorId } = this.props.match.params;

    if (instructorService) instructorService.findInstructor(instructorId);
    this.findPagingInstructorLectures();
  }

  handleItemClick(e: any, { name } : any) {
    this.setState({ activeItem: name });
  }

  init() {
    //
    const { pageService, lectureService } = this.props;

    pageService!.initPageMap(this.PAGE_KEY, 0, this.PAGE_SIZE);
    lectureService!.clearLectures();
  }

  async findPagingInstructorLectures() {
    //
    const { pageService, lectureService, reviewService } = this.props;
    const page = pageService!.pageMap.get(this.PAGE_KEY);
    const { instructorId } = this.props.match.params;

    const lectureOffsetList = await lectureService!.findAllLecturesByInstructorId(instructorId, page!.limit, page!.nextOffset);
    const feedbackIds = (lectureService!.lectures || []).map((lecture: LectureModel) => lecture.reviewId);
    if (feedbackIds && feedbackIds.length) reviewService!.findReviewSummariesByFeedbackIds(feedbackIds);

    pageService!.setTotalCountAndPageNo(this.PAGE_KEY, lectureOffsetList.totalCount, page!.pageNo + 1);
  }

  onActionLecture() {

  }

  onViewDetail(e: any, data: any) {
    //
    const { model } = data;
    const { history } = this.props;
    const collegeId = model.category.college.id;

    if (model.serviceType === LectureServiceType.Program || model.serviceType === LectureServiceType.Course) {
      history.push(routePaths.courseOverview(collegeId, model.coursePlanId, model.serviceType, model.serviceId));
    }
    else if (model.serviceType === LectureServiceType.Card) {
      history.push(routePaths.lectureCardOverview(collegeId, model.cubeId, model.serviceId));
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
    this.findPagingInstructorLectures();
  }


  render() {
    const { activeItem } = this.state;
    const { instructor } = this.props.instructorService || {} as InstructorService;
    const result = instructor.result;

    const { lectureService, reviewService } = this.props;
    // const { pageService, lectureService, reviewService } = this.props;
    // const page = pageService!.pageMap.get(this.PAGE_KEY);
    const { lectures } = lectureService!;
    const { ratingMap } = reviewService!;

    return (
      <ContentLayout
        className="mylearning"
        breadcrumb={[
          { text: 'Expert' },
        ]}
      >
        <ExpertHeaderView
          result={result}
        />
        <div>
          <Sticky className="tab-menu offset0">
            <div className="cont-inner">
              <Menu className="sku">
                <Menu.Item
                  name="Introduce"
                  active={activeItem === 'Introduce'}
                  onClick={this.handleItemClick}
                  //as={Link} to=""
                >
                  Introduce
                </Menu.Item>
                <Menu.Item
                  name="Lecture"
                  active={activeItem === 'Lecture'}
                  onClick={this.handleItemClick}
                  //as={Link} to=""
                >
                  Lecture<span className="count">{lectures.length}</span>
                </Menu.Item>
              </Menu>
            </div>
          </Sticky>
          {
            activeItem === 'Introduce' ?
              <InstructorIntroduceView
                result={result}
              />
              :
              <Segment className="full">
                <div className="section">
                  <Lecture.Group type={Lecture.GroupType.Box}>
                    {lectures.map((lecture: LectureModel, index: number) => {
                      const rating = ratingMap.get(lecture.reviewId) || 0;
                      return (
                        <Lecture
                          key={`lecture-${index}`}
                          model={lecture}
                          rating={rating}
                          // thumbnailImage="http://placehold.it/60x60"
                          action={Lecture.ActionType.Add}
                          onAction={this.onActionLecture}
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
              </Segment>
          }
        </div>
      </ContentLayout>
    );
  }

}

export default ExpertContainer;
