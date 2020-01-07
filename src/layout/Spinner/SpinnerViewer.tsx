
import React, { PureComponent } from 'react';
// import   { PureComponent } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import spinner from './spinner';


interface Props {
  text: string;
}

interface State {
  count: number;
  active: boolean;
}

@reactAutobind
class SpinnerViewer extends PureComponent<Props, State> {
  //
  static defaultProps = {
    text: 'LOADING',
  };

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
    if (prevState.count === 0 && this.state.count === 1) {
      setTimeout(this.activate, 500);
    }
  }

  addDimmer() {
    this.setState(state => ({ count: state.count + 1 }));
  }

  removeDimmer() {
    //
    this.setState(state => (
      state.count - 1 < 1 ?
        { count: 0, active: false }
        :
        { count: state.count - 1, active: state.active }
    ));
  }

  removeAllDimmer() {
    //
    this.setState({ count: 0, active: false });
  }

  activate() {
    //
    if (this.state.count > 0) {
      this.setState({ active: true });
    }
  }


  render() {
    //
    // return null;

    const { text } = this.props;
    const { active } = this.state;

    if (active) {
      return (
        <div className="loading-wrap select-none" style={{ display: 'block' }}>
          <div className="loading-box">{text}</div>
        </div>
      );
    }
    else {
      return null;
    }
  }
}

export default SpinnerViewer;
