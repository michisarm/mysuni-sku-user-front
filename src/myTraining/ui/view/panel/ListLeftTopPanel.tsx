import React, { memo } from 'react';
import { DeleteButton, DownloadExcelButton } from '../MyLearningButtons';
import { MyApprovalContentType } from 'myTraining/ui/model/MyApprovalContentType';
import { AplCountModel } from 'myTraining/model/AplCountModel';
import { MyLearningContentType } from '../../model/MyLearningContentType';
import { MyPageContentType } from '../../model/MyPageContentType';
import { MyContentType } from '../../model/MyContentType';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../../shared/ui/logic/PolyglotText';

interface Props {
  contentType: MyContentType;
  totalCount?: number;
  countModel?: AplCountModel;
  countMessage?: string;
  onClickDelete?: () => void;
  downloadExcel?: (contentType: MyContentType) => void;
}

function ListLeftTopPanel(props: Props) {
  const {
    contentType,
    totalCount,
    countModel,
    countMessage,
    onClickDelete,
    downloadExcel,
  } = props;

  const renderButtons = (contentType: MyContentType) => {
    switch (contentType) {
      case MyLearningContentType.InProgress:
        return (
          <>
            <DeleteButton onDelete={onClickDelete!} />
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
          <div
            className="list-number"
            dangerouslySetInnerHTML={{
              __html: getPolyglotText(
                '전체 <strong>{count}개</strong>의 개인학습',
                'learning-개인보드-전체',
                { count: totalCount + '' || 0 + '' }
              ),
            }}
          />
        );
      case MyApprovalContentType.PersonalLearning:
        return (
          <div className="list-number">
            <span
              dangerouslySetInnerHTML={{
                __html: getPolyglotText(
                  '전체 <b>{count}개</b>',
                  'learning-개인보드-전체1',
                  { count: (countModel!.all || 0).toString() }
                ),
              }}
            />
            {/* <span
              dangerouslySetInnerHTML={{
                __html: getPolyglotText(
                  '등록 <b>{count}개</b>',
                  'learning-개인보드-등록',
                  { count: (countModel!.opened || 0).toString() }
                ),
              }}
            /> */}
            <span
              dangerouslySetInnerHTML={{
                __html: getPolyglotText(
                  '승인 <b>{count}개</b>',
                  'learning-개인보드-승인',
                  { count: (countModel!.opened || 0).toString() }
                ),
              }}
            />
            <span
              dangerouslySetInnerHTML={{
                __html: getPolyglotText(
                  '승인 대기 중 <b>{count}개</b>',
                  'learning-개인보드-승인대기',
                  { count: (countModel!.openApproval || 0).toString() }
                ),
              }}
            />
            <span
              dangerouslySetInnerHTML={{
                __html: getPolyglotText(
                  '반려 <b>{count}개</b>',
                  'learning-개인보드-반려',
                  { count: (countModel!.rejected || 0).toString() }
                ),
              }}
            />
            {/* <span>
              <PolyglotText defaultString="전체" id="승인관리-개인보드-전체" />
              <b>
                {countModel!.all}
                <PolyglotText
                  defaultString="개"
                  id="learning-개인보드-게시물수"
                />
              </b>
              <PolyglotText defaultString="등록" id="learning-개인보드-등록" />
            </span>
            <span>
              <b>
                {countModel!.opened}
                <PolyglotText
                  defaultString="개"
                  id="learning-개인보드-게시물수"
                />
              </b>
              <PolyglotText defaultString="승인" id="learning-개인보드-승인" />
            </span>
            <span>
              <b>
                {countModel!.openApproval}
                <PolyglotText
                  defaultString="개"
                  id="learning-개인보드-게시물수"
                />
              </b>
              <PolyglotText
                defaultString="승인 대기 중"
                id="learning-개인보드-승인대기"
              />
            </span>
            <span>
              <b>
                {countModel!.rejected}
                <PolyglotText
                  defaultString="개"
                  id="learning-개인보드-게시물수"
                />
              </b>
              <PolyglotText defaultString="반려" id="learning-개인보드-반려" />
            </span> */}
          </div>
        );
      default:
        return (
          <div
            className="list-number"
            dangerouslySetInnerHTML={{
              __html: getPolyglotText(
                '총 <strong>{totalCount}개</strong>의 리스트가 있습니다.',
                'learning-학보드-게시물총수',
                {
                  totalCount: (totalCount || 0).toString(),
                }
              ),
            }}
          />
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
