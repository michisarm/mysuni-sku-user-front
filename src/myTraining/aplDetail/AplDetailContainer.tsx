import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
import { Form, Segment } from 'semantic-ui-react';
import AplService from 'myTraining/present/logic/AplService';
import ApprovalButtons from '../ui/view/button/ApprovalButtons';
import MyApprovalInfoTable from '../ui/view/table/MyApprovalInfoTable';
import ApprovalInfoView from '../ui/view/ApprovalInfoView';
import { useRequestAplDetail } from './aplDetail.services';
import AplDetailHeaderView from './AplDetailHeaderView';
import {
  getAplDetailModal,
  setAplDetailModal,
  useAplDetailFileMap,
  useAplDetailForm,
} from './aplDetail.stores';
import { initAplDetailForm } from './aplDetail.models';
import {
  onChangeTime,
  onClearTime,
  onClickList,
  onClickReject,
} from './aplDetail.events';
import AplDetailModalContainer from './AplDetailModalContainer';

function AplDetailContainer() {
  useRequestAplDetail();
  const aplService = AplService.instance;
  const { apl } = aplService;
  const { allowHour, allowMinute, allowHourRef, allowMinuteRef } =
    useAplDetailForm() || initAplDetailForm();
  const fileMap = useAplDetailFileMap() || new Map<string, any>();

  const onClickApproval = useCallback(() => {
    /* allowHour & allowMinute 가 공백일 때, 필수 입력 알람창을 띄워야 함. */
    const aplDetailModal = getAplDetailModal();
    if (aplDetailModal === undefined) {
      return;
    }
    if (allowHour === '' || allowMinute === '') {
      setAplDetailModal({
        ...aplDetailModal,
        openAlertModal: true,
      });
      return;
    }

    setAplDetailModal({
      ...aplDetailModal,
      openApprovalModal: true,
    });
  }, [allowHour, allowMinute]);

  /* render */
  return (
    <>
      <AplDetailHeaderView apl={apl} />
      {apl && (
        <Segment className="full">
          <div className="apl-form-wrap create">
            <Form>
              <ApprovalInfoView model={apl} />
              <MyApprovalInfoTable
                model={apl}
                files={fileMap}
                allowHour={allowHour}
                allowMinute={allowMinute}
                onChangeTime={onChangeTime}
                onClearTime={onClearTime}
                allowHourRef={allowHourRef}
                allowMinuteRef={allowMinuteRef}
              />
              <ApprovalButtons
                approvalState={apl.state}
                onClickList={onClickList}
                onClickReject={onClickReject}
                onClickApproval={onClickApproval}
              />
            </Form>
          </div>
        </Segment>
      )}
      <AplDetailModalContainer />
    </>
  );
}

export default observer(AplDetailContainer);
