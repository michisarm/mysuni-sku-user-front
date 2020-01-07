import React, { Component } from 'react';
import { Icon, Label, Dropdown } from 'semantic-ui-react';
import { observer } from 'mobx-react';

interface Props {
  stampCount: number
  year: number
  years: any[]
  onChangeYear:(year: number) => void
}

@observer
class StampInfoView extends Component<Props> {
  //
  render() {
    //
    const { stampCount, year, years, onChangeYear } = this.props;
    return (
      <div className="cell">
        <div className="stamp-wrap">
          <Label className="stamp">
            <div><span className="text1">획득 Stamp</span></div>
            <div>
              <Icon className="stamp35" /><span className="text2">x</span>
              <span className="text3">{stampCount || 0}</span>
            </div>
          </Label>

          <div className="year">
            <Dropdown value={year} options={years} className="inline tight" onChange={(e, data) => onChangeYear(Number(data.value))} />
          </div>
        </div>
      </div>
    );
  }
}

export default StampInfoView;
