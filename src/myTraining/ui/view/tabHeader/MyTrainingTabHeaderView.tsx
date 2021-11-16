import React from 'react';
import { MyTrainingTabHeaderTemplate } from './MyTrainingTabHeaderTemplate';
import { MyTrainingLeftTabHeaderPanel } from './MyTrainingLeftTabHeaderPanel';
import MyTrainingRightTabHeaderPanel from './MyTrainingRightTabHeaderPanel';
import FilterBoxContainer from 'myTraining/ui/logic/FilterBoxContainer';
import { MyLearningContentType, MyPageContentType } from 'myTraining/ui/model';

interface MyTrainingTabHeaderViewProps {
  resultEmpty: boolean;
  totalCount: number;

  onClickDelete?: () => void;
  onClickDownloadExcel?: () => Promise<void>;

  filterOpotions?: {
    openFilter: boolean;
    onClickOpen: () => void;
    filterCount: number;
  };
  contentType?: MyLearningContentType | MyPageContentType;
  children: React.ReactNode;
}

export function MyTrainingTabHeaderView({
  children,
  resultEmpty,
  totalCount,
  onClickDelete,
  onClickDownloadExcel,
  filterOpotions,
  contentType,
}: MyTrainingTabHeaderViewProps) {
  //
  return (
    (!resultEmpty && (
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
            {filterOpotions && contentType && (
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
        {filterOpotions && contentType && (
          <FilterBoxContainer contentType={contentType} />
        )}
      </>
    )) || <div style={{ marginTop: 50 }} />
  );
}
