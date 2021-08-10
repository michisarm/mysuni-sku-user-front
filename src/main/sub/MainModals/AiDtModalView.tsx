import { getCookie, setCookie } from '@nara.platform/accent';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Checkbox, Image, Modal } from 'semantic-ui-react';
import { getPublicUrl } from 'shared/helper/envHelper';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';
import { Area } from 'tracker/model';

const AiDtModalView = () => {
  //

  const [modalOpen, setModalOpen] = useState(false);
  const [noMoreModal, setNoMoreModal] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const mainModal = getCookie('mainModal');

    if (mainModal === null || mainModal === '' || mainModal === 'SHOW') {
      setModalOpen(true);
    } else {
      setModalOpen(false);
    }
  }, []);

  const ModalClose = () => {
    setCookie('mainModal', noMoreModal ? 'HIDE' : 'SHOW');
    setModalOpen(!modalOpen);
  };

  const onHandleChange = () => {
    setNoMoreModal(!noMoreModal);
  };

  return (
    <Modal open={modalOpen} onClose={ModalClose} className="aidt-modal">
      <Modal.Header>
        <div className="right-btn">
          <Checkbox
            label={getPolyglotText('더 이상 보지 않기', '공통-공통-안보기')}
            className="base"
            onChange={onHandleChange}
          />
          <Button className="close" onClick={ModalClose}>
            Close
          </Button>
        </div>
      </Modal.Header>
      <Modal.Content>
        <div className="" data-area={Area.MAIN_POPBANNER}>
          <Link to="/introduction/College?subTab=Environment">
            <Image
              src={`${getPublicUrl()}/images/all/210510_EnvironmentCollege.jpeg`}
            />
          </Link>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default AiDtModalView;
