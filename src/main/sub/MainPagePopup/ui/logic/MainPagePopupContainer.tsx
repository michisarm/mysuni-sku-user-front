import {Button, Checkbox, Modal} from 'semantic-ui-react';
import  {requestMainPagePopupFirst} from '../../service/MainPagePopupService';
import {useMainPagePopupItem, setMainPagePopupItem} from '../../store/MainPagePopupStore';
import React, {useEffect, useState} from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import ReactQuill from "react-quill";
import moment from "moment";
import { getCookie, setCookie } from '@nara.platform/accent';

interface Props extends RouteComponentProps {}

function MainPagePopupContainer(props: Props) {
  const [noMoreModal, setNoMoreModal] = useState(false);
  const mainPagePopup = useMainPagePopupItem();
  const open = mainPagePopup?.open;
  const contents = mainPagePopup?.contents;

  useEffect(() => {
    requestMainPagePopupFirst();
  }, []);

  const ModalClose = () => {
    setCookie('mainPopupModal', noMoreModal ? 'HIDE' : 'SHOW');
    // @ts-ignore
    setMainPagePopupItem({
      id            : mainPagePopup?.id,
      open          : false,
      contents      : mainPagePopup?.contents,
      modifiedTime  : mainPagePopup?.modifiedTime,
      modifier      : mainPagePopup?.modifier,
      period        : mainPagePopup?.period,
      time          : mainPagePopup?.time,
      title         : mainPagePopup?.title,
    })
  };

  const onHandleChange = () => {
    setNoMoreModal(!noMoreModal);
  };

  useEffect(() => {
    if (open) {
      const today = moment().format('YYYY-MM-DD')
      const beforeFlag = moment(today).isBefore(moment().format(mainPagePopup?.period.startDate),'day');
      const afterFlag = moment(today).isAfter(moment().format(mainPagePopup?.period.endDate),'day');
      console.log("====>"+open+":"+today+":"+beforeFlag+":"+afterFlag+":"+getCookie('mainPopupModal'));
      //afterFlag=false,beforeFlag=false라면 오픈. 아니라면 close
      if(afterFlag){ModalClose();}
      else if(beforeFlag){ModalClose();}

      const mainModal = getCookie('mainPopupModal');
      if (mainModal === null || mainModal === '' || mainModal === 'SHOW') {
        setCookie('mainPopupModal','SHOW');
      } else {
        ModalClose();
      }
    }
  }, [open]);

  return (
    <>
      <Modal open={open} className="aidt-modal" style={{ width: 1015}}>
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
        <Modal.Content style={{height: 640}}>
          {/*<ReactQuill theme="bubble" value={(mainPagePopup?.contents) || ''} readOnly />*/}
          <div dangerouslySetInnerHTML={{__html:contents|| '' }}/>
        </Modal.Content>
      </Modal>
    </>
  );
}

export default withRouter(MainPagePopupContainer);

