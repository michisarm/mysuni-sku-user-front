
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Button } from 'semantic-ui-react';


interface Props {
  active: boolean,
  children: React.ReactNode,
  onTop: () => void,
  onToggle: () => void,
}

@reactAutobind
class QuickNavWrapperView extends Component<Props> {
  //
  render() {
    //
    const {
      active, children, onTop, onToggle,
    } = this.props;

    return (
      <section className="quick" onClick={(e: any) => e.stopPropagation()}>
        <div className="cont-inner">
          <div className="q-group">
            <Button as="a" className="top" onClick={onTop}>TOP</Button>
            <Button className="quick" active={active} onClick={onToggle} />

            {children}
          </div>
        </div>
      </section>
    );
  }
}

export default QuickNavWrapperView;
