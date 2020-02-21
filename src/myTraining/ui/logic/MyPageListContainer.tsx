
import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { patronInfo } from '@nara.platform/dock';

import lectureRoutePaths from 'lecture/routePaths';
import { PageService } from 'shared/stores';
import { NoSuchContentPanel } from 'shared';
import { ChannelModel } from 'college/model';
import { LectureServiceType } from 'lecture/model';
import { Lecture, SeeMoreButton } from 'lecture';

import routePaths from '../../routePaths';
import MyTrainingService from '../../present/logic/MyTrainingService';
import MyTrainingModel from '../../model/MyTrainingModel';
import MyPageContentType from '../model/MyPageContentType';
import LineHeaderContainer from './LineHeaderContainer';


interface States {
  channels: ChannelModel[]
}

interface Props extends RouteComponentProps<{ tab: string, pageNo: string }> {
  pageService?: PageService,
  myTrainingService?: MyTrainingService
  contentType: MyPageContentType
  onChangeCompletedCount: (completedCount: number) => void
  onChangeEarnedStampCount: (earnedStampCount: number) => void
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
    const { pageService, myTrainingService } = this.props;
    const prevTab = prevProps.match.params.tab;
    const currentTab = this.props.match.params.tab;
    const currentPageNo = this.props.match.params.pageNo;

    if (prevTab !== currentTab) {
      this.setMyTrainings();
    }
    else if (prevProps.match.params.tab === currentTab && prevProps.match.params.pageNo !== currentPageNo) {
      const page = pageService!.pageMap.get(this.PAGE_KEY);
      const offset = page!.limit > this.PAGE_SIZE && page!.nextOffset === 0 ? page!.nextOffset + this.PAGE_SIZE : page!.nextOffset;
      if (currentPageNo === '1') {
        myTrainingService!.clear();
        pageService!.initPageMap(this.PAGE_KEY, 0, this.PAGE_SIZE);
      }
      else {
        pageService!.initPageMap(this.PAGE_KEY, offset, this.PAGE_SIZE);
      }
      this.findPagingList(this.getPageNo() - 1);
    }
  }

  getPageNo() {
    //
    const { match } = this.props;

    return parseInt(match.params.pageNo, 10);
  }

  setMyTrainings() {
    //
    const { pageService, myTrainingService } = this.props;

    const initialLimit = this.getPageNo() * this.PAGE_SIZE;
    pageService!.initPageMap(this.PAGE_KEY, 0, initialLimit);
    myTrainingService!.clear();
    this.findPagingList();
  }

  async findPagingList(pageNo?: number) {
    //
    const { pageService, myTrainingService, onChangeCompletedCount, onChangeEarnedStampCount } = this.props;
    const page = pageService!.pageMap.get(this.PAGE_KEY);
    const { channels } = this.state;
    const activeItem = this.getAContentType();
    const channelIds = channels.map((channel: ChannelModel) => channel.channelId);
    let offsetList: any = null;

    if (activeItem === MyPageContentType.CompletedList) {
      offsetList = await myTrainingService!.findAndAddAllMyTrainingsWithStamp(page!.limit, page!.nextOffset, channelIds);
      onChangeEarnedStampCount(offsetList.totalCount);
      myTrainingService!.clear();
      offsetList = await myTrainingService!.findAndAddAllMyTrainingsWithState('Completed', page!.limit, page!.nextOffset, channelIds);
      onChangeCompletedCount(offsetList.totalCount);
    }
    else {
      offsetList = await myTrainingService!.findAndAddAllMyTrainingsWithStamp(page!.limit, page!.nextOffset, channelIds);
      onChangeEarnedStampCount(offsetList.totalCount);
    }

    pageService!.setTotalCountAndPageNo(this.PAGE_KEY, offsetList.totalCount, pageNo || pageNo === 0 ? pageNo + 1 : page!.pageNo + 1);
  }

  getAContentType() {
    //
    return this.props.contentType;
  }

  onClickSeeMore() {
    //
    const { history } = this.props;

    history.replace(routePaths.currentPage(this.getPageNo() + 1));
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
    const activeItem = this.getAContentType();

    if (myTrainings.length < 1) {
      return (
        <NoSuchContentPanel
          message={(
            activeItem === MyPageContentType.CompletedList ?
              <>학습완료에 해당하는<br />학습 과정이 없습니다.</>
              :
              '획득한 스탬프가 없습니다.'
          )}
        />
      );
    }

    return (
      <>
        <LineHeaderContainer
          count={page && page.totalCount || 0}
          channels={channels}
          onFilter={this.onFilter}
        />

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

        { this.isContentMore() && (
          <SeeMoreButton
            onClick={this.onClickSeeMore}
          />
        )}
      </>
    );
  }
}

export default withRouter(MyPageListContainer);
