import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Modal, Icon, Button } from 'semantic-ui-react';
import boardRoutePaths from 'board/routePaths';
import mainRoutePaths from 'main/routePaths';
import lectureRoutePaths from 'lecture/routePaths';
import createRoutePaths from 'personalcube/routePaths';
import myPageRoutePaths from 'myTraining/routePaths';
import communityRoutePaths from 'community/routePaths';
import { CollegeLectureCountService } from 'lecture/stores';
// import { CollegeLectureCountService, CollegeLectureCountRdo } from 'lecture';
import SiteMapView, { SiteMap } from '../view/SiteMapView';

interface Props extends RouteComponentProps {
  trigger: React.ReactNode;
  collegeLectureCountService?: CollegeLectureCountService;
}

interface State {
  open: boolean;
  topSiteMaps: SiteMap[];
  bottomSiteMaps: SiteMap[];
}

@inject(mobxHelper.injectFrom('lecture.collegeLectureCountService'))
@reactAutobind
@observer
class SiteMapModalContainerV2 extends Component<Props, State> {
  //
  baseCategoryItems = {
    name: 'Category',
    countable: true,
    items: [
      {
        collegeId: 'CLG00001',
        name: 'AI',
        path: lectureRoutePaths.collegeLectures('CLG00001'),
      },
      {
        collegeId: 'CLG00002',
        name: 'DT',
        path: lectureRoutePaths.collegeLectures('CLG00002'),
      },
      {
        collegeId: 'CLG00003',
        name: '행복',
        path: lectureRoutePaths.collegeLectures('CLG00003'),
      },
      {
        collegeId: 'CLG00004',
        name: 'SV',
        path: lectureRoutePaths.collegeLectures('CLG00004'),
      },
      {
        collegeId: 'CLG00005',
        name: '혁신디자인',
        path: lectureRoutePaths.collegeLectures('CLG00005'),
      },
      {
        collegeId: 'CLG00006',
        name: 'Global',
        path: lectureRoutePaths.collegeLectures('CLG00006'),
      },
      {
        collegeId: 'CLG00007',
        name: 'Leadership',
        path: lectureRoutePaths.collegeLectures('CLG00007'),
      },
      {
        collegeId: 'CLG00008',
        name: 'Management',
        path: lectureRoutePaths.collegeLectures('CLG00008'),
      },
      {
        collegeId: 'CLG00019',
        name: '미래반도체',
        path: lectureRoutePaths.collegeLectures('CLG00019'),
      },
      {
        collegeId: 'CLG0001c',
        name: 'Environment',
        path: lectureRoutePaths.collegeLectures('CLG0001c'),
      },
      {
        collegeId: 'CLG00020',
        name: 'BM Design & Storytelling',
        path: lectureRoutePaths.collegeLectures('CLG00020'),
      },
      {
        collegeId: 'CLG00018',
        name: 'SK아카데미',
        path: lectureRoutePaths.collegeLectures('CLG00018'),
      },
      {
        collegeId: 'CLG00017',
        name: 'SK경영',
        path: lectureRoutePaths.collegeLectures('CLG00017'),
      },
      {
        collegeId: 'CLG0001a',
        name: 'Life Style',
        path: lectureRoutePaths.collegeLectures('CLG0001a'),
      },
    ],
  };

  /*baseCategoryItems2 = {
    name: '',
    countable: true,
    items: [
      { name: 'Management', path: lectureRoutePaths.collegeLectures('CLG00008') },
      { name: '반도체', path: lectureRoutePaths.collegeLectures('CLG00019') },
      { name: 'SK아카데미', path: lectureRoutePaths.collegeLectures('CLG00018') },
      { name: 'SK경영', path: lectureRoutePaths.collegeLectures('CLG00017') },
      { name: 'Life Style', path: lectureRoutePaths.collegeLectures('CLG0001a') },
    ],
  };*/

  baseTopSiteMaps = [
    {
      name: 'Learning',
      items: [
        { name: '학습중', path: myPageRoutePaths.learningInProgress() },
        { name: '관심목록', path: myPageRoutePaths.learningInMyList() },
        { name: '학습예정', path: myPageRoutePaths.learningEnrolled() },
        { name: '권장과정', path: myPageRoutePaths.learningRequired() },
        { name: '학습완료', path: myPageRoutePaths.learningCompleted() },
        { name: '취소/미이수', path: myPageRoutePaths.learningRetry() },
      ],
    },
    {
      name: 'Recommend',
      items: [{ name: 'Recommend', path: lectureRoutePaths.recommend() }],
    },
    {
      name: (
        <span>
          <br />
          <br />
          Community
        </span>
      ),
      items: [
        { name: 'My Community', path: communityRoutePaths.myCommunity() },
        { name: 'Community List', path: communityRoutePaths.communityList() },
        { name: 'Follow', path: communityRoutePaths.follow() },
      ],
    },
  ];

  baseBottomSiteMaps = [
    {
      name: 'Introduction',
      items: [
        { name: 'mySUNI 소개', path: mainRoutePaths.introductionMySuni() },
        { name: 'College 소개', path: mainRoutePaths.introductionCollege() },
        {
          name: '인증제도 소개',
          path: mainRoutePaths.introductionCertification(),
        },
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
        { name: 'My Profile', path: myPageRoutePaths.myPageProfile() },
        { name: 'My Badge', path: myPageRoutePaths.myPageEarnedBadgeList() },
        { name: 'My Stamp', path: myPageRoutePaths.myPageEarnedStampList() },
        { name: 'Note', path: myPageRoutePaths.myPageEarnedNoteList() },
      ],
    },
    {
      name: '승인관리',
      items: [
        { name: '유료과정', path: myPageRoutePaths.approvalPaidCourse() },
        { name: '개인학습', path: myPageRoutePaths.approvalPersonalLearning() },
      ],
    },
    {
      name: (
        <span>
          <br />
          <br />
          Support
        </span>
      ),
      items: [
        { name: 'Notice', path: boardRoutePaths.supportNotice() },
        { name: 'FAQ', path: boardRoutePaths.supportFAQ() },
        { name: 'Q&A', path: boardRoutePaths.supportQnA() },
      ],
    },
  ];

  state = {
    open: false,
    topSiteMaps: [],
    bottomSiteMaps: [],
  };

  // componentDidMount() {
  //   //
  //   this.setSiteMapWithCount();
  // }

  async setSiteMapWithCount() {
    //
    const { collegeLectureCountService } = this.props;
    const { baseCategoryItems, baseTopSiteMaps, baseBottomSiteMaps } = this;

    const colleges = await collegeLectureCountService!.findCollegeLectureCounts();

    const categorySiteMap = {
      ...baseCategoryItems,
      items: baseCategoryItems.items.map(item => {
        //
        const college = colleges.find(
          (college: any) => college.id === item.collegeId
        );

        return {
          ...item,
          path: college && lectureRoutePaths.collegeLectures(college.id),
          count: (college && college.channels && college.channels.length) || 0,
        };
      }),
    };

    const topSiteMaps = [categorySiteMap, ...baseTopSiteMaps];
    const bottomSiteMaps = [...baseBottomSiteMaps];

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
    this.setSiteMapWithCount();
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
      <Modal
        className="base w1000"
        trigger={trigger}
        open={open}
        onOpen={this.onOpen}
        onClose={this.onClose}
      >
        <Modal.Header>
          mySUNI Site Map
          <div className="right-btn">
            <Button icon className="btn-blue2" onClick={this.onClickHome}>
              <Icon className="homelink" />
              Home
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
          <Button className="w190 pop d" onClick={this.onClose}>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default withRouter(SiteMapModalContainerV2);
