
import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps } from 'react-router-dom';

import { ContentLayout, Tab, TabItemModel } from 'shared';
import routePaths from '../../routePaths';
import InstructorService from '../../present/logic/InstructorService';
import InstructorLecturesContainer from '../logic/InstructorLecturesContainer';
import InstructorContentHeaderView from '../view/InstructorContentHeaderView';
import InstructorIntroduceView from '../view/InstructorIntroduceView';


interface Props extends RouteComponentProps<RouteParams> {
  instructorService :InstructorService
}

interface State {
  lecturesCount: number
}

interface RouteParams {
  instructorId : string,
  tab: ContentType,
}

enum ContentType {
  Introduce = 'Introduce',
  Lecture = 'Lecture',
}

@inject(mobxHelper.injectFrom(
  'expert.instructorService'))
@observer
@reactAutobind
class InstructorPage extends Component<Props, State> {
  //
  state = {
    lecturesCount: 0,
  };

  componentDidMount() {
    //
    const { instructorService, match } = this.props;
    const { instructorId } = match.params;

    instructorService.findInstructor(instructorId);
  }

  getTabs() {
    //
    const { lecturesCount } = this.state;

    return [
      {
        name: ContentType.Introduce,
        item: ContentType.Introduce,
        render: this.renderIntroduce,
      },
      {
        name: ContentType.Lecture,
        item: <>Lecture<span className="count">{lecturesCount}</span></>,
        render: this.renderLecture,
      },
    ] as TabItemModel[];
  }

  onChangeTab(tab: TabItemModel) {
    //
    const { history, match } = this.props;
    const { params } = match;

    history.push(routePaths.instructorTab(params.instructorId, tab.name));
  }

  onChangeLecturesCount(lecturesCount: number) {
    //
    this.setState({ lecturesCount });
  }

  renderIntroduce() {
    //
    const { instructor } = this.props.instructorService!;

    return (
      <InstructorIntroduceView
        instructor={instructor}
      />
    );
  }

  renderLecture() {
    //
    return (
      <InstructorLecturesContainer
        onChangeLecturesCount={this.onChangeLecturesCount}
      />
    );
  }

  render() {
    //
    const { instructor } = this.props.instructorService!;
    const { params } = this.props.match;

    return (
      <ContentLayout
        className="mylearning"
        breadcrumb={[
          { text: 'Expert' },
        ]}
      >
        <InstructorContentHeaderView
          instructor={instructor}
        />

        <Tab
          allMounted
          tabs={this.getTabs()}
          defaultActiveName={params.tab}
          onChangeTab={this.onChangeTab}
        />
      </ContentLayout>
    );
  }

}

export default InstructorPage;
