import { Segment } from 'semantic-ui-react';
import * as React from 'react';
import { observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import { PersonalCubeService } from 'personalcube/personalcube';
import SelectType from '../../../shared-model/SelectType';
import SelectView from '../view/SelectView';
import CreateListView from '../view/CreateListView';
import CreateNoDataView from '../view/CreateNoDataView';


interface Props {
  personalCubeService: PersonalCubeService
  handleClickCubeRow:(personalCubeId: string) => void
}

interface States {
  disabled: boolean
  limit: number
}

@observer
@reactAutobind
class CreateListContainer extends React.Component<Props, States> {

  constructor(props: Props) {
    super(props);
    this.state = { disabled: false, limit: 0 };
  }

  componentDidMount() {
    const { personalCubeService } = this.props;
    if (personalCubeService) {
      this.findAllCubes(20);
    }
  }

  findAllCubes(limit?: number) {
    const { personalCubeService } = this.props;
    this.setState({ disabled: true });

    if ( personalCubeService && limit) {
      //const offset = 0;
      personalCubeService.changePersonalCubeQueryProps('limit', limit);
      personalCubeService.findAllPersonalCubesByQuery()
        .then(() => {
          const { personalCubes } = this.props.personalCubeService || {} as PersonalCubeService;
          const totalCount = personalCubes.totalCount;
          if (limit >= totalCount) this.setState({ disabled: true });
          else if (limit < totalCount) this.setState({ limit: limit + 20, disabled: false });
        });
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
    this.findAllCubes(20);
  }

  render() {
    const { personalCubes, personalCubeQuery } = this.props.personalCubeService || {} as PersonalCubeService;
    const { handleClickCubeRow } = this.props;
    const result = personalCubes.results;
    const totalCount = personalCubes.totalCount;
    const { disabled, limit } = this.state;

    return (

      <Segment className="full">
        <SelectView
          totalCount={totalCount}
          personalCubeQuery={personalCubeQuery}
          fieldOption={SelectType.status}
          onChangeCubeQueryProps={this.onChangeCubeQueryProps}
          queryFieldName="cubeState"
        />
        {
        result && result.length === 0 ?
          <CreateNoDataView />
          :
          <CreateListView
            result={result}
            handleClickCubeRow={handleClickCubeRow}
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
