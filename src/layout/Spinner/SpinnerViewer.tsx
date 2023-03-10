
import React, { PureComponent } from 'react';
// import   { PureComponent } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import spinner from './spinner';


interface Props {}

interface State {
  count: number;
  active: boolean;
}

@reactAutobind
class SpinnerViewer extends PureComponent<Props, State> {
  //
  static defaultProps = {};

  state = {
    count: 0,
    active: false,
  };


  componentDidMount() {
    //
    spinner.open = this.addDimmer;
    spinner.close = this.removeDimmer;
    spinner.closeAll = this.removeAllDimmer;
    spinner.init();
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    //
    const { count } = this.state;

    if (prevState.count === 0 && count === 1) {
      setTimeout(this.activate, 200);
    }
    if (prevState.count !== count && count === 0) {
      setTimeout(this.deactivate, 300);
    }
  }

  addDimmer() {
    this.setState(state => ({ count: state.count + 1 }));
  }

  removeDimmer() {
    //
    this.setState(state => (
      state.count - 1 < 1 ?
        { count: 0 }
        :
        { count: state.count - 1 }
    ));
  }

  removeAllDimmer() {
    //
    this.setState({ count: 0 });
  }

  activate() {
    //
    if (this.state.count > 0) {
      this.setState({ active: true });
    }
  }

  deactivate() {
    //
    this.setState({ active: false });
  }

  render() {
    //
    const { active } = this.state;

    if (active) {
      return (
        <div className="loading-wrap select-none" style={{ display: 'block' }}>
          <div className="loading-box" />
        </div>
      );
    }
    else {
      return null;
    }
  }
}

export default SpinnerViewer;
