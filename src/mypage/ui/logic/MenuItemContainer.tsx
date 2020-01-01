import React, { Component, createRef } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Menu, Segment, Sticky } from 'semantic-ui-react';
import { RouteComponentProps, withRouter, Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { mobxHelper, NoSuchContentPanel, PageService } from 'shared';
import { SkProfileService } from 'profile';
import { LectureServiceType, SeeMoreButton } from 'lecture/shared';
import { Lecture } from 'lecture';
import routePaths from '../../../mypage/routePaths';

import MyTrainingService from '../../present/logic/MyTrainingService';
import MyTrainingModel from '../../model/MyTrainingModel';
import lectureRoutePaths from '../../../lecture/routePaths';
import LineHeaderView from '../view/LineHeaderView';

interface States {
  activeItem : string
}

interface Props extends RouteComponentProps<{ tab: string }> {
  pageService?: PageService,
  skProfileService?: SkProfileService
  myTrainingService?: MyTrainingService
}

enum Type {
  CompletedList= 'CompletedList',
  EarnedStampList= 'EarnedStampList',
}

@inject(mobxHelper.injectFrom(
  'shared.pageService',
  'shared.reviewService',
  'skProfileService',
  'myTraining.myTrainingService',
  'myTraining.inMyLectureService',
))
@observer
@reactAutobind
class MenuItemContainer extends Component<Props, States> {
  //
  PAGE_KEY = 'my-page';
  PAGE_SIZE = 8;

  constructor(props : Props) {
    super(props);
    this.state = {
      activeItem: 'CompletedList',
    };
  }

  componentDidMount(): void {
    //
    const { pageService, myTrainingService } = this.props;
    const { params } = this.props.match;
    this.changeItem(params.tab);
    pageService!.initPageMap(this.PAGE_KEY, 0, this.PAGE_SIZE);
    myTrainingService!.clear();
    this.findPagingList();
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    //
    const { pageService,myTrainingService } = this.props;
    const currentTab = this.props.match.params.tab;

    if (prevProps.match.params.tab !== this.props.match.params.tab) {
      this.changeItem(currentTab);
      pageService!.initPageMap(this.PAGE_KEY, 0, this.PAGE_SIZE);
      myTrainingService!.clear();
      this.findPagingList();
    }
  }

  changeItem(tab: string) {
    this.setState({
      activeItem: tab,
    });
  }

  onChangeItem(event:any, item:any) {
    this.props.history.push(routePaths.myPage(item.name));
    event.preventDefault();
  }


  async findPagingList() {
    const { myTrainingService, pageService } = this.props;
    const page = pageService!.pageMap.get(this.PAGE_KEY);
    const { activeItem } = this.state;
    let offsetList: any = null;

    if (activeItem === Type.CompletedList) {
      offsetList = await myTrainingService!.findAllMyTrainingsWithState('Completed', page!.limit, page!.nextOffset);
    }
    else {
      offsetList = await myTrainingService!.findAllMyTrainingsWithState('Completed', page!.limit, page!.nextOffset);
    }

    pageService!.setTotalCountAndPageNo(this.PAGE_KEY, offsetList.totalCount, page!.pageNo + 1);
  }

  onViewDetail(e: any, data: any) {
    //
    const { model } = data;
    const { history } = this.props;

    if (model.serviceType === LectureServiceType.Program || model.serviceType === LectureServiceType.Course) {
      history.push(lectureRoutePaths.courseOverview(model.category.college.id, model.coursePlanId, model.serviceType, model.serviceId));
    }
    else if (model.serviceType === LectureServiceType.Card) {
      history.push(lectureRoutePaths.lectureCardOverview(model.category.college.id, model.cubeId, model.serviceId));
    }
  }

  isContentMore() {
    //
    const { pageService } = this.props;
    const page = pageService!.pageMap.get(this.PAGE_KEY);

    if (!page || !page.pageNo || !page.totalPages) return false;
    return page!.pageNo < page!.totalPages;
  }

  renderList() {
    const { myTrainingService, pageService } = this.props;
    const { myTrainings } =  myTrainingService!;
    const page = pageService!.pageMap.get(this.PAGE_KEY);

    console.log(myTrainings && myTrainings.length );
    return (
      <Segment className="full">
        <div className="ui tab active">
          <LineHeaderView count={page && page.totalCount || 0} />
          {
            myTrainings && myTrainings.length && (
              <Lecture.Group type={Lecture.GroupType.ListStamp}>
                {myTrainings.map((myTraining: MyTrainingModel, index: number) => (
                  <Lecture
                    key={`training-${index}`}
                    model={myTraining}
                    // thumbnailImage="http://placehold.it/60x60"
                    onViewDetail={this.onViewDetail}
                  />
                )
                )}
              </Lecture.Group>
            ) || (
              <NoSuchContentPanel message="해당하는 학습과정이 없습니다." />
            )
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


  render() {
    const { activeItem } = this.state;
    return (
      <>
        <div className="ui tab-menu offset0 sticky">
          <div className="cont-inner">
            <Menu className="sku">
              <Menu.Item
                name={Type.CompletedList}
                active={activeItem === Type.CompletedList}
                onClick={(event:any, item:any) => this.onChangeItem(event, item)}
                as={Link}
                to=""
              >
                Completed List
                {/*<span className="count">+5</span>*/}
              </Menu.Item>
              <Menu.Item
                name={Type.EarnedStampList}
                active={activeItem === Type.EarnedStampList}
                onClick={(event:any, item:any) => this.onChangeItem(event, item)}
                as={Link}
                to=""
              >
                Earned Stamp List
                {/*<span className="count">+24</span>*/}
              </Menu.Item>
            </Menu>
          </div>
        </div>
        {this.renderList()}
      </>
    );
  }
}

export default withRouter(MenuItemContainer);
