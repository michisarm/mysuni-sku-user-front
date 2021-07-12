
import React from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Select } from 'semantic-ui-react';
import { ListPanelTopLine } from 'shared';
import { getPolyglotText } from '../../../../shared/ui/logic/PolyglotText';


interface Props {
  totalCount: number
  searchSelectOptions: any[]
  onChange: (e: any, data: any) => void
  searchState: any
}

@reactAutobind
@observer
class CreateListPanelTopLineView extends React.Component<Props> {

  render() {
    //
    const { totalCount, searchSelectOptions, onChange, searchState } = this.props;

    return (
      <ListPanelTopLine
        className="size-type3"
        count={totalCount}
      >
        <div className="right-wrap">
          <Select
            placeholder={getPolyglotText('전체', 'Create-MainList-userStatus')}
            className="small-border m0"
            value={searchState}
            options={searchSelectOptions}
            onChange={onChange}
          />
        </div>
      </ListPanelTopLine>
    );
  }

}

export default CreateListPanelTopLineView;
