import * as React from 'react';
import { Segment } from 'semantic-ui-react';
import SelectView from '../view/SelectView';
import SelectType from '../../../shared/model/SelectType';
import { PersonalCubeService } from '../..';
import CreateNoDataView from '../view/CreateNoDataView';
import SharedListView from '../view/SharedListView';

interface Props {
  personalCubeService: PersonalCubeService
}

class CreateListContainer extends React.Component<Props> {

  componentDidMount() {
    const { personalCubeService } = this.props;
    if (personalCubeService) {
      this.findAllCubes();
    }
  }

  findAllCubes() {
    const { personalCubeService } = this.props;
    if ( personalCubeService) {
      personalCubeService.findAllPersonalCubesByQuery();
    }
  }

  onChangeCubeQueryProps(name: string, value: string | Date | number, nameSub?: string, valueSub?: string | number) {
    const { personalCubeService } = this.props;
    if (personalCubeService && nameSub) {
      personalCubeService.changePersonalCubeQueryProps(name, value, nameSub, valueSub);
    }
    if (personalCubeService && !nameSub) {
      personalCubeService.changePersonalCubeQueryProps(name, value);
    }
  }

  render() {
    const { personalCubes, personalCubeQuery } = this.props.personalCubeService || {} as PersonalCubeService;
    const result = personalCubes.results;
    const totalCount = personalCubes.totalCount;

    return (

      <Segment className="full">
        {
          result && result.length === 0 ?
            ''
            :
            <SelectView
              totalCount={totalCount}
              personalCubeQuery={personalCubeQuery}
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
