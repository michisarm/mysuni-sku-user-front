import * as React from 'react';
import { observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import { Button, Image, Modal } from 'semantic-ui-react';


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
    const { handleClose, open, message, title, handleOk, buttonYesName, buttonNoName, id } = this.props;
    return (
      <>
        <Modal className="size-mini" open={open} onClose={handleClose}>
          <div className="main">
            <Modal.Header>
              Confirm
            </Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <Image wrapped className="modal-img" size="medium" src={`${process.env.PUBLIC_URL}/images/all/confirm.png`} />
                <div className="title">{title}</div>
                <p>{message}</p>
              </Modal.Description>
            </Modal.Content>
          </div>
          <Modal.Actions className="normal twin">
            <Button secondary onClick={handleClose}>{buttonNoName}</Button>
            {
              id ?
                <Button primary onClick={() => handleOk('modify')}>{buttonYesName}</Button>
                :
                <Button primary onClick={() => handleOk()}>{buttonYesName}</Button>
            }
          </Modal.Actions>
        </Modal>
      </>
    );
  }
}

export default ConfirmWin;
