import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import XLSX from 'xlsx';
import { InProgressXlsxModel } from 'myTraining/model/InProgressXlsxModel';
import { CompletedXlsxModel } from 'myTraining/model/CompletedXlsxModel';
import { MyStampXlsxModel } from 'myTraining/model/MyStampXlsxModel';
import { ViewType } from './MyLearningListContainerV2';
import { MyLearningContentType, MyPageContentType } from '../model';
import { ListLeftTopPanel, ListRightTopPanel, ListTopPanelTemplate } from '../view/panel';
import { MyTrainingService, InMyLectureService } from '../../stores';



interface Props extends RouteComponentProps {
  contentType: MyLearningContentType | MyPageContentType;
  viewType: ViewType;
  onChangeViewType: (e: any, data: any) => void;
  resultEmpty: boolean;
  filterCount: number;
  activeFilter: boolean;
  onClickFilter: () => void;
  onClickDelete: () => void;
  //
  myTrainingService?: MyTrainingService;
  inMyLectureService?: InMyLectureService;
}

function LineHeaderContainerV2(props: Props) {
  const { contentType, resultEmpty, filterCount, activeFilter, onClickFilter, onClickDelete, myTrainingService, inMyLectureService } = props;
  const { viewType, onChangeViewType } = props;
  const { myTrainingV2Count } = myTrainingService!;
  const { inMyLectureV2Count } = inMyLectureService!;


  /* handlers */
  const onDownloadExcel = async () => {
    let myTrainingV2s;

    if (contentType === MyPageContentType.EarnedStampList) {
      myTrainingV2s = await myTrainingService!.findAllMyTrainingsV2WithStampForExcel();
    } else {
      myTrainingV2s = await myTrainingService!.findAllMyTrainingsV2ForExcel();
    }
    const lastIndex = myTrainingV2s.length;
    // MyTrainingService 의 MyTrainingViewModel 을 조회해 엑셀로 변환
    if (contentType === MyLearningContentType.InProgress) {
      const inProgressXlsxList = myTrainingV2s.map(
        (myTrainingV2, index) =>
          myTrainingV2.toXlsxForInProgress(lastIndex - index)
      );

      writeExcelFile(inProgressXlsxList, 'Learning_InProgress');

      return;
    }

    if (contentType === MyLearningContentType.Completed) {
      const completedXlsxList = myTrainingV2s.map(
        (myTrainingV2, index) =>
          myTrainingV2.toXlsxForCompleted(lastIndex - index)
      );

      writeExcelFile(completedXlsxList, 'Learning_Completed');
    }

    if (contentType === MyPageContentType.EarnedStampList) {
      const stampXlsxList = myTrainingV2s.map((myTrainingV2, index) => myTrainingV2.toXlsxForMyStamp(lastIndex - index));
      writeExcelFile(stampXlsxList, 'myPage_stamp');
    }
  };

  const getTotalCount = (conetntType: MyLearningContentType | MyPageContentType) => {
    if (contentType === MyLearningContentType.InMyList) {
      return inMyLectureV2Count;
    }

    return myTrainingV2Count;
  };

  /* render */
  return (
    <>
      <div className="top-guide-title">
        {!resultEmpty && (
          <ListTopPanelTemplate
            className="left-wrap"
            contentType={contentType}
            activeFilter={activeFilter}
            filterCount={filterCount}
          >
            <ListLeftTopPanel
              contentType={contentType}
              totalCount={getTotalCount(contentType)}
              onClickDelete={onClickDelete}
              onDownloadExcel={onDownloadExcel}
            />
          </ListTopPanelTemplate>
        )}
        <ListTopPanelTemplate
          className="right-wrap"
          contentType={contentType}
          activeFilter={activeFilter}
          filterCount={filterCount}
        >
          <ListRightTopPanel
            contentType={contentType}
            resultEmpty={resultEmpty}
            filterCount={filterCount}
            activeFilter={activeFilter}
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
const writeExcelFile = (xlsxList: InProgressXlsxModel[] | CompletedXlsxModel[] | MyStampXlsxModel[], filename: string) => {
  const excel = XLSX.utils.json_to_sheet(xlsxList);
  const temp = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(temp, excel, filename);
  XLSX.writeFile(temp, `${filename}.xlsx`);
};
