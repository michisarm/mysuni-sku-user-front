
import React, { PureComponent } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Icon, Label } from 'semantic-ui-react';


interface Props {
  stampCount: number;
  // selectedYear: number;
  // onChangeYear: (e: any, data: any) => void;
  onClickItem?: () => void;
  thisYearStampCount?: number;
}

@reactAutobind
class ContentHeaderStampView extends PureComponent<Props> {
  //
  render() {
    //
    const { stampCount, onClickItem, thisYearStampCount } = this.props;

    return (
      <div className="cell-inner">
        <div className="stamp-wrap">
          <Label className="stamp">
              <div onClick={onClickItem}>
                <span className="text1">Stamp</span>
              </div>
              <div>
                <span className="text2">{stampCount || 0}</span>
                <span className="text6">개</span>
              </div>
            {/*<div style={{marginTop: '5px', textAlign: 'left'}}>
              <a href="#" className="main_sub_all" style={{color: 'gray'}}>
                &#40;누적
                <span className="big2">{stampCount}</span>
                <span className="small2 h">개</span>
                &#41;
              </a>
            </div>*/}
          </Label>
        </div>
      </div>
    );
  }
}

export default ContentHeaderStampView;
