
import React from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Select } from 'semantic-ui-react';
import { ListPanelTopLine } from 'shared';


interface Props {
  totalCount: number
  searchSelectOptions: any[]
  onChange: (e: any, data: any) => void
  cubeState: any
}

@reactAutobind
@observer
class CreateListPanelTopLineView extends React.Component<Props> {

  render() {
    //
    const { totalCount, searchSelectOptions, onChange, cubeState } = this.props;

    return (
      <ListPanelTopLine
        className="size-type3"
        count={totalCount}
      >
        <div className="right-wrap">
          <Select
            placeholder="전체"
            className="small-border m0"
            defaultValue={cubeState}
            value={cubeState}
            options={searchSelectOptions}
            onChange={onChange}
          />
        </div>
      </ListPanelTopLine>
    );
  }

}

export default CreateListPanelTopLineView;
