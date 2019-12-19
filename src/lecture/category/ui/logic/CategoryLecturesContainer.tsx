
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { mobxHelper, PageService, Lecture } from 'shared';
import { CollegeService } from 'college';
import { PersonalCubeService } from 'personalcube/personalcube';
import { LectureService, LectureCardService, LectureModel, LectureServiceType } from 'lecture';
import LectureCountService from '../../present/logic/LectureCountService';

import { ChannelsPanel, CardSorting, NoSuchContent, SeeMoreButton } from '../../../shared';
import CategoryLecturesContentWrapperView from '../view/CategoryLecturesContentWrapperView';
import LecturesWrapperView from '../view/LecturesWrapperView';
import { DescriptionView } from '../view/CategoryLecturesElementsView';


interface Props extends RouteComponentProps<{ collegeId: string }> {
  pageService?: PageService,
  collegeService?: CollegeService,
  personalCubeService?: PersonalCubeService,
  lectureService?: LectureService,
  lectureCardService?: LectureCardService,
  lectureCountService?: LectureCountService,
}

interface State {
  sorting: string,
}

@inject(mobxHelper.injectFrom('shared.pageService', 'collegeService', 'personalCube.personalCubeService', 'lecture.lectureService', 'lecture.lectureCardService', 'lecture.lectureCountService'))
@reactAutobind
@observer
class CategoryLecturesContainer extends Component<Props, State> {
  //
  PAGE_KEY = 'lecture.category';

  PAGE_SIZE = 20;

  state = {
    sorting: 'latest',
  };

  constructor(props: Props) {
    //
    super(props);
    props.pageService!.initPageMap(this.PAGE_KEY);
    props.pageService!.setPageMap(this.PAGE_KEY, 0, this.PAGE_SIZE);
  }

  componentDidMount() {
    //
    this.findLectures();
    this.findChannels();
  }

  async findLectures() {
    //
    const { match, pageService, lectureService } = this.props;
    const { pageMap } = pageService!;
    const page = pageMap.get(this.PAGE_KEY);

    const lectureOffsetList = await lectureService!.findCollegeLectures(match.params.collegeId, page!.limit, page!.offset);

    console.log('offsetlist', lectureOffsetList);
    pageService!.setTotalCount(this.PAGE_KEY, lectureOffsetList.totalCount);
    pageService!.setPageNo(this.PAGE_KEY, page!.pageNo + 1);
  }

  findChannels() {
    //
    const { match, lectureCountService } = this.props;

    lectureCountService!.findLectureCountByCollegeId(match.params.collegeId);
  }

  isContentMore() {
    //
    const { pageService } = this.props;
    const page = pageService!.pageMap.get(this.PAGE_KEY);

    console.log('contentMore', page);
    return page!.pageNo < page!.totalPages;
  }

  onSelectChannel(e: any, { index, channel }: any) {
    //
    const { collegeService } = this.props;

    collegeService!.setChannelsProp(index, 'checked', !channel.checked);
  }

  onChangeSorting(e: any, data: any) {
    //
    this.setState({
      sorting: data.value,
    });
  }

  onActionLecture() {

  }

  onViewDetail(e: any, data: any) {
    //
    const { lecture } = data;
    const { history } = this.props;

    console.log('serviceType', lecture.serviceType);
    if (lecture.serviceType === LectureServiceType.Card) {
      history.push(`./lecture-card/${lecture.serviceId}`);
    }
  }

  onClickSeeMore() {
    //
    this.findLectures();
  }

  render() {
    //
    const { collegeService, lectureService, lectureCountService } = this.props;
    const { sorting } = this.state;
    const { college } = collegeService!;
    const { lectures } = lectureService!;
    const { channels } = lectureCountService!;

    return (
      <CategoryLecturesContentWrapperView>
        <ChannelsPanel
          channels={channels}
          onSelectChannel={this.onSelectChannel}
        />
        <LecturesWrapperView
          header={
            <>
              <DescriptionView
                name={`${college.name} College`}
                count={lectures.length}
              />
              <CardSorting
                value={sorting}
                onChange={this.onChangeSorting}
              />
            </>
          }
        >
          {lectures && lectures.length > 0 ?
            <>
              <Lecture.Group type={Lecture.GroupType.Box}>
                {lectures.map((lecture: LectureModel) => (
                  <Lecture
                    key={lecture.id}
                    lecture={lecture}
                    // thumbnailImage="http://placehold.it/60x60"
                    action={Lecture.ActionType.Add}
                    onAction={this.onActionLecture}
                    onViewDetail={this.onViewDetail}
                  />
                ))}
              </Lecture.Group>
              { this.isContentMore() && (
                <SeeMoreButton
                  onClick={this.onClickSeeMore}
                />
              )}
            </>
            :
            <NoSuchContent message="수강중인 학습 과정이 없습니다." />
          }
        </LecturesWrapperView>
      </CategoryLecturesContentWrapperView>
    );
  }
}



export default withRouter(CategoryLecturesContainer);
