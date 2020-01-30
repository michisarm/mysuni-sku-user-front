
import React from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router';

import { Segment } from 'semantic-ui-react';
import { CubeState, NoSuchContentPanel } from 'shared';
import lectureRoutePaths from 'lecture/routePaths';
import { SeeMoreButton } from 'lecture/shared';
import { LectureServiceType } from 'lecture';
import { PersonalCubeService } from 'personalcube/personalcube';

import routePaths from '../../../routePaths';
import SelectType from '../../model/SelectOptions';
import SelectView from '../view/SelectView';
import CreateListView from '../view/CreateListView';


interface Props extends RouteComponentProps<{ tab: string }> {
  personalCubeService?: PersonalCubeService
}

interface States {
  limit: number
}

@inject(mobxHelper.injectFrom(
  'personalCube.personalCubeService',
))
@observer
@reactAutobind
class CreateListContainer extends React.Component<Props, States> {
  //
  state = {
    limit: 0,
  };


  componentDidMount() {
    //
    this.findPersonalCubes(20);
  }

  findPersonalCubes(limit?: number) {
    //
    const personalCubeService = this.props.personalCubeService!;

    if (!limit) {
      return;
    }

    personalCubeService.changePersonalCubeQueryProps('limit', limit);
    personalCubeService.findAllPersonalCubesByQuery()
      .then(() => {
        const { personalCubes } = this.props.personalCubeService!;
        const totalCount = personalCubes.totalCount;

        if (limit < totalCount) {
          this.setState({ limit: limit + 20 });
        }
      });
  }

  onClickPersonalCubeRow(personalCubeId: string) {
    //
    const personalCubeService = this.props.personalCubeService!;
    const { history } = this.props;

    personalCubeService.findPersonalCube(personalCubeId)
      .then(() => {
        const cubeType = personalCubeService.personalCube.contents.type;
        const cubeState = personalCubeService.personalCube.cubeState;

        if (cubeState === CubeState.Created) {
          history.push(routePaths.createPersonalCubeDetail(personalCubeId, cubeType));
        }
        else {
          history.push(routePaths.createSharedDetail(personalCubeId, cubeType, cubeState));
        }
      });
  }

  onChangeSearchSelect(name: string, value: string | Date | number, nameSub?: string, valueSub?: string | number) {
    //
    const personalCubeService = this.props.personalCubeService!;

    if (nameSub) {
      personalCubeService.changePersonalCubeQueryProps(name, value, nameSub, valueSub);
    }
    else {
      personalCubeService.changePersonalCubeQueryProps(name, value);
    }

    this.findPersonalCubes(20);
  }

  onViewDetail(e: any, data: any) {
    //
    const { model } = data;
    const { history } = this.props;
    const collegeId = model.category.college.id;

    if (model.serviceType === LectureServiceType.Program || model.serviceType === LectureServiceType.Course) {
      history.push(lectureRoutePaths.courseOverview(collegeId, model.coursePlanId, model.serviceType, model.serviceId));
    }
    else if (model.serviceType === LectureServiceType.Card) {
      history.push(lectureRoutePaths.lectureCardOverview(collegeId, model.cubeId, model.serviceId));
    }
  }

  render() {
    //
    const { personalCubes, personalCubeQuery } = this.props.personalCubeService!;
    const totalCount = personalCubes.totalCount;
    const results = personalCubes.results;
    const { limit } = this.state;

    return (
      <Segment className="full">
        <SelectView
          totalCount={totalCount}
          personalCubeQuery={personalCubeQuery}
          fieldOption={SelectType.userStatus}
          onChangeCubeQueryProps={this.onChangeSearchSelect}
          queryFieldName="cubeState"
        />
        { results.length > 0 ?
          <CreateListView
            result={results}
            totalCount={totalCount}
            handleClickCubeRow={this.onClickPersonalCubeRow}
          />
          :
          <NoSuchContentPanel
            message="아직 생성한 학습이 없습니다."
            link={{ text: 'Create 바로가기', path: routePaths.createNew() }}
          />
        }
        { totalCount > results.length && (
          <SeeMoreButton
            onClick={() => this.findPersonalCubes(limit)}
          />
        )}
      </Segment>
    );
  }
}

export default withRouter(CreateListContainer);
