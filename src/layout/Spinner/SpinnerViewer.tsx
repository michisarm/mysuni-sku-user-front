
import React, { PureComponent } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import { Dimmer, Loader } from 'semantic-ui-react';
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
    text: 'Loading',
  };

  state = {
    active: 0,
  };

  componentDidMount() {
    spinner.open = this.addDimmer;
    spinner.closeOne = this.removeDimmer;
    spinner.close = this.removeAllDimmer;
    spinner.init();
  }

  addDimmer() {
    this.setState(state => ({ active: state.active + 1 }));
  }

  removeDimmer() {
    this.setState(state => (state.active - 1 < 0 ? { active: 0 } : { active: state.active - 1 }));
  }

  removeAllDimmer() {
    this.setState({ active: 0 });
  }

  render() {
    const { text } = this.props;

    return (
      <Dimmer
        active={Boolean(this.state.active)}
        // onClickOutside={this.removeDimmer}
        inverted
        page
      >
        <Loader>{text}</Loader>
      </Dimmer>
    );
  }
}

export default SpinnerViewer;
