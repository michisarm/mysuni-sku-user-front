import { Segment } from 'semantic-ui-react';
import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import SelectType from '../../../shared/model/SelectType';
import SelectView from '../view/SelectView';
import CreateListView from '../view/CreateListView';
import CreateNoDataView from '../view/CreateNoDataView';
import { CubeService } from '../../index';

interface Props {
  cubeService: CubeService
}

interface States {
  disabled: boolean
  limit: number
}

@inject('cubeService')
@observer
@reactAutobind
class CreateListContainer extends React.Component<Props, States> {

  constructor(props: Props) {
    super(props);
    this.state = { disabled: false, limit: 0 };
  }

  componentDidMount() {
    const { cubeService } = this.props;
    if (cubeService) {
      this.findAllCubes(20);
    }
  }

  findAllCubes(limit?: number) {
    const { cubeService } = this.props;
    this.setState({ disabled: true });

    if ( cubeService && limit) {
      //const offset = 0;
      cubeService.changeCubeQueryProps('limit', limit);
      cubeService.findAllCubesByQuery()
        .then(() => {
          const { cubes } = this.props.cubeService || {} as CubeService;
          const totalCount = cubes.totalCount;
          if (limit >= totalCount) this.setState({ disabled: true });
          else if (limit < totalCount) this.setState({ limit: limit + 20, disabled: false });
        });
    }
  }

  onChangeCubeQueryProps(name: string, value: string | Date | number, nameSub?: string, valueSub?: string | number) {
    const { cubeService } = this.props;
    if (cubeService && nameSub) {
      cubeService.changeCubeQueryProps(name, value, nameSub, valueSub);
    }
    if (cubeService && !nameSub) {
      cubeService.changeCubeQueryProps(name, value);
    }
    this.findAllCubes(20);
  }


  handleClickCubeRow(cubeId: string) {
    //
    const { cubeService } = this.props;
    if (cubeService) {
      cubeService.findCube(cubeId)
        .then(() => {
          const cubeType = cubeService.cube.contents.type;
          const openState = cubeService.cube.openState;
          /*if (openState === OpenState.Created) this.props.history.push(`/${learningManagementUrl}/cubes/create-cube/${cubeId}/${cubeType}`);
          else this.props.history.push(`/${learningManagementUrl}/cubes/cube-detail/${cubeId}/${cubeType}`);*/
        });
    }
  }

  render() {
    const { cubes, cubeQuery } = this.props.cubeService || {} as CubeService;
    const result = cubes.results;
    const totalCount = cubes.totalCount;
    const { disabled, limit } = this.state;

    return (

      <Segment className="full">
        {
          result && result.length === 0 ?
            ''
            :
            <SelectView
              totalCount={totalCount}
              cubeQuery={cubeQuery}
              fieldOption={SelectType.status}
              onChangeCubeQueryProps={this.onChangeCubeQueryProps}
              queryFieldName="openState"
            />
        }
        {
        result && result.length === 0 ?
          <CreateNoDataView />
          :
          <CreateListView
            result={result}
            handleClickCubeRow={this.handleClickCubeRow}
            disabled={disabled}
            findAllCubes ={this.findAllCubes}
            limit={limit}
          />
        }
      </Segment>
    );
  }

}

export default CreateListContainer;
