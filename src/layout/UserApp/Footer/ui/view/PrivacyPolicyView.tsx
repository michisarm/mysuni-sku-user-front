import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import PrivacyPolicyVer20220208 from './PrivacyPolicyVer/PrivacyPolicyVer20220208';
import PrivacyPolicyVer20210614 from './PrivacyPolicyVer/PrivacyPolicyVer20210614';
import PrivacyPolicyVer20200901 from './PrivacyPolicyVer/PrivacyPolicyVer20200901';
import PrivayPolicyVer20200117 from './PrivacyPolicyVer/PrivacyPolicyVer20200117';

interface Props {
  policyVer: String;
}

@reactAutobind
export default class PrivacyPolicyView extends Component<Props> {
  render() {
    const { policyVer } = this.props;
    return (
      <div className="terms-text-wrap">
        <div className="privacy">
          <div className="scrolling-80vh">
            {policyVer === '20220208' && <PrivacyPolicyVer20220208 />}
            {policyVer === '20210614' && <PrivacyPolicyVer20210614 />}
            {policyVer === '20200901' && <PrivacyPolicyVer20200901 />}
            {policyVer === '20200117' && <PrivayPolicyVer20200117 />}
          </div>
        </div>
      </div>
    );
  }
}
