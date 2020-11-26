/*eslint-disable*/

import React, { useState, useEffect } from 'react';
import { getPublicUrl } from 'shared/helper/envHelper';
import { Modal, Checkbox, Button, Image } from 'semantic-ui-react';
import moment from 'moment';

const Linkedin01 = `${getPublicUrl()}/images/all/popup-img-linkedin-new-01.png`;
const Linkedin02 = `${getPublicUrl()}/images/all/popup-img-linkedin-new-02.png`;
const Linkedin03 = `${getPublicUrl()}/images/all/popup-img-linkedin-new-03.png`;

interface LinkedInModalProps {
  enabled:boolean;
}

const LinkedInModal: React.FC<LinkedInModalProps> = function LinkedInModal({
  enabled
}) {

  const PUBLIC_URL = process.env.PUBLIC_URL;

  const LOCAL_STORAGE_KEY = 'mySUNI.noDaySeeLinkedIn';


const [open, setOpen] = useState<boolean>(enabled);
// const [noMoreSee, setNoMoreSee] = useState<boolean>(false);
const [noMoreSeeChecked, setNoMoreSeeChecked] = useState<boolean>(false);

useEffect(() => {
  const noMoreSee = window.localStorage.getItem(LOCAL_STORAGE_KEY);

  if (noMoreSee) {
    const dateNumber = JSON.parse(noMoreSee);
    const noMoreSeeDate = moment(dateNumber).add(1, 'day');
    const now = moment();

    if (now.isBefore(noMoreSeeDate)) {
      // setNoMoreSee(true);
      return;
    }
  }

  setOpen(enabled);
}, [enabled]);


  function onClose() {
    // 
    const now = moment();

    if (noMoreSeeChecked) {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(now.valueOf()));
    }
    setOpen(false);
  }

  function onCheckNoMoreSee() {
    setNoMoreSeeChecked(!noMoreSeeChecked);
  }


  return (
    <>
      <Modal  open={open} className='w1000 base linkedin'>
          <Modal.Header>
              LinkedIn 최초 접속 시 학습 방법 안내
          </Modal.Header>
          <Modal.Content>
              <div className="scrolling-80vh">
                  <div className="content-wrap2">
                      <div className="linkedin-cont">
                          <ul className="txt-box">
                              <li>
                                  <div className="text1">1. Linkedin 과정을 처음 학습하는 경우, 아래와 같이 기존에 개인이 보유하고 있는
                                      ‘Linkedin 계정’과 연동하여 사용할 것인지를 확인하는 화면이 보여집니다.
                                  </div>
                              </li>
                              <li>
                                  <div className="text1">2. 기존에 개인이 보유하고 있는 ‘Linkedin 계정’과 ‘mySUNI 계정’을
                                      연결하지
                                      않고 학습하고 싶은 경우,
                                  </div>
                                  <div className="text2"><span className="bold">아래 표시된</span> <span
                                      className="red bold">①</span>번, <span className="red bold">②</span>번을
                                      순서대로 클릭하시면, <span className="bold">‘mySUNI계정’으로 학습</span>이 가능합니다.
                                  </div>
                                  <div className="text2"><span className="red">최초 연결 이후에는 학습할 때 마다 별도 로그인 할 필요가 없습니다.</span>
                                  </div>
                              </li>
                              <li>
                                  <div className="text1">3. 기존에 개인이 보유하고 있는 ‘Linkedin 계정’과 ‘mySUNI 계정’을 연결하여
                                      학습하고 싶은 경우
                                  </div>
                                  <div className="text2">아래 표시된 <span className="red bold">③</span>번을 클릭후 개인이
                                      보유한 Linkedin 계정의 ID/PW를 입력하면 됩니다.
                                  </div>
                                  <div className="text2">LinkedIn 과정을 <span
                                      className="red">학습할 때 마다 개인 계정을 입력</span>하면, 학습이력이 <span
                                      className="red">LinkedIn profile에 통합 관리</span>됩니다.
                                  </div>
                              </li>
                          </ul>
                          <div className="img-box">
                              <ul>
                                  <li>
                                      <Image src={Linkedin01} alt=''/>
                                      <div>상세화면에서 [학습하기] 버튼 클릭</div>
                                      <i className="arrow-popup-linkedin icon"><span
                                          className="blind">next</span></i>
                                  </li>
                                  <li>
                                      <Image src={Linkedin02} alt=''/>
                                      <div>개인 계정과의 연동을 확인하는 팝업</div>
                                      <i className="arrow-popup-linkedin icon"><span
                                          className="blind">next</span></i>
                                  </li>
                                  <li>
                                      <Image src={Linkedin03} alt=''/>
                                      <div>재 확인하는 팝업</div>
                                  </li>
                              </ul>
                          </div>
                      </div>
                  </div>
              </div>
          </Modal.Content>
          <Modal.Actions className="actions4">
              <div className="left">
                  <Checkbox label='오늘 하루 보지 않기' className='base' checked={noMoreSeeChecked} onClick={onCheckNoMoreSee}/>
              </div>
              <div className="right">
                  <Button className="close" onClick={onClose}>Close</Button>
              </div>
          </Modal.Actions>
      </Modal>
    </>
  );
};

export default LinkedInModal;
