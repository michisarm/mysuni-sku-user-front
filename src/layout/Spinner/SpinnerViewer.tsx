
// import React, { PureComponent } from 'react';
import   { PureComponent } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import spinner from './spinner';


interface Props {
  text: string;
}

interface State {
  active: number;
}

@reactAutobind
class SpinnerViewer extends PureComponent<Props, State> {
  //
  static defaultProps = {
    text: 'LOADING',
  };

  state = {
    active: 0,
  };


  componentDidMount() {
    //
    spinner.open = this.addDimmer;
    spinner.close = this.removeDimmer;
    spinner.closeAll = this.removeAllDimmer;
    spinner.init();
  }

  addDimmer() {
    this.setState(state => ({ active: state.active + 1 }));
  }

  removeDimmer() {
    //
    this.setState(state => (
      state.active - 1 < 0 ?
        { active: 0 }
        :
        { active: state.active - 1 }
    ));
  }

  removeAllDimmer() {
    //
    this.setState({ active: 0 });
  }

  render() {
    //
    return null;

    // const { text } = this.props;
    // const { active } = this.state;
    //
    // if (active > 0) {
    //   return (
    //     <div className="loading-wrap select-none" style={{ display: 'block' }}>
    //       <div className="loading-box">{text}</div>
    //     </div>
    //   );
    // }
    // else {
    //   return null;
    // }
  }
}

export default SpinnerViewer;
