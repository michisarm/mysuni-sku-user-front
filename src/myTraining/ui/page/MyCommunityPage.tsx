
import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';

import { PostList } from '@sku/personalcube';
import { ContentHeader, ContentLayout, ContentMenu, PageService, NoSuchContentPanel } from 'shared';
import { SkProfileModel, SkProfileService } from 'profile';
import { MyTrainingService } from 'myTraining/index';
import { Lecture, LectureService } from 'lecture';
import { PersonalCubeService } from 'personalcube';
import { Segment, Accordion } from 'semantic-ui-react';
import profileImg from 'style/../../public/images/all/img-profile-56-px.png';
import { MyFeed, MyFeedModel } from '../../../myTraining';
import { LectureServiceType, SeeMoreButton } from '../../../lecture/shared';
import lectureRoutePaths from '../../../lecture/routePaths';
import routePaths from '../../routePaths';
import MyTrainingModel from '../../model/MyTrainingModel';
import LineHeaderContainer from '../logic/LineHeaderContainer';
import LectureModel from '../../../lecture/shared/model/LectureModel';
import MyFeedService from '../../present/logic/MyFeedService';


interface Props extends RouteComponentProps<{ tab: string }> {
  pageService?: PageService,
  skProfileService?: SkProfileService
  lectureService?: LectureService
  myTrainingService?: MyTrainingService
  personalCubeService?: PersonalCubeService
  myFeedService?: MyFeedService
}

interface State {
  type: string
  boardIdMap: Map<string, string>
  boardOpenMap: Map<string, boolean>
}

enum Type {
  MyCommunity = 'MyCommunity',
  MyCreatedCommunity = 'MyCreatedCommunity',
  MyFeed = 'MyFeed',
}

@inject(mobxHelper.injectFrom(
  'profile.skProfileService',
  'shared.pageService',
  'lecture.lectureService',
  'myTraining.myTrainingService',
  'personalCube.personalCubeService',
  'myTraining.myFeedService',
))
@observer
@reactAutobind
class MyCommunityPage extends Component<Props, State> {
  //
  PAGE_KEY = 'my-community';

  PAGE_SIZE = 8;

  state = {
    type: Type.MyCommunity,
    boardIdMap: new Map(),
    boardOpenMap: new Map(),
  };

  componentDidMount(): void {
    this.init();
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    //
    const currentTab = this.props.match.params.tab;

    if (prevProps.match.params.tab !== currentTab) {
      this.selectMenu(currentTab);
    }
  }

  init() {
    const { match, pageService, skProfileService } = this.props;

    skProfileService!.findSkProfile();
    skProfileService!.findStudySummary();

    pageService!.initPageMap(`${this.PAGE_KEY}_${Type.MyCommunity}`, 0, this.PAGE_SIZE);
    pageService!.initPageMap(`${this.PAGE_KEY}_${Type.MyCreatedCommunity}`, 0, this.PAGE_SIZE);
    pageService!.initPageMap(`${this.PAGE_KEY}_${Type.MyFeed}`, 0, this.PAGE_SIZE);
    this.selectMenu(match.params.tab);
    // this.findPagingList();
  }

  selectMenu(type: string) {
    //
    const { pageService, lectureService, myTrainingService, myFeedService } = this.props;
    pageService!.initPageMap(`${this.PAGE_KEY}_${type}`, 0, this.PAGE_SIZE);
    lectureService!.clearLectures();
    myTrainingService!.clear();
    myFeedService!.clear();
    this.setState({ type }, this.findPagingList);
  }

  onSelectMenu(type: string) {
    //
    this.props.history.push(routePaths.communityTab(type));
  }

