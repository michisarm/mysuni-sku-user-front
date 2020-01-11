
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import { List, Label, Icon } from 'semantic-ui-react';


interface Props {
  title: React.ReactNode,
  className?: string
  content?: React.ReactNode,
  contentHtml?: string,
  titleIcon?: string,
}

@reactAutobind
class Item extends Component<Props> {
  //
  static defaultProps = {
    titleIcon: '',
  };

  panelRef = React.createRef<HTMLDivElement>();


  getPanelRef() {
    return this.panelRef.current;
  }

  render() {
    //
    const { title, className, titleIcon, content, contentHtml } = this.props;

    return (
      <List.Item>
        <div className="title" ref={this.panelRef}>
          {!titleIcon ?
            title
            :
            <h3 className="title-style">
              <Label className="onlytext bold size24">
                <Icon className={titleIcon} /><span>{title}</span>
              </Label>
            </h3>
          }
        </div>
        { contentHtml ?
          <div className={className ? `${className} detail` : 'detail'} dangerouslySetInnerHTML={{ __html: contentHtml }} />
          :
          <div className={className ? `${className} detail` : 'detail'}>{content}</div>
        }
      </List.Item>
    );
  }
}

export default Item;
