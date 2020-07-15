
import React, {FunctionComponent, useState} from 'react';
import {Select} from 'semantic-ui-react';

import {ListPanelTopLine} from 'shared';

import SelectOptions from '../model/SelectOptions';


interface LineHeaderProps {
  totalCount: number | undefined,
  onSelectDifficultyLevel: (level: string) => void,
}

const LineHeaderContainer: FunctionComponent<LineHeaderProps> = (Props) => {
  //
  const [ sortOption, setSortOption ] = useState('All');

  const { totalCount, onSelectDifficultyLevel } = Props;

  const onChangeSorting = (e: any, data: any) => {
    if ( sortOption === data.value ) return;
    onSelectDifficultyLevel(data.value);
  };

  return (
    <ListPanelTopLine count={totalCount!}>
      <div className="right-wrap">
        { totalCount! > 0 && (
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
