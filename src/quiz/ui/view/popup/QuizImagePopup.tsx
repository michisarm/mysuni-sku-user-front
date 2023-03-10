import React from 'react';
import { Modal } from 'semantic-ui-react';
import CloseIcon from '../../../../style/media/icon-close-player-28-px.png';
import { PolyglotText } from '../../../../shared/ui/logic/PolyglotText';

const QuizImagePopup = ({
  open,
  setOpen,
  imageInfo,
}: {
  open: boolean;
  setOpen: (state: boolean) => void;
  imageInfo: { title: string; src: string };
}) => {
  const onClose = () => {
    setOpen(!open);
  };

  return (
    <Modal open={open} onClose={onClose} className="base w1000 quiz-zoom">
      <Modal.Header>
        <div
          dangerouslySetInnerHTML={{
            __html: `${imageInfo.title}`,
          }}
          style={{ display: 'inline-block' }}
        />
        <button className="admin_popup_close" onClick={onClose}>
          <img src={CloseIcon} />
          <span>
            <PolyglotText defaultString="Close" id="Collage-VideoQuiz-Close" />
          </span>
        </button>
      </Modal.Header>
      <Modal.Content className="admin_popup_add">
        <div style={{ height: '700px', overflowY: 'auto' }}>
          <img style={{ maxWidth: '100%' }} src={`/${imageInfo.src}`} />
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default QuizImagePopup;
