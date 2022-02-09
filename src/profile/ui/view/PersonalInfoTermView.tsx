import PrivacyPolicyVer20220208 from 'layout/UserApp/Footer/ui/view/PrivacyPolicyVer/PrivacyPolicyVer20220208';
import React, { Component } from 'react';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';

export class PersonalInfoTermView extends Component {
  render() {
    //
    return (
      <div className="terms-text-wrap">
        <div className="privacy">
          <div className="inner">
            <PrivacyPolicyVer20220208 />
          </div>
        </div>
      </div>
    );
  }
}
