
import React, {useState} from 'react';
import {Select} from 'semantic-ui-react';

import {ListPanelTopLine} from 'shared';

import SelectOptions from '../model/SelectOptions';



const LineHeaderContainer: React.FC = () => {
  //
  const [ sortOption, setSortOption ] = useState('All');

  const onChangeSorting = (e: any, data: any) => {
    if ( sortOption === data.value ) return;
    setSortOption(data.value);
  };


  return (
    <ListPanelTopLine count={22}>
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
