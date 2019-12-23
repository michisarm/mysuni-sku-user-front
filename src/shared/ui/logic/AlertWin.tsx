import * as React from 'react';
import { observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

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
    const { message, handleClose, handleOk, open, alertIcon, type, title, target } = this.props;
    return (
      <>
        {/*<Button onClick={this.show('tiny')}>Alert</Button>*/}

        {/*필수 정보를 입력하지 않고 [저장]버튼을 선택할 경우*/}
        {/*입력하지 않은 필수 정보가 어려 개일 경우 모든 미입력 정보에 대한 명칭을 제공한다.*/}
        <Modal size="tiny" open={open} onClose={handleClose}>
          <Modal.Header>
            알림
          </Modal.Header>
          <Modal.Content>
            <Header as="h3" icon textAlign="center">
              {
                alertIcon === 'triangle' ?
                  <Icon name="exclamation triangle" size="tiny" color="red" />
                  :
                  <Icon name="exclamation circle" size="tiny" color="orange" />
              }
              {
                title ?
                  <Header.Content>{title}</Header.Content>
                  :
                  <Header.Content>필수 정보 입력 안내</Header.Content>
              }

            </Header>
            {
              target ?
                <p className="center">&quot;{target}&quot; 은 필수 입력 항목입니다. 해당 정보를 입력하신 후 저장해주세요.</p>
                :
                <p className="center">{message}</p>
            }
          </Modal.Content>
          <Modal.Actions>
            <Button primary onClick={handleClose}>Cancel</Button>
            {
              handleOk && type ?
                <Button primary onClick={() => handleOk(type)} type="button">OK</Button>
                : ''
            }
          </Modal.Actions>
        </Modal>
      </>
    );
  }
}

export default AlertWin;
