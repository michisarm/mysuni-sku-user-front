import React, { memo } from 'react';
import { DeleteButton, DownloadExcelButton } from '../MyLearningButtons';
import { MyApprovalContentType } from 'myTraining/ui/model/MyApprovalContentType';
import { AplCountModel } from 'myTraining/model/AplCountModel';
import { MyLearningContentType } from '../../model/MyLearningContentType';
import { MyPageContentType } from '../../model/MyPageContentType';
import { MyContentType } from '../../model/MyContentType';

interface Props {
  contentType: MyContentType;
  totalCount?: number;
  countModel?: AplCountModel;
  countMessage?: string;
  onClickDelete?: () => void;
  downloadExcel?: (contentType: MyContentType) => void;
}

function ListLeftTopPanel(props: Props) {
  const { contentType, totalCount, countModel, countMessage, onClickDelete, downloadExcel } = props;

  const renderButtons = (contentType: MyContentType) => {
    switch (contentType) {
      case MyLearningContentType.InProgress:
        return (
          <>
            <DeleteButton
              onDelete={onClickDelete!}
            />
            <DownloadExcelButton
              contentType={contentType}
              downloadExcel={downloadExcel!}
            />
          </>
        );
      case MyLearningContentType.Completed:
      case MyPageContentType.EarnedStampList:
        return (
          <DownloadExcelButton
            contentType={contentType}
            downloadExcel={downloadExcel!}
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
            전체 <strong>{totalCount || 0}개</strong>의 개인학습
          </div>
        );
      case MyApprovalContentType.PersonalLearning:
        return (
          <div className="list-number">
            <span>전체 <b>{countModel!.all}개</b> 등록</span>
            <span><b>{countModel!.opened}개</b> 승인</span>
            <span><b>{countModel!.openApproval}개</b> 승인 대기 중</span>
            <span><b>{countModel!.rejected}개</b> 반려</span>
          </div>
        )
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
