import React from 'react';
import { getCookie, mobxHelper, reactAutobind } from '@nara.platform/accent';
import { patronInfo } from '@nara.platform/dock';
import { Chart } from '@nara.drama/approval';
import { inject, observer } from 'mobx-react';

import { SkProfileService } from 'profile/stores';
import { ApprovalMemberModel } from '../../model/ApprovalMemberModel';


interface Props {
  skProfileService?: SkProfileService
  trigger?: React.ReactNode
  handleOk: (member: ApprovalMemberModel) => void
}

interface States {
  open: boolean
}

@inject(mobxHelper.injectFrom(
  'profile.skProfileService',
))
@observer
@reactAutobind
class ManagerListModalContainer extends React.Component<Props, States> {
  constructor(props: Props) {
    //
    super(props);
    this.state = { open: false };
  }

  componentDidMount(): void {
    //
    const { skProfileService } = this.props;
    if (skProfileService) {
      skProfileService.findSkProfile();
    }
  }

  onShow(open: boolean) {
    this.setState({ open });
  }

  handleOk(member: ApprovalMemberModel) {
    //
    const { handleOk } = this.props;
    handleOk(new ApprovalMemberModel(member));
    this.onShow(false);
  }

  render() {
    //
    const { skProfileService } = this.props;
    const { open } = this.state;
    const { skProfile } = skProfileService!;
    const cineroomId = patronInfo.getCineroomId();
    const companyCode = patronInfo.getPatronCompanyCode();
    return (
      <Chart
        open={open}
        handleOk={this.handleOk}
        handleCancel={this.onShow}
        companyCode={companyCode && companyCode || ''}
        departmentCode={skProfile.departmentCode}
        showAllCompanies={cineroomId === 'ne1-m2-c2'}
        multiSelect
      />
    );
  }
}

export default ManagerListModalContainer;
