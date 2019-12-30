import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import { reactAutobind } from '@nara.platform/accent';
import { ContentLayout, CubeState, mobxHelper } from 'shared';
import { PersonalCubeService } from 'personalcube/personalcube';
import CreateProfileView from '../view/CreateProfileView';
import TabView from '../view/TabView';
import CreateListContainer from './CreateListContainer';
import SharedListContainer from './SharedListContainer';


interface Props extends RouteComponentProps{
  personalCubeService: PersonalCubeService
}

interface States {
  activeItem : string
}

@inject(mobxHelper.injectFrom('personalCube.personalCubeService'))
@observer
@reactAutobind
class CreateContainer extends React.Component<Props, States> {

  constructor(props: Props) {
    super(props);
    this.state = { activeItem: '' };
  }

  componentDidMount() {
    const { personalCubeService } = this.props;
    if (personalCubeService) {
      this.setState({ activeItem: 'Create' });
    }
  }

  handleItemClick(e: any, { name }:any) {
    this.setState( { activeItem: name });
  }

  routeToCreateDetail() {
    this.props.history.push('/personalcube/create-detail');
  }

  handleClickCubeRow(personalCubeId: string) {
    //
    const { personalCubeService } = this.props;
    if (personalCubeService) {
      personalCubeService.findPersonalCube(personalCubeId)
        .then(() => {
          const cubeType = personalCubeService.personalCube.contents.type;
          const cubeState = personalCubeService.personalCube.cubeState;
          if (cubeState === CubeState.Created) this.props.history.push(`/personalcube/create-detail/${personalCubeId}/${cubeType}`);
          else  this.props.history.push(`/personalcube/shared-detail/${personalCubeId}/${cubeType}/${cubeState}`);
        });
    }
  }

  render() {
    const { activeItem } = this.state;
    const { personalCubes } = this.props.personalCubeService || {} as PersonalCubeService;
    const totalCount = personalCubes.totalCount;
    const { personalCubeService } = this.props;

    return (
      <ContentLayout
        className="create"
        breadcrumb={[
          { text: 'Create' },
        ]}
      >
        <CreateProfileView
          routeToCreateDetail={this.routeToCreateDetail}
        />
        <TabView
          activeItem ={activeItem}
          totalCount={totalCount}
          handleItemClick={this.handleItemClick}
        />
        {
          activeItem === 'Create' && (
            <CreateListContainer
              personalCubeService = {personalCubeService}
              handleClickCubeRow={this.handleClickCubeRow}
            />
          )
        }
        {
          activeItem === 'Shared' && (
            <SharedListContainer
              personalCubeService = {personalCubeService}
            />
          )
        }
      </ContentLayout>
    );
  }
}

export default CreateContainer;
