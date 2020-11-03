
import React, { PureComponent } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Icon, Label, Dropdown } from 'semantic-ui-react';


interface Props {
  stampCount: number;
  selectedYear: number;
  yearOptions: any[];
  onChangeYear: (e: any, data: any) => void;
  onClickItem?: () => void;
}

@reactAutobind
class ContentHeaderStampView extends PureComponent<Props> {
  //
  render() {
    //
    const { stampCount, selectedYear, yearOptions, onChangeYear, onClickItem } = this.props;

    return (
      <div className="cell-inner">
        <div className="stamp-wrap">
          <Label className="stamp">
            <a href="#" onClick={onClickItem}>
              <span><span className="text1">My Stamp</span></span>
              <span>
                <Icon className="stamp35" /><span className="text2">x</span>
                <span className="text3">{stampCount || 0}</span>
              </span>
            </a>
          </Label>
          <div className="year">
            <Dropdown
              className="inline tight"
              value={selectedYear}
              options={yearOptions}
              onChange={onChangeYear}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ContentHeaderStampView;
