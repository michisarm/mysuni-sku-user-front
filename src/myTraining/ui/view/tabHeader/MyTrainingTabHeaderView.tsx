import React from 'react';
import { MyTrainingTabHeaderTemplate } from './MyTrainingTabHeaderTemplate';
import { MyTrainingLeftTabHeaderPanel } from './MyTrainingLeftTabHeaderPanel';
import MyTrainingRightTabHeaderPanel from './MyTrainingRightTabHeaderPanel';

interface MyTrainingTabHeaderViewProps {
  resultEmpty: boolean;
  totalCount: number;

  onClickDelete?: () => void;
  downloadExcel?: () => void;

  filterOpotions?: {
    openFilter: boolean;
    onClickOpen: () => void;
    filterCount: number;
  };
  children: React.ReactNode;
}

export function MyTrainingTabHeaderView({
  children,
  resultEmpty,
  totalCount,
  onClickDelete,
  downloadExcel,
  filterOpotions,
}: MyTrainingTabHeaderViewProps) {
  //
  return (
    <div className="top-guide-title">
      {!resultEmpty && totalCount > 0 && (
        <MyTrainingTabHeaderTemplate className="left-wrap">
          <MyTrainingLeftTabHeaderPanel
            onClickDelete={onClickDelete}
            onClickDownloadExcel={downloadExcel}
          >
            {children}
          </MyTrainingLeftTabHeaderPanel>
        </MyTrainingTabHeaderTemplate>
      )}
      <MyTrainingTabHeaderTemplate className="right-wrap">
        {filterOpotions && (
          <MyTrainingRightTabHeaderPanel
            filterCount={filterOpotions.filterCount}
            openFilter={filterOpotions.openFilter}
            activeFilter={
              filterOpotions.openFilter ||
              (filterOpotions.filterCount && filterOpotions.filterCount > 0) ||
              false
            }
            onClickFilter={filterOpotions.onClickOpen}
          />
        )}
      </MyTrainingTabHeaderTemplate>
    </div>
  );
}
