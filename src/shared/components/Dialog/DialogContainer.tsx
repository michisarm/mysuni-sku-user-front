import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Modal, Button, Image } from 'semantic-ui-react';
import { PolyglotText } from '../../ui/logic/PolyglotText';

interface Props {
  title: string;
  message: string;
  warning?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
}

@reactAutobind
class DialogContainer extends Component<Props> {
  //
  static defaultProps = {
    warning: false,
  };

  render() {
    //
    const { title, message, warning, onOk, onCancel, onClose } = this.props;
    const image = warning ? 'alert.png' : 'confirm.png';

    return (
      <Modal open className="size-mini">
        <div className="main">
          <Modal.Header>
            <PolyglotText defaultString="안내" id="home-관심목록alert-안내" />
          </Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Image
                wrapped
                className="modal-img"
                size="medium"
                src={`https://image.mysuni.sk.com/suni-asset/public/images/modal/${image}`}
              />
              <div className="title">{title}</div>
              <div
                className="center"
                dangerouslySetInnerHTML={{ __html: message }}
              />
              {/*<div dangerouslySetInnerHTML={{ __html: message }} />*/}
            </Modal.Description>
          </Modal.Content>
        </div>
        <Modal.Actions className="normal twin">
          {onCancel && (
            <Button secondary onClick={onCancel}>
              <PolyglotText defaultString="취소" id="home-관심목록alert-취소" />
            </Button>
          )}
          {onOk && (
            <Button primary onClick={onOk}>
              <PolyglotText defaultString="확인" id="home-관심목록alert-확인" />
            </Button>
          )}
          {onClose && (
            <Button secondary onClick={onClose}>
              <PolyglotText defaultString="확인" id="home-관심목록alert-확인" />
            </Button>
          )}
        </Modal.Actions>
      </Modal>
    );
  }
}

export default DialogContainer;
