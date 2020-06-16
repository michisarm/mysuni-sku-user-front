
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import classNames from 'classnames';


export const CourseSectionContext = React.createContext({
  open: false,
  setOpen: (open: boolean) => {},
});


interface Props {
  lecture: React.ReactNode,
  children: React.ReactNode,
  exam?: any,
}

interface State {
  open: boolean,
}

@reactAutobind
class CourseSectionContainer extends Component<Props, State> {
  //
  state = {
    open: false,
  };

  getContextValue() {
    //
    return {
      open: this.state.open,
      setOpen: this.setOpen,
    };
  }

  setOpen(open: boolean) {
    this.setState({ open });
  }

  onToggle() {
    this.setState((prevState) => ({
      open: !prevState.open,
    }));
  }

  render() {
    //
    const { lecture, children, exam } = this.props;
    const { open } = this.state;

    return (
      <CourseSectionContext.Provider value={this.getContextValue()}>
        <div className={classNames('course-box', 'fn-parents', { open })}>
          {lecture}
          {open && children}
          {exam}
        </div>
      </CourseSectionContext.Provider>
    );
  }
}

export default CourseSectionContainer;
