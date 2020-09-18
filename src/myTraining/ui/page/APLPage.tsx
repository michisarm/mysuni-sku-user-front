import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import { ContentLayout } from 'shared';
import { Button, TextArea, Form, Modal, Table } from 'semantic-ui-react';

interface Props {}

const APLPage: React.FC<Props> = Props => {
  //

  return (
    <ContentLayout className="no-padding">
      <div className="add-personal-learning">
        <div className="add-personal-learning-wrap">
          <div className="apl-tit">개인학습</div>
          <div className="apl-notice">
            ‘mySUNI / 각 사 교육’ 외 개인적으로 학습하였을 경우, <br />
            승인권자의 확인 후 학습시간으로 등록 할 수 있습니다.
          </div>
        </div>

        <div className="ui full segment">
          <div className="apl-form-wrap">
            <Form className="ui form">
              <div className="field">
                <label className="necessary">교육명</label>
                <div className="ui right-top-count input">
                  <span className="count">
                    <span className="now">0</span>/
                    <span className="max">100</span>
                  </span>
                  <input type="text" placeholder="강좌명을 입력해주세요." />
                  <i aria-hidden="true" className="clear link icon" />
                  <span className="validation">
                    최대 100자까지 입력 가능합니다.{' '}
                  </span>
                </div>
              </div>
              <div className="field">
                <label className="necessary">교육형태</label>
                <div className="edu-wrap">
                  <select className="ui dropdown w302">
                    <option value="">Select</option>
                    <option value="classNameroom">classNameroom</option>
                    <option value="e-Learning">e-Learning</option>
                    <option value="Video">Video</option>
                    <option value="Audio">Audio</option>
                    <option value="Webpage">Webpage</option>
                    <option value="Experiential">Experiential</option>
                    <option value="Document">Document</option>
                    <option value="Community">Community</option>
                    <option value="기타-직접입력" selected>
                      기타-직접입력
                    </option>
                  </select>
                  <div className="w878">
                    <div className="ui h48 input ml18">
                      <input
                        type="text"
                        placeholder="기타 교육형태를 입력해주세요."
                      />
                      <i aria-hidden="true" className="clear link icon" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="necessary">Channel</label>
                <select className="ui dropdown w302">
                  <option value="">Select</option>
                  <option value="a">a</option>
                  <option value="b">b</option>
                </select>
              </div>
              <div className="field">
                <label className="necessary">교육기간</label>
                <div className="calendar-wrap">
                  <div className="ui calendar" id="rangestart">
                    <div className="ui input right icon">
                      <label>시작일</label>
                      <i className="calendar24 icon">
                        <span className="blind">date</span>
                      </i>
                      <input type="text" />
                    </div>
                  </div>
                  <span className="dash">-</span>
                  <div className="ui calendar" id="rangeend">
                    <div className="ui input right icon">
                      <label>종료일</label>
                      <i className="calendar24 icon">
                        <span className="blind">date</span>
                      </i>
                      <input type="text" />
                    </div>
                  </div>
                  <div className="info-text">
                    <i className="info16 icon">
                      <span className="blind">infomation</span>
                    </i>
                    일일 강좌 등록 시 시작일과 종료일의 날짜를 동일하게 설정해
                    주시기 바랍니다.
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="necessary">교육기관</label>
                <div className="ui right-top-count input">
                  <span className="count">
                    <span className="now">0</span>/
                    <span className="max">100</span>
                  </span>
                  <input
                    type="text"
                    placeholder="교육을 수료한 기관명을 입력해주세요."
                  />
                  <i aria-hidden="true" className="clear link icon" />
                  <span className="validation">
                    최대 100자까지 입력 가능합니다.{' '}
                  </span>
                </div>
              </div>

              <div className="field">
                <label className="necessary">교육시간</label>
                <div className="time-wrap">
                  <div className="time">
                    <div className="ui h48 input time">
                      <input type="text" />
                      <label>시간</label>
                      <i aria-hidden="true" className="clear link icon" />
                    </div>
                  </div>
                  <div className="time">
                    <div className="ui h48 input time">
                      <input type="text" />
                      <label>분</label>
                      <i aria-hidden="true" className="clear link icon" />
                    </div>
                  </div>
                  <div className="info-text">
                    <i className="info16 icon">
                      <span className="blind">infomation</span>
                    </i>
                    학습시간으로 인정되는 교육시간을 입력해주세요. / 승인자에
                    의해 교육시간은 변경될 수 있습니다.
                  </div>
                </div>
              </div>

              <div className="field">
                <label className="necessary">교육내용</label>
                <div className="ui form">
                  <div className="ui right-top-count input">
                    <span className="count">
                      <span className="now">0</span>/
                      <span className="max">1000</span>
                    </span>
                    <TextArea placeholder="교육내용을 1,000자 이내로 입력해주세요." />
                    <span className="validation">
                      최대 1000자 까지 입력 가능합니다.
                    </span>
                  </div>
                </div>
              </div>
              <div className="field">
                <label>첨부파일</label>
                <div className="round-wrap2">
                  <div className="top text">
                    <ul>
                      <li>
                        <span>Education UX/UI className_1.pptx</span>
                        <Button>
                          <i className="clear icon">
                            <span className="blind">delete</span>
                          </i>
                        </Button>
                      </li>
                      <li>
                        <span>Education UX/UI className_1.pptx</span>
                        <Button>
                          <i className="clear icon">
                            <span className="blind">delete</span>
                          </i>
                        </Button>
                      </li>
                      <li>
                        <span>Education UX/UI className_1.pptx</span>
                        <Button>
                          <i className="clear icon">
                            <span className="blind">delete</span>
                          </i>
                        </Button>
                      </li>
                    </ul>
                  </div>
                  <div className="bottom">
                    <span className="text1">
                      <i className="info16 icon">
                        <span className="blind">infomation</span>
                      </i>
                      파일 확장자가 exe를 제외한 모든 첨부파일을 등록하실 수
                      있습니다. / 1개 이상의 첨부파일을 등록하실 수 있습니다.
                    </span>
                    <div className="right-btn">
                      <div className="ui input file2">
                        <input type="file" id="hidden-new-file2" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="field">
                <div className="ui grid create create2">
                  <div className="column">
                    <label>승인자</label>
                  </div>
                  <div className="column">
                    <Button
                      className="ui button post change-admin"
                      type="button"
                    >
                      <span>승인자 변경</span>
                    </Button>
                    <span className="text1">
                      <b>이의연</b>
                      <span className="ml40">SKI</span>
                      <span className="line">LMS</span>
                    </span>
                    <div className="info-text">
                      <i className="info16 icon">
                        <span className="blind">infomation</span>
                      </i>
                      본인 조직의 리더가 아닐 경우 [승인자변경]을 눌러 수정
                      해주세요.{' '}
                    </div>
                  </div>
                </div>
              </div>
              <div className="buttons">
                <Button className="ui button fix line">취소</Button>
                <Button className="ui button fix bg">승인요청</Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};

export default inject(mobxHelper.injectFrom())(withRouter(observer(APLPage)));
