
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { ContentLayout } from 'shared';
import { CollegeService } from 'college';
import { LectureCardService } from 'lecture';
import LectureCardHeaderView from '../view/LectureCardHeaderView';
import CategoryLecturesContainer from '../logic/CategoryLecturesContainer';


interface Props extends RouteComponentProps<{ collegeId: string, lectureCardId: string }> {
  collegeService: CollegeService,
  lectureCardService: LectureCardService,
}

@inject('collegeService', 'lectureCardService')
@reactAutobind
@observer
class LectureCardPage extends Component<Props> {
  //
  componentDidMount() {
    //
    const { match, collegeService, lectureCardService } = this.props;
    const { params } = match;

    collegeService.findCollege(params.collegeId);
    lectureCardService.findLectureCard(params.lectureCardId);
  }


  render() {
    //
    const { collegeService, lectureCardService } = this.props;
    const { college } = collegeService;
    const { lectureCard } = lectureCardService;

    console.log('lectureCard', lectureCard);

    return (
      <ContentLayout
        className="channel"
        breadcrumb={[
          { text: `${college.name} College`, path: `../../${college.collegeId}` },
          { text: `${college.name} Lecture` },
        ]}
      >
        <LectureCardHeaderView
          lectureCard={lectureCard}
        />
        <CategoryLecturesContainer />
      </ContentLayout>
    );
  }
}

export default withRouter(LectureCardPage);
