import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import moment from 'moment';
import { Checkbox, Comment, Icon, Image } from 'semantic-ui-react';
import DefaultImg from '../../../../style/media/img-profile-nobg-80-px.png';
import depot, { DepotFileViewModel } from '@nara.drama/depot';


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
  // content: string;
}

interface State {
  more: boolean
}

const str = " 2019년 지구상에 새로 등장한 신종 바이러스 감염병인 코로나19는 세계 많은 국가에 서 1년째 대유행을 하고 있다.코로나19는 21세기 들어 가장 많은 인명 피해를 주고 있는 감염병이란 타이틀을 이미 거머쥐었다. 지금도 정치, 경제,사회, 문화, 보건의료, 과학기술 등 많은 분야를 이전과 다른 모습으로 바꿔놓고 있는 중이다. 따라서 코로나19가 바꾸었거나바꾸고 있는 우리 사회의 다양 한 모습을 살펴보고 또 앞으로 어디까지 어떻게 바꿀지를 분석하는 것은 인류의 지속가능성을위해 매우 중요한 과제라고 할 수 있다. 코로나 사태와 관련, 코로나 사태가 시작되었던 1월 말 당시의 예상 및 결과를 Review해보고,향후 사태 지속 시 사회가 어떤 모습으로 변할지에 대해 답변하면서 평소에 생각하지 못했던 부분까지 생각의 영역을 확장해봅니다.";
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
      // content,
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
                <span><strong className="peo-date">{moment().format('YYYY.MM.DD')}</strong></span>
              </div>
            
              {/* 본문 */}
              <div className="discuss-box2">
                {/* <img src={MaskImg} className="discuss-main-img" /> */}
                <div className="discuss-text-wrap" >
                  {more && (
                    <div className="ql-snow">
                      <div
                        dangerouslySetInnerHTML={{ __html: str }}
                      />
                    </div>
                  )}
                  {!more && (
                    <p className="discuss-text-belt belt2">{str}</p>
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
                        {" "}
                        <Image src={`${PUBLIC_URL}/images/all/icon-url.png`} alt="" style={{display: 'inline-block'}}/>
                        관련 URL
                      </p>
                      <a href="#">코로나19 100일째 전 세계 확진자 150만명… (2020-04-09 한국경제)</a>
                      <a href="#">센트럴 파크에 들어선 야전병원… 뉴욕은 지금 전쟁터 (2020-03-31 한국일보)</a>
                      <a href="#">헤지펀드 배부 코로나 충력, 경제공황으로 이어질수도 (2020-04-10 중앙일보)</a>
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
