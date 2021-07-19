/*eslint-disable*/

import React, { useState, useEffect } from 'react';
import { getPublicUrl } from 'shared/helper/envHelper';
import { Modal, Checkbox, Button, Image } from 'semantic-ui-react';
import moment from 'moment';
import { getPolyglotText, PolyglotText } from '../../../../../shared/ui/logic/PolyglotText';

const Linkedin01 = `${getPublicUrl()}/images/all/popup-img-linkedin-new-01.png`;
const Linkedin02 = `${getPublicUrl()}/images/all/popup-img-linkedin-new-02.png`;
const Linkedin03 = `${getPublicUrl()}/images/all/popup-img-linkedin-new-03.png`;

interface LinkedInModalProps {
  enabled: boolean;
}

const LinkedInModal: React.FC<LinkedInModalProps> = function LinkedInModal({
  enabled,
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
      window.localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify(now.valueOf())
      );
    }
    setOpen(false);
  }

  function onCheckNoMoreSee() {
    setNoMoreSeeChecked(!noMoreSeeChecked);
  }

  return (
    <>
      <Modal open={open} className="w1000 base linkedin">
        <Modal.Header>
          <PolyglotText defaultString="LinkedIn 최초 접속 시 학습 방법 안내" id="Collage-VideoLinkedIn-타이틀" />
        </Modal.Header>
        <Modal.Content>
          <div className="scrolling-80vh">
            <div className="content-wrap2">
              <div className="linkedin-cont">
                <ul className="txt-box">
                  <li>
                    <div className="text1">
                      <PolyglotText
                        defaultString="1. Linkedin 과정을 처음 학습하는 경우, 아래와 같이 기존에 개인이 보유하고 있는 ‘Linkedin 계정’과 연동하여 사용할 것인지를 확인하는 화면이 보여집니다."
                        id="Collage-VideoLinkedIn-본문1"
                      />
                    </div>
                  </li>
                  <li>
                    <div className="text1">
                      <PolyglotText
                        defaultString="2. 기존에 개인이 보유하고 있는 ‘Linkedin 계정’과 ‘mySUNI 계정’을 연결하지 않고 학습하고 싶은 경우,"
                        id="Collage-VideoLinkedIn-본문2"
                      />
                    </div>
                    <div
                      className="text2"
                      dangerouslySetInnerHTML={{__html: getPolyglotText(`<span className="bold">아래 표시된</span>{' '}
                        <span className="red bold">①</span>번,{' '}
                        <span className="red bold">②</span>번을 순서대로
                        클릭하시면,{' '}
                        <span className="bold">‘mySUNI계정’으로 학습</span>이
                        가능합니다.`, 'Collage-VideoLinkedIn-본문3')}}
                    />
                    <div className="text2">
                      <span className="red">
                        <PolyglotText defaultString="최초 연결 이후에는 학습할 때 마다 별도 로그인 할 필요가 없습니다." id="Collage-VideoLinkedIn-본문4" />
                      </span>
                    </div>
                  </li>
                  <li>
                    <div className="text1">
                      <PolyglotText defaultString="3. 기존에 개인이 보유하고 있는 ‘Linkedin 계정’과 ‘mySUNI 계정’을 연결하여 학습하고 싶은 경우" id="Collage-VideoLinkedIn-본문5" />
                    </div>
                    <div
                      className="text2"
                      dangerouslySetInnerHTML={{__html: getPolyglotText(`아래 표시된 <span className="red bold">③</span>번을 클릭후 개인이 보유한 Linkedin 계정의 ID/PW를 입력하면 됩니다.`, 'Collage-VideoLinkedIn-본문6')}}
                    />
                    <div
                      className="text2"
                      dangerouslySetInnerHTML={{__html: getPolyglotText(`LinkedIn 과정을{' '}
                          <span className="red">
                            학습할 때 마다 개인 계정을 입력
                          </span>
                          하면, 학습이력이{' '}
                          <span className="red">LinkedIn profile에 통합 관리</span>
                          됩니다.`, 'Collage-VideoLinkedIn-본문7')}}
                    />
                  </li>
                  <li>
                    <div className="text1">
                      <span className="bold">
                        <PolyglotText defaultString="4. LinkedIn 학습사이트 정책으로 Internet Explorer는 더이상 지원하지 않습니다." id="Collage-VideoLinkedIn-본문11" />
                      </span>
                    </div>
                    <div className="text2">
                      <span className="red">
                        <PolyglotText defaultString="지원 브라우저: Microsoft Edge/Chrome/Firefox/Safari(10.1.1 이상) 등을 이용해주세요." id="Collage-VideoLinkedIn-본문12" />
                      </span>
                    </div>
                  </li>
                </ul>
                <div className="img-box">
                  <ul>
                    <li>
                      <Image src={Linkedin01} alt="" />
                      <div>
                        <PolyglotText defaultString="상세화면에서 [학습하기] 버튼 클릭" id="Collage-VideoLinkedIn-본문8" />
                      </div>
                      <i className="arrow-popup-linkedin icon">
                        <span className="blind">next</span>
                      </i>
                    </li>
                    <li>
                      <Image src={Linkedin02} alt="" />
                      <div>
                        <PolyglotText defaultString="개인 계정과의 연동을 확인하는 팝업" id="Collage-VideoLinkedIn-본문9" />
                      </div>
                      <i className="arrow-popup-linkedin icon">
                        <span className="blind">next</span>
                      </i>
                    </li>
                    <li>
                      <Image src={Linkedin03} alt="" />
                      <div>
                        <PolyglotText defaultString="재 확인하는 팝업" id="Collage-VideoLinkedIn-본문10" />
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Modal.Content>
        <Modal.Actions className="actions4">
          <div className="left">
            <Checkbox
              label={getPolyglotText('오늘 하루 보지 않기', 'Collage-VideoLinkedIn-하루안봄')}
              className="base"
              checked={noMoreSeeChecked}
              onClick={onCheckNoMoreSee}
            />
          </div>
          <div className="right">
            <Button className="close" onClick={onClose}>
              <PolyglotText defaultString="Close" id="Collage-VideoLinkedIn-닫기" />
            </Button>
          </div>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default LinkedInModal;
