
import React from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Select } from 'semantic-ui-react';


interface Props {
  totalCount: number
  searchSelectOptions: any[]
  onChange: (e: any, data: any) => void
}

@reactAutobind
@observer
class ListPanelTopView extends React.Component<Props> {

  render() {
    //
    const { totalCount, searchSelectOptions, onChange } = this.props;

    return (
      <div className="top-guide-title size-type3">
        <div className="list-number">총 <strong>{totalCount}개</strong>의 리스트가 있습니다.</div>

        <div className="right-wrap">
          <Select
            placeholder="전체"
            className="small-border m0"
            defaultValue={searchSelectOptions[0].value}
            options={searchSelectOptions}
            onChange={onChange}
          />
        </div>
      </div>
    );
  }

}

export default ListPanelTopView;
