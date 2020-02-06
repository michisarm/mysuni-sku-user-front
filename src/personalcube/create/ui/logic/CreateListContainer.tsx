
import React from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router';

import { Segment } from 'semantic-ui-react';
import { CubeState, NoSuchContentPanel } from 'shared';
import { SeeMoreButton } from 'lecture/shared';
import { PersonalCubeService } from 'personalcube/personalcube';

import routePaths from '../../../routePaths';
import SelectType from '../../model/SelectOptions';
import CreateListPanelTopLineView from '../view/CreateListPanelTopLineView';
import CreateListView from '../view/CreateListView';


interface Props extends RouteComponentProps<{ tab: string }> {
  personalCubeService?: PersonalCubeService
  active: boolean
}

interface States {
  nextOffset: number
  cubeState?: CubeState
}

@inject(mobxHelper.injectFrom(
  'personalCube.personalCubeService',
))
@observer
@reactAutobind
class CreateListContainer extends React.Component<Props, States> {
  //
  PAGE_LIMIT = 20;

  state = {
    nextOffset: 0,
    cubeState: undefined,
  };


  componentDidMount() {
    //
    this.findPersonalCubes();
  }

  async findPersonalCubes(cubeState?: CubeState) {
    //
    const personalCubeService = this.props.personalCubeService!;

    await personalCubeService.findPersonalCubesForCreator(0, this.PAGE_LIMIT, cubeState);
    this.setState({ nextOffset: 1 });
  }

  async findPagingPersonalCubes() {
    //
    const personalCubeService = this.props.personalCubeService!;
    const { nextOffset, cubeState } = this.state;

    await personalCubeService.findAndPushPersonalCubesForCreator(nextOffset, this.PAGE_LIMIT, cubeState);
    this.setState({ nextOffset: nextOffset + 1 });
  }

  onChangeSearchSelect(e: any, data: any) {
    //
    const cubeState = data.value;

    this.findPersonalCubes(cubeState);
    this.setState({ cubeState });
  }

  async onClickPersonalCubeRow(personalCubeId: string) {
    //
    const personalCubeService = this.props.personalCubeService!;
    const { history } = this.props;

    const personalCube = await personalCubeService.findPersonalCube(personalCubeId);

    const cubeType = personalCube!.contents.type;
    const cubeState = personalCube!.cubeState;

    if (cubeState === CubeState.Created) {
      history.push(routePaths.createPersonalCubeDetail(personalCubeId, cubeType));
    }
    else {
      history.push(routePaths.createSharedDetail(personalCubeId, cubeType, cubeState));
    }
  }

  render() {
    //
    const { personalCubeOffsetList } = this.props.personalCubeService!;
    const { active } = this.props;
    const { totalCount, results: personalCubes } = personalCubeOffsetList;

    if (!active) {
      return null;
    }

    return (
      <Segment className="full">
        <CreateListPanelTopLineView
          totalCount={totalCount}
          searchSelectOptions={SelectType.userStatus}
          onChange={this.onChangeSearchSelect}
        />

        { personalCubes.length > 0 ?
          <CreateListView
            personalCubes={personalCubes}
            totalCount={totalCount}
            handleClickCubeRow={this.onClickPersonalCubeRow}
          />
          :
          <NoSuchContentPanel
            message="아직 생성한 학습이 없습니다."
            link={{ text: 'Create 바로가기', path: routePaths.createNew() }}
          />
        }
        { totalCount > personalCubes.length && (
          <SeeMoreButton
            onClick={() => this.findPagingPersonalCubes()}
          />
        )}
      </Segment>
    );
  }
}

export default withRouter(CreateListContainer);
