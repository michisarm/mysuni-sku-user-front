import React, { useCallback } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import XLSX from 'xlsx';
import { InProgressXlsxModel } from 'myTraining/model/InProgressXlsxModel';
import { CompletedXlsxModel } from 'myTraining/model/CompletedXlsxModel';
import { MyStampXlsxModel } from 'myTraining/model/MyStampXlsxModel';
import { MyContentType, ViewType } from './MyLearningListContainerV2';
import { MyLearningContentType, MyPageContentType } from '../model';
import { ListLeftTopPanel, ListRightTopPanel, ListTopPanelTemplate } from '../view/panel';
import { MyTrainingService } from '../../stores';

interface Props extends RouteComponentProps {
  contentType: MyContentType;
  viewType: ViewType;
  onChangeViewType: (e: any, data: any) => void;
  resultEmpty: boolean;
  totalCount: number;
  filterCount: number;
  openFilter: boolean;
  onClickFilter: () => void;
  onClickDelete: () => void;
  //
  myTrainingService?: MyTrainingService;
}

function LineHeaderContainerV2(props: Props) {
  const { contentType, resultEmpty, totalCount, filterCount, openFilter, onClickFilter, onClickDelete, myTrainingService } = props;
  const { viewType, onChangeViewType } = props;
  const { inprogressCount, completedCount } = myTrainingService!;

  /* functions */
  const getModelsForExcel = async (contentType: MyContentType) => {
    if (contentType === MyPageContentType.EarnedStampList) {
      return myTrainingService!.findAllStampTableViewsForExcel();
    } else {
      return myTrainingService!.findAllTableViewsForExcel();
    }
  };

  const isFilterActive = (): boolean => {
    return (openFilter || filterCount > 0);
  };

  const isAllEmpty = (contentType: MyContentType): boolean => {
    switch (contentType) {
      case MyLearningContentType.InProgress:
        return resultEmpty && inprogressCount === 0;
      case MyLearningContentType.Completed:
        return resultEmpty && completedCount === 0;
      default:
        return resultEmpty;
    }
  };

  /* handlers */
  const downloadExcel = useCallback(async (contentType: MyContentType) => {
    const myTrainingTableViews = await getModelsForExcel(contentType);
    const lastIndex = myTrainingTableViews.length;
    // MyTrainingService 의 MyTrainingViewModel 을 조회해 엑셀로 변환
    let xlsxList: MyXlsxList = [];
    let filename: MyXlsxFilename = MyXlsxFilename.None;

    switch (contentType) {
      case MyLearningContentType.InProgress:
        xlsxList = myTrainingTableViews.map((myTrainingTableView, index) => myTrainingTableView.toXlsxForInProgress(lastIndex - index));
        filename = MyXlsxFilename.InProgress;
        break;
      case MyLearningContentType.Completed:
        xlsxList = myTrainingTableViews.map((myTrainingTableView, index) => myTrainingTableView.toXlsxForCompleted(lastIndex - index));
        filename = MyXlsxFilename.Completed;
        break;
      case MyPageContentType.EarnedStampList:
        xlsxList = myTrainingTableViews.map((myTrainingTableView, index) => myTrainingTableView.toXlsxForMyStamp(lastIndex - index));
        filename = MyXlsxFilename.EarnedStampList;
        break;
    }

    writeExcelFile(xlsxList, filename);
  }, []);

  /* render */
  return (
    <>
      <div className="top-guide-title">
        {!isAllEmpty(contentType) &&
          (
            <ListTopPanelTemplate
              className="left-wrap"
              contentType={contentType}
              activeFilter={isFilterActive()}
            >
              <ListLeftTopPanel
                contentType={contentType}
                totalCount={totalCount}
                onClickDelete={onClickDelete}
                downloadExcel={downloadExcel}
              />
            </ListTopPanelTemplate>
          )
        }
        <ListTopPanelTemplate
          className="right-wrap"
          contentType={contentType}
          activeFilter={isFilterActive()}
        >
          <ListRightTopPanel
            contentType={contentType}
            resultEmpty={resultEmpty}
            filterCount={filterCount}
            openFilter={openFilter}
            activeFilter={isFilterActive()}
            onClickFilter={onClickFilter}
            checkedViewType={viewType}
            onChangeViewType={onChangeViewType}
          />
        </ListTopPanelTemplate>
      </div>
    </>
  );
}

export default inject(mobxHelper.injectFrom(
  'myTraining.myTrainingService',
  'myTraining.inMyLectureService',
  'myTraining.aplService',
  'lecture.lectureService'
))(withRouter(observer(LineHeaderContainerV2)));


/* globals */
const writeExcelFile = (xlsxList: MyXlsxList, filename: MyXlsxFilename) => {
  const excel = XLSX.utils.json_to_sheet(xlsxList);
  const temp = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(temp, excel, filename);
  XLSX.writeFile(temp, `${filename}.xlsx`);
};

/* types */
export type MyXlsxList = InProgressXlsxModel[] | CompletedXlsxModel[] | MyStampXlsxModel[];

enum MyXlsxFilename {
  InProgress = 'Learning_InProgress',
  Completed = 'Learning_Completed',
  EarnedStampList = 'MyPage_MyStamp',
  None = ''
}
