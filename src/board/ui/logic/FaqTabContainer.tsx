import React from 'react';
import { mobxHelper, reactAutobind } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';

import { Button, Icon, Radio, Segment } from 'semantic-ui-react';
import { CategoryService, PostService } from '../../../board';


interface Props {
  postService?: PostService
  categoryService?: CategoryService
  faqCategoryId: string
  findFaqPosts: (categoryId: string, end: number) => void
  handleFaqCategoryTabChange: (e: any, { index, value }: any) => void
  faqTabIndex: number
  accordIndex: number
  end: number
  routeToFaqDetail:(postId: string) => void
}

@inject(mobxHelper.injectFrom(
  'board.postService',
  'board.categoryService',
))
@observer
@reactAutobind
class FaqTabContainer extends React.Component<Props> {
  //
  render() {
    //
    const { categorys } = this.props.categoryService || {} as CategoryService;
    const { handleFaqCategoryTabChange, findFaqPosts, faqTabIndex, end, routeToFaqDetail } = this.props;
    const { posts } = this.props.postService || {} as PostService;
    const result = posts.results;
    const totalCount = posts.totalCount;

    return (
      <Segment className="full">
        <div className="support-list-wrap">
          <div className="list-top">
            <div className="radio-wrap">
              {
                categorys && categorys.length > 0 && categorys.map((category, index) => (
                  <Radio
                    key={index}
                    className="base"
                    name="radioGroup"
                    value={category.categoryId}
                    label={category.name}
                    index={index}
                    onChange={handleFaqCategoryTabChange}
                    checked={faqTabIndex === index}
                  />
                ))
              }
            </div>
          </div>
          <div className="su-list faq">
            {
              result && result.length > 0 && result.map((post, index) => {
                if (post.pinned) {
                  return (
                    <a target="_blank" className="row important" key={index} onClick={() => routeToFaqDetail(post.postId)}>
                      <span className="cell title">
                        <span className="inner">
                          <span className="ellipsis">{post.title}</span>
                        </span>
                      </span>
                    </a>
                  );
                } else {
                  return (
                    <a target="_blank" className="row" key={index} onClick={() => routeToFaqDetail(post.postId)}>
                      <span className="cell title">
                        <span className="inner">
                          <span className="ellipsis">{post.title}</span>
                        </span>
                      </span>
                    </a>
                  );
                }
              }) || ''
            }
          </div>
          {
            ( result && result.length === 0 || result && result.length === 0 ) && (
              <Segment className="full">
                <div className="no-cont-wrap">
                  <i className="icon no-contents80"><span className="blind">콘텐츠 없음</span></i>
                  <div className="text">등록된 FAQ가 없습니다.</div>
                </div>
              </Segment>
            ) || ''
          }
          {
            result && result.length && result.length < totalCount && (
              <div className="more-comments" onClick={() => findFaqPosts(categorys[faqTabIndex].categoryId, end)}>
                <Button icon
                  className="left moreview"
                >
                  <Icon className="moreview" />list more
                </Button>
              </div>
            ) || ''
          }
        </div>
      </Segment>
    );
  }
}

export default FaqTabContainer;
