/* eslint-disable */

import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Button, Icon } from 'semantic-ui-react';
import classNames from 'classnames';
import $ from 'jquery';
import './Description.css';

interface Props {
  description: string;
}

interface DescriptionState {
  descriptionOpen: boolean;
  showMoreButton: boolean;
}

@reactAutobind
class Description extends Component<Props, DescriptionState, any> {
  textContainerRef: React.RefObject<HTMLDivElement>;
  constructor(props: Props) {
    super(props);
    this.state = { descriptionOpen: false, showMoreButton: false };
    this.textContainerRef = React.createRef<HTMLDivElement>();
  }

  componentDidMount() {
    const textContainer = this.textContainerRef.current;
    if (textContainer !== null) {
      if (textContainer.clientHeight < textContainer.scrollHeight) {
        this.setState({ showMoreButton: true });
      } else {
        const { ResizeObserver } = window as any;
        if (ResizeObserver !== undefined) {
          const resizeObserver = new ResizeObserver(() => {
            if (this.state.showMoreButton) {
              return;
            }
            if (textContainer.clientHeight < textContainer.scrollHeight) {
              this.setState({ showMoreButton: true });
              resizeObserver.unobserve(textContainer);
            }
          });
          resizeObserver.observe(textContainer);
        } else {
          this.setState({ showMoreButton: true });
        }
      }
    }
  }

  toggleMore() {
    const { descriptionOpen } = this.state;
    if (descriptionOpen === true) {
      this.setState({ descriptionOpen: false });
    } else {
      this.setState({ descriptionOpen: true });
    }
  }

  //
  render() {
    //
    const { description } = this.props;
    const { descriptionOpen, showMoreButton } = this.state || {};

    return (
      <div className="class-guide-txt fn-parents ql-snow">
        <div
          className={`${descriptionOpen ? '' : 'text'} description ql-editor`}
          dangerouslySetInnerHTML={{ __html: description }}
          ref={this.textContainerRef}
        />
        {showMoreButton === true && (
          <Button
            icon
            className={classNames('right btn-blue fn-more-toggle')}
            onClick={this.toggleMore}
          >
            {descriptionOpen === true ? 'hide' : 'more'}{' '}
            <Icon
              className={classNames({
                more2: descriptionOpen !== true,
                hide2: descriptionOpen === true,
              })}
            />
          </Button>
        )}
      </div>
    );
  }
}

export default Description;
