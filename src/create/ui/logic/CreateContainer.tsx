import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import { reactAutobind } from '@nara.platform/accent';
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

@inject('personalCubeService')
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
    console.log(56);
    this.props.history.push('/personalcube/create-detail');
  }

  render() {
    const { activeItem } = this.state;
    const { personalCubes } = this.props.personalCubeService || {} as PersonalCubeService;
    const totalCount = personalCubes.totalCount;
    const { personalCubeService } = this.props;

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
              personalCubeService = {personalCubeService}
            />
            : ''
        }
        {
          activeItem === 'Shared' ?
            <SharedListContainer
              personalCubeService = {personalCubeService}
            />
            : ''
        }
      </section>
    );
  }
}

export default CreateContainer;
