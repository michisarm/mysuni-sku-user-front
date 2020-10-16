import React from 'react';
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
import { MyTrainingService, InMyLectureService } from '../../stores';

interface Props extends RouteComponentProps {
  contentType: MyContentType;
  viewType: ViewType;
  onChangeViewType: (e: any, data: any) => void;
  resultEmpty: boolean;
  filterCount: number;
  openFilter: boolean;
  onClickFilter: () => void;
  onClickDelete: () => void;
  //
  myTrainingService?: MyTrainingService;
  inMyLectureService?: InMyLectureService;
}

function LineHeaderContainerV2(props: Props) {
  const { contentType, resultEmpty, filterCount, openFilter, onClickFilter, onClickDelete, myTrainingService, inMyLectureService } = props;
  const { viewType, onChangeViewType } = props;

  /* functions */
  const getModelsForExcel = async (contentType: MyContentType) => {
    if (contentType === MyPageContentType.EarnedStampList) {
      return myTrainingService!.findAllMyTrainingsV2WithStampForExcel();
    } else {
      return myTrainingService!.findAllMyTrainingsV2ForExcel();
    }
  };

  const getTotalCount = (contentType: MyContentType) => {
    const { myTrainingV2Count } = myTrainingService!;
    const { inMyLectureV2Count } = inMyLectureService!;

    switch (contentType) {
      case MyLearningContentType.InMyList:
        return inMyLectureV2Count;
      default:
        return myTrainingV2Count;
    }
  };

  const isFilterActive = (): boolean => {
    return (openFilter || filterCount > 0);
  };

  /* handlers */
  const downloadExcel = async (contentType: MyContentType) => {
    const myTrainingV2s = await getModelsForExcel(contentType);
    const lastIndex = myTrainingV2s.length;
    // MyTrainingService 의 MyTrainingViewModel 을 조회해 엑셀로 변환
    let xlsxList: MyXlsxList = [];
    let filename: MyXlsxFilename = MyXlsxFilename.None;

    switch (contentType) {
      case MyLearningContentType.InProgress:
        xlsxList = myTrainingV2s.map((myTrainingV2, index) => myTrainingV2.toXlsxForInProgress(lastIndex - index));
        filename = MyXlsxFilename.InProgress;
        break;
      case MyLearningContentType.Completed:
        xlsxList = myTrainingV2s.map((myTrainingV2, index) => myTrainingV2.toXlsxForCompleted(lastIndex - index));
        filename = MyXlsxFilename.Completed;
        break;
      case MyPageContentType.EarnedStampList:
        xlsxList = myTrainingV2s.map((myTrainingV2, index) => myTrainingV2.toXlsxForMyStamp(lastIndex - index));
        filename = MyXlsxFilename.EarnedStampList;
        break;
    }

    writeExcelFile(xlsxList, filename);
  };

  /* render */
  return (
    <>
      <div className="top-guide-title">
        {!resultEmpty && (
          <ListTopPanelTemplate
            className="left-wrap"
            contentType={contentType}
            activeFilter={isFilterActive()}
          >
            <ListLeftTopPanel
              contentType={contentType}
              totalCount={getTotalCount(contentType)}
              onClickDelete={onClickDelete}
              downloadExcel={downloadExcel}
            />
          </ListTopPanelTemplate>
        )}
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
  'myTraining.inMyLectureService'
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
