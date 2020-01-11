import React from 'react';
import { Button, Card, Icon } from 'semantic-ui-react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import MyFeedModel from '../../model/MyFeedModel';

interface Props {
  onBackLink: any,
  onRead: any,
  model: MyFeedModel,
}

@reactAutobind
@observer
class MyFeedView extends React.Component<Props> {
  //
  handleNotieLink() {
    const { onBackLink, onRead, model } = this.props;
    onBackLink(model.backLink);
    onRead(model.id);
  }

  handleNotieRead() {
    //
    const { onRead, model } = this.props;
    onRead(model.id);
  }

  render() {
    const { model } = this.props;

    const date = new Date(model.sentTime);
    const dateFormat = date.getFullYear() + '.' + date.getMonth() + 1 + '.' + date.getDay();


    return (
      <Card className="community-item">
        <div className="title">
          <div className="commu-list-item">
            {/*썸네일*/}
            <div className="thumbnail">
              <div>
                <Icon className="thumb60-1" />
              </div>
            </div>
            {/*//썸네일*/}
            <div className="title-area">
              <div className="learning">“{model.title}”</div>
              {
                model.feedType === 'Feedback' && (
                  <div className="header ellipsis" onClick={this.handleNotieLink}>
                      학습에서 회원님이 남긴 댓글에 <em>{model.readTime}</em>개의 댓글이 달렸습니다.
                  </div>
                )
              }
              {
                model.feedType === 'PostFeedback' && (
                  <div className="header ellipsis">게시글에 <em>응답글</em>이 등록되었습니다.</div>
                )
              }
              {
                model.feedType === 'MainFeedback' && (
                  <div className="header ellipsis">게시글에 <em>{model.readTime}</em>개의 댓글이 달렸습니다</div>
                )
              }

              <div className="deatil">
                <span>{dateFormat}</span>
                <span>{model.sender.name}</span>
              </div>
            </div>
            <div className="icon-area">
              <Button onClick={this.handleNotieRead}>
                <Icon className="card-delete32" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  }
}

export default MyFeedView;
