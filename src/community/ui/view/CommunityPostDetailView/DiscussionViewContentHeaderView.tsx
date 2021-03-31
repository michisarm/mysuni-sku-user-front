import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import moment from 'moment';
import { Checkbox, Comment, Icon, Image, Item } from 'semantic-ui-react';
import DefaultImg from '../../../../style/media/img-profile-nobg-80-px.png';
import depot, { DepotFileViewModel } from '@nara.drama/depot';
import { Link } from 'react-router-dom';


interface Props {
  postDetail: any;
  title: string;
  time: number;
  subField?: React.ReactNode;
  deletable?: boolean;
  readCount?: number;
  replyCount?: number;
  likeCount?: number;
  onClickList?: (e: any) => void;
  content?: string;
  relatedUrlList?: [];
}

interface State {
  more: boolean
}

const PUBLIC_URL = process.env.PUBLIC_URL;
@reactAutobind
@observer
class DiscussionViewContentHeaderView extends Component<Props, State> {
  //
  constructor(props: any) {
    super(props);
    this.state = {more: false}
  }

  zipFileDownload = (type: string) => {
    console.log('첨부파일');
  }

  render() {
    //
    const {
      title,
      time,
      subField,
      deletable,
      readCount,
      replyCount,
      likeCount,
      postDetail,
      content,
      relatedUrlList,
      onClickList,
    } = this.props;

    const { more } = this.state;
    
    return (
      <>
        {/* <div className="course-info-header"> */}
          <div className="survey-header margin-none border-none pt0">
            <div className="discuss-wrap ">
              {/* 제목 */}
              <div className="discuss-box">
                <Image src={`${PUBLIC_URL}/images/all/icon-communtiy-discussion.png`} alt="" style={{display: 'inline-block'}}/>
                <h2>{title}</h2>
                <span className="peo-opinion">전체 의견 <strong>{readCount}</strong></span>
                <span><strong className="peo-date">{moment(time).format('YYYY.MM.DD')}</strong></span>
              </div>
            
              {/* 본문 */}
              <div className="discuss-box2">
                {/* <img src={MaskImg} className="discuss-main-img" /> */}
                <div className="discuss-text-wrap" >
                  {more && (
                    <div className="ql-snow">
                      <div
                        dangerouslySetInnerHTML={{ __html: postDetail.content ? postDetail.content : "없음" }}
                      />
                    </div>
                  )}
                  {!more && (
                    <p className="discuss-text-belt belt2">{postDetail.content ? postDetail.content : "없음"}</p>
                  )}
                  {!more && (
                    <button
                      className="ui icon button right btn-blue"
                      onClick={() => this.setState({more: true})}
                    >
                      more
                      <i aria-hidden="true" className="icon icon morelink more2" />
                    </button>
                  )}
                  {more && (
                    <button
                      className="ui icon button right btn-blue"
                      onClick={() => this.setState({more: false})} 
                    >
                      hide
                      <i aria-hidden="true" className="icon hide2" />
                    </button>
                  )}
                </div>
                {/* 관련 URL */}
                <div className="community-board-down discuss2">
                  <div className="board-down-title href">
                      <p>
                        <Image src={`${PUBLIC_URL}/images/all/icon-url.png`} alt="" style={{display: 'inline-block'}}/>
                        관련 URL
                      </p>
                      {postDetail.relatedUrlList && postDetail.relatedUrlList.map((item: any) => (
                        <Link to={item.url}>{item.title}</Link>
                      ))}
                  </div>
                </div>
                {/* 관련 자료 */}
                <div className="community-board-down discuss2">
                  <div className="community-contants">
                    <div className="community-board-down">
                      <div className="board-down-title">
                        <p>
                          <img
                            src={`${PUBLIC_URL}/images/all/icon-down-type-3-24-px.svg`}
                          />
                          첨부파일
                        </p>
                        <div className="board-down-title-right">
                          <button
                            className="ui icon button left post delete"
                            onClick={() => this.zipFileDownload('select')}
                          >
                            <i aria-hidden="true" className="icon check icon" />
                            선택 다운로드
                          </button>
                          <button
                            className="ui icon button left post list2"
                            onClick={() => this.zipFileDownload('all')}
                          >
                            <img
                              src={`${PUBLIC_URL}/images/all/icon-down-type-4-24-px.png`}
                            />
                            전체 다운로드
                          </button>
                        </div>
                      </div>
                      <div className="down">
                        <Checkbox
                          className="base"
                        />
                        <Icon
                          className="icon-down-type4"
                        />
                      </div>
                    </div>
                  </div>
                </div>  
              {/* discuss-box2 */}
              </div>
            </div>
          </div>
        {/* </div> */}
      </>
    );
  }
}

export default DiscussionViewContentHeaderView;
