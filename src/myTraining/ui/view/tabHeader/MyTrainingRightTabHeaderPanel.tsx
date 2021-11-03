import React, { memo } from 'react';
import classNames from 'classnames';
import { Button, Icon } from 'semantic-ui-react';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';

interface Props {
  filterCount?: number;
  openFilter?: boolean;
  activeFilter?: boolean;
  onClickFilter?: () => void;
}

function ListRightTopPanel(props: Props) {
  const { filterCount, openFilter, activeFilter, onClickFilter } = props;

  const active = activeFilter ? 'btn-filter-blue' : 'left post';
  const open = openFilter ? 'on' : '';

  return (
    <>
      {onClickFilter && (
        <Button
          icon={activeFilter ? false : true}
          className={classNames(active, open)}
          onClick={onClickFilter}
        >
          {!activeFilter && <Icon className="filter2" aria-hidden="true" />}
          <span>
            <PolyglotText id="mapg-msmp-필터열기" defaultString="Filter" />
            {(filterCount && filterCount > 0 && `(${filterCount})`) || ''}
          </span>
        </Button>
      )}
    </>
  );
}

export default memo(ListRightTopPanel);
