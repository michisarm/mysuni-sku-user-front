import React from 'react';
import { observer } from 'mobx-react';
import ManagerListModalContainer from 'approval/member/ui/logic/ManagerListModalContainer';
import { Form, Grid, Modal, Button, Icon } from 'semantic-ui-react';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { onClickManagerListOk } from '../aplCreate.events';
import { AplModel } from 'myTraining/model';

interface AplApprovalSelectViewProps {
  apl: AplModel;
  approvalShow: boolean;
}

function AplApprovalSelectView({
  apl,
  approvalShow,
}: AplApprovalSelectViewProps) {
  let managerModal: any = null;
  const onClickChangeApplyReference = () => {
    managerModal.onShow(true);
  };

  return (
    <Form.Field>
      <Grid className="create create2">
        <Grid.Column>
          <label>
            <PolyglotText id="개학등록-uisf-승인자" defaultString="승인자" />
          </label>
        </Grid.Column>
        <Grid.Column>
          <Modal.Actions>
            {approvalShow && (
              <Button
                className="post change-admin btn"
                onClick={onClickChangeApplyReference}
              >
                <PolyglotText
                  id="개학등록-uisf-승인변경"
                  defaultString="승인자 변경"
                />
              </Button>
            )}
            <ManagerListModalContainer
              ref={(managerModalRef) => (managerModal = managerModalRef)}
              handleOk={onClickManagerListOk}
              multiSelect={false}
            />
            <span className="text1">
              <b>
                {(apl && parsePolyglotString(apl.approvalUserIdentity?.name)) ||
                  ''}
              </b>
              <span className="ml40">
                {(apl &&
                  parsePolyglotString(apl.approvalUserIdentity?.companyName)) ||
                  ''}
              </span>
              <span className="line">
                {(apl &&
                  parsePolyglotString(
                    apl.approvalUserIdentity?.departmentName
                  )) ||
                  ''}
              </span>
              {approvalShow && (
                <div className="info-text">
                  <Icon className="info16">
                    <span className="blind">infomation</span>
                  </Icon>
                  <PolyglotText
                    id="개학등록-uisf-부가설명"
                    defaultString="본인 조직의 리더가 아닐 경우 [승인자변경]을 눌러 수정해주세요."
                  />
                </div>
              )}
            </span>
          </Modal.Actions>
        </Grid.Column>
      </Grid>
    </Form.Field>
  );
}

export default observer(AplApprovalSelectView);
