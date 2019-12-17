
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';

import { CollegeService } from 'college';
import { PersonalCubeService } from 'personalcube/personalcube';
import { LectureCardService } from 'lecture';
import CategoryLecturesContentWrapperView from '../view/CategoryLecturesContentWrapperView';
import ChannelsView from '../view/ChannelsView';
import LecturesWrapperView from '../view/LecturesWrapperView';
import SortingView from '../view/SortingView';
import SeeMoreButtonView from '../view/SeeMoreButtonView';
import { DescriptionView } from '../view/CategoryLecturesElementsView';


interface Props {
  collegeService?: CollegeService,
  personalCubeService?: PersonalCubeService,
  lectureCardService?: LectureCardService,
}

interface State {
  categoriesOpen: boolean,
  sorting: string,
}

@inject('collegeService', 'personalCubeService', 'lectureCardService')
@reactAutobind
@observer
class CategoryLecturesContainer extends Component<Props, State> {
  //
  state = {
    categoriesOpen: false,
    sorting: 'latest',
  };

  componentDidMount() {
    //
    const { personalCubeService, lectureCardService } = this.props;

    // lectureCardService!.findAllLectureCards(0, 20);

    // Todo: 조회 서비스 교체해야함.
    // personalCubeService!.findAllPersonalCubesByQuery();
    // personalCubeService!.findAllPersonalCubes(0, 20);
  }


  onToggleCategories() {
    //
    this.setState((state) => ({
      categoriesOpen: !state.categoriesOpen,
    }));
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
    const { collegeService } = this.props;
    const { categoriesOpen, sorting } = this.state;
    const college = collegeService!.college;
    const channels = collegeService!.channels;

    return (
      <CategoryLecturesContentWrapperView>
        <ChannelsView
          open={categoriesOpen}
          channels={channels}
          onToggle={this.onToggleCategories}
        />
        <LecturesWrapperView
          header={
            <>
              <DescriptionView
                name={`${college.name} College`}
                count={230}
              />
              <SortingView
                value={sorting}
                onChange={this.onChangeSorting}
              />
            </>
          }
        >
          <>
            Todo: LectureCards
            <SeeMoreButtonView
              onClick={this.onClickSeeMore}
            />
          </>
        </LecturesWrapperView>
      </CategoryLecturesContentWrapperView>
    );
  }
}

export default CategoryLecturesContainer;
