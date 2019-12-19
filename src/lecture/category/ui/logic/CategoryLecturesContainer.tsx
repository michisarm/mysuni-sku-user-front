
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { mobxHelper, Lecture } from 'shared';
import { CollegeService } from 'college';
import { PersonalCubeService } from 'personalcube/personalcube';
import { LectureService, LectureCardService, LectureModel, LectureServiceType } from 'lecture';
import CategoryLecturesContentWrapperView from '../view/CategoryLecturesContentWrapperView';
import { ChannelsPanel, CardSorting, SeeMoreButton } from '../../../shared';
import LecturesWrapperView from '../view/LecturesWrapperView';
import { DescriptionView } from '../view/CategoryLecturesElementsView';


interface Props extends RouteComponentProps<{ collegeId: string }> {
  collegeService?: CollegeService,
  personalCubeService?: PersonalCubeService,
  lectureService?: LectureService,
  lectureCardService?: LectureCardService,
}

interface State {
  categoriesOpen: boolean,
  sorting: string,
}

@inject(mobxHelper.injectFrom('collegeService', 'personalCube.personalCubeService', 'lecture.lectureService', 'lecture.lectureCardService'))
@reactAutobind
@observer
class CategoryLecturesContainer extends Component<Props, State> {
  //
  lectureLimit = 20;

  state = {
    categoriesOpen: false,
    sorting: 'latest',
  };

  componentDidMount() {
    //
    const { match, lectureService } = this.props;

    lectureService!.findCollegeLectures(match.params.collegeId, this.lectureLimit, 0);
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

  onActionLecture() {

  }

  onGoToLecture(e: any, data: any) {
    //
    const { lecture } = data;
    const { history } = this.props;

    console.log('serviceType', lecture.serviceType);
    if (lecture.serviceType === LectureServiceType.Card) {
      history.push(`./lecture-card/${lecture.serviceId}`);
    }
  }

  onClickSeeMore() {
    console.log('click see more');
  }

  render() {
    //
    const { collegeService, lectureService } = this.props;
    const { categoriesOpen, sorting } = this.state;
    const { college, channels } = collegeService!;
    const { lectures } = lectureService!;

    console.log('CategoryLecturesContainer', lectures);

    return (
      <CategoryLecturesContentWrapperView>
        <ChannelsPanel
          open={categoriesOpen}
          channels={channels}
          onToggle={this.onToggleCategories}
        />
        <LecturesWrapperView
          header={
            <>
              <DescriptionView
                name={`${college.name} College`}
                count={lectures.length}
              />
              <CardSorting
                value={sorting}
                onChange={this.onChangeSorting}
              />
            </>
          }
        >
          <>
            <Lecture.Group type={Lecture.GroupType.Box}>
              {lectures.map((lecture: LectureModel) => (
                <Lecture
                  key={lecture.id}
                  lecture={lecture}
                  // thumbnailImage="http://placehold.it/60x60"
                  action={Lecture.ActionType.Add}
                  onAction={this.onActionLecture}
                  onViewDetail={this.onGoToLecture}
                />
              ))}
            </Lecture.Group>
            <SeeMoreButton
              onClick={this.onClickSeeMore}
            />
          </>
        </LecturesWrapperView>
      </CategoryLecturesContentWrapperView>
    );
  }
}



export default withRouter(CategoryLecturesContainer);
