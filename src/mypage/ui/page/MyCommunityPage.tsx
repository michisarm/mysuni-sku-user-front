
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { PostList } from '@sku/personalcube';

import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import { ContentHeader, ContentLayout, mobxHelper, ContentMenu, PageService, NoSuchContentPanel } from 'shared';
import { SkProfileModel, SkProfileService } from 'profile';
import { MyTrainingService } from 'mypage/index';
import { Lecture, LectureService } from 'lecture';
import { PersonalCubeService } from 'personalcube';
import { Segment, Accordion } from 'semantic-ui-react';
import { LectureServiceType, SeeMoreButton } from '../../../lecture/shared';
import lectureRoutePaths from '../../../lecture/routePaths';
import routePaths from '../../routePaths';
import MyTrainingModel from '../../model/MyTrainingModel';
import LineHeaderView from '../view/LineHeaderView';
import LectureModel from '../../../lecture/shared/model/LectureModel';


interface Props extends RouteComponentProps<{ tab: string }> {
  pageService?: PageService,
  skProfileService?: SkProfileService
  lectureService?: LectureService
  myTrainingService?: MyTrainingService
  personalCubeService?: PersonalCubeService
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
  'skProfileService',
  'shared.pageService',
  'lecture.lectureService',
  'myTraining.myTrainingService',
  'personalCube.personalCubeService',
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
    this.selectMenu(match.params.tab);
    // this.findPagingList();
  }

  selectMenu(type: string) {
    //
    const { pageService, lectureService, myTrainingService } = this.props;
    pageService!.initPageMap(`${this.PAGE_KEY}_${type}`, 0, this.PAGE_SIZE);
    lectureService!.clearLectures();
    myTrainingService!.clear();
    this.setState({ type }, this.findPagingList);
  }

  onSelectMenu(type: string) {
    //
    this.props.history.push(routePaths.community(type));
  }

  async findPagingList() {
    const { myTrainingService, pageService, lectureService } = this.props;
    const page = pageService!.pageMap.get(`${this.PAGE_KEY}_${Type.MyCommunity}`);
    const createdPage = pageService!.pageMap.get(`${this.PAGE_KEY}_${Type.MyCreatedCommunity}`);

    lectureService!.findPagingCommunityLectures(createdPage!.limit, createdPage!.nextOffset)
      .then((offsetList) => {
        pageService!.setTotalCountAndPageNo(`${this.PAGE_KEY}_${Type.MyCreatedCommunity}`, offsetList.totalCount, createdPage!.pageNo + 1);
      });

    myTrainingService!.findAllMyCommunityTrainings(page!.limit, page!.nextOffset)
      .then((offsetList) => {
        pageService!.setTotalCountAndPageNo(`${this.PAGE_KEY}_${Type.MyCommunity}`, offsetList.totalCount, page!.pageNo + 1);
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
    const { myTrainingService, lectureService, pageService } = this.props;
    const { type, boardIdMap, boardOpenMap } = this.state;
    const page = pageService!.pageMap.get(`${this.PAGE_KEY}_${type}`);
    let list: (MyTrainingModel | LectureModel)[] = [];

    switch (type) {
      case Type.MyCommunity:
        list = myTrainingService!.myTrainings;
        break;
      case Type.MyCreatedCommunity:
        list = lectureService!.lectures;
        break;
    }

    return (
      <Segment className="full">
        <div className="ui tab active">
          <LineHeaderView count={page && page.totalCount || 0} />
          {
            list && list.length && (
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
                              />
                            </Accordion.Content>
                          )
                        }
                      </Lecture>
                    );
                  })
                }
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
              image={member && member.base64Photo || `${process.env.PUBLIC_URL}/images/all/profile-56-px.png`}
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
        />
        {this.renderList()}
      </ContentLayout>
    );
  }
}

export default MyCommunityPage;
