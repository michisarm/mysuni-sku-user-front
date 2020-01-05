
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Modal, Icon, Button } from 'semantic-ui-react';
import lectureRoutePaths from 'lecture/routePaths';
import createRoutePaths from 'create/routePaths';
import myPageRoutePaths from 'mypage/routePaths';
import SiteMapView from '../view/SiteMapView';


interface Props extends RouteComponentProps {
  trigger: React.ReactNode,
}

interface State {
  open: boolean,
}

@reactAutobind
@observer
class SiteMapModalContainer extends Component<Props, State> {
  //
  static defaultTopSiteMaps = [
    {
      name: 'Category',
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
    },
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

  static defaultBottomSiteMaps = [
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
  };


  onClickHome() {
    //
    this.props.history.push('/');
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
    const { defaultTopSiteMaps, defaultBottomSiteMaps } = SiteMapModalContainer;
    const { trigger } = this.props;
    const { open } = this.state;

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
            topSiteMaps={defaultTopSiteMaps}
            bottomSiteMaps={defaultBottomSiteMaps}
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
