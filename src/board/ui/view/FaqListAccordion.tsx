import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { reactAutobind, ReactComponent } from '@nara.platform/accent';
import { Accordion, Icon } from 'semantic-ui-react';

interface Props {

}

@observer
@reactAutobind
class FaqListAccordion extends ReactComponent<Props, {}> {
  //
  render() {
    //
    return (
      <>
        <Accordion.Title>
          <div className="faq-icon">Q.</div>
          <div className="txt-wrap">
            hi
          </div>
          <Icon className="dropdown icon" />
        </Accordion.Title>
        <Accordion.Content>
          <p>
            hello
          </p>
        </Accordion.Content>
      </>
    )
  }
}

export default FaqListAccordion;
