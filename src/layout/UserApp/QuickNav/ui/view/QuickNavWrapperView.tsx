
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Button } from 'semantic-ui-react';


interface Props {
  active: boolean,
  children: React.ReactNode,
  onClick: () => void,
}

@reactAutobind
class QuickNavWrapperView extends Component<Props> {
  //
  render() {
    //
    const {
      active, children, onClick,
    } = this.props;

    return (
      <section className="quick" onClick={(e: any) => e.stopPropagation()}>
        <div className="cont-inner">
          <div className="q-group">
            <a href="#top" className="ui top button">TOP</a>
            <Button className="quick" active={active} onClick={onClick} />

            {children}
          </div>
        </div>
      </section>
    );
  }
}

export default QuickNavWrapperView;
