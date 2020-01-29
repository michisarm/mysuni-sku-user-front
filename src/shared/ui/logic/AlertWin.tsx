import React from 'react';
import { observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import { Button, Image, Modal } from 'semantic-ui-react';

interface Props {
  message?: string
  target?: string
  alertIcon?: string
  handleClose:() => void
  open: boolean
  type?: string
  title?: string
  handleOk?: (type: string) => void
}

@observer
@reactAutobind
class AlertWin extends React.Component<Props> {
  //
  render() {
    const { message, handleClose, handleOk, open, type, title, target } = this.props;
    return (
      <>
        {/*<Button onClick={this.show('tiny')}>Alert</Button>*/}

        {/*필수 정보를 입력하지 않고 [저장]버튼을 선택할 경우*/}
        {/*입력하지 않은 필수 정보가 어려 개일 경우 모든 미입력 정보에 대한 명칭을 제공한다.*/}
        <Modal className="size-mini" open={open} onClose={handleClose}>
          <div className="main">
            <Modal.Header>
               Confirm
            </Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <Image wrapped className="modal-img" size="medium" src={`${process.env.PUBLIC_URL}/images/modal/alert.png`} />
                {
                  title ?
                    <div className="title">{title}</div>
                    :
                    <div className="title">필수 정보 입력 안내</div>
                }
                {
                  target ?
                    <p className="center">&quot;{target}&quot; 은 필수 입력 항목입니다. 해당 정보를 입력하신 후 저장해주세요.</p>
                    :
                    <p className="center">{message}</p>
                }
              </Modal.Description>
            </Modal.Content>
          </div>
          <Modal.Actions className="normal">
            <Button secondary onClick={handleClose}>Cancel</Button>
            {
              handleOk && type
                && <Button primary onClick={() => handleOk(type)} type="button">OK</Button>
            }
          </Modal.Actions>
        </Modal>
      </>
    );
  }
}

export default AlertWin;
