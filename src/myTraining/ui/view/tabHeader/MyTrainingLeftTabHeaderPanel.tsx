import React from 'react';
import { PolyglotText } from '../../../../shared/ui/logic/PolyglotText';
import classNames from 'classnames';
import { Button, Icon } from 'semantic-ui-react';

interface Props {
  children: React.ReactNode;
  onClickDelete?: () => void;
  onClickDownloadExcel?: () => void;
}

export function MyTrainingLeftTabHeaderPanel(props: Props) {
  const { children, onClickDelete, onClickDownloadExcel } = props;
  //
  const deleteButton = () => {
    return (
      <Button
        icon
        className={classNames('left', 'post', 'delete', 'btn-left')}
        onClick={onClickDelete}
      >
        <Icon className="del24" />
        <PolyglotText defaultString="Delete" id="learning-학보드-삭제버튼" />
      </Button>
    );
  };

  const downloadButton = () => {
    return (
      <Button
        icon
        className={classNames('left', 'post', 'excel-down', 'ml8')}
        onClick={onClickDownloadExcel}
      >
        <Icon className="excel-down" aria-hidden="true" />
        <PolyglotText
          defaultString="엑셀 다운로드"
          id="learning-학보드-엑셀다운"
        />
      </Button>
    );
  };

  return (
    <>
      {onClickDelete && deleteButton()}
      {onClickDownloadExcel && downloadButton()}
      {children}
    </>
  );
}
