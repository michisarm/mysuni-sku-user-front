import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { ContentLayout } from 'shared';
import mainRoutePaths from 'main/routePaths';
import { CollegeService } from 'college/stores';
import LectureCountService from '../../present/logic/LectureCountService';
import CategoryLecturesHeaderView from '../view/CategoryLecturesHeaderView';
import CategoryLecturesContainer from '../logic/CollegeLecturesContainer';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { getDefaultLang } from '../../../model/LangSupport';

interface Props extends RouteComponentProps<{ collegeId: string }> {
  collegeService: CollegeService;
  lectureCountService: LectureCountService;
}

@inject(
  mobxHelper.injectFrom('college.collegeService', 'lecture.lectureCountService')
)
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
    if (
      prevProps.match.params.collegeId !== this.props.match.params.collegeId
    ) {
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

    channels.map((channel) => (channel.checked = true));
    lectureCountService!.findLectureCountByCollegeId(
      match.params.collegeId,
      channels
    );
    // collegeService.setChannels(college.channels);
  }

  onClickMySuni() {
    //
    const { collegeService } = this.props;
    const { college } = collegeService;
    this.props.history.push(
      mainRoutePaths.introductionCollege(
        parsePolyglotString(college.name, getDefaultLang(college.langSupports))
      )
    );
    // console.log(
    //   mainRoutePaths.introductionCollege(
    //     parsePolyglotString(college.name, getDefaultLang(college.langSupports))
    //   )
    // );
  }

  render() {
    //
    const { collegeService } = this.props;
    const { college } = collegeService;

    return (
      <ContentLayout
        className="channel"
        breadcrumb={[
          {
            text: `${parsePolyglotString(
              college.name,
              getDefaultLang(college.langSupports)
            )} College`,
          },
        ]}
      >
        <CategoryLecturesHeaderView
          college={college}
          onClickMySuni={this.onClickMySuni}
        />
        <CategoryLecturesContainer />
      </ContentLayout>
    );
  }
}

export default withRouter(CollegeLecturesPage);