  async findPagingList() {
    const { myTrainingService, pageService, lectureService, myFeedService } = this.props;
    const page = pageService!.pageMap.get(`${this.PAGE_KEY}_${Type.MyCommunity}`);
    const createdPage = pageService!.pageMap.get(`${this.PAGE_KEY}_${Type.MyCreatedCommunity}`);
    const feedPage = pageService!.pageMap.get(`${this.PAGE_KEY}_${Type.MyFeed}`);

    lectureService!.findPagingCommunityLectures(createdPage!.limit, createdPage!.nextOffset)
      .then((offsetList) => {
        pageService!.setTotalCountAndPageNo(`${this.PAGE_KEY}_${Type.MyCreatedCommunity}`, offsetList.totalCount, createdPage!.pageNo + 1);
      });

    myTrainingService!.findAndAddAllMyCommunityTrainings(page!.limit, page!.nextOffset)
      .then((offsetList) => {
        pageService!.setTotalCountAndPageNo(`${this.PAGE_KEY}_${Type.MyCommunity}`, offsetList.totalCount, page!.pageNo + 1);
      });

    myFeedService!.findAndAddAllMyFeeds(feedPage!.limit, feedPage!.nextOffset)
      .then((offsetList) => {
        pageService!.setTotalCountAndPageNo(`${this.PAGE_KEY}_${Type.MyFeed}`, offsetList.totalCount, feedPage!.pageNo + 1);
      });
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

  getMenus() {
    //
    const menus: typeof ContentMenu.Menu[] = [];
    menus.push(
      { name: 'My Community', type: Type.MyCommunity },
      { name: 'My Created Community', type: Type.MyCreatedCommunity },
      { name: 'My Feed', type: Type.MyFeed },
    );

    return menus;
  }

  onActionLecture() {

  }

  async onToggle(openState: boolean, cubeId: string) {
    //
    const { personalCubeService } = this.props;
    const { boardIdMap, boardOpenMap } = this.state;
    const newBoardIdMap = new Map(boardIdMap);
    const newBoardOpenMap = new Map(boardOpenMap);

    if (!boardIdMap.get(cubeId)) {
      const cube = await personalCubeService!.findPersonalCube(cubeId);
      newBoardIdMap.set(cubeId, cube!.contents.contents.id);
    }

    newBoardOpenMap.set(cubeId, openState);
    this.setState({ boardIdMap: newBoardIdMap, boardOpenMap: newBoardOpenMap });
  }

  isContentMore() {
    //
    const { pageService } = this.props;
    const { type } = this.state;
    const page = pageService!.pageMap.get(`${this.PAGE_KEY}_${type}`);

    if (!page || !page.pageNo || !page.totalPages) return false;
    return page!.pageNo < page!.totalPages;
  }

  renderList() {
    const { myTrainingService, lectureService, pageService, myFeedService } = this.props;
    const { type, boardIdMap, boardOpenMap } = this.state;
    const page = pageService!.pageMap.get(`${this.PAGE_KEY}_${type}`);
    let list: (MyTrainingModel | LectureModel)[] = [];
    let feedList: (MyFeedModel)[] = [];
    let noSuchContentPanel = '';

    switch (type) {
      case Type.MyCommunity:
        list = myTrainingService!.myTrainings;
        noSuchContentPanel = '가입한 Community 학습 과정이 없습니다.';
        break;
      case Type.MyCreatedCommunity:
        list = lectureService!.lectures;
        noSuchContentPanel = '내가 만든 Community 학습 과정이 없습니다.';
        break;
      case Type.MyFeed:
        feedList = myFeedService!.myFeeds;
    }

    return (
      <Segment className="full">
        <div className="ui tab active">
          <LineHeaderContainer count={page && page.totalCount || 0} />
          {
            list && list.length && type !== Type.MyFeed && (
              <Lecture.Group type={Lecture.GroupType.Community}>
                {
                  list.map((value: MyTrainingModel | LectureModel, index: number) => {
                    const open = boardOpenMap.get(value.cubeId) || false;
                    const boardId = boardIdMap.get(value.cubeId) || '';

                    return (
                      <Lecture
                        key={`training-${index}`}
                        model={value}
                        // thumbnailImage="http://placehold.it/60x60"
                        toggle
                        action={Lecture.ActionType.Add}
                        onAction={this.onActionLecture}
                        onViewDetail={this.onViewDetail}
                        onToggle={(openState) => this.onToggle(openState, value.cubeId)}
                      >
                        {
                          open && boardId && (
                            <Accordion.Content active>
                              <PostList
                                type={PostList.ListType.Simple}
                                boardId={boardId}
                                linkedUrl={`${process.env.PUBLIC_URL}/lecture/college/${value.category.college.id}/cube/${value.cubeId}/lecture-card/${value.serviceId}/posts`}
                              />
                            </Accordion.Content>
                          )
                        }
                      </Lecture>
                    );
                  })
                }
              </Lecture.Group>
            ) || type !== Type.MyFeed && (
              <NoSuchContentPanel message={noSuchContentPanel} />
            )
          }
          {
            feedList && feedList.length && type === Type.MyFeed && (
              <MyFeed.Group type={Lecture.GroupType.Community}>
                {
                  feedList.map((value: MyFeedModel, index: number) => {
                    return(
                      <MyFeed key={`feed-${index}`}
                        model={value}
                        index={index}
                      />
                    );
                  })
                }
              </MyFeed.Group>
            ) || type === Type.MyFeed && (
              <NoSuchContentPanel message="새로운 알림이 없습니다." />
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

    const { skProfileService, pageService } = this.props;
    const { skProfile } = skProfileService as SkProfileService;

    const { member } = skProfile as SkProfileModel;
    const { type } = this.state;

    const page = pageService!.pageMap.get(`${this.PAGE_KEY}_MyCommunity`);
    const createdPage = pageService!.pageMap.get(`${this.PAGE_KEY}_MyCreatedCommunity`);

    return (
      <ContentLayout
        className = "community"
        breadcrumb={[
          { text: 'Community' },
          { text: type },
        ]}
      >
        <ContentHeader className="content-division">
          <ContentHeader.Cell inner>
            <ContentHeader.ProfileItem
              image={member && member.base64Photo || profileImg}
              name={member.name}
              teams={[member.company || '', member.department || '']}
              imageEditable={false}
              myPageActive
            />
          </ContentHeader.Cell>
          <ContentHeader.Cell inner>
            <ContentHeader.CommunityItem
              joinedCount={page && page.totalCount || 0}
              myCount={createdPage && createdPage.totalCount || 0}
            />
          </ContentHeader.Cell>
        </ContentHeader>
        <ContentMenu
          menus={this.getMenus()}
          type={type}
          onSelectMenu={this.onSelectMenu}
        >
          {this.renderList()}
        </ContentMenu>
      </ContentLayout>
    );
  }
}

export default MyCommunityPage;
