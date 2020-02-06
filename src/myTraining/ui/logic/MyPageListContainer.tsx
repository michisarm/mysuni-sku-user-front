
import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { patronInfo } from '@nara.platform/dock';

import { Segment } from 'semantic-ui-react';
import lectureRoutePaths from 'lecture/routePaths';
import { PageService, NoSuchContentPanel } from 'shared';
import { ChannelModel } from 'college';
import { Lecture, LectureServiceType } from 'lecture';
import { SeeMoreButton } from 'lecture/shared';

import MyTrainingService from '../../present/logic/MyTrainingService';
import MyTrainingModel from '../../model/MyTrainingModel';
import MyPageContentType from '../model/MyPageContentType';
import LineHeaderContainer from './LineHeaderContainer';


interface States {
  channels: ChannelModel[]
}

interface Props extends RouteComponentProps<{ tab: string }> {
  pageService?: PageService,
  myTrainingService?: MyTrainingService
}

@inject(mobxHelper.injectFrom(
  'shared.pageService',
  'myTraining.myTrainingService',
))
@observer
@reactAutobind
class MyPageListContainer extends Component<Props, States> {
  //
  PAGE_KEY = 'my-page';
  PAGE_SIZE = 8;

  state = {
    channels: [],
  };

  componentDidMount(): void {
    //
    this.setMyTrainings();
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    //
    const prevTab = prevProps.match.params.tab;
    const currentTab = this.props.match.params.tab;

    if (prevTab !== currentTab) {
      this.setMyTrainings();
    }
  }

  setMyTrainings() {
    //
    const { pageService, myTrainingService } = this.props;

    pageService!.initPageMap(this.PAGE_KEY, 0, this.PAGE_SIZE);
    myTrainingService!.clear();
    this.findPagingList();
  }

  async findPagingList() {
    //
    const { pageService, myTrainingService } = this.props;
    const page = pageService!.pageMap.get(this.PAGE_KEY);
    const { channels } = this.state;
    const activeItem = this.getActiveItem();
    const channelIds = channels.map((channel: ChannelModel) => channel.channelId);
    let offsetList: any = null;

    if (activeItem === MyPageContentType.CompletedList) {
      offsetList = await myTrainingService!.findAndAddAllMyTrainingsWithState('Completed', page!.limit, page!.nextOffset, channelIds);
    }
    else {
      offsetList = await myTrainingService!.findAndAddAllMyTrainingsWithStamp(page!.limit, page!.nextOffset, channelIds);
    }

    pageService!.setTotalCountAndPageNo(this.PAGE_KEY, offsetList.totalCount, page!.pageNo + 1);
  }

  getActiveItem() {
    //
    const { params } = this.props.match;

    return params.tab;
  }

  isContentMore() {
    //
    const { pageService } = this.props;
    const page = pageService!.pageMap.get(this.PAGE_KEY);

    if (!page || !page.pageNo || !page.totalPages) {
      return false;
    }
    return page!.pageNo < page!.totalPages;
  }

  onFilter(channels: ChannelModel[]) {
    //
    this.setState({ channels }, () => {
      this.setMyTrainings();
    });
  }

  onViewDetail(e: any, data: any) {
    //
    const { model } = data;
    const { history } = this.props;
    const cineroom = patronInfo.getCineroomByPatronId(model.servicePatronKeyString) || patronInfo.getCineroomByDomain(model)!;

    if (model.serviceType === LectureServiceType.Program || model.serviceType === LectureServiceType.Course) {
      history.push(lectureRoutePaths.courseOverview(cineroom.id, model.category.college.id, model.coursePlanId, model.serviceType, model.serviceId));
    }
    else if (model.serviceType === LectureServiceType.Card) {
      history.push(lectureRoutePaths.lectureCardOverview(cineroom.id, model.category.college.id, model.cubeId, model.serviceId));
    }
  }

  render() {
    //
    const { pageService, myTrainingService } = this.props;
    const page = pageService!.pageMap.get(this.PAGE_KEY);
    const { myTrainings } =  myTrainingService!;
    const { channels } = this.state;
    const activeItem = this.getActiveItem();

    return (
      <Segment className="full">
        <div className="ui tab active">
          <LineHeaderContainer
            count={page && page.totalCount || 0}
            channels={channels}
            onFilter={this.onFilter}
          />

          { myTrainings.length > 0 ?
            <Lecture.Group type={Lecture.GroupType.ListStamp}>
              { myTrainings.map((myTraining: MyTrainingModel, index: number) => (
                <Lecture
                  key={`training-${index}`}
                  model={myTraining}
                  thumbnailImage={myTraining.baseUrl}
                  onViewDetail={this.onViewDetail}
                />
              ))}
            </Lecture.Group>
            :
            <NoSuchContentPanel
              message={(
                activeItem === MyPageContentType.CompletedList ?
                  <>학습완료에 해당하는<br />학습 과정이 없습니다.</>
                  :
                  '획득한 스탬프가 없습니다.'
              )}
            />
          }

          { this.isContentMore() && (
            <SeeMoreButton
              onClick={this.findPagingList}
            />
          )}
        </div>
      </Segment>
    );
  }
}

export default withRouter(MyPageListContainer);
