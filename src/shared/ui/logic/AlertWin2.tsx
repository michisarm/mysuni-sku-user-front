import * as React from 'react';
import { observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import { Button, Modal, Header, Image } from 'semantic-ui-react';
import { PolyglotText } from './PolyglotText';

interface Props {
  message: string;
  handleClose: () => void;
  handleOk: (type: string) => void;
  open: boolean;
  alertIcon?: string;
  type: string;
  title?: string;
}

@observer
@reactAutobind
class AlertWin2 extends React.Component<Props> {
  //
  render() {
    const { message, handleClose, handleOk, open, alertIcon, type, title } =
      this.props;
    return (
      <>
        {/*<Button onClick={this.show('tiny')}>Alert</Button>*/}

        {/*필수 정보를 입력하지 않고 [저장]버튼을 선택할 경우*/}
        {/*입력하지 않은 필수 정보가 어려 개일 경우 모든 미입력 정보에 대한 명칭을 제공한다.*/}
        <Modal className="size-mini" open={open} onClose={handleClose}>
          <div className="main">
            <Modal.Header>
              <PolyglotText id="개학등록-승인요청-알림" defaultString="알림" />
            </Modal.Header>
            <Modal.Content>
              <Modal.Description>
                {alertIcon === 'triangle' ? (
                  <Image
                    wrapped
                    className="modal-img"
                    size="medium"
                    src={`${process.env.PUBLIC_URL}/images/modal/confirm.png`}
                  />
                ) : (
                  <Image
                    wrapped
                    className="modal-img"
                    size="medium"
                    src={`${process.env.PUBLIC_URL}/images/modal/alert.png`}
                  />
                )}
                <div className="title">{title}</div>
                <p className="center">{message}</p>
              </Modal.Description>
            </Modal.Content>
          </div>
          {type === '안내' ? (
            <Modal.Actions className="normal">
              <Button primary onClick={handleClose} type="button">
                <PolyglotText id="개학등록-승인요청-ok2" defaultString="OK" />
              </Button>
            </Modal.Actions>
          ) : (
            <Modal.Actions className="actions1">
              <Button secondary onClick={handleClose} type="button">
                <PolyglotText
                  id="개학등록-승인요청-취소2"
                  defaultString="Cancel"
                />
              </Button>
              <Button primary onClick={() => handleOk(type)} type="button">
                <PolyglotText id="개학등록-승인요청-ok2" defaultString="OK" />
              </Button>
            </Modal.Actions>
          )}
        </Modal>
        {/*<>*/}
        {/*  <Modal size={size} open={open} onClose={this.close}>*/}
        {/*    <Modal.Header>*/}
        {/*      확인*/}
        {/*    </Modal.Header>*/}
        {/*    <Modal.Content>*/}
        {/*      <Header as='h3' icon textAlign='center'>*/}
        {/*        <Icon name='exclamation circle' size='tiny' color='orange'/>*/}
        {/*        <Header.Content>승인 요청 안내</Header.Content>*/}
        {/*      </Header>*/}
        {/*      <p className='center'>학습 강좌에 대해 승인 요청하시겠습니까?</p>*/}
        {/*    </Modal.Content>*/}
        {/*    <Modal.Actions>*/}
        {/*      <Button basic onClick={this.close}>No</Button>*/}
        {/*      <Button primary onClick={this.close}>Yes</Button>*/}
        {/*    </Modal.Actions>*/}
        {/*  </Modal>*/}
        {/*</>*/}
      </>
    );
  }
}

export default AlertWin2;
