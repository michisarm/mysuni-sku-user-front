import React from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { ButtonProps, Button } from 'semantic-ui-react';

interface Props extends ButtonProps {
  download?: boolean;
  onClick: () => void;
  children?: React.ReactNode;
}

@observer
@reactAutobind
class ExcelButton extends React.Component<Props> {
  //
  static defaultProps = {
    download: false,
  };

  render() {
    //
    const { download, children, onClick, ...rest } = this.props;
    return (
      <Button {...rest} type="button" onClick={onClick}>
        {children || download ? '엑셀 다운로드' : '엑셀 업로드'}
      </Button>
    );
  }
}

export default ExcelButton;
