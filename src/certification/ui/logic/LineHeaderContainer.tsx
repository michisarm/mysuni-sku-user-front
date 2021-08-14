import React, { FunctionComponent, useCallback } from 'react';
import { Select } from 'semantic-ui-react';
import { ListPanelTopLine } from 'shared';
import SelectOptions from '../model/SelectOptions';
import { BadgeLevel } from '../../model/BadgeLevel';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';

interface LineHeaderProps {
  totalCount: number;
  countMessage: string;
  selectedLevel?: string;
  onSelectLevel: (level: BadgeLevel) => void;
}

const LineHeaderContainer: FunctionComponent<LineHeaderProps> = ({
  totalCount,
  countMessage,
  selectedLevel,
  onSelectLevel,
}) => {
  const onChangeLevel = useCallback(
    (e: React.SyntheticEvent<HTMLElement>, data: any) => {
      onSelectLevel(data.value);
    },
    []
  );
  SelectOptions.difficultyLevel[0].text = getPolyglotText(
    '전체',
    'Certification-bdls-sl전체'
  );
  return (
    <ListPanelTopLine count={totalCount} countMessage={countMessage}>
      <div className="right-wrap">
        <Select
          className="s160 small-border"
          placeholder={getPolyglotText('전체', 'Certification-mabd-sl전체')}
          value={selectedLevel}
          options={SelectOptions.difficultyLevel}
          onChange={onChangeLevel}
        />
      </div>
    </ListPanelTopLine>
  );
};

export default LineHeaderContainer;
