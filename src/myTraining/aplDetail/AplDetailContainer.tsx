import React from 'react';
import { observer } from 'mobx-react';
import { Form, Segment } from 'semantic-ui-react';
import AplService from 'myTraining/present/logic/AplService';
import ApprovalButtons from '../ui/view/button/ApprovalButtons';
import MyApprovalInfoTable from '../ui/view/table/MyApprovalInfoTable';
import ApprovalInfoView from '../ui/view/ApprovalInfoView';
import { useRequestAplDetail } from './aplDetail.services';
import AplDetailHeaderView from './AplDetailHeaderView';
import { useAplDetailFileMap, useAplDetailForm } from './aplDetail.stores';
import { initAplDetailForm } from './aplDetail.models';
import {
  onChangeTime,
  onClearTime,
  onClickApproval,
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
