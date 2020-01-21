import React from 'react';
import { Button, Icon, Select } from 'semantic-ui-react';
import { CubeQueryModel } from '../../../personalcube/model/CubeQueryModel';

interface Props{
  totalCount: number
  personalCubeQuery: CubeQueryModel
  fieldOption: any
  onChangeCubeQueryProps: (name: string, value: string | Date | number, nameSub?: string, valueSub?: string | number) => void
  queryFieldName: string
}

class SelectView extends React.Component <Props> {

  render() {
    const { totalCount, fieldOption, onChangeCubeQueryProps, queryFieldName } = this.props;
    return (
      <div className="top-guide-title size-type3">
        <div className="list-number">총 <strong>{totalCount}개</strong>의 리스트가 있습니다.</div>
        { queryFieldName === 'cubeState' ?
          <div className="right-wrap">
            <Select
              placeholder="전체"
              className="ui small-border dropdown m0"
              defaultValue={fieldOption[0].value}
              options={fieldOption}
              onChange={(e: any, data: any) => onChangeCubeQueryProps( `${queryFieldName}`, data.value)}
            />
          </div>
          :
          <div className="right-wrap">
            {/*<Select
              placeholder="전체"
              className="ui small-border dropdown"
              defaultValue={fieldOption[0].value}
              options={fieldOption}
              onChange={(e: any) => onChangeCubeQueryProps(`${queryFieldName}`, e.target.value)}
            />*/}
            <Button icon className="left post">
              <Icon className="filter2" />Filter
            </Button>
          </div>
        }
      </div>
    );
  }

}

export default SelectView;
