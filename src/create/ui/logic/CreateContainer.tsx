import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import { reactAutobind } from '@nara.platform/accent';
import { CubeService } from '../../index';
import CreateProfileView from '../view/CreateProfileView';
import TabView from '../view/TabView';
import CreateListContainer from './CreateListContainer';
import SharedListContainer from './SharedListContainer';


interface Props extends RouteComponentProps{
  cubeService: CubeService
}

interface States {
  activeItem : string
}

@inject('cubeService')
@observer
@reactAutobind
class CreateContainer extends React.Component<Props, States> {

  constructor(props: Props) {
    super(props);
    this.state = { activeItem: '' };
  }

  componentDidMount() {
    const { cubeService } = this.props;
    if (cubeService) {
      this.setState({ activeItem: 'Create' });
    }
  }

  handleItemClick(e: any, { name }:any) {
    this.setState( { activeItem: name });
  }

  routeToCreateDetail() {
    console.log(56);
    this.props.history.push('/cube/create-detail');
  }

  render() {
    const { activeItem } = this.state;
    const { cubes } = this.props.cubeService || {} as CubeService;
    const totalCount = cubes.totalCount;

    const { cubeService } = this.props;

    return (
      <section className="content create">
        <CreateProfileView
          routeToCreateDetail={this.routeToCreateDetail}
        />
        <TabView
          activeItem ={activeItem}
          handleItemClick={this.handleItemClick}
          totalCount={totalCount}
        />
        {
          activeItem === 'Create' ?
            <CreateListContainer
              cubeService ={cubeService}
            />
            : ''
        }
        {
          activeItem === 'Shared' ?
            <SharedListContainer
              cubeService ={cubeService}
            />
            : ''
        }
      </section>
    );
  }
}

export default CreateContainer;
