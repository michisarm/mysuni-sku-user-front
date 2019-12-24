import * as React from 'react';
import { observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';


interface Props {
  message: any
  open: boolean
  handleClose: () => void
  handleSaveAndApprove?: (mode?: string) => void
  id?: string
  title: string
  handleOk: (mode?: string) => void
  buttonYesName: string
  buttonNoName: string
}

@observer
@reactAutobind
class ConfirmWin extends React.Component<Props> {
  //
  render() {
    const { handleClose, open, message, title, handleOk, buttonYesName, buttonNoName, handleSaveAndApprove, id } = this.props;
    return (
      <>
        <Modal size="tiny" open={open} onClose={handleClose}>
          <Modal.Header>
            확인
          </Modal.Header>
          <Modal.Content>
            <Header as="h3" icon textAlign="center">
              <Icon name="exclamation circle" size="tiny" color="orange" />
              <Header.Content>{title}</Header.Content>
            </Header>
            {message}
          </Modal.Content>
          <Modal.Actions>
            <Button basic onClick={handleClose}>{buttonNoName}</Button>
            {
              id ?
                <>
                  <Button primary onClick={() => handleOk('modify')}>{buttonYesName}</Button>
                  {
                    handleSaveAndApprove
                    && <Button primary onClick={() => handleSaveAndApprove('modify')}>저장 및 승인요청</Button>
                    || ''
                  }
                </>
                :
                <>
                  <Button primary onClick={() => handleOk()}>{buttonYesName}</Button>
                  {
                    handleSaveAndApprove
                    && <Button primary onClick={() => handleSaveAndApprove()}>저장 및 승인요청11</Button>
                    || ''
                  }
                </>

            }
          </Modal.Actions>
        </Modal>
      </>
    );
  }
}

export default ConfirmWin;
