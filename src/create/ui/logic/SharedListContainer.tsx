import * as React from 'react';
import { Segment } from 'semantic-ui-react';
import SelectView from '../view/SelectView';
import SelectType from '../../../shared/model/SelectType';
import { CubeService } from '../..';
import CreateNoDataView from '../view/CreateNoDataView';
import SharedListView from '../view/SharedListView';

interface Props {
  cubeService: CubeService
}

class CreateListContainer extends React.Component<Props> {

  componentDidMount() {
    const { cubeService } = this.props;
    if (cubeService) {
      this.findAllCubes();
    }
  }

  findAllCubes() {
    const { cubeService } = this.props;
    if ( cubeService) {
      cubeService.findAllCubesByQuery();
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
  }

  render() {
    const { cubes, cubeQuery } = this.props.cubeService || {} as CubeService;
    const result = cubes.results;
    const totalCount = cubes.totalCount;

    return (

      <Segment className="full">
        {
          result && result.length === 0 ?
            ''
            :
            <SelectView
              totalCount={totalCount}
              cubeQuery={cubeQuery}
              fieldOption={SelectType.openedStateType}
              onChangeCubeQueryProps={this.onChangeCubeQueryProps}
              queryFieldName="openedStateType"
            />
        }
        {
          result && result.length === 0 ?
            <CreateNoDataView />
            :
            <SharedListView />
        }
      </Segment>
    );
  }
}
export default CreateListContainer;
