
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { mobxHelper, ContentLayout } from 'shared';
import { CollegeService } from 'college';
import LectureCountService from '../../present/logic/LectureCountService';
import CategoryLecturesHeaderView from '../view/CategoryLecturesHeaderView';
import CategoryLecturesContainer from '../logic/CategoryLecturesContainer';


interface Props extends RouteComponentProps<{ collegeId: string }> {
  collegeService: CollegeService,
  lectureCountService: LectureCountService,
}

@inject(mobxHelper.injectFrom('collegeService', 'lecture.lectureCountService'))
@reactAutobind
@observer
class CollegeLecturesPage extends Component<Props> {
  //
  componentDidMount() {
    //
    this.findCollegeAndChannels();
  }

  componentDidUpdate(prevProps: Props) {
    //
    if (prevProps.match.params.collegeId !== this.props.match.params.collegeId) {
      this.findCollegeAndChannels();
    }
  }

  async findCollegeAndChannels() {
    //
    const { match, collegeService, lectureCountService } = this.props;

    const college = await collegeService.findCollege(match.params.collegeId);

    if (!college) {
      return;
    }
    const channels = college.channels;

    channels.map((channel) => channel.checked = true);
    lectureCountService!.findLectureCountByCollegeId(match.params.collegeId, channels);
    // collegeService.setChannels(college.channels);
  }


  render() {
    //
    const { collegeService } = this.props;
    const { college } = collegeService;

    return (
      <ContentLayout
        className="channel"
        breadcrumb={[
          { text: `${collegeService.college.name} College` },
        ]}
      >
        <CategoryLecturesHeaderView
          college={college}
        />
        <CategoryLecturesContainer />
      </ContentLayout>
    );
  }
}

export default withRouter(CollegeLecturesPage);
