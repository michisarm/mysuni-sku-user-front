import { getCookie, setCookie } from '@nara.platform/accent';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Checkbox, Image, Modal } from 'semantic-ui-react';
import { getPublicUrl } from 'shared/helper/envHelper';
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
            label="더 이상 보지 않기"
            className="base"
            onChange={onHandleChange}
          />
          <Button className="close" onClick={ModalClose}>
            Close
          </Button>
        </div>
      </Modal.Header>
      <Modal.Content>
        <div className="imgbox" data-area={Area.MAIN_POPBANNER}>
          <Image
            src={`${getPublicUrl()}/images/all/210510_EnvironmentCollege.jpeg`}
            // alt="사회는 거리두기, 우리 조직 DT는 ai/dt college로 거리 좁히기"
          />
          {/* <Link
            to="/certification/badge/badge-detail/BADGE-2t"
            className="literacy"
          >
            구성원과정
          </Link> */}
          <Link
            to="/introduction/College?subTab=Environment"
            // className="executive"
          >
            {/* 리더과정 */}
          </Link>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default AiDtModalView;
