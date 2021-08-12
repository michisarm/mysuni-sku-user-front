import React from 'react';
import { observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import { Button, Form, Segment } from 'semantic-ui-react';
import AplService from '../../present/logic/AplService';
import { AplApprovalType } from '../../model/AplApprovalType';
import { PolyglotText } from '../../../shared/ui/logic/PolyglotText';
import {
  handleCancel,
  handleSave,
  onChangeAplPropsValid,
  onChangeAplTimePropsValid,
} from 'myTraining/aplCreate/aplCreate.events';
import {
  focusInput,
  initWeek,
  requestAplApprover,
  requestAplCreateColleges,
} from './aplCreateForm.services';
import AplCreateFocusService from '../mobx/AplCreateFocusService';
import { CompanyApproverService } from 'approval/stores';
import AplCreateFormView from './AplCreateFormView';

@observer
@reactAutobind
class AplCreateFormContainer extends React.Component {
  componentDidMount() {
    requestAplApprover();
    requestAplCreateColleges();
    initWeek();
    focusInput();
  }

  componentDidUpdate() {
    focusInput();
  }

  render() {
    const aplService = AplService.instance;
    const { apl, changeAplProps } = aplService;
    const { focusInputRefs } = AplCreateFocusService.instance;
    const { originCompanyApprover } = CompanyApproverService.instance;

    const approvalShow =
      originCompanyApprover.aplApproverType === AplApprovalType.Leader_Approve;

    return (
      <Segment className="full">
        <div className="apl-form-wrap">
          <Form>
            <AplCreateFormView
              apl={apl}
              focusInputRefs={focusInputRefs}
              approvalShow={approvalShow}
              changeAplProps={changeAplProps}
              onChangeAplPropsValid={onChangeAplPropsValid}
              onChangeAplTimePropsValid={onChangeAplTimePropsValid}
            />
            <div className="buttons">
              <Button className="fix2 line" onClick={() => handleCancel()}>
                <PolyglotText id="개학등록-uisf-취소" defaultString="취소" />
              </Button>
              <Button className="fix2 bg" onClick={() => handleSave('save')}>
                <PolyglotText
                  id="개학등록-uisf-승인요청"
                  defaultString="승인요청"
                />
              </Button>
            </div>
          </Form>
        </div>
      </Segment>
    );
  }
}

export default AplCreateFormContainer;
