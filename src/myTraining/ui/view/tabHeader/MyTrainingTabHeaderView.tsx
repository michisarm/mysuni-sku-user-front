import React from 'react';
import { MyTrainingTabHeaderTemplate } from './MyTrainingTabHeaderTemplate';
import { MyTrainingLeftTabHeaderPanel } from './MyTrainingLeftTabHeaderPanel';
import MyTrainingRightTabHeaderPanel from './MyTrainingRightTabHeaderPanel';
import FilterBoxContainer from 'myTraining/ui/logic/FilterBoxContainer';

interface MyTrainingTabHeaderViewProps {
  resultEmpty: boolean;
  totalCount: number;

  onClickDelete?: () => void;
  onClickDownloadExcel?: () => Promise<void>;

  filterCount?: number;
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
  filterCount,
  totalCount,
  onClickDelete,
  onClickDownloadExcel,
  filterOpotions,
}: MyTrainingTabHeaderViewProps) {
  //
  return (
    ((!resultEmpty || (filterCount && filterCount > 0)) && (
      <>
        <div className="top-guide-title">
          {!resultEmpty && totalCount > 0 && (
            <MyTrainingTabHeaderTemplate
              className="left-wrap"
              applyDesign={(onClickDelete || onClickDownloadExcel) && true}
            >
              <MyTrainingLeftTabHeaderPanel
                onClickDelete={onClickDelete}
                onClickDownloadExcel={onClickDownloadExcel}
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
                  (filterOpotions.filterCount &&
                    filterOpotions.filterCount > 0) ||
                  false
                }
                onClickFilter={filterOpotions.onClickOpen}
              />
            )}
          </MyTrainingTabHeaderTemplate>
        </div>
        {filterOpotions && <FilterBoxContainer />}
      </>
    )) || <div style={{ marginTop: 50 }} />
  );
}
