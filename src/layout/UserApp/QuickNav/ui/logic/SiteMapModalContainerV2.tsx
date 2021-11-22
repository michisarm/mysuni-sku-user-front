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
import certificationRoutePaths from 'certification/routePaths';
import { CollegeLectureCountService } from 'lecture/stores';
import { findChannelAndCardCount } from '../../../../../lecture/detail/api/cardApi';
// import { CollegeLectureCountService, CollegeLectureCountRdo } from 'lecture';
import SiteMapView, { SiteMap } from '../view/SiteMapView';
import {
  PolyglotText,
  getPolyglotText,
} from '../../../../../shared/ui/logic/PolyglotText';
import { SkProfileService } from '../../../../../profile/stores';
import { Area } from 'tracker/model';

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
    name: getPolyglotText('Category', 'home-사이트맵-대카테1'),
    countable: true,
    items: [
      {
        collegeId: 'CLG00001',
        name: getPolyglotText('AI', 'home-사이트맵-중카1'),
        path: lectureRoutePaths.collegeLectures('CLG00001'),
      },
      {
        collegeId: 'CLG00002',
        name: getPolyglotText('DT', 'home-사이트맵-중카2'),
        path: lectureRoutePaths.collegeLectures('CLG00002'),
      },
      {
        collegeId: 'CLG00003',
        name: getPolyglotText('행복', 'home-사이트맵-중카3'),
        path: lectureRoutePaths.collegeLectures('CLG00003'),
      },
      {
        collegeId: 'CLG00004',
        name: getPolyglotText('SV', 'home-사이트맵-중카4'),
        path: lectureRoutePaths.collegeLectures('CLG00004'),
      },
      {
        collegeId: 'CLG00005',
        name: getPolyglotText('혁신디자인', 'home-사이트맵-중카5'),
        path: lectureRoutePaths.collegeLectures('CLG00005'),
      },
      {
        collegeId: 'CLG00006',
        name: getPolyglotText('Global', 'home-사이트맵-중카6'),
        path: lectureRoutePaths.collegeLectures('CLG00006'),
      },
      {
        collegeId: 'CLG00007',
        name: getPolyglotText('Leadership', 'home-사이트맵-중카7'),
        path: lectureRoutePaths.collegeLectures('CLG00007'),
      },
      {
        collegeId: 'CLG00008',
        name: getPolyglotText('Management', 'home-사이트맵-중카8'),
        path: lectureRoutePaths.collegeLectures('CLG00008'),
      },
      {
        collegeId: 'CLG00019',
        name: getPolyglotText('미래반도체', 'home-사이트맵-중카9'),
        path: lectureRoutePaths.collegeLectures('CLG00019'),
      },
      {
        collegeId: 'CLG0001c',
        name: getPolyglotText('Environment', 'home-사이트맵-중카10'),
        path: lectureRoutePaths.collegeLectures('CLG0001c'),
      },
      {
        collegeId: 'CLG00020',
        name: getPolyglotText(
          'BM Design & Storytelling',
          'home-사이트맵-중카11'
        ),
        path: lectureRoutePaths.collegeLectures('CLG00020'),
      },
      {
        collegeId: 'CLG00018',
        name: getPolyglotText('SK아카데미', 'home-사이트맵-중카12'),
        path: lectureRoutePaths.collegeLectures('CLG00018'),
      },
      {
        collegeId: 'CLG00017',
        name: getPolyglotText('SK경영', 'home-사이트맵-중카13'),
        path: lectureRoutePaths.collegeLectures('CLG00017'),
      },
      {
        collegeId: 'CLG0001a',
        name: getPolyglotText('Life Style', 'home-사이트맵-중카14'),
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
      name: getPolyglotText('My Learning', 'home-사이트맵-대카테2'),
      items: [
        {
          name: getPolyglotText('학습중', 'home-사이트맵-중카20'),
          path: myPageRoutePaths.learningInProgress(),
        },
        {
          name: getPolyglotText('관심목록', 'home-사이트맵-중카21'),
          path: myPageRoutePaths.learningInMyList(),
        },
        {
          name: getPolyglotText('학습예정', 'home-사이트맵-중카22'),
          path: myPageRoutePaths.learningEnrolled(),
        },
        {
          name: getPolyglotText('핵인싸 과정', 'home-사이트맵-중카23'),
          path: myPageRoutePaths.learningRequired(),
        },
        {
          name: getPolyglotText('학습완료', 'home-사이트맵-중카24'),
          path: myPageRoutePaths.learningCompleted(),
        },
        {
          name: getPolyglotText('취소/미이수', 'home-사이트맵-중카25'),
          path: myPageRoutePaths.learningRetry(),
        },
      ],
    },
    {
      name: getPolyglotText('Recommend', 'home-사이트맵-대카테3'),
      items: [
        {
          name: getPolyglotText('Recommend', 'home-사이트맵-중카26'),
          path: lectureRoutePaths.recommend(),
        },
      ],
    },
    {
      name: (
        <span>
          <br />
          <br />
          <PolyglotText defaultString="Community" id="home-사이트맵-대카테4" />
        </span>
      ),
      items: [
        {
          name: getPolyglotText('My Community', 'home-사이트맵-중카27'),
          path: communityRoutePaths.myCommunity(),
        },
        {
          name: getPolyglotText('Community List', 'home-사이트맵-중카28'),
          path: communityRoutePaths.communityList(),
        },
        {
          name: getPolyglotText('Follow', 'home-사이트맵-중카29'),
          path: communityRoutePaths.follow(),
        },
      ],
    },
  ];

  baseBottomSiteMaps = [
    {
      name: getPolyglotText('About Us', 'home-사이트맵-대카테5'),
      items: [
        {
          name: getPolyglotText('mySUNI 소개', 'home-사이트맵-중카30'),
          path: mainRoutePaths.introductionMySuni(),
        },
        {
          name: getPolyglotText('College 소개', 'home-사이트맵-중카31'),
          path: mainRoutePaths.introductionCollege(),
        },
        {
          name: getPolyglotText('인증제도 소개', 'home-사이트맵-중카32'),
          path: mainRoutePaths.introductionCertification(),
        },
        {
          name: getPolyglotText('홍보자료', 'home-사이트맵-중카33'),
          path: mainRoutePaths.introductionPromotion(),
        },
      ],
    },
    {
      name: getPolyglotText('Certification', 'home-사이트맵-대카테10'),
      items: [
        {
          name: getPolyglotText('Badge List', 'home-사이트맵-중카44'),
          path: certificationRoutePaths.badgeAllBadgeList(),
        },
        {
          name: getPolyglotText('도전중 Badge', 'home-사이트맵-중카45'),
          path: certificationRoutePaths.badgeChallengingBadgeList(),
        },
        {
          name: getPolyglotText('My Badge', 'home-사이트맵-중카46'),
          path: certificationRoutePaths.badgeEarnedBadgeList(),
        },
      ],
    },
    {
      name: getPolyglotText('My Page', 'home-사이트맵-대카테7'),
      items: [
        {
          name: getPolyglotText('My Profile', 'home-사이트맵-중카42'),
          path: myPageRoutePaths.myPageProfile(),
        },
        {
          name: getPolyglotText('My Badge', 'home-사이트맵-중카35'),
          path: myPageRoutePaths.myPageEarnedBadgeList(),
        },
        {
          name: getPolyglotText('My Stamp', 'home-사이트맵-중카36'),
          path: myPageRoutePaths.myPageEarnedStampList(),
        },
        {
          name: getPolyglotText('Note', 'home-사이트맵-중카43'),
          path: myPageRoutePaths.myPageEarnedNoteList(),
        },
      ],
    },
    {
      name: getPolyglotText('승인관리', 'home-사이트맵-대카테8'),
      items: [
        {
          name: getPolyglotText('유료과정', 'home-사이트맵-중카37'),
          path: myPageRoutePaths.approvalPaidCourse(),
        },
        {
          name: getPolyglotText('개인학습', 'home-사이트맵-중카38'),
          path: myPageRoutePaths.approvalPersonalLearning(),
        },
      ],
    },
    {
      name: (
        <span>
          <br />
          <br />
          <PolyglotText defaultString="Support" id="home-사이트맵-대카테9" />
        </span>
      ),
      items:
        SkProfileService.instance.skProfile.language === 'Korean'
          ? [
              {
                name: getPolyglotText('Notice', 'home-사이트맵-중카39'),
                path: boardRoutePaths.supportNotice(),
              },
              {
                name: getPolyglotText('FAQ', 'home-사이트맵-중카40'),
                path: boardRoutePaths.supportFAQ(),
              },
              {
                name: getPolyglotText('1:1 문의', 'home-사이트맵-중카41'),
                path: boardRoutePaths.supportQnA(),
              },
            ]
          : [
              {
                name: getPolyglotText('FAQ', 'home-사이트맵-중카40'),
                path: boardRoutePaths.supportFAQ(),
              },
              {
                name: getPolyglotText('1:1 문의', 'home-사이트맵-중카41'),
                path: boardRoutePaths.supportQnA(),
              },
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
    const { skProfile } = SkProfileService.instance;
    const colleges = await findChannelAndCardCount(
      skProfile.language || 'Korean'
    );

    const categorySiteMap = {
      ...baseCategoryItems,
      items: baseCategoryItems.items.map((item) => {
        const college = colleges?.find(
          (college) => college.collegeId === item.collegeId
        );

        const channelCardCounts = college?.channelCounts.map(
          (item) => item.count
        );
        const collegeCardCounts = channelCardCounts?.reduce((a, b) => {
          return a + b;
        }, 0);

        return {
          ...item,
          path:
            (college && lectureRoutePaths.collegeLectures(college.collegeId)) ||
            '',
          count: (college && college.channelCounts && collegeCardCounts) || 0,
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
        data-area={Area.FOOTER_SITEMAP}
      >
        <Modal.Header>
          <PolyglotText
            defaultString="mySUNI Site Map"
            id="home-사이트맵-mssm"
          />
          <div className="right-btn">
            <Button icon className="btn-blue2" onClick={this.onClickHome}>
              <Icon className="homelink" />
              <PolyglotText defaultString="Home" id="home-사이트맵-home" />
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
            <PolyglotText defaultString="Close" id="home-사이트맵-닫기" />
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default withRouter(SiteMapModalContainerV2);
