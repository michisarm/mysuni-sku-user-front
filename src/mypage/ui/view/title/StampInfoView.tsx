import React, { Component } from 'react';
import { Icon, Label, Dropdown } from 'semantic-ui-react';
import { observer } from 'mobx-react';

interface Props {
  stampCount: number
  year: number
  years: number[]
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
            <div className="ui inline dropdown tight">
              <Dropdown text={`${year}`}>
                <Dropdown.Menu>
                  {
                    years.map(y => (<Dropdown.Item onClick={() => onChangeYear(y)}>{y}</Dropdown.Item>))
                  }
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StampInfoView;
