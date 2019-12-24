
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';


interface Props {
  children: React.FunctionComponent<ChildProps>,
}

interface State {
  inputValue: string,
  focused: boolean,
}

interface ChildProps {
  value: string,
  focused?: boolean,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) =>  void,
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void,
  onBlur?: (e: React.FormEvent<HTMLInputElement>) => void,
  onClear?: () => void,
}

@reactAutobind
class InputWrapper extends Component<Props, State> {
  //
  state = {
    inputValue: '',
    focused: false,
  };


  onChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ inputValue: e.target.value });
  }

  onClickInput() {
    //
    this.setState({ focused: true });
  }

  onBlurInput() {
    //
    this.setState({ focused: false });
  }

  onClickClear() {
    this.setState({ inputValue: '' });
  }

  render() {
    //
    const { children: ChildComponent } = this.props;
    const { inputValue, focused } = this.state;

    return (
      <ChildComponent
        value={inputValue}
        focused={focused}
        onChange={this.onChangeInput}
        onClick={this.onClickInput}
        onBlur={this.onBlurInput}
        onClear={this.onClickClear}
      />
    );
  }
}

export default InputWrapper;
