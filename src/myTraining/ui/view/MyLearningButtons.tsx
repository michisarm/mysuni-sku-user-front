import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { MyLearningContentType } from '../model';

interface Props {
  contentType: MyLearningContentType;
  onDelete: () => void;
  onDownloadExcel: () => void;
}

function MyLearningButtons(props: Props) {
  const { contentType, onDelete, onDownloadExcel } = props;

  const renderButtons = (contentType: MyLearningContentType): any => {
    switch (contentType) {
      case MyLearningContentType.InProgress:
        return (
          <>
            <Button
              icon
              className="ui icon left button post delete btn-left"
              onClick={onDelete}
            >
              <Icon className="del24" />
              Delete
            </Button>
            <Button
              icon
              className="ui icon left button post excel-down ml8"
              onClick={onDownloadExcel}
            >
              <Icon className="excel-down" aria-hidden="true" />
              엑셀 다운로드
            </Button>
          </>
        );
      case MyLearningContentType.Completed:
        return (
          <>
            <Button
              icon
              className="ui icon left button post excel-down ml8"
              onClick={onDownloadExcel}
            >
              <Icon className="excel-down" aria-hidden="true" />
              엑셀 다운로드
            </Button>
          </>
        );
      default:
        return null;
    }
  };

  // render!
  return renderButtons(contentType);
}

export default MyLearningButtons;
