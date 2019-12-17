
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import { List, Label, Icon } from 'semantic-ui-react';


interface Props {
  title: React.ReactNode,
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

  render() {
    //
    const { title, titleIcon, content, contentHtml } = this.props;

    return (
      <List.Item>
        <div className="title">
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
          <div className="detail" dangerouslySetInnerHTML={{ __html: contentHtml }} />
          :
          <div className="detail">{content}</div>
        }
      </List.Item>
    );
  }
}

export default Item;
