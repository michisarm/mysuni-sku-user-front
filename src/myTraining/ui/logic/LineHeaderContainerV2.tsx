import React, { useState, useEffect, useRef } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import XLSX from 'xlsx';
import { InProgressXlsxModel } from 'myTraining/model/InProgressXlsxModel';
import { CompletedXlsxModel } from 'myTraining/model/CompletedXlsxModel';
import { MyLearningContentType } from '../model';
import { ListLeftTopPanel, ListRightTopPanel } from '../view/panel';
import { MyTrainingService } from '../../stores';

interface Props extends RouteComponentProps {
  contentType: MyLearningContentType;
  viewType: string;
  onChangeViewType: (e: any, data: any) => void;
  resultEmpty: boolean;
  filterCount: number;
  activeFilter: boolean;
  onClickFilter: () => void;
  onClickDelete: () => void;
  //
  myTrainingService?: MyTrainingService;
}

function LineHeaderContainerV2(props: Props) {
  const { contentType, resultEmpty, filterCount, activeFilter, onClickFilter, onClickDelete, myTrainingService } = props;
  const { viewType, onChangeViewType } = props;


  /* handlers */
  const onDownloadExcel = async () => {
    const myTrainingV2s = await myTrainingService!.findAllMyTrainingsV2ForExcel();
    const lastIndex = myTrainingV2s.length;
    // MyTrainingService 의 MyTrainingViewModel 을 조회해 엑셀로 변환
    if (contentType === MyLearningContentType.InProgress) {
      const inProgressXlsxList = myTrainingV2s.map(
        (myTrainingV2s, index) =>
          myTrainingV2s.toXlsxForInProgress(lastIndex - index)
      );

      writeExcelFile(inProgressXlsxList, 'Learning_InProgress');

      return;
    }

    if (contentType === MyLearningContentType.Completed) {
      const completedXlsxList = myTrainingV2s.map(
        (myTrainingV2s, index) =>
          myTrainingV2s.toXlsxForCompleted(lastIndex - index)
      );

      writeExcelFile(completedXlsxList, 'Learning_Completed');
    }
  };

  /* render */
  return (
    <>
      <div className="top-guide-title">
        {!resultEmpty && (
          <ListLeftTopPanel
            contentType={contentType}
            onClickDelete={onClickDelete}
            onDownloadExcel={onDownloadExcel}
          />
        )}
        <ListRightTopPanel
          contentType={contentType}
          resultEmpty={resultEmpty}
          filterCount={filterCount}
          activeFilter={activeFilter}
          onClickFilter={onClickFilter}
          checkedViewType={viewType}
          onChangeViewType={onChangeViewType}
        />
      </div>
    </>
  );
}

export default inject(mobxHelper.injectFrom(
  'myTraining.myTrainingService'
))(withRouter(observer(LineHeaderContainerV2)));


/* globals */
const writeExcelFile = (xlsxs: InProgressXlsxModel[] | CompletedXlsxModel[], filename: string) => {
  const excel = XLSX.utils.json_to_sheet(xlsxs);
  const temp = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(temp, excel, filename);
  XLSX.writeFile(temp, `${filename}.xlsx`);
};
