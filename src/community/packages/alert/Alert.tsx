import React, { Component } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { Modal, Button, Image } from 'semantic-ui-react';

interface AlertProps {
  title: string;
  message: string;
  warning?: boolean;
  onClose?: () => void;
}

class Alert extends Component<AlertProps> {
  //
  buttonRef: any = React.createRef();

  componentDidMount(): void {
    this.buttonRef.focus();
  }

  public render() {
    //
    const { title, message, onClose } = this.props;

    return (
      <Modal open className="size-mini">
        <div className="main">
          <Modal.Header>{title}</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Image
                className="medium image modal-img"
                src="/suni-community/images/modal/alert.png"
              />
              <div dangerouslySetInnerHTML={{ __html: message }} />
            </Modal.Description>
          </Modal.Content>
        </div>
        <Modal.Actions className="normal">
          <Button
            primary
            onClick={onClose}
            ref={(buttonRef) => (this.buttonRef = buttonRef)}
          >
            확인
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

interface ConfirmProps {
  title: string;
  message: string;
  warning?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  // onClose?: () => void;
}

class Confirm extends Component<ConfirmProps> {
  public render() {
    const { title, message, onOk, onCancel } = this.props;

    return (
      <Modal open className="size-mini">
        <div className="main">
          <Modal.Header>{title}</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Image
                className="medium image modal-img"
                src="/suni-community/images/modal/confirm.png"
              />
              <div dangerouslySetInnerHTML={{ __html: message }} />
            </Modal.Description>
          </Modal.Content>
        </div>
        <Modal.Actions className="normal twin">
          <Button secondary onClick={onCancel}>
            취소
          </Button>
          <Button primary onClick={onOk}>
            확인
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

enum Type {
  ALERT = 'alert',
  CONFIRM = 'confirm',
}

export interface Props extends AlertProps, ConfirmProps {
  type: Type;
}

export function showAlert(options: AlertProps) {
  const { title, message, warning, onClose: close } = options;

  confirmAlert({
    title,
    message,
    customUI: ({ title, message, onClose }) =>
      onGetCustomUI({
        message,
        title,
        warning,
        type: Type.ALERT,
        onClose: () => {
          Promise.resolve()
            .then(() => {
              if (close && typeof close === 'function') close();
            })
            .then(onClose);
        },
      }),
  });
}

export function showConfirm(options: ConfirmProps) {
  //
  const { title, message, warning, onOk, onCancel: cancel } = options;

  confirmAlert({
    title,
    message,
    customUI: ({ title, message, onClose }) =>
      onGetCustomUI({
        title,
        message,
        warning,
        type: Type.CONFIRM,
        onOk: () => {
          if (onOk && typeof onOk === 'function') onOk();
          onClose();
        },
        onCancel: () => {
          if (cancel && typeof cancel === 'function') cancel();
          onClose();
        },
      }),
  });
}

let onGetCustomUI = getCustomUI;

export function setCustomUI(customUI: any) {
  onGetCustomUI = customUI;
}

function getCustomUI(options: Props) {
  //
  const { title, message, type, onOk, onCancel, onClose } = options;

  if (type === Type.ALERT) {
    return <Alert title={title} message={message} onClose={onClose} />;
  } else if (type === Type.CONFIRM) {
    const okFunction = typeof onOk === 'function' ? onOk : () => {};

    return (
      <Confirm
        title={title}
        message={message}
        onOk={okFunction}
        onCancel={onCancel}
      />
    );
  }
  return null;
}
