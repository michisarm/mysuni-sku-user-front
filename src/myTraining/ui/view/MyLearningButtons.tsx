import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import classNames from 'classnames';
import { MyContentType } from '../logic/MyLearningListContainerV2';

interface DeleteButtonProps {
  onDelete: () => void;
}

interface DownloadExcelButtonProps {
  contentType: MyContentType;
  downloadExcel: (contentType: MyContentType) => void;
}

export function DeleteButton({ onDelete }: DeleteButtonProps) {
  return (
    <Button
      icon
      className={classNames('left', 'post', 'delete', 'btn-left')}
      onClick={onDelete}
    >
      <Icon className="del24" />
      Delete
    </Button>
  );
}

export function DownloadExcelButton({ contentType, downloadExcel }: DownloadExcelButtonProps) {

  const onDownloadExcel = () => {
    downloadExcel(contentType);
  };

  return (
    <Button
      icon
      className={classNames('left', 'post', 'excel-down', 'ml8')}
      onClick={onDownloadExcel}
    >
      <Icon className="excel-down" aria-hidden="true" />
      엑셀 다운로드
    </Button>
  );
}