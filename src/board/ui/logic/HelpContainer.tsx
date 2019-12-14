import { Label, Icon } from 'semantic-ui-react';
import React from 'react';
import { inject, observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import { PostService } from '../../index';

interface Props {
  postService?: PostService
  routeToFaqDetail:(postId: string) => void
}

@inject('postService')
@observer
@reactAutobind
class HelpContainer extends React.Component<Props> {

  render() {
    const { faqPosts } = this.props.postService || {} as PostService;
    const { routeToFaqDetail } = this.props;
    //
    return (
      <div className="tip-area">
        <Label className="onlytext">
          <Icon className="tip16" /><span>유용한 도움말</span>
        </Label>
        {
          faqPosts && faqPosts.totalCount && faqPosts.results.map((faqPost, index) => (
            <div className="q-list">
              <a target="_blank" key = {index}>
                <span className="ellipsis" onClick={() => routeToFaqDetail(faqPost.postId)}>
                  {faqPost.title}
                </span>
              </a>
            </div>
          )) || (
            <div className="q-list">
              등록된 도움말이 없습니다.
            </div>
          )
        }
      </div>
    );
  }
}

export default HelpContainer;
