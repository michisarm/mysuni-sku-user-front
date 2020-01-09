
import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Modal, Icon, Button } from 'semantic-ui-react';
import lectureRoutePaths from 'lecture/routePaths';
import createRoutePaths from 'personalcube/routePaths';
import myPageRoutePaths from 'myTraining/routePaths';
import { CollegeLectureCountService } from 'lecture';
import SiteMapView, { SiteMap } from '../view/SiteMapView';


interface Props extends RouteComponentProps {
  trigger: React.ReactNode,
  collegeLectureCountService?: CollegeLectureCountService,
}

interface State {
  open: boolean,
  topSiteMaps: SiteMap[]
  bottomSiteMaps: SiteMap[]
}

@inject(mobxHelper.injectFrom('lecture.collegeLectureCountService'))
@reactAutobind
@observer
class SiteMapModalContainer extends Component<Props, State> {
  //
  baseCategoryItems = {
    name: 'Category',
    countable: true,
    items: [
      { name: 'AI', path: lectureRoutePaths.collegeLectures('CLG00001') },
      { name: 'DT', path: lectureRoutePaths.collegeLectures('CLG00002') },
      { name: '행복', path: lectureRoutePaths.collegeLectures('CLG00003') },
      { name: 'SV', path: lectureRoutePaths.collegeLectures('CLG00004') },
      { name: '혁신디자인', path: lectureRoutePaths.collegeLectures('CLG00005') },
      { name: 'Global', path: lectureRoutePaths.collegeLectures('CLG00006') },
      { name: 'Leadership', path: lectureRoutePaths.collegeLectures('CLG00007') },
      { name: 'Management', path: lectureRoutePaths.collegeLectures('CLG00008') },
    ],
  };

  baseTopSiteMaps = [
    {
      name: 'Learning',
      items: [
        { name: 'In progress', path: myPageRoutePaths.learningInProgress() },
        { name: 'In My List', path: myPageRoutePaths.learningInMyList() },
        { name: 'Enrolled', path: myPageRoutePaths.learningEnrolled() },
        { name: 'Required', path: myPageRoutePaths.learningRequired() },
        { name: 'Completed List', path: myPageRoutePaths.learningCompleted() },
        { name: 'Retry', path: myPageRoutePaths.learningRetry() },
      ],
    },
    {
      name: 'Recommend',
      items: [
        { name: 'Recommend', path: lectureRoutePaths.recommend() },
      ],
    },
    {
      name: 'Community',
      items: [
        { name: 'My Community', path: myPageRoutePaths.communityMyCommunity() },
        { name: 'My Created Community', path: myPageRoutePaths.communityMyCreatedCommunity() },
        { name: 'My Feed', path: myPageRoutePaths.communityMyFeed() },
      ],
    },
  ];

  baseBottomSiteMaps = [
    {
      name: 'Introduction',
      items: [
        { name: 'mySUNI 소개', path: '/introduction' },
        { name: 'College 소개', path: '/introduction' },
      ],
    },
    {
      name: 'Create',
      items: [
        { name: 'Create', path: createRoutePaths.createCreate() },
        { name: 'Shared', path: createRoutePaths.createShared() },
      ],
    },
    {
      name: 'My Page',
      items: [
        { name: 'Completed List', path: myPageRoutePaths.myPageCompletedList() },
        { name: 'Earned Stamp List', path: myPageRoutePaths.myPageEarnedStampList() },
      ],
    },
    {
      name: 'Support',
      items: [
        { name: 'Notice', path: '/board/support/Notice' },
        { name: 'FAQ', path: '/board/support/FAQ' },
        { name: 'Q&A', path: '/board/support/Q&A' },
      ],
    },
  ];

  state = {
    open: false,
    topSiteMaps: [],
    bottomSiteMaps: [],
  };


  componentDidMount() {
    //
    this.setSiteMapWithCount();
  }

  async setSiteMapWithCount() {
    //
    const { collegeLectureCountService } = this.props;
    const { baseCategoryItems, baseTopSiteMaps, baseBottomSiteMaps } = this;

    const colleges = await collegeLectureCountService!.findCollegeLectureCounts();

    const categorySiteMap = {
      ...baseCategoryItems,
      items: baseCategoryItems.items.map((item) => ({
        ...item,
        count: colleges.find(college => college.name === item.name)!.collegeCount,
      })),
    };

    const topSiteMaps = [ categorySiteMap, ...baseTopSiteMaps ];
    const bottomSiteMaps = [ ...baseBottomSiteMaps ];

    this.setState({
      topSiteMaps,
      bottomSiteMaps,
    });
  }

  onClickHome() {
    //
    this.props.history.push('/');
    this.onClose();
  }

  onOpen() {
    //
    this.setState({ open: true });
  }

  onClose() {
    //
    this.setState({ open: false });
  }

  onClickItem(e: any, { item }: any) {
    //
    this.props.history.push(item.path);
    this.onClose();
  }

  render() {
    //
    const { trigger } = this.props;
    const { open, topSiteMaps, bottomSiteMaps } = this.state;

    return (
      <Modal className="base w1000" trigger={trigger} open={open} onOpen={this.onOpen} onClose={this.onClose}>
        <Modal.Header>
          mySUNI Site Map
          <div className="right-btn">
            <Button icon className="btn-blue2" onClick={this.onClickHome}>
              <Icon className="homelink" />Home
            </Button>
          </div>
        </Modal.Header>
        <Modal.Content>
          <SiteMapView
            topSiteMaps={topSiteMaps}
            bottomSiteMaps={bottomSiteMaps}
            onClickItem={this.onClickItem}
          />
        </Modal.Content>
        <Modal.Actions className="actions">
          <Button className="w190 pop d" onClick={this.onClose}>Close</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default withRouter(SiteMapModalContainer);
