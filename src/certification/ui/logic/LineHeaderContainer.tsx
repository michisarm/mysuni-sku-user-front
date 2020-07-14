
import React, {FunctionComponent, useState} from 'react';
import {Select} from 'semantic-ui-react';

import {ListPanelTopLine} from 'shared';

import SelectOptions from '../model/SelectOptions';

interface LineHeaderProps {
  totalCount: number
}


const LineHeaderContainer: FunctionComponent<LineHeaderProps> = (Props) => {
  //
  const { totalCount } = Props;

  const [ sortOption, setSortOption ] = useState('All');

  const onChangeSorting = (e: any, data: any) => {
    if ( sortOption === data.value ) return;
    setSortOption(data.value);
  };


  return (
    <ListPanelTopLine count={totalCount}>
      <div className="right-wrap">
        { totalCount > 0 && (
          <Select
            className="s160 small-border"
            placeholder="전체"
            value={sortOption}
            options={SelectOptions.difficultyLevel}
            onChange={onChangeSorting}
          />
        )}
      </div>
    </ListPanelTopLine>
  );
};

export default LineHeaderContainer;
