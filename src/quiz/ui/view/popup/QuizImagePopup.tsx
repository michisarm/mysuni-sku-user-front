import React from 'react';
import { Modal } from "semantic-ui-react";
import CloseIcon from '../../../../style/media/icon-close-player-28-px.png';

const QuizImagePopup = ({
  open,
  setOpen,
  imageInfo
}: {
  open: boolean,
  setOpen: (state: boolean) => void;
  imageInfo: {title:string, src: string}
}) => {

  const onClose = () => {
    setOpen(!open);
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      className="base w1000 quiz-zoom"
    >
      <Modal.Header>
        <span>{imageInfo.title}</span>
        <button className="admin_popup_close" onClick={onClose}>
          <img src={CloseIcon} />
          <span>Close</span>
        </button>
      </Modal.Header>
      <Modal.Content className="admin_popup_add">
        <div style={{height:'700px', overflowY: 'auto'}}>
          <img src={`/${imageInfo.src}`} />
        </div>
      </Modal.Content>
    </Modal>
  )
}

export default QuizImagePopup