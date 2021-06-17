import { Modal } from 'semantic-ui-react';
import  {requestMainPagePopupFirst} from '../../service/MainPagePopupService';
import {useMainPagePopupItem, setMainPagePopupItem} from '../../store/MainPagePopupStore';
import React, { useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import ReactQuill from "react-quill";
import CloseIcon from "../../../../../style/media/icon-close-player-28-px.png";
import moment from "moment";
import Editor from "../../../../../community/ui/view/CommunityPostCreateView/Editor";

interface Props extends RouteComponentProps {
  isOpen: boolean;
}

function MainPagePopupContainer(props: Props) {
  useEffect(() => { requestMainPagePopupFirst();}, []);

  const mainPagePopup = useMainPagePopupItem();
  const title = mainPagePopup?.title;
  const open = mainPagePopup?.open;

  useEffect(() => {
    if (open) {
      const today = moment().format('YYYY-MM-DD')
      const beforeFlag = moment(today).isBefore(moment().format(mainPagePopup?.period.startDate),'day');
      const afterFlag = moment(today).isAfter(moment().format(mainPagePopup?.period.endDate),'day');
      console.log("====>"+today+":"+beforeFlag+":"+afterFlag)
      //afterFlag=false,beforeFlag=false라면 오픈. 아니라면 close
      if(afterFlag){onClose();}
      else if(beforeFlag){onClose();}
    }
  }, [open]);

  const onClose = () => {
    // @ts-ignore
    setMainPagePopupItem({
      open: false,
      title: mainPagePopup?.title,
      time: mainPagePopup?.time,
      period: mainPagePopup?.period,
      modifier: mainPagePopup?.modifier,
      modifiedTime: mainPagePopup?.modifiedTime,
      id: mainPagePopup?.id,
      contents: mainPagePopup?.contents,
      }
    );
  };

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

