
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { ContentLayout } from 'shared';
import { CollegeService } from 'college';
import CategoryLecturesHeaderView from '../view/CategoryLecturesHeaderView';
import CategoryLecturesContainer from '../logic/CategoryLecturesContainer';


interface Props extends RouteComponentProps<{ collegeId: string }> {
  collegeService: CollegeService,
}

@inject('collegeService')
@reactAutobind
@observer
class CategoryLecturesPage extends Component<Props> {
  //
  componentDidMount() {
    //
    const { match, collegeService } = this.props;
    const { params } = match;

    collegeService.findCollege(params.collegeId)
      .then((college) => {
        //
        if (!college) return;
        const channels = college.channels;

        channels.map((channel) => channel.checked = true);

        collegeService.setChannels(college.channels);
      });
  }

  componentDidUpdate(prevProps: Props) {
    //
    const { match, collegeService } = this.props;

    if (prevProps.match.params.collegeId !== match.params.collegeId) {
      collegeService.findCollege(match.params.collegeId);
    }
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

export default withRouter(CategoryLecturesPage);
