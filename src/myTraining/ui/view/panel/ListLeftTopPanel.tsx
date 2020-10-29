import React, { memo } from 'react';
import { MyContentType } from 'myTraining/ui/logic/MyLearningListContainerV2';
import { DeleteButton, DownloadExcelButton } from '../MyLearningButtons';
import { MyLearningContentType, MyPageContentType } from '../../../../myTraining/ui/model';

interface Props {
  contentType: MyContentType;
  totalCount: number;
  countMessage?: string;
  onClickDelete: () => void;
  downloadExcel: (contentType: MyContentType) => void;
}

function ListLeftTopPanel(props: Props) {
  const { contentType, totalCount, countMessage, onClickDelete, downloadExcel } = props;

  console.log('ListLeftTopPanel :: render :: ');
  const renderButtons = (contentType: MyContentType) => {
    switch (contentType) {
      case MyLearningContentType.InProgress:
        return (
          <>
            <DeleteButton
              onDelete={onClickDelete}
            />
            <DownloadExcelButton
              contentType={contentType}
              downloadExcel={downloadExcel}
            />
          </>
        );
      case MyLearningContentType.Completed:
      case MyPageContentType.EarnedStampList:
        return (
          <DownloadExcelButton
            contentType={contentType}
            downloadExcel={downloadExcel}
          />
        );
      default:
        return null;
    }
  };


  const renderMessage = (contentType: MyContentType) => {
    /*
      contentType이 개인학습 완료일 경우, 아래와 같이 메세지 변경.
        1. countMessage => 승인완료
        2. 총 => 전체 
    */
    switch (contentType) {
      case MyLearningContentType.PersonalCompleted:
        return (
          <div className="list-number">
            전체 <strong>{totalCount || 0}개</strong> 승인 완료
          </div>
        );
      default:
        return (
          <div className="list-number">
            총 <strong>{totalCount || 0}개</strong>
            {countMessage ? countMessage : '의 리스트가 있습니다.'}
          </div>
        );
    }
  };

  return (
    <>
      {renderButtons(contentType)}
      {renderMessage(contentType)}
    </>
  );
}

export default memo(ListLeftTopPanel);