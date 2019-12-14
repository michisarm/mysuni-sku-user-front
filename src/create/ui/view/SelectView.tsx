import * as React from 'react';
import { Button, Icon, Select } from 'semantic-ui-react';
import { CubeQueryModel } from '../../model/CubeQueryModel';

interface Props{
  totalCount: number
  personalCubeQuery: CubeQueryModel
  fieldOption: any
  onChangeCubeQueryProps: (name: string, value: string | Date | number, nameSub?: string, valueSub?: string | number) => void
  queryFieldName: string
}

class SelectView extends React.Component <Props> {

  render() {
    const { totalCount, fieldOption, onChangeCubeQueryProps, personalCubeQuery, queryFieldName } = this.props;
    return (
      <div className="top-guide-title size-type3">
        <div className="list-number">총 <strong>{totalCount}개</strong>의 리스트가 있습니다.</div>
        {
          queryFieldName === 'openState' ?
            <div className="right-wrap">
              <Select
                placeholder="분류를 선택해주세요"
                className="ui small-border dropdown m0"
                defaultValue={fieldOption[0].value}
                options={fieldOption}
                onChange={(e: any, data: any) => onChangeCubeQueryProps( `${queryFieldName}`, data.value)}

              />
            </div>
            :
            <div className="right-wrap">
              <Select
                placeholder="분류를 선택해주세요"
                className="ui small-border dropdown"
                defaultValue={fieldOption[0].value}
                options={fieldOption}
                onChange={(e: any) => onChangeCubeQueryProps(`${queryFieldName}`, e.target.value)}
              />
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
