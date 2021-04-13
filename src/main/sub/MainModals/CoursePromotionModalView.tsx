/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Modal, Checkbox, Button, Image } from 'semantic-ui-react';
import { getPublicUrl } from 'shared/helper/envHelper';
import { getCookie, setCookie } from '@nara.platform/accent';
import { useHistory } from 'react-router';
import { Area } from 'tracker/model';

const CoursePromotionModalView = () => {
  //
  const [modalOpen, setModalOpen] = useState(false);
  const [noMoreModal, setNoMoreModal] = useState(false);
  const history = useHistory();

  useEffect(() => {
    // const valTutorialModal = window.localStorage.getItem('TutorialModal');
    const valTutorialModal = getCookie('TutorialModal');
    const tutorialModal = valTutorialModal;
    if (
      tutorialModal === null ||
      tutorialModal === '' ||
      tutorialModal === 'SHOW'
    ) {
      setModalOpen(true);
    } else {
      setModalOpen(false);
    }
  }, []);

  const ModalClose = () => {
    // window.localStorage.setItem('TutorialModal', noMoreModal ? 'HIDE' : 'SHOW');
    setCookie('TutorialModal', noMoreModal ? 'HIDE' : 'SHOW');
    setModalOpen(!modalOpen);
  };

  const onHandleChange = () => {
    setNoMoreModal(!noMoreModal);
  };

  const handleClickImg = () => {
    // ModalClose();
    // history.push(
    //   `/lecture/cineroom/ne1-m2-c2/college/CLG00007/course-plan/COURSE-PLAN-1h0/Course/C-LECTURE-1ac/cube/CUBE-csq/LECTURE-CARD-aed`
    // );
  };

  return (
    <Modal
      open={modalOpen}
      className="base w1000 tutorials2 front scrolling"
      style={{ position: 'relative', marginTop: '0px' }}
    >
      <Modal.Header className="header2">
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
        <div className="scrolling-80vh" data-area={Area.MAIN_POPBANNER}>
          <div className="cont-wrap">
            <div className="img" onClick={handleClickImg}>
              {/* <a> */}
              <img
                src={`${getPublicUrl()}/images/all/img-personalboard-tutorial_0326.png`}
                alt=""
              />
              {/* </a> */}
            </div>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default CoursePromotionModalView;
