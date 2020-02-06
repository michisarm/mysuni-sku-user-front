import * as React from 'react';
import { getCookie, mobxHelper, reactAutobind } from '@nara.platform/accent';
import { patronInfo } from '@nara.platform/dock';
import { Chart, CompanyViewModel, MemberViewModel, DepartmentViewModel } from '@nara.drama/approval';
import { inject, observer } from 'mobx-react';

import { SkProfileService } from 'profile';


interface Props {
  skProfileService?: SkProfileService
  trigger?: React.ReactNode
  handleOk: (member: MemberViewModel) => void
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

  handleOk(member: MemberViewModel, department: DepartmentViewModel, company: CompanyViewModel) {
    //
    const { handleOk } = this.props;
    handleOk(member);
    this.onShow(false);
  }

  render() {
    //
    const { skProfileService } = this.props;
    const { open } = this.state;
    const { skProfile } = skProfileService!;
    const cineroomId = getCookie('cineroomId');
    const companyCode = patronInfo.getPatronCompanyCode();
    return (
      <Chart
        open={open}
        handleOk={this.handleOk}
        handleCancel={this.onShow}
        companyCode={companyCode && companyCode || ''}
        departmentCode={skProfile.departmentCode}
        showAllCompanies={cineroomId === 'ne1-m2-c2'}
      />
    );
  }
}

export default ManagerListModalContainer;
