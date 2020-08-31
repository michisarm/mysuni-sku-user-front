
import React, {FunctionComponent, useEffect, useState} from 'react';
import {Select} from 'semantic-ui-react';

import {ListPanelTopLine} from 'shared';

import SelectOptions from '../model/SelectOptions';


interface LineHeaderProps {
  curCategory?: string | undefined,
  curDiffLevel?: string | undefined,
  totalCount: number | undefined,
  countMessage?: string,
  onSelectDifficultyLevel: (level: string) => void,
}

const LineHeaderContainer: FunctionComponent<LineHeaderProps> = (Props) => {
  //
  const [ sortOption, setSortOption ] = useState('');

  const { curCategory, curDiffLevel, totalCount, onSelectDifficultyLevel, countMessage } = Props;

  useEffect(() => {
    if (curCategory !== undefined && curDiffLevel && curDiffLevel !== '') {
      setSortOption('');
    }
  }, [curCategory]);

  const onChangeSorting = (e: any, data: any) => {
    if ( sortOption === data.value ) return;

    setSortOption(data.value);
    onSelectDifficultyLevel(data.value);
  };

  return (
    <ListPanelTopLine
      count={totalCount!}
      countMessage={countMessage}
    >
      <div className="right-wrap">
        <Select
          className="s160 small-border"
          placeholder="전체"
          value={sortOption}
          options={SelectOptions.difficultyLevel}
          onChange={onChangeSorting}
        />
      </div>
    </ListPanelTopLine>
  );
};

export default LineHeaderContainer;
