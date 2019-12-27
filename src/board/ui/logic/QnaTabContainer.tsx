import React from 'react';
import { Button, Icon, Radio, Segment, Select } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import { CategoryService, PostService } from '../../index';

interface Props {
  postService?: PostService
  categoryService?: CategoryService
  routeToQnaRegist: () => void
  findQnaPosts: (answered: any, categoryId: string, end: number) => void
  handleQnaCategoryTabChange: (e: any, { answered, index, categorys }: any) => void
  disabled: boolean
  end: number
  answered: any
  qnaTabIndex: number
  routeToQnaDetail: (postId: string) => void
  routeToAnsweredDetail:(postId : string) => void
}

const selectOptions01 = [
  { key: '1', value: 'all', text: '모두보기' },
  { key: '2', value: true, text: '답변 완료' },
  { key: '3', value: false, text: '답변 대기' },
];

@inject('postService', 'categoryService')
@observer
@reactAutobind
class QnaTabContainer extends React.Component<Props> {

  render() {
    //
    const {
      routeToQnaRegist,
      findQnaPosts,
      handleQnaCategoryTabChange,
      end,
      disabled,
      answered,
      qnaTabIndex,
      routeToQnaDetail,
      routeToAnsweredDetail,
    } = this.props;
    const { categorys } = this.props.categoryService || {} as CategoryService;
    const { posts } = this.props.postService || {} as PostService;
    const result = posts.results;

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
                    answered={String(answered)}
                    onChange={handleQnaCategoryTabChange}
                    checked={qnaTabIndex === index}
                  />
                ))
              }
            </div>
            <div className="option-list">
              <div className="select-box">
                <Select placeholder="분류를 선택해주세요"
                  className="dropdown selection"
                  defaultValue={selectOptions01[0].value}
                  options={selectOptions01}
                  categorys={categorys}
                  onChange={(e: any, data: any) => {
                    findQnaPosts(data.value, categorys[qnaTabIndex].categoryId, 10 );
                  }}
                />
              </div>
              <Button icon className="left post ask" onClick={routeToQnaRegist}>
                <Icon className="ask24" />Ask a Question
              </Button>
            </div>
          </div>
          <div className="su-list qna">
            {
              result && result.length > 0 && result.map((post, index) => {
                if (post.answered) {
                  return (
                    <>
                      <a target="_blank" className="row" onClick={() => routeToQnaDetail(post.postId)}>
                        <span className="cell title">
                          <span className="inner">
                            <span className="ellipsis">{post.title}</span>
                          </span>
                        </span>
                        <span className="cell category">{post.category.name}</span>
                        <span className="cell status">답변완료</span>
                        <span className="cell date">{post.time && new Date(post.time).toLocaleDateString()}</span>
                      </a>
                      <a target="_blank" className="row reply" onClick={() => routeToAnsweredDetail(post.postId)}>
                        <span className="cell title">
                          <Icon className="reply16-b" /><span className="blind">reply</span>
                          <span className="ellipsis">{post.answer.name}</span>
                        </span>
                        <span className="cell category" />
                        <span className="cell status" />
                        <span className="cell date">{post.answeredAt && new Date(post.answeredAt).toLocaleDateString()}</span>
                      </a>
                    </>
                  );
                } else {
                  return (
                    <a target="_blank" className="row" key ={index} onClick={() => routeToQnaDetail(post.postId)}>
                      <span className="cell title">
                        <span className="inner">
                          <span className="ellipsis">{post.title}</span>
                        </span>
                      </span>
                      <span className="cell category">{post.category.name}</span>
                      <span className="cell status waiting">답변대기</span>
                      <span className="cell date">{post.time && new Date(post.time).toLocaleDateString()}</span>
                    </a>
                  );
                }
              }) || ''
              }
          </div>
          {
            result && result.length === 0 && (
              <Segment className="full">
                <div className="no-cont-wrap">
                  <i className="icon no-contents80"><span className="blind">콘텐츠 없음</span></i>
                  <div className="text">등록된 Q&A가 없습니다.</div>
                </div>
              </Segment>
            )
          }
          {
            result && result.length > 0 && (
              <div className="more-comments" onClick={() => findQnaPosts(answered, categorys[qnaTabIndex].categoryId, end)}>
                <Button icon
                  className="left moreview"
                  disabled={disabled}
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

export default QnaTabContainer;
