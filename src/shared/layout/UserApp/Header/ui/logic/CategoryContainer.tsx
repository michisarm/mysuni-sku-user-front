
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { mobxHelper } from 'shared';
import { CollegeService, CollegeModel, ChannelModel } from 'college';
import CategoryView from '../view/CategoryView';


interface Props extends RouteComponentProps {
  collegeService?: CollegeService,
}

interface State {
  categoryOpen: boolean,
  activeCollege?: CollegeModel,
}

@inject(mobxHelper.injectFrom('collegeService'))
@reactAutobind
@observer
class CategoryContainer extends Component<Props, State> {
  //
  state = {
    categoryOpen: false,
    activeCollege: undefined,
  };

  componentDidMount() {
    //
    const { collegeService } = this.props;

    collegeService!.findAllColleges();
  }


  onClickCategory() {
    //
    this.setState((state) => ({
      categoryOpen: !state.categoryOpen,
    }));
  }

  onActiveCollege(e: any, college: CollegeModel) {
    //
    const { collegeService } = this.props;

    this.setState({
      activeCollege: college,
    });
    collegeService!.setChannels(college.channels);
  }

  onClickChannel(e: any, channel?: ChannelModel) {
    //
    const { activeCollege } = this.state;
    const active: CollegeModel = activeCollege as any;

    if (!channel) {
      this.props.history.push(`/lecture/college/${active.collegeId}/channels`);
    }
    else if (active.collegeId && channel.id) {
      this.props.history.push(`/lecture/college/${active.collegeId}/channel/${channel.id}`);
    }
    this.setState({
      categoryOpen: false,
    });
  }

  render() {
    //
    const { collegeService } = this.props;
    const { categoryOpen, activeCollege } = this.state;

    return (
      <CategoryView
        open={categoryOpen}
        colleges={collegeService!.colleges}
        activeCollege={activeCollege}
        channels={collegeService!.channels}
        onClick={this.onClickCategory}
        onActiveCollege={this.onActiveCollege}
        onClickChannel={this.onClickChannel}
      />
    );
  }
}

export default withRouter(CategoryContainer);
