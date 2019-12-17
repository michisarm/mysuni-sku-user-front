
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';

import { CollegeService } from 'college';
import { PersonalCubeService } from 'personalcube/personalcube';
import { LectureCardService } from 'lecture';
import ChannelLecturesContentWrapperView from '../view/ChannelLecturesContentWrapperView';
import SortingView from '../view/SortingView';
import SeeMoreButtonView from '../view/SeeMoreButtonView';


interface Props {
  collegeService?: CollegeService,
  personalCubeService?: PersonalCubeService,
  lectureCardService?: LectureCardService,
}

interface State {
  sorting: string,
}

@inject('lectureCardService')
@reactAutobind
@observer
class ChannelLecturesContainer extends Component<Props, State> {
  //
  state = {
    sorting: 'latest',
  };

  componentDidMount() {
    //
    // const { lectureCardService } = this.props;

    // lectureCardService!.findAllLectureCards(0, 20);
  }

  onChangeSorting(e: any, data: any) {
    //
    this.setState({
      sorting: data.value,
    });
  }

  onClickSeeMore() {
    console.log('click see more');
  }

  render() {
    //
    const { sorting } = this.state;

    return (
      <ChannelLecturesContentWrapperView
        lectureCount={80}
      >
        <>
          <SortingView
            value={sorting}
            onChange={this.onChangeSorting}
          />
          <div className="section">
            Todo: LectureCards
            <SeeMoreButtonView
              onClick={this.onClickSeeMore}
            />
          </div>
        </>
      </ChannelLecturesContentWrapperView>
    );
  }
}

export default ChannelLecturesContainer;
