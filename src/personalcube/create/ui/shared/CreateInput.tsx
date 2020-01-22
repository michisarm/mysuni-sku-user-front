
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import classNames from 'classnames';
import { Icon } from 'semantic-ui-react';


interface Props {
  label: string
  placeholder: string
  value: string | string[]
  onChange: (e: any, data: any) => void,
  required?: boolean
  sizeLimited?: boolean
  maxSize?: number
  invalidMessage?: string
  asList?: boolean
  inputProps?: object
}

interface State {
  focused: boolean
  invalid: boolean
}

@observer
@reactAutobind
class CreateInput extends Component<Props, State> {
  //
  static defaultProps = {
    required: false,
    sizeLimited: false,
    maxSize: 0,
    invalidMessage: '',
    asList: false,
  };

  state = {
    focused: false,
    invalid: false,
  };


  getValueAsList(csvValue: string) {
    //
    return csvValue.split(',');
  }

  onChange(e: any) {
    //
    const { value, sizeLimited, maxSize, asList, onChange } = this.props;

    if (sizeLimited) {
      const invalid = value.length > maxSize!;

      this.setState({ invalid });

      if (invalid) {
        return;
      }
    }
    const originTypeValue = asList ? this.getValueAsList(e.target.value) : e.target.value;
    onChange(e, { value: originTypeValue });
  }

  onClickInput() {
    //
    this.setState({ focused: true });
  }

  onBlurInput() {
    //
    this.setState({ focused: false });
  }

  onClear(e: any) {
    //
    const { asList } = this.props;
    const { invalid } = this.state;

    if (invalid) {
      this.setState({ invalid: false });
    }

    if (asList) {
      this.props.onChange(e, { value: []});
    }
    else {
      this.props.onChange(e, { value: '' });
    }
  }


  render() {
    //
    const { label, required, sizeLimited, maxSize, placeholder, value, invalidMessage, inputProps } = this.props;
    const { focused, invalid } = this.state;

    return (
      <>
        <label className={classNames({ necessary: required })}>
          {label}
        </label>

        <div
          className={classNames('ui right-top-count input', {
            focus: focused,
            write: value.toString(),
            error: invalid,
          })}
        >
          { sizeLimited && (
            <span className="count">
              <span className="now">{value.length || 0}</span>/
              <span className="max">{maxSize}</span>
            </span>
          )}

          <input
            id="in"
            type="text"
            placeholder={placeholder}
            value={value}
            onClick={this.onClickInput}
            onBlur={this.onBlurInput}
            onChange={this.onChange}
            {...inputProps}
          />

          <Icon className="clear link" onClick={this.onClear} />

          { invalidMessage && (
            <span className="validation">{invalidMessage}</span>
          )}
        </div>
      </>
    );
  }
}

export default CreateInput;
